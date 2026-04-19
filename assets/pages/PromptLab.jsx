// Prompt Lab — interactive playground for Chapter 3.
// User picks a "bad prompt" -> sees AI's (fake) bad output -> rewrites it -> sees improved output.

const { useState, useRef } = React;

const EXAMPLES = [
  {
    id: 'sleep',
    topic: '助眠 App',
    bad: '做一个助眠 App',
    badOutput: '[ 灰白背景，一个 "SleepApp" 文字 logo，三个按钮："开始"、"设置"、"关于"。整体看起来像任何一个通用 SaaS 后台 ]',
    good: '做一个深蓝色调的助眠 App 首页：中间有一只坐在雨夜窗边的卡通猫，底部中央是一个圆形播放按钮，下方有 4 个场景切换按钮（雨、森林、海、教室），整体氛围安静、偏暖蓝',
    goodOutput: '[ 深蓝夜空背景，窗框投影，卡通猫耳朵轻轻动；中央圆形玻璃质感播放按钮；底部一排 4 枚圆形场景图标；右上角有柔和月光光晕 ]',
    rubric: ['颜色（深蓝）', '主角（猫）', '场景（雨夜窗边）', '布局（中心+底部）', '氛围（安静/暖蓝）'],
  },
  {
    id: 'todo',
    topic: '待办清单',
    bad: '做个好看的 Todo',
    badOutput: '[ 白底、灰色输入框、蓝色 "Add" 按钮、下面一列 checkbox——和过去十年任何 Todo 教程一模一样 ]',
    good: '做一个纸张感的每日待办：米白色羊皮纸背景、手写字体标题「今天」、底下横线格子、左边小圆点作为 checkbox、完成后画一条手绘斜线划掉，整体像一本旧笔记本',
    goodOutput: '[ 米白羊皮纸质地 + 手写标题 + 横线格子 + 手绘划线动画。像真的在纸上写 todo ]',
    rubric: ['质感（羊皮纸）', '字体（手写）', 'checkbox（小圆点）', '完成状态（手绘斜线）', '整体隐喻（笔记本）'],
  },
];

const PATTERNS = [
  { k: '颜色',   hint: '说具体色调，别说「好看」' },
  { k: '主体',   hint: '谁是画面主角？长什么样？' },
  { k: '场景',   hint: '它在哪里？周围有什么？' },
  { k: '布局',   hint: '中心、顶部、底部分别放啥' },
  { k: '氛围',   hint: '安静 / 热闹 / 严肃 / 温暖' },
];

function Scoreboard({ prompt, rubric }) {
  const hits = rubric.filter(r => {
    const kw = r.match(/（(.+?)）/)?.[1] || r;
    return prompt.includes(kw.split('/')[0]) || prompt.includes(r.split('（')[0]);
  });
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 10 }}>检查清单 · {hits.length} / {rubric.length}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {rubric.map(r => {
          const kw = r.match(/（(.+?)）/)?.[1] || r;
          const hit = prompt.includes(kw.split('/')[0]) || prompt.includes(r.split('（')[0]);
          return (
            <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13,
              color: hit ? 'var(--ink)' : 'var(--ink-3)' }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: hit ? 'var(--moss)' : 'var(--bg-2)', color: 'white', fontSize: 10 }}>{hit ? '✓' : ''}</span>
              <span>{r}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PromptLab() {
  const [exId, setExId] = useState('sleep');
  const ex = EXAMPLES.find(e => e.id === exId);
  const [prompt, setPrompt] = useState(ex.bad);
  const [showOutput, setShowOutput] = useState('bad');

  const pick = (id) => {
    const e = EXAMPLES.find(x => x.id === id);
    setExId(id);
    setPrompt(e.bad);
    setShowOutput('bad');
  };

  const reveal = () => setPrompt(ex.good);
  const generate = () => {
    setShowOutput('gen');
  };

  const isGood = prompt.length > 50 && prompt !== ex.bad;

  return (
    <div>
      <Nav current="prompt" />
      <div className="page">
        <div className="eyebrow">配套工具 · Ch 03</div>
        <h1 className="serif" style={{ fontSize: 44, margin: '8px 0 10px', letterSpacing: '-0.02em' }}>Prompt 练习台</h1>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: 680, lineHeight: 1.75 }}>
          把「坏 prompt」改成「好 prompt」，实时看 AI 会如何理解你的话。练习 5 个维度：颜色、主体、场景、布局、氛围。
        </p>

        {/* topic picker */}
        <div style={{ display: 'flex', gap: 8, margin: '24px 0 32px' }}>
          {EXAMPLES.map(e => (
            <button key={e.id} className="btn" onClick={() => pick(e.id)}
              style={{
                background: e.id === exId ? 'var(--ink)' : 'var(--bg)',
                color: e.id === exId ? 'var(--bg)' : 'var(--ink)',
                borderColor: e.id === exId ? 'var(--ink)' : 'var(--line)',
              }}>{e.topic}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28 }}>
          {/* Left: editor */}
          <div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: 'var(--bg-2)', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink-3)' }}>你的 prompt</span>
                <span className="tag tag-mono" style={{ background: isGood ? 'var(--moss-soft)' : 'var(--amber-soft)', color: isGood ? 'var(--ink)' : 'var(--amber-ink)' }}>
                  {isGood ? '看起来不错' : '太模糊了'}
                </span>
              </div>
              <textarea value={prompt} onChange={e => { setPrompt(e.target.value); setShowOutput('bad'); }}
                placeholder="用一句话描述你想要的界面…"
                style={{ width: '100%', minHeight: 180, padding: 20, border: 0, fontSize: 15, lineHeight: 1.8,
                  fontFamily: 'inherit', resize: 'vertical', outline: 'none', background: 'var(--bg)', color: 'var(--ink)' }} />
              <div style={{ padding: 14, display: 'flex', gap: 8, background: 'var(--bg-2)', borderTop: '1px solid var(--line)' }}>
                <button className="btn btn-amber" onClick={generate}>▶ 让 AI 生成</button>
                <button className="btn" onClick={reveal}>看 Holland 写的版本 ◇</button>
                <button className="btn" onClick={() => setPrompt(ex.bad)} style={{ marginLeft: 'auto' }}>还原初始</button>
              </div>
            </div>

            {/* 5 patterns */}
            <div style={{ marginTop: 24 }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>5 个要覆盖的维度</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {PATTERNS.map(p => (
                  <div key={p.k} style={{ padding: 12, border: '1px solid var(--line)', borderRadius: 10, background: 'var(--bg)' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{p.k}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4, lineHeight: 1.5 }}>{p.hint}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: preview */}
          <div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: 'var(--bg-2)', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--ink-3)' }}>AI 会吐出什么</span>
              </div>
              <div style={{ padding: 24, minHeight: 280, background: 'var(--bg)' }}>
                {showOutput === 'gen' ? (
                  <div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                      <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)' }}></span>
                      <span style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--f-mono)' }}>生成中…</span>
                    </div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 13, lineHeight: 1.85, color: 'var(--ink-2)' }}>
                      {isGood ? ex.goodOutput : ex.badOutput}
                    </div>
                    <div style={{ marginTop: 20, padding: 14, background: isGood ? 'var(--moss-soft)' : 'var(--amber-soft)', borderRadius: 10, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7 }}>
                      {isGood ? '✓ 很具体。AI 做出来的和你想的大概率 80% 像。' : '⚠️ 太笼统。AI 会挑一个最常见的模板糊你脸上。'}
                    </div>
                  </div>
                ) : (
                  <div style={{ color: 'var(--ink-3)', fontSize: 14, lineHeight: 1.8 }}>
                    点击左边的 <strong>▶ 让 AI 生成</strong>，看结果。<br /><br />
                    <span style={{ fontSize: 13 }}>技巧：先在 prompt 里加上<strong>颜色 / 主体 / 场景 / 布局 / 氛围</strong>这 5 个维度里的 3 个以上，再生成。</span>
                  </div>
                )}
              </div>
            </div>

            <div className="card" style={{ marginTop: 18 }}>
              <Scoreboard prompt={prompt} rubric={ex.rubric} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PromptLab = PromptLab;
