// SleepForest Demo — faithful port of the original SleepForest (public/sounds + App.tsx structure)
// Converted from Tailwind to inline styles so it runs under Babel-standalone without a build step.
// Uses the real audio files copied into assets/sleepforest/sounds/.

const { useState, useEffect, useRef } = React;

const SOUNDS_BASE = 'assets/sleepforest/sounds';

// --- Narrative / Breathing state names (mirrors types.ts) ---
const NP = { INTRO: 'INTRO', BREATHING: 'BREATHING', STORY: 'STORY', SLEEP: 'SLEEP' };
const BP = { IDLE: 'IDLE', INHALE: 'INHALE', HOLD: 'HOLD', EXHALE: 'EXHALE' };

// --- Scene config (mirrors App.tsx getCharacterForScene + bg classes) ---
const SCENES = [
  { id: 'RAIN',      label: 'Rain',      tag: '雨夜', char: 'CAT',     bg: 'linear-gradient(180deg, #4A5A70 0%, #1F2B3E 100%)', accent: '#FCD34D', sound: `${SOUNDS_BASE}/rain.mp3` },
  { id: 'FOREST',    label: 'Forest',    tag: '森林', char: 'FOX',     bg: 'linear-gradient(180deg, #4A6352 0%, #1A3A2E 100%)', accent: '#FFB863', sound: `${SOUNDS_BASE}/forest.mp3` },
  { id: 'OCEAN',     label: 'Ocean',     tag: '海边', char: 'PENGUIN', bg: 'linear-gradient(180deg, #4A6A85 0%, #0F3652 100%)', accent: '#FEF3C7', sound: `${SOUNDS_BASE}/ocean.mp3` },
  { id: 'CLASSROOM', label: 'Classroom', tag: '教室', char: 'SHEEP',   bg: 'linear-gradient(180deg, #3E4A38 0%, #1B2018 100%)', accent: '#FEF08A', sound: `${SOUNDS_BASE}/classroom.mp3` },
];

const BREATHING_CYCLES = 4;
const INTRO_TEXT = '夜深了，我的朋友们都睡着了... 现在是时候脱去一身的疲惫跟我睡觉了';
const STORY_FALLBACKS = [
  '一片叶子静静飘下... 落在湿润的青苔上... 然后睡着了...',
  '远处有一朵云... 慢慢飘过山谷... 最后也躺下了...',
  '森林里最后一盏小灯熄灭了... 连风都压低了呼吸...',
];

// --- Scene atmospheric effects (simplified ports of SceneBackground.tsx) ---
function SceneEffect({ sceneId, height }) {
  if (sceneId === 'RAIN') {
    const drops = Array.from({ length: 18 });
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* warm lamp glow */}
        <div style={{ position: 'absolute', bottom: -80, left: -40, width: 260, height: 260, borderRadius: '50%',
          background: 'rgba(251, 146, 60, 0.22)', filter: 'blur(70px)', animation: 'sf-flicker 4s infinite' }} />
        {drops.map((_, i) => (
          <div key={i} style={{
            position: 'absolute', top: '-20%', width: 1, height: 80,
            left: `${Math.random() * 100}%`,
            background: 'linear-gradient(to bottom, transparent, rgba(180,210,255,0.35))',
            animation: `sf-rain ${0.6 + Math.random() * 0.4}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }} />
        ))}
      </div>
    );
  }
  if (sceneId === 'FOREST') {
    const stars = Array.from({ length: 24 });
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {stars.map((_, i) => (
          <div key={i} style={{
            position: 'absolute', width: 2, height: 2, borderRadius: '50%',
            background: '#FFF8E1',
            top: `${Math.random() * 55}%`, left: `${Math.random() * 100}%`,
            opacity: 0.6,
            animation: `sf-twinkle ${2 + Math.random() * 3}s infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }} />
        ))}
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          width: 240, height: 160, borderRadius: '50%',
          background: 'rgba(255, 120, 40, 0.22)', filter: 'blur(55px)',
          animation: 'sf-flicker 3s infinite' }} />
      </div>
    );
  }
  if (sceneId === 'OCEAN') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Moon */}
        <div style={{ position: 'absolute', top: 40, right: 40, width: 56, height: 56, borderRadius: '50%',
          background: '#FFF9C4', boxShadow: '0 0 40px rgba(255,255,200,0.3)', opacity: 0.9 }} />
        {/* Moon reflection */}
        <div style={{ position: 'absolute', top: 96, right: 40, width: 56, height: height * 0.6,
          background: 'linear-gradient(to bottom, rgba(255,249,196,0.18), transparent)',
          filter: 'blur(12px)' }} />
      </div>
    );
  }
  if (sceneId === 'CLASSROOM') {
    const dust = Array.from({ length: 14 });
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Moonlight beam */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '100%', height: '150%',
          background: 'linear-gradient(to bottom, rgba(255,253,231,0.12), transparent 60%)',
          transform: 'rotate(-35deg)', transformOrigin: 'top right', filter: 'blur(40px)' }} />
        {dust.map((_, i) => (
          <div key={i} style={{
            position: 'absolute', width: 3, height: 3, borderRadius: '50%',
            background: 'rgba(255,255,255,0.4)',
            top: `${Math.random() * 80}%`, left: `${40 + Math.random() * 55}%`,
            animation: `sf-float ${10 + Math.random() * 12}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.2,
          }} />
        ))}
      </div>
    );
  }
  return null;
}

// --- Icon primitives (avoid lucide-react dependency) ---
const Icon = {
  Play: (p) => <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>,
  Pause: (p) => <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>,
  Volume: (p) => <svg width={p.size || 20} height={p.size || 20} viewBox="0 0 24 24" fill="currentColor"><path d="M3 10v4h4l5 4V6L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" /></svg>,
  VolumeOff: (p) => <svg width={p.size || 20} height={p.size || 20} viewBox="0 0 24 24" fill="currentColor"><path d="M3 10v4h4l5 4V6L7 10H3zm14 2a4.5 4.5 0 0 0-2-3.7v7.4A4.5 4.5 0 0 0 17 12z" opacity="0.5" /><line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" /></svg>,
  Clock: (p) => <svg width={p.size || 20} height={p.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  Chevron: (p) => <svg width={p.size || 22} height={p.size || 22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: p.dir === 'left' ? 'scaleX(-1)' : 'none' }}><polyline points="9 18 15 12 9 6" /></svg>,
};

// --- Scene selector (ported from SceneSelector.tsx) ---
function SceneSelector({ currentScene, onSceneChange, opacity }) {
  const idx = SCENES.findIndex(s => s.id === currentScene);
  const go = (delta) => {
    const n = (idx + delta + SCENES.length) % SCENES.length;
    onSceneChange(SCENES[n].id);
  };
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20,
      padding: '0 16px', opacity, transition: 'opacity 1s',
    }}>
      <button onClick={() => go(-1)} style={btnGhost}><Icon.Chevron dir="left" size={24} /></button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 120 }}>
        <div style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 500, letterSpacing: 3,
          fontSize: 11, textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
          {SCENES[idx].label}
        </div>
        <div style={{ display: 'flex', gap: 5, marginTop: 3 }}>
          {SCENES.map((s, i) => (
            <div key={s.id} style={{
              height: 3, borderRadius: 999,
              width: i === idx ? 18 : 3,
              background: i === idx ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
              transition: 'all 500ms',
            }} />
          ))}
        </div>
      </div>
      <button onClick={() => go(1)} style={btnGhost}><Icon.Chevron dir="right" size={24} /></button>
    </div>
  );
}

// --- Breathing guide text + countdown (ported from BreathingGuide.tsx) ---
function BreathingGuide({ phase, timer, active }) {
  if (!active) return null;
  const text = phase === BP.INHALE ? 'Inhale slowly...'
             : phase === BP.HOLD   ? 'Hold gently...'
             : phase === BP.EXHALE ? 'Let it all go...'
             : '';
  return (
    <div style={{
      position: 'absolute', top: '22%', left: 0, right: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      pointerEvents: 'none', transition: 'opacity 1s',
    }}>
      <div style={{
        fontSize: 22, fontWeight: 300, letterSpacing: 6, color: 'rgba(255,255,255,0.92)',
        textShadow: '0 2px 10px rgba(0,0,0,0.3)', whiteSpace: 'nowrap',
        animation: 'sf-pulse 3s ease-in-out infinite',
      }}>{text}</div>
      {phase !== BP.IDLE && (
        <div style={{
          marginTop: 10, color: 'rgba(255,255,255,0.7)',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 30, fontWeight: 700,
        }}>{Math.ceil(timer)}s</div>
      )}
    </div>
  );
}

// --- Stress bar right side (ported from StressBar.tsx) ---
function StressBar({ level, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      pointerEvents: 'none', zIndex: 30,
    }}>
      <div style={{
        color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: 500,
        letterSpacing: 4, textTransform: 'uppercase', whiteSpace: 'nowrap',
        transform: 'rotate(-90deg) translateY(18px)', transformOrigin: 'center',
      }}>Stress level</div>
      <div style={{
        width: 10, height: 180, background: 'rgba(255,255,255,0.1)', borderRadius: 999,
        overflow: 'hidden', position: 'relative', marginTop: 18,
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: `${level}%`, transition: 'height 1s linear',
          background: 'linear-gradient(to top, rgba(74, 222, 128, 0.6), rgba(250, 204, 21, 0.7), rgba(248, 113, 113, 0.85))',
        }} />
      </div>
      <div style={{
        color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: 'JetBrains Mono, monospace',
      }}>{Math.round(level)}%</div>
    </div>
  );
}

// Common button styles
const btnGhost = {
  padding: 10, border: 0, borderRadius: '50%',
  background: 'transparent', color: 'rgba(255,255,255,0.75)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'all 180ms',
};
const btnChip = {
  padding: '10px 14px', border: 0, borderRadius: 999,
  background: 'rgba(0,0,0,0.22)', backdropFilter: 'blur(10px)',
  color: 'rgba(255,255,255,0.85)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500,
  transition: 'all 180ms', fontFamily: 'inherit',
};

function SleepForestDemo({ height = 560, defaultScene = 'RAIN' }) {
  const [scene, setScene] = useState(defaultScene);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(30); // minutes
  const [elapsed, setElapsed] = useState(0);                  // seconds
  const [breathingElapsed, setBreathingElapsed] = useState(0);
  const [narrativePhase, setNarrativePhase] = useState(NP.INTRO);
  const [breathingPhase, setBreathingPhase] = useState(BP.IDLE);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [characterText, setCharacterText] = useState(INTRO_TEXT);

  const ambientRef = useRef(null);
  const storyRef = useRef(null);
  const isMutedRef = useRef(isMuted);
  const cycleCountRef = useRef(0);

  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  const sceneCfg = SCENES.find(s => s.id === scene);

  // ---- Ambient audio: swap src on scene change, play/pause by mute ----
  useEffect(() => {
    if (!ambientRef.current) {
      ambientRef.current = new Audio();
      ambientRef.current.loop = true;
    }
    const audio = ambientRef.current;
    const targetSrc = sceneCfg.sound;
    // Compare using a URL object to avoid cross-origin resolution quirks
    if (!audio.src.endsWith(targetSrc)) {
      audio.src = targetSrc;
    }
    audio.volume = 0.8;
    if (!isMuted && (isPlaying || narrativePhase !== NP.INTRO)) {
      audio.play().catch(() => { /* autoplay blocked; will resume on next interaction */ });
    } else {
      audio.pause();
    }
    return () => { audio.pause(); };
  }, [scene, isPlaying, isMuted, narrativePhase]);

  // ---- Volume fade in last 60s of the session ----
  useEffect(() => {
    if (!ambientRef.current) return;
    const total = sessionDuration * 60;
    const remaining = total - elapsed;
    const v = (remaining <= 60 && remaining > 0 && isPlaying)
      ? Math.max(0, (remaining / 60) * 0.8)
      : 0.8;
    ambientRef.current.volume = v;
    if (storyRef.current) storyRef.current.volume = v;
  }, [elapsed, sessionDuration, isPlaying]);

  // ---- Session global timer ----
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setElapsed(prev => {
        if (prev >= sessionDuration * 60) {
          setNarrativePhase(NP.SLEEP);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isPlaying, sessionDuration]);

  // ---- Breathing elapsed (for stress bar calc) ----
  useEffect(() => {
    if (!isPlaying || narrativePhase !== NP.BREATHING) return;
    const id = setInterval(() => setBreathingElapsed(p => p + 1), 1000);
    return () => clearInterval(id);
  }, [isPlaying, narrativePhase]);

  // ---- INTRO → BREATHING after a short reading moment ----
  useEffect(() => {
    if (narrativePhase !== NP.INTRO) return;
    setCharacterText(INTRO_TEXT);
    if (!isPlaying) return;
    const t = setTimeout(() => setNarrativePhase(NP.BREATHING), 2200);
    return () => clearTimeout(t);
  }, [narrativePhase, isPlaying]);

  // ---- Breathing cycle (4-7-8, 4 cycles) ----
  useEffect(() => {
    if (narrativePhase !== NP.BREATHING || !isPlaying) {
      setBreathingPhase(BP.IDLE);
      return;
    }
    let mounted = true;
    cycleCountRef.current = 0;
    const inhaleAudio = new Audio(`${SOUNDS_BASE}/inhale.mp3`);
    const exhaleAudio = new Audio(`${SOUNDS_BASE}/exhale.mp3`);
    exhaleAudio.volume = 0.6;

    const step = (ms, setPhase, cueAudio) => new Promise(res => {
      if (!mounted) return res();
      setPhase();
      if (cueAudio && !isMutedRef.current) cueAudio.play().catch(() => {});
      setTimeout(res, ms);
    });

    const runCycle = async () => {
      while (mounted && cycleCountRef.current < BREATHING_CYCLES) {
        await step(4000, () => { setBreathingPhase(BP.INHALE); setBreathingTimer(4); }, inhaleAudio);
        await step(7000, () => { setBreathingPhase(BP.HOLD);   setBreathingTimer(7); }, null);
        await step(8000, () => { setBreathingPhase(BP.EXHALE); setBreathingTimer(8); }, exhaleAudio);
        cycleCountRef.current++;
      }
      if (mounted) setNarrativePhase(NP.STORY);
    };
    runCycle();

    return () => {
      mounted = false;
      try { inhaleAudio.pause(); exhaleAudio.pause(); } catch {}
    };
  }, [narrativePhase, isPlaying]);

  // ---- Countdown ticker for the big seconds number ----
  useEffect(() => {
    if (breathingPhase === BP.IDLE) return;
    const id = setInterval(() => setBreathingTimer(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [breathingPhase]);

  // ---- Story phase: play story audio + set a soft fallback text ----
  useEffect(() => {
    if (!storyRef.current) storyRef.current = new Audio(`${SOUNDS_BASE}/story_dec1.mp3`);
    const audio = storyRef.current;

    if (narrativePhase === NP.STORY) {
      setCharacterText(STORY_FALLBACKS[Math.floor(Math.random() * STORY_FALLBACKS.length)]);
      const t = setTimeout(() => {
        if (isPlaying && !isMuted) audio.play().catch(() => {});
      }, 1500);
      return () => { clearTimeout(t); audio.pause(); };
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [narrativePhase, isPlaying, isMuted]);

  // ---- Reset narrative when user hits play from scratch after a session ended ----
  const togglePlay = () => {
    if (narrativePhase === NP.SLEEP) {
      setNarrativePhase(NP.INTRO);
      setElapsed(0);
      setBreathingElapsed(0);
    }
    setIsPlaying(p => !p);
  };

  const toggleDuration = () => {
    const d = [15, 30, 45, 60];
    setSessionDuration(d[(d.indexOf(sessionDuration) + 1) % d.length]);
  };

  // ---- Stress level (mirrors App.tsx calc) ----
  const BREATHING_DURATION = 76;
  const stressLevel = (() => {
    if (narrativePhase === NP.INTRO) return 100;
    if (narrativePhase === NP.BREATHING) {
      const p = Math.min(breathingElapsed / BREATHING_DURATION, 1);
      return Math.max(0, 100 - p * 100);
    }
    return 0;
  })();

  // ---- Darkening overlay as session progresses ----
  const progressPct = (elapsed / (sessionDuration * 60)) * 100;
  const overlayOpacity = Math.min(0.85, progressPct / 100);

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return (
    <div style={{
      position: 'relative', width: '100%', height, borderRadius: 24, overflow: 'hidden',
      background: sceneCfg.bg, transition: 'background 1.2s ease', color: 'white',
      boxShadow: '0 30px 60px -30px rgba(20, 15, 5, 0.45), 0 0 0 1px rgba(255,255,255,0.04) inset',
    }}>
      <style>{`
        @keyframes sf-rain { 0% { transform: translateY(-40px); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(${height + 40}px); opacity: 0; } }
        @keyframes sf-twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
        @keyframes sf-flicker { 0%, 100% { opacity: 0.85; } 50% { opacity: 1; } }
        @keyframes sf-float { 0% { transform: translate(0, 0); } 100% { transform: translate(-40px, -60px); } }
        @keyframes sf-pulse { 0%, 100% { opacity: 0.9; } 50% { opacity: 0.6; } }
      `}</style>

      <SceneEffect sceneId={scene} height={height} />

      {/* Soft accent glow at the bottom */}
      <div style={{
        position: 'absolute', bottom: '-25%', left: '50%', transform: 'translateX(-50%)',
        width: 460, height: 460, borderRadius: '50%', background: sceneCfg.accent, opacity: 0.18,
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* Global darkening overlay for sleepiness */}
      <div style={{
        position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none',
        transition: 'opacity 2s', opacity: overlayOpacity, zIndex: 10,
      }} />

      {/* TOP BAR: brand + scene + clock */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, padding: '18px 22px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
        fontFamily: 'JetBrains Mono, monospace', opacity: 0.85, zIndex: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: sceneCfg.accent, boxShadow: `0 0 8px ${sceneCfg.accent}` }} />
          <span>SleepForest</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ opacity: 0.7, textTransform: 'none' }}>{sceneCfg.tag}</span>
        </div>
        <div>{timeStr}</div>
      </div>

      {/* TOP RIGHT CONTROLS: timer + mute */}
      <div style={{
        position: 'absolute', top: 44, right: 20, zIndex: 30,
        display: 'flex', gap: 10,
      }}>
        <button style={btnChip} onClick={toggleDuration} title="Session duration">
          <Icon.Clock size={16} /> {sessionDuration}m
        </button>
        <button style={{ ...btnChip, padding: 10 }} onClick={() => setIsMuted(m => !m)} title={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? <Icon.VolumeOff size={16} /> : <Icon.Volume size={16} />}
        </button>
      </div>

      {/* StressBar */}
      <StressBar level={stressLevel} visible={(narrativePhase === NP.BREATHING || narrativePhase === NP.STORY) && stressLevel > 0} />

      {/* Breathing guide text */}
      <BreathingGuide phase={breathingPhase} timer={breathingTimer} active={narrativePhase === NP.BREATHING} />

      {/* CENTER content: speech bubble (INTRO / STORY) + character */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 130,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', zIndex: 15,
      }}>
        {/* Bubble: only during STORY phase. INTRO bubble removed — it kept blocking the character. */}
        {narrativePhase === NP.STORY && (
          <div style={{
            maxWidth: '80%', background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            padding: '14px 22px', borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.08)', marginBottom: 28,
            fontSize: 13, lineHeight: 1.75, textAlign: 'center', fontWeight: 300,
            color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            transition: 'opacity 1s, transform 1s',
          }}>
            {characterText}
          </div>
        )}

        {/* Character */}
        <div style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}>
          <SFCharacter
            type={sceneCfg.char}
            size={180}
            breathingPhase={breathingPhase}
            narrativePhase={narrativePhase}
            isPlaying={isPlaying}
          />
        </div>
      </div>

      {/* BOTTOM CONTROLS: scene selector + play */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 22px 20px',
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.4))',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        zIndex: 20, pointerEvents: 'auto',
      }}>
        <div style={{
          pointerEvents: isPlaying ? 'none' : 'auto',
          opacity: isPlaying ? 0.3 : 1,
          filter: isPlaying ? 'grayscale(1)' : 'none',
          transition: 'all 500ms',
        }}>
          <SceneSelector currentScene={scene} onSceneChange={setScene} opacity={1} />
        </div>
        <button onClick={togglePlay} style={{
          width: 56, height: 56, borderRadius: '50%', cursor: 'pointer',
          background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.22)',
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          transition: 'all 200ms',
        }}>
          {isPlaying ? <Icon.Pause size={24} /> : <Icon.Play size={24} />}
        </button>
      </div>
    </div>
  );
}

window.SleepForestDemo = SleepForestDemo;
