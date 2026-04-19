// Overview — interactive one-page visualization of the whole course.
// Horizontal 3-part timeline with nodes for each chapter; hover to reveal.

const { useState } = React;

function Overview() {
  const [hoverId, setHoverId] = useState(5);
  const ch = COURSE.chapters.find(c => c.id === hoverId);

  const colors = {
    p1: 'var(--mist)',
    p2: 'var(--amber)',
    p3: 'var(--moss)',
  };

  return (
    <div>
      <Nav current="overview" />
      <div className="page">
        <div className="eyebrow">一页纸看懂整门课</div>
        <h1 className="serif" style={{ fontSize: 44, margin: '8px 0 10px', letterSpacing: '-0.02em' }}>课程地图 · Overview</h1>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: 680, lineHeight: 1.75 }}>
          3 个 Part，8 章，约 14 小时。<strong>从"有想法"走到"公网有 URL"</strong>。把鼠标移到节点上看每章的要点。
        </p>

        {/* Timeline */}
        <div style={{ marginTop: 60, position: 'relative', minHeight: 240 }}>
          {/* Path line */}
          <svg style={{ position: 'absolute', top: 60, left: 0, right: 0, width: '100%', height: 80, pointerEvents: 'none' }} preserveAspectRatio="none" viewBox="0 0 1000 80">
            <path d="M 40 40 Q 250 10 460 40 T 880 40" stroke="var(--amber-soft)" strokeWidth="2" fill="none" strokeDasharray="4,6" />
          </svg>

          {/* Part bands */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 4fr 2fr', gap: 0, position: 'relative', zIndex: 2 }}>
            {COURSE.parts.map(part => {
              const chs = COURSE.chapters.filter(c => c.partId === part.id);
              return (
                <div key={part.id} style={{ padding: '0 12px', borderRight: part.id !== 'p3' ? '1px dashed var(--line)' : 'none' }}>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: 2, color: colors[part.id] }}>{part.name.toUpperCase()}</div>
                    <div className="serif" style={{ fontSize: 17, marginTop: 2 }}>{part.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>{part.hours}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', gap: 10 }}>
                    {chs.map(c => {
                      const hovered = c.id === hoverId;
                      return (
                        <button key={c.id} onMouseEnter={() => setHoverId(c.id)} onClick={() => setHoverId(c.id)}
                          style={{
                            width: 56, height: 56, borderRadius: '50%',
                            background: hovered ? colors[part.id] : 'var(--bg)',
                            border: `2px solid ${colors[part.id]}`,
                            color: hovered ? 'white' : 'var(--ink)',
                            fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 600,
                            cursor: 'pointer', transition: 'all 200ms',
                            transform: hovered ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: hovered ? '0 12px 24px -8px rgba(43,36,30,0.25)' : 'none',
                          }}>
                          {c.num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Focused chapter card */}
        <div style={{ marginTop: 48, maxWidth: 720, margin: '48px auto 0' }}>
          <div className="card" style={{ padding: 32, borderLeft: `4px solid ${colors[ch.partId]}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <div className="eyebrow">Chapter {ch.num} · {ch.duration}</div>
              <span className="stars">{'★'.repeat(ch.difficulty)}{'☆'.repeat(5 - ch.difficulty)}</span>
            </div>
            <h2 className="serif" style={{ fontSize: 30, margin: '4px 0 10px' }}>{ch.title}</h2>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.8, margin: 0 }}>{ch.goal}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              {ch.tags.map(t => <span key={t} className="tag tag-mono">{t}</span>)}
              {ch.handsOn && <span className="tag" style={{ background: 'var(--amber-soft)', color: 'var(--amber-ink)' }}>动手</span>}
            </div>
            <div style={{ marginTop: 20 }}>
              <a href={ch.id === 5 ? 'chapter-5.html' : `chapter.html?ch=${ch.id}`}>
                <button className="btn btn-primary">进入本章 →</button>
              </a>
            </div>
          </div>
        </div>

        {/* Arc narrative */}
        <div style={{ marginTop: 80, padding: 32, background: 'var(--bg-2)', borderRadius: 22, textAlign: 'center' }}>
          <div className="eyebrow">整门课的节奏</div>
          <div className="serif" style={{ fontSize: 22, margin: '10px auto 0', maxWidth: 640, lineHeight: 1.6 }}>
            前半程<span style={{ color: 'var(--mist)' }}>看懂</span> ·
            中段<span style={{ color: 'var(--amber-ink)' }}>照着做一遍</span> ·
            后段<span style={{ color: 'var(--moss)' }}>自己独立做</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', maxWidth: 600, margin: '12px auto 0', lineHeight: 1.7 }}>
            每个 Part 之间有一个"硬交付物"作为分水岭：1-Pager → 原型视频 → 上线链接
          </p>
        </div>
      </div>
    </div>
  );
}

window.Overview = Overview;
