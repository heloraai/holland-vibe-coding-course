// Homepage — hero + 3 principles + course map of 8 chapters + SleepForest preview + progress.

const { useState, useEffect } = React;

function ProgressRing({ pct = 40, size = 56, stroke = 4 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--line)" strokeWidth={stroke} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--amber)" strokeWidth={stroke} fill="none"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{ transition: 'stroke-dashoffset 800ms' }} />
    </svg>
  );
}

function ChapterCard({ ch, status = 'locked', onOpen }) {
  const { num, title, goal, duration, difficulty, handsOn, tags, featured } = ch;
  const colors = {
    done:     { bar: 'var(--moss)',   label: '已完成', bg: 'var(--moss-soft)'  },
    current:  { bar: 'var(--amber)',  label: '进行中', bg: 'var(--amber-soft)' },
    locked:   { bar: 'var(--line)',   label: '未开始', bg: 'var(--bg-2)'       },
  };
  const c = colors[status];

  return (
    <div className="card" style={{
      position: 'relative', cursor: 'pointer',
      background: featured ? `linear-gradient(180deg, var(--bg) 0%, ${c.bg} 100%)` : 'var(--bg)',
    }} onClick={onOpen}>
      {/* side bar */}
      <div style={{ position: 'absolute', left: 0, top: 22, bottom: 22, width: 3, borderRadius: 2, background: c.bar }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div className="eyebrow">Ch {num} · {duration}</div>
          <div className="serif" style={{ fontSize: 22, marginTop: 4, lineHeight: 1.3 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span className="tag tag-mono" style={{ background: c.bg, color: 'var(--ink-2)' }}>{c.label}</span>
        </div>
      </div>
      <p style={{ margin: '8px 0 14px', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7 }}>{goal}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span className="stars">{'★'.repeat(difficulty)}{'☆'.repeat(5 - difficulty)}</span>
        {handsOn && <span className="tag">动手</span>}
        {tags.map(t => <span key={t} className="tag tag-mono">{t}</span>)}
      </div>
      {featured && (
        <div style={{
          position: 'absolute', top: -10, right: 20,
          background: 'var(--amber)', color: 'white', fontSize: 10, letterSpacing: 2,
          padding: '4px 10px', borderRadius: 999, fontFamily: 'var(--f-mono)',
        }}>全课最重 · 最长</div>
      )}
    </div>
  );
}

function Home() {
  // Pretend progress state — user has started Ch 3
  const progress = { done: [1, 2], current: 3 };
  const statusFor = (id) => {
    if (progress.done.includes(id)) return 'done';
    if (progress.current === id) return 'current';
    return 'locked';
  };

  const pct = Math.round((progress.done.length / COURSE.chapters.length) * 100);

  const scrollToMap = () => document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Tweakable content (wired to Tweaks panel)
  const [tweaks, setTweaks] = useState(window.__TWEAKS__);
  useEffect(() => {
    window.addEventListener('tweaks-updated', (e) => setTweaks({ ...window.__TWEAKS__ }));
  }, []);

  const courseTitle = tweaks?.courseTitle || '零基础 Vibe Coding';
  const slogan = tweaks?.slogan || '从「有想法」到「网上有人在用」，压缩成一周。';
  const density = tweaks?.density || 'normal'; // compact | normal | spacious
  const gap = { compact: 12, normal: 20, spacious: 32 }[density];
  const illustration = tweaks?.illustration || 'character';

  return (
    <div>
      <Nav current="home" />

      {/* Hero */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px 40px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div className="eyebrow">v1.0 · By Holland · {COURSE.totalHours}</div>
          <h1 className="serif" style={{ fontSize: 56, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '18px 0 20px' }}>
            {courseTitle}
            <br />
            <span style={{ color: 'var(--amber-ink)' }}>从想法走到公网</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--ink-2)', maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
            {slogan} 这不是教你<span className="term">某一个工具</span>——是带你走一次完整的
            <strong> 从 concept 到上线 </strong>的链路。工具会变，链路不变。
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href="chapter.html?ch=3"><button className="btn btn-primary">继续学习 · Ch 03 ›</button></a>
            <button className="btn" onClick={scrollToMap}>看课程地图</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40 }}>
            <ProgressRing pct={pct} />
            <div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--ink-2)' }}>
                {progress.done.length} / {COURSE.chapters.length} 章节已完成
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>上次学习：2 天前 · Ch 02 找到你的 Concept</div>
            </div>
          </div>
        </div>

        {/* Hero illustration — the SleepForest preview, idle */}
        <div style={{ position: 'relative' }}>
          <SleepForestDemo height={420} defaultScene="FOREST" />
        </div>
      </div>

      {/* Principles band */}
      <div style={{ background: 'var(--bg-2)', padding: '48px 0', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>课程三原则</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {COURSE.principles.map((p, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--amber-ink)', marginBottom: 6 }}>0{i + 1}</div>
                <div className="serif" style={{ fontSize: 22, marginBottom: 8 }}>{p.k}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7 }}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course map */}
      <div id="map" className="page">
        <div style={{ marginBottom: 32 }}>
          <div className="eyebrow">课程地图 · 8 章 · 3 个 Part</div>
          <h2 className="serif" style={{ fontSize: 36, margin: '8px 0 0' }}>一张纸看完整个课程</h2>
        </div>

        {COURSE.parts.map(part => {
          const chs = COURSE.chapters.filter(c => c.partId === part.id);
          return (
            <div key={part.id} style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 18, borderBottom: '1px solid var(--line)', paddingBottom: 10 }}>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, letterSpacing: 2, color: 'var(--amber-ink)' }}>{part.name.toUpperCase()}</span>
                <span className="serif" style={{ fontSize: 24 }}>{part.title}</span>
                <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>· {part.tagline}</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--ink-3)' }}>{part.hours}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: chs.length === 4 ? 'repeat(2, 1fr)' : `repeat(${Math.min(chs.length, 2)}, 1fr)`, gap }}>
                {chs.map(ch => (
                  <ChapterCard key={ch.id} ch={ch} status={statusFor(ch.id)}
                    onOpen={() => {
                      // Chapter 5 is the one we actually built out
                      if (ch.id === 5) location.href = 'chapter-5.html';
                      else location.href = `chapter.html?ch=${ch.id}`;
                    }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tools row */}
      <div style={{ background: 'var(--bg-2)', padding: '56px 0' }}>
        <div className="page" style={{ padding: '0 32px' }}>
          <div className="eyebrow">课程配套工具</div>
          <h2 className="serif" style={{ fontSize: 32, margin: '8px 0 28px' }}>边学边练的小工具</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            <a href="prompt-lab.html" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card" style={{ padding: 28 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="4" y="10" width="32" height="22" rx="4" stroke="var(--amber-ink)" strokeWidth="1.5" />
                    <path d="M10 16h14M10 20h18M10 24h10" stroke="var(--amber-ink)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="32" cy="10" r="4" fill="var(--amber)" />
                  </svg>
                </div>
                <div className="serif" style={{ fontSize: 22, margin: '8px 0 6px' }}>Prompt 练习台</div>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0 }}>
                  把"坏 prompt"改成"好 prompt"，实时对比 AI 会怎么理解你的意图。配 Ch 03。
                </p>
                <div className="tag tag-mono" style={{ marginTop: 14 }}>打开 →</div>
              </div>
            </a>
            <a href="codex-demo.html" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card" style={{ padding: 28 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="4" y="6" width="32" height="28" rx="3" fill="var(--ink)" />
                    <path d="M10 16l4 4-4 4M18 24h8" stroke="#F7F2E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="serif" style={{ fontSize: 22, margin: '8px 0 6px' }}>Codex 对话演示</div>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0 }}>
                  模拟在终端里和 Codex 对话的全过程：你说话、它读代码、它 diff、你 approve。配 Ch 04。
                </p>
                <div className="tag tag-mono" style={{ marginTop: 14 }}>打开 →</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '40px 32px', color: 'var(--ink-3)', fontSize: 12, textAlign: 'center', borderTop: '1px solid var(--line-soft)' }}>
        Holland 的 Vibe Coding 课 · v1.0 · 本页为高保真交互原型
      </div>
    </div>
  );
}

window.Home = Home;
