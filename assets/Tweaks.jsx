// Tweaks panel — wired to the parent editor via postMessage protocol.
const { useState, useEffect } = React;

function TweaksPanel() {
  const [active, setActive] = useState(false);
  const [tweaks, setTweaks] = useState(window.__TWEAKS__ || {});

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setActive(true);
      if (e.data?.type === '__deactivate_edit_mode') setActive(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const update = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.__TWEAKS__ = next;
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
    window.dispatchEvent(new CustomEvent('tweaks-updated'));
  };

  if (!active) return null;

  const Field = ({ label, children }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--f-mono)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );

  const Pills = ({ value, options, onChange }) => (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {options.map(o => (
        <button key={o.v} onClick={() => onChange(o.v)} className="btn" style={{ padding: '6px 12px', fontSize: 12,
          background: value === o.v ? 'var(--ink)' : 'var(--bg-2)',
          color: value === o.v ? 'var(--bg)' : 'var(--ink-2)',
          borderColor: value === o.v ? 'var(--ink)' : 'var(--line)'
        }}>{o.l}</button>
      ))}
    </div>
  );

  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, width: 320, zIndex: 100,
      background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 18,
      padding: 20, boxShadow: '0 20px 50px -20px rgba(43,36,30,0.25)',
      fontFamily: 'var(--f-sans)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div className="serif" style={{ fontSize: 17 }}>Tweaks</div>
        <span className="tag tag-mono">实时</span>
      </div>

      <Field label="课程标题">
        <input value={tweaks.courseTitle || ''} onChange={e => update('courseTitle', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', background: 'var(--bg-2)', color: 'var(--ink)' }} />
      </Field>
      <Field label="Slogan">
        <textarea value={tweaks.slogan || ''} onChange={e => update('slogan', e.target.value)} rows={2}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', background: 'var(--bg-2)', color: 'var(--ink)', resize: 'vertical' }} />
      </Field>
      <Field label="信息密度">
        <Pills value={tweaks.density || 'normal'} options={[
          { v: 'compact', l: '紧凑' }, { v: 'normal', l: '常规' }, { v: 'spacious', l: '宽松' }
        ]} onChange={v => update('density', v)} />
      </Field>
      <Field label="插图风格">
        <Pills value={tweaks.illustration || 'character'} options={[
          { v: 'character', l: '小动物' }, { v: 'geo', l: '几何暖色' }, { v: 'minimal', l: '极简线描' }
        ]} onChange={v => update('illustration', v)} />
      </Field>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
