// SleepForest Demo — "Vibe" full version for Chapter 5.
// Clean layout, synthesized ambient audio (Web Audio), live waveform,
// animated scene atmosphere (rain / fireflies / ripples / chalk dust),
// breathing ring, sleeping companions.

const { useState, useEffect, useRef, useMemo } = React;

const SCENES = [
  {
    id: 'RAIN', label: '雨夜', char: 'CAT',
    bg: 'linear-gradient(180deg, #4A5A70 0%, #1F2B3E 100%)',
    accent: '#FCD34D', tint: 'rgba(180, 200, 230, 0.6)',
    companions: ['SHEEP', 'FOX'],
    tagline: '雨滴打在屋顶',
  },
  {
    id: 'FOREST', label: '森林', char: 'FOX',
    bg: 'linear-gradient(180deg, #4A6352 0%, #1A3A2E 100%)',
    accent: '#FFB863', tint: 'rgba(255, 200, 120, 0.5)',
    companions: ['CAT', 'SHEEP'],
    tagline: '萤火虫与夜风',
  },
  {
    id: 'OCEAN', label: '海边', char: 'PENGUIN',
    bg: 'linear-gradient(180deg, #4A6A85 0%, #0F3652 100%)',
    accent: '#FEF3C7', tint: 'rgba(180, 220, 240, 0.6)',
    companions: ['CAT', 'SHEEP'],
    tagline: '浪花退潮的节奏',
  },
  {
    id: 'CLASSROOM', label: '教室', char: 'SHEEP',
    bg: 'linear-gradient(180deg, #3E4A38 0%, #1B2018 100%)',
    accent: '#FEF08A', tint: 'rgba(255, 235, 170, 0.5)',
    companions: ['CAT', 'FOX'],
    tagline: '老师的声音像安眠曲',
  },
];

const BREATHING = [
  { label: '吸气', sub: 'Inhale', ms: 4000 },
  { label: '屏住', sub: 'Hold',   ms: 7000 },
  { label: '呼气', sub: 'Exhale', ms: 8000 },
];

// --- Web Audio engine: per-scene synthesized ambience + shared analyser ---
function useAmbientAudio(sceneId, playing, volume) {
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const nodesRef = useRef([]);
  const gainRef = useRef(null);

  const cleanup = () => {
    nodesRef.current.forEach(n => { try { n.stop && n.stop(); } catch {} try { n.disconnect(); } catch {} });
    nodesRef.current = [];
  };

  useEffect(() => {
    if (!playing) { cleanup(); return; }
    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;
      const gain = ctx.createGain();
      gain.gain.value = volume;
      gainRef.current = gain;
      gain.connect(analyser);
      analyser.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();

    cleanup();
    const dest = gainRef.current;

    // Shared pink-ish noise buffer source
    const makeNoise = (color = 'white') => {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const d = buf.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < d.length; i++) {
        const w = Math.random() * 2 - 1;
        if (color === 'pink') {
          b0 = 0.99765 * b0 + w * 0.0990460;
          b1 = 0.96300 * b1 + w * 0.2965164;
          b2 = 0.57000 * b2 + w * 1.0526913;
          d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2;
        } else {
          d[i] = w;
        }
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      return src;
    };

    if (sceneId === 'RAIN') {
      const src = makeNoise('white');
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 800;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass';  lp.frequency.value = 5000;
      src.connect(hp); hp.connect(lp); lp.connect(dest);
      src.start(); nodesRef.current.push(src, hp, lp);
      // Distant rumble
      const rumble = ctx.createOscillator(); rumble.type = 'sine'; rumble.frequency.value = 55;
      const rGain = ctx.createGain(); rGain.gain.value = 0.05;
      rumble.connect(rGain); rGain.connect(dest);
      rumble.start(); nodesRef.current.push(rumble, rGain);
    } else if (sceneId === 'FOREST') {
      const src = makeNoise('pink');
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800;
      const g = ctx.createGain(); g.gain.value = 0.6;
      src.connect(lp); lp.connect(g); g.connect(dest);
      src.start(); nodesRef.current.push(src, lp, g);
      // Occasional bird-like chirp
      const chirp = () => {
        if (!nodesRef.current.length) return;
        const o = ctx.createOscillator(); o.type = 'sine';
        const og = ctx.createGain(); og.gain.value = 0;
        o.connect(og); og.connect(dest);
        const now = ctx.currentTime;
        o.frequency.setValueAtTime(1600 + Math.random() * 600, now);
        o.frequency.exponentialRampToValueAtTime(800, now + 0.3);
        og.gain.linearRampToValueAtTime(0.08, now + 0.02);
        og.gain.linearRampToValueAtTime(0, now + 0.3);
        o.start(now); o.stop(now + 0.4);
      };
      const id = setInterval(() => { if (Math.random() < 0.4) chirp(); }, 3500);
      nodesRef.current.push({ disconnect: () => clearInterval(id) });
    } else if (sceneId === 'OCEAN') {
      const src = makeNoise('pink');
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
      const g = ctx.createGain(); g.gain.value = 0.4;
      // LFO for wave swell
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.15;
      const lfoG = ctx.createGain(); lfoG.gain.value = 0.3;
      lfo.connect(lfoG); lfoG.connect(g.gain);
      src.connect(lp); lp.connect(g); g.connect(dest);
      src.start(); lfo.start();
      nodesRef.current.push(src, lp, g, lfo, lfoG);
    } else if (sceneId === 'CLASSROOM') {
      const src = makeNoise('pink');
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2200;
      const g = ctx.createGain(); g.gain.value = 0.35;
      src.connect(lp); lp.connect(g); g.connect(dest);
      src.start(); nodesRef.current.push(src, lp, g);
      // Subtle tonal hum (fluorescent light)
      const hum = ctx.createOscillator(); hum.type = 'sine'; hum.frequency.value = 120;
      const hg = ctx.createGain(); hg.gain.value = 0.03;
      hum.connect(hg); hg.connect(dest);
      hum.start(); nodesRef.current.push(hum, hg);
    }

    return cleanup;
  }, [sceneId, playing]);

  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = volume;
  }, [volume]);

  return analyserRef;
}

// --- Waveform bars driven by analyser ---
function Waveform({ analyserRef, playing, color = '#fff' }) {
  const [bars, setBars] = useState(() => Array(24).fill(0.1));
  useEffect(() => {
    if (!playing) { setBars(Array(24).fill(0.08)); return; }
    let raf;
    const tick = () => {
      const a = analyserRef.current;
      if (a) {
        const data = new Uint8Array(a.frequencyBinCount);
        a.getByteFrequencyData(data);
        const step = Math.floor(data.length / 24);
        const next = Array.from({ length: 24 }, (_, i) => {
          let s = 0;
          for (let k = 0; k < step; k++) s += data[i * step + k];
          return Math.min(1, (s / step) / 140 + 0.08);
        });
        setBars(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28 }}>
      {bars.map((v, i) => (
        <div key={i} style={{
          width: 3, height: `${Math.max(8, v * 100)}%`, background: color, opacity: 0.7,
          borderRadius: 2, transition: 'height 80ms linear',
        }} />
      ))}
    </div>
  );
}

// --- Atmosphere layer: removed decorative particles to match the real SleepForest (clean gradient only) ---
function Atmosphere() { return null; }

function SleepForestDemo({ height = 520, defaultScene = 'RAIN', showLabel = true }) {
  const [sceneId, setSceneId] = useState(defaultScene);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [stepIdx, setStepIdx] = useState(-1);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef(null);

  const scene = SCENES.find(s => s.id === sceneId);
  const analyserRef = useAmbientAudio(sceneId, playing, volume);

  useEffect(() => {
    if (!playing) {
      clearTimeout(timerRef.current);
      setStepIdx(-1); setCountdown(0); return;
    }
    let i = 0;
    const run = () => {
      setStepIdx(i % BREATHING.length);
      const step = BREATHING[i % BREATHING.length];
      setCountdown(step.ms / 1000);
      timerRef.current = setTimeout(() => { i++; run(); }, step.ms);
    };
    run();
    return () => clearTimeout(timerRef.current);
  }, [playing]);

  useEffect(() => {
    if (stepIdx < 0) return;
    const id = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [stepIdx]);

  const currentStep = BREATHING[stepIdx];
  const sleeping = playing && stepIdx >= 1;
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return (
    <div style={{
      position: 'relative', width: '100%', height, borderRadius: 24, overflow: 'hidden',
      background: scene.bg, transition: 'background 1.2s ease', color: 'white',
      boxShadow: '0 30px 60px -30px rgba(20, 15, 5, 0.45), 0 0 0 1px rgba(255,255,255,0.04) inset',
      fontFamily: 'inherit',
    }}>
      <style>{`
        @keyframes sf-rain { from { transform: translateY(-20px); opacity: 0; } 10% { opacity: 1; } to { transform: translateY(${height + 40}px); opacity: 0; } }
        @keyframes sf-fly { from { transform: translate(0, 0); opacity: 0.3; } to { transform: translate(40px, -20px); opacity: 1; } }
        @keyframes sf-ripple { from { transform: translateX(-50%) scale(0.3); opacity: 0.6; } to { transform: translateX(-50%) scale(1.4); opacity: 0; } }
        @keyframes sf-float { from { transform: translateY(0) translateX(0); } to { transform: translateY(-30px) translateX(15px); } }
        @keyframes sf-breath-in { from { transform: scale(0.85); opacity: 0.4; } to { transform: scale(1.15); opacity: 0.8; } }
        @keyframes sf-breath-hold { from { transform: scale(1.15); } to { transform: scale(1.15); } }
        @keyframes sf-breath-out { from { transform: scale(1.15); opacity: 0.8; } to { transform: scale(0.85); opacity: 0.4; } }
      `}</style>

      <Atmosphere sceneId={sceneId} />

      {/* Soft accent glow */}
      <div style={{
        position: 'absolute', bottom: '-25%', left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 500, borderRadius: '50%', background: scene.accent, opacity: 0.18,
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* TOP BAR: brand + scene label + clock */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, padding: '18px 22px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
        fontFamily: 'JetBrains Mono, monospace', opacity: 0.8, zIndex: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: scene.accent, boxShadow: `0 0 8px ${scene.accent}` }} />
          <span>SleepForest</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ opacity: 0.7 }}>{scene.label}</span>
        </div>
        <div>{timeStr}</div>
      </div>

      {/* CENTER: bubble ABOVE character (no overlap) */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '18%', display: 'flex',
        flexDirection: 'column', alignItems: 'center', gap: 20, pointerEvents: 'none',
      }}>
        {/* Idle greeting OR breath guide */}
        {!playing ? (
          <div style={{
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '12px 22px', borderRadius: 20, maxWidth: 360,
            border: '1px solid rgba(255,255,255,0.12)',
            fontSize: 13, lineHeight: 1.7, textAlign: 'center', fontWeight: 300, opacity: 0.92,
          }}>
            夜深了，我的朋友们都睡着了…<br/>现在是时候跟我一起休息了
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            {/* Breathing ring */}
            <div style={{
              width: 120, height: 120, borderRadius: '50%', margin: '0 auto 16px',
              border: `1.5px solid ${scene.accent}`, position: 'relative',
              animation: currentStep
                ? `sf-breath-${stepIdx === 0 ? 'in' : stepIdx === 1 ? 'hold' : 'out'} ${(currentStep.ms)}ms ease-in-out`
                : 'none',
              boxShadow: `0 0 30px ${scene.accent}40, inset 0 0 20px ${scene.accent}20`,
            }}>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: 3 }}>{currentStep?.label}</div>
                <div style={{ fontSize: 11, opacity: 0.6, letterSpacing: 2, marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>
                  {currentStep?.sub} · {Math.ceil(countdown)}s
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main character (one at a time, like the real SleepForest) */}
        <div style={{ marginTop: playing ? 20 : 40 }}>
          <SFCharacter type={scene.char} sleeping={sleeping} breathing={playing} size={160} />
        </div>
      </div>

      {/* BOTTOM BAR: waveform + scene pills + play + volume */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '18px 22px 20px',
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.25))',
        display: 'flex', flexDirection: 'column', gap: 14, zIndex: 5,
      }}>
        {/* Waveform strip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center',
          opacity: playing ? 1 : 0.4, transition: 'opacity 400ms',
        }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
            fontFamily: 'JetBrains Mono, monospace', opacity: 0.6, width: 70, textAlign: 'right' }}>
            {playing ? 'playing' : 'idle'}
          </div>
          <Waveform analyserRef={analyserRef} playing={playing} color={scene.accent} />
          <div style={{ fontSize: 10, letterSpacing: 1,
            fontFamily: 'JetBrains Mono, monospace', opacity: 0.6, width: 90, textAlign: 'left' }}
            title="课程里是合成音（placeholder），真 SleepForest 用的是真实录音">
            synth preview
          </div>
        </div>

        {/* Controls row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          {/* Volume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 110 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6 }}>
              <path d="M3 9v6h4l5 5V4L7 9H3z"/>
            </svg>
            <input type="range" min="0" max="1" step="0.01" value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              style={{
                flex: 1, height: 2, background: 'rgba(255,255,255,0.2)',
                accentColor: scene.accent, cursor: 'pointer',
              }}
            />
          </div>

          {/* Scene pills */}
          <div style={{ display: 'flex', gap: 6 }}>
            {SCENES.map(s => (
              <button key={s.id} onClick={() => setSceneId(s.id)}
                style={{
                  padding: '7px 14px', borderRadius: 999, fontSize: 12, letterSpacing: 1,
                  background: s.id === sceneId ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.06)',
                  border: s.id === sceneId ? `1px solid ${s.accent}90` : '1px solid rgba(255,255,255,0.12)',
                  color: 'white', cursor: 'pointer', transition: 'all 200ms',
                  fontFamily: 'inherit', backdropFilter: 'blur(8px)',
                }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Play */}
          <button onClick={() => setPlaying(p => !p)}
            style={{
              width: 48, height: 48, borderRadius: '50%',
              background: playing ? scene.accent : 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${playing ? scene.accent : 'rgba(255,255,255,0.2)'}`,
              color: playing ? '#1A1A1A' : 'white', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: playing ? `0 0 24px ${scene.accent}60` : 'none',
              transition: 'all 300ms',
            }}>
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

window.SleepForestDemo = SleepForestDemo;
