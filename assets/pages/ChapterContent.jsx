// Generic chapter reader — shared layout used by Ch 1–8 (except Ch 5 which has its own richer version).
// Reads the chapter id from ?ch=N, pulls metadata from COURSE, and renders body from window.CHAPTER_BODIES[id].
// Body is a function (React component) that receives shared helpers.

const { useState, useEffect, useRef } = React;

function CTOC({ items, active, onClick }) {
  return (
    <nav style={{ fontSize: 13 }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>本章目录</div>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((it, i) => (
          <li key={it.id} style={{ marginBottom: 4 }}>
            <a href={`#${it.id}`} onClick={(e) => { e.preventDefault(); onClick(it.id); }}
              style={{
                display: 'flex', gap: 10, padding: '6px 10px', borderRadius: 8,
                textDecoration: 'none',
                color: active === it.id ? 'var(--ink)' : 'var(--ink-3)',
                background: active === it.id ? 'var(--amber-soft)' : 'transparent',
                borderLeft: active === it.id ? '2px solid var(--amber)' : '2px solid transparent',
                fontWeight: active === it.id ? 500 : 400,
                transition: 'all 180ms',
              }}>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, minWidth: 16, color: 'var(--ink-3)' }}>{String.fromCharCode(65 + i)}</span>
              <span>{it.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function CCallout({ kind = 'tip', title, children }) {
  const map = {
    tip:   { bg: 'var(--amber-soft)', bar: 'var(--amber)',  label: '💡 心法' },
    warn:  { bg: 'var(--mist-soft)',  bar: 'var(--mist)',   label: '⚠ 注意'  },
    stuck: { bg: 'var(--moss-soft)',  bar: 'var(--moss)',   label: '🪤 卡住了怎么办' },
    note:  { bg: 'var(--bg-2)',       bar: 'var(--ink-3)',  label: '📎 备注' },
  };
  const s = map[kind] || map.tip;
  return (
    <div style={{ background: s.bg, borderLeft: `3px solid ${s.bar}`, padding: '16px 20px', borderRadius: '0 12px 12px 0', margin: '20px 0' }}>
      <div style={{ fontSize: 11, letterSpacing: 2, fontFamily: 'var(--f-mono)', color: 'var(--ink-2)', marginBottom: 6 }}>
        {s.label}{title && ` · ${title}`}
      </div>
      <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function CHomework({ items }) {
  return (
    <div style={{
      margin: '32px 0 12px', background: 'linear-gradient(135deg, var(--amber-soft), var(--bg-2))',
      borderRadius: 18, padding: '24px 28px', border: '1px solid var(--amber)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: 'var(--amber)', color: '#2B241E',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14,
          fontFamily: 'var(--f-mono)',
        }}>✓</div>
        <div className="eyebrow" style={{ color: 'var(--amber-ink)', margin: 0 }}>本章作业</div>
      </div>
      <ol style={{ margin: 0, paddingLeft: 22, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.9 }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ol>
      <div style={{ marginTop: 14, fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic' }}>
        不用提交。自己对着清单过一遍，过了就进下一章。
      </div>
    </div>
  );
}

// ---------- Small content helpers ----------

function CCodeBlock({ children }) {
  return (
    <pre style={{
      background: 'var(--ink)', color: '#F4F1EA', borderRadius: 12, padding: 20,
      fontFamily: 'var(--f-mono)', fontSize: 13, lineHeight: 1.75, overflowX: 'auto',
      margin: '20px 0', whiteSpace: 'pre-wrap',
    }}>{children}</pre>
  );
}

function CCompare({ left, right, leftLabel = '❌ 不好', rightLabel = '✓ 好' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '18px 0' }}>
      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 12, padding: 18 }}>
        <div className="eyebrow" style={{ color: 'var(--ink-3)' }}>{leftLabel}</div>
        <div style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--ink-2)', marginTop: 8 }}>{left}</div>
      </div>
      <div style={{ background: 'var(--amber-soft)', border: '1px solid var(--amber)', borderRadius: 12, padding: 18 }}>
        <div className="eyebrow" style={{ color: 'var(--amber-ink)' }}>{rightLabel}</div>
        <div style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--ink)', marginTop: 8 }}>{right}</div>
      </div>
    </div>
  );
}

function CCardList({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '18px 0' }}>
      {items.map((it, i) => (
        <div key={i} className="card" style={{ padding: 16, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: 'var(--amber-soft)', color: 'var(--amber-ink)',
            fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>{it.n ?? (i + 1)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>{it.t}</div>
            {it.d && <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 4, lineHeight: 1.75 }}>{it.d}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

// Expose helpers so per-chapter bodies can use them
window.C = { Callout: CCallout, Homework: CHomework, CodeBlock: CCodeBlock, Compare: CCompare, CardList: CCardList };

// ---------- The reader ----------

function ChapterContent() {
  const params = new URLSearchParams(location.search);
  const chId = parseInt(params.get('ch') || '1');
  const ch = COURSE.chapters.find(c => c.id === chId) || COURSE.chapters[0];
  const part = COURSE.parts.find(p => p.id === ch.partId);

  const meta = (window.CHAPTER_BODIES || {})[chId];
  const sections = meta?.sections || [];
  const Body = meta?.Body || (() => <p>本章内容待补。</p>);
  const homework = meta?.homework || [];

  const [active, setActive] = useState(sections[0]?.id || 'a');

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [chId]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  const next = COURSE.chapters.find(c => c.id === chId + 1);
  const prev = COURSE.chapters.find(c => c.id === chId - 1);
  const hrefFor = (c) => c ? (c.id === 5 ? 'chapter-5.html' : `chapter.html?ch=${c.id}`) : null;

  return (
    <div>
      <Nav current="reader" />

      {/* Chapter header */}
      <div className="chapter-header" style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--ink-3)', fontSize: 13, marginBottom: 16 }}>
          <a href="index.html" style={{ color: 'inherit', textDecoration: 'none' }}>首页</a>
          <span>›</span>
          <span>{part.name} · {part.title}</span>
          <span>›</span>
          <span style={{ color: 'var(--ink)' }}>Ch {ch.num}</span>
        </div>
        <div className="eyebrow">
          Chapter {ch.num} · {ch.duration} · {'★'.repeat(ch.difficulty)}{'☆'.repeat(5 - ch.difficulty)}
          {ch.handsOn ? ' · 动手' : ' · 只听'}
        </div>
        <h1 className="serif" style={{ fontSize: 48, lineHeight: 1.15, margin: '14px 0 18px', letterSpacing: '-0.02em' }}>
          {ch.title}
          {meta?.subtitle && <><br /><span style={{ color: 'var(--amber-ink)', fontSize: 32, fontWeight: 400 }}>{meta.subtitle}</span></>}
        </h1>
        <p style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 720, lineHeight: 1.8 }}>{ch.goal}</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
          {ch.tags.map(t => <span key={t} className="tag tag-mono">{t}</span>)}
        </div>
      </div>

      {/* Main layout */}
      <div className="print-grid" style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 32px 120px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64 }}>
        <div className="no-print" style={{ position: 'sticky', top: 80, alignSelf: 'start', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
          <CTOC items={sections} active={active} onClick={scrollTo} />
        </div>

        <article className="prose print-article" style={{ maxWidth: 680 }}>
          <Body />

          {homework.length > 0 && <CHomework items={homework} />}

          {/* Chapter nav */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 60, paddingTop: 30, borderTop: '1px solid var(--line)', gap: 20 }}>
            {prev ? (
              <a href={hrefFor(prev)} style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--f-mono)', letterSpacing: 2 }}>← 上一章</div>
                <div className="serif" style={{ fontSize: 18, color: 'var(--ink)', marginTop: 4 }}>Ch {prev.num} · {prev.title}</div>
              </a>
            ) : <span />}
            {next ? (
              <a href={hrefFor(next)} style={{ textDecoration: 'none', textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--f-mono)', letterSpacing: 2 }}>下一章 →</div>
                <div className="serif" style={{ fontSize: 18, color: 'var(--ink)', marginTop: 4 }}>Ch {next.num} · {next.title}</div>
              </a>
            ) : <span />}
          </div>
        </article>
      </div>
    </div>
  );
}

window.ChapterContent = ChapterContent;
