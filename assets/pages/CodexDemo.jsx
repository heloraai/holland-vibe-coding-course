// Codex Demo — fake terminal replay showing a real back-and-forth between user and Codex.

const { useState, useEffect, useRef } = React;

const SCRIPT = [
  { kind: 'codex-welcome', text: '~/projects/sleepforest · codex v0.14.0' },
  { kind: 'user', text: '读一下这个项目，告诉我里面都有什么' },
  { kind: 'codex-think', text: '扫描 12 个文件…' },
  { kind: 'codex', text: '这是一个用 React + TypeScript 写的助眠小应用（SleepForest）。\n\n主要结构：\n · App.tsx — 主逻辑，管状态、播放、呼吸节奏、场景切换\n · components/ — Character、BreathingGuide、SceneSelector 等 5 个组件\n · services/geminiService.ts — 调用 Google Gemini 生成角色独白\n · public/sounds/ — 雨声、呼吸声、讲故事音频\n\n启动方式：npm install → npm run dev。是否要我跑起来？' },
  { kind: 'user', text: '先别跑。把默认时长从 30 分钟改成 15 分钟' },
  { kind: 'codex-think', text: '定位到 App.tsx:29' },
  { kind: 'codex-diff', file: 'App.tsx', minus: 'const [sessionDuration, setSessionDuration] = useState(30);', plus: 'const [sessionDuration, setSessionDuration] = useState(15);' },
  { kind: 'codex', text: '已把默认时长改成 15 分钟。同时注意到 toggleDuration 函数里的轮播顺序是 [15, 30, 45, 60]，现在打开应用第一次看到的就是 15。需要我也把最长时长从 60 改掉吗？' },
  { kind: 'approve' },
  { kind: 'user', text: '不用，保留选项就行。接下来把 intro 文案改成「今晚辛苦了，我陪你慢慢睡」' },
  { kind: 'codex-think', text: '搜索 intro text 位置…' },
  { kind: 'codex-diff', file: 'App.tsx', minus: 'const text = "夜深了，我的朋友们都睡着了... 现在是时候脱去一身的疲惫跟我睡觉了";', plus: 'const text = "今晚辛苦了，我陪你慢慢睡";' },
  { kind: 'approve' },
];

function CodexDemo() {
  const [shown, setShown] = useState(1);
  const [approved, setApproved] = useState({});
  const endRef = useRef();

  const next = () => setShown(s => Math.min(s + 1, SCRIPT.length));
  const reset = () => { setShown(1); setApproved({}); };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [shown]);

  return (
    <div>
      <Nav current="codex" />
      <div className="page">
        <div className="eyebrow">配套工具 · Ch 04</div>
        <h1 className="serif" style={{ fontSize: 44, margin: '8px 0 10px', letterSpacing: '-0.02em' }}>Codex 对话演示</h1>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: 680, lineHeight: 1.75 }}>
          这是把"让 Codex 改 SleepForest 项目"的过程回放了一遍。按 <strong>下一步</strong> 逐条推进，感受"描述任务、不写代码"是什么体验。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginTop: 28 }}>
          {/* Terminal */}
          <div style={{
            background: '#1B1611', color: '#E8DFCF', borderRadius: 14, overflow: 'hidden',
            fontFamily: 'var(--f-mono)', fontSize: 13, lineHeight: 1.75,
            boxShadow: '0 30px 60px -30px rgba(0,0,0,0.35)',
          }}>
            <div style={{ padding: '10px 14px', background: '#2A221B', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F56' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27C93F' }} />
              <span style={{ marginLeft: 12, opacity: 0.5 }}>zsh — codex</span>
            </div>
            <div style={{ padding: 20, minHeight: 460, maxHeight: 520, overflowY: 'auto' }}>
              {SCRIPT.slice(0, shown).map((line, i) => {
                if (line.kind === 'codex-welcome') {
                  return <div key={i} style={{ color: '#9BA89A', marginBottom: 10 }}>$ cd sleepforest && codex<br /><span style={{ color: '#FFCF8B' }}>◇</span> {line.text}</div>;
                }
                if (line.kind === 'user') {
                  return (
                    <div key={i} style={{ margin: '14px 0', color: '#EAE4D7' }}>
                      <span style={{ color: '#7FB88C' }}>you › </span>{line.text}
                    </div>
                  );
                }
                if (line.kind === 'codex-think') {
                  return <div key={i} style={{ color: '#827768', fontSize: 12, fontStyle: 'italic', margin: '6px 0' }}>… {line.text}</div>;
                }
                if (line.kind === 'codex') {
                  return (
                    <div key={i} style={{ margin: '10px 0 14px', color: '#E8DFCF', whiteSpace: 'pre-wrap' }}>
                      <span style={{ color: '#FFCF8B' }}>codex › </span>{line.text}
                    </div>
                  );
                }
                if (line.kind === 'codex-diff') {
                  return (
                    <div key={i} style={{ margin: '10px 0', background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid #FFCF8B', padding: '8px 14px', borderRadius: 4 }}>
                      <div style={{ color: '#827768', fontSize: 11, marginBottom: 6 }}>diff · {line.file}</div>
                      <div style={{ color: '#FF8A80' }}>- {line.minus}</div>
                      <div style={{ color: '#A8D5A0' }}>+ {line.plus}</div>
                    </div>
                  );
                }
                if (line.kind === 'approve') {
                  const done = approved[i];
                  return (
                    <div key={i} style={{ margin: '10px 0 14px', display: 'flex', gap: 8 }}>
                      {done ? (
                        <span style={{ color: '#A8D5A0' }}>✓ approved — 文件已写入</span>
                      ) : (
                        <>
                          <button onClick={() => setApproved({ ...approved, [i]: 'y' })} style={{ background: '#3A5240', color: 'white', border: 0, padding: '4px 12px', borderRadius: 4, fontFamily: 'inherit', fontSize: 12, cursor: 'pointer' }}>[y] approve</button>
                          <button onClick={() => setApproved({ ...approved, [i]: 'n' })} style={{ background: 'transparent', color: '#827768', border: '1px solid #3A3028', padding: '4px 12px', borderRadius: 4, fontFamily: 'inherit', fontSize: 12, cursor: 'pointer' }}>[n] reject</button>
                        </>
                      )}
                    </div>
                  );
                }
              })}
              <div ref={endRef} />
              {shown < SCRIPT.length && (
                <div style={{ marginTop: 14 }}>
                  <button onClick={next} className="btn btn-amber" style={{ fontSize: 12 }}>下一步 ↓</button>
                </div>
              )}
              {shown >= SCRIPT.length && (
                <div style={{ marginTop: 14 }}>
                  <button onClick={reset} className="btn" style={{ fontSize: 12, background: 'rgba(255,255,255,0.08)', color: '#E8DFCF', borderColor: 'rgba(255,255,255,0.12)' }}>↺ 重播</button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar lessons */}
          <div>
            <div className="card">
              <div className="eyebrow">从这段对话你学到的</div>
              <ul style={{ padding: 0, margin: '12px 0 0', listStyle: 'none', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.75 }}>
                <li style={{ marginBottom: 10, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--amber)' }}>›</span>
                  <strong>描述任务，不写代码。</strong>"把 30 改成 15"不是技术语言，是需求语言。
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--amber)' }}>›</span>
                  <strong>Codex 会<em>反问</em>。</strong>不确定的事它会问你，这是好的信号。
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--amber)' }}>›</span>
                  <strong>diff 是你的朋友。</strong>每次改动都能看到"哪里变了"，一眼判断要不要放过。
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--amber)' }}>›</span>
                  <strong>approve / reject 是你的方向盘。</strong>Codex 会写、你定要不要留。
                </li>
              </ul>
            </div>

            <div className="card" style={{ marginTop: 16, background: 'var(--amber-soft)', borderColor: 'var(--amber)' }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--amber-ink)', marginBottom: 8 }}>何时必须逐字看 diff</div>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', fontSize: 13, color: 'var(--ink-2)' }}>
                <li>· 涉及<strong>删除</strong>文件或大段代码</li>
                <li>· 涉及<strong>重构</strong>（一次改很多个文件）</li>
                <li>· 涉及接入<strong>外部服务</strong>（API Key、付费）</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.CodexDemo = CodexDemo;
