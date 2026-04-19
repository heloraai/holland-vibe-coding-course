// Chapter 5 — the full-dive reader. SleepForest is torn apart here.
// Two-column layout: sticky TOC + prose. Embedded SleepForest demo.
// This chapter is THE core of the course: 从原型到上线的整条链路。

const { useState, useEffect, useRef } = React;

function TOC({ items, active, onClick }) {
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

function Callout({ kind = 'tip', title, children }) {
  const styles = {
    tip:   { bg: 'var(--amber-soft)', bar: 'var(--amber)',  label: '💡 心法' },
    warn:  { bg: 'var(--mist-soft)',  bar: 'var(--mist)',   label: '⚠ 注意'  },
    stuck: { bg: 'var(--moss-soft)',  bar: 'var(--moss)',   label: '🪤 卡住了怎么办' },
    note:  { bg: 'var(--bg-2)',       bar: 'var(--ink-3)',  label: '📎 备注' },
  };
  const s = styles[kind];
  return (
    <div style={{
      background: s.bg, borderLeft: `3px solid ${s.bar}`,
      padding: '16px 20px', borderRadius: '0 12px 12px 0', margin: '20px 0',
    }}>
      <div style={{ fontSize: 11, letterSpacing: 2, fontFamily: 'var(--f-mono)', color: 'var(--ink-2)', marginBottom: 6 }}>
        {s.label} {title && `· ${title}`}
      </div>
      <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function Code({ children }) {
  return (
    <pre style={{
      background: 'var(--ink)', color: '#F4F1EA', borderRadius: 12, padding: 20,
      fontFamily: 'var(--f-mono)', fontSize: 13, lineHeight: 1.75, overflowX: 'auto',
      margin: '20px 0', whiteSpace: 'pre-wrap',
    }}>{children}</pre>
  );
}

// Milestone / step in the 4-stage product-building journey
function Stage({ num, title, sub, goal, children }) {
  return (
    <div style={{
      border: '1px solid var(--line)', borderRadius: 16, background: 'var(--bg)',
      padding: 24, margin: '24px 0',
    }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 12 }}>
        <div style={{
          fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 600,
          color: 'var(--amber-ink)', background: 'var(--amber-soft)',
          padding: '4px 10px', borderRadius: 6, flexShrink: 0,
        }}>STAGE {num}</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)' }}>{title}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>{sub}</div>
        </div>
      </div>
      <div style={{
        padding: '10px 14px', background: 'var(--moss-soft)', borderRadius: 8,
        fontSize: 13, color: 'var(--ink-2)', marginBottom: 16,
      }}>
        <span className="eyebrow" style={{ color: 'var(--moss-ink, var(--ink-3))', marginRight: 8 }}>验收</span>
        {goal}
      </div>
      {children}
    </div>
  );
}

// Before/After polish card
function PolishDetail({ before, after, note }) {
  return (
    <div style={{ background: 'var(--bg-2)', borderRadius: 14, padding: 20, border: '1px solid var(--line)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 14, alignItems: 'center' }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--ink-3)' }}>改之前</div>
          <div style={{ fontSize: 14, marginTop: 6, color: 'var(--ink-2)' }}>{before}</div>
        </div>
        <div style={{ color: 'var(--amber)', fontSize: 20 }}>→</div>
        <div>
          <div className="eyebrow" style={{ color: 'var(--amber-ink)' }}>改之后</div>
          <div style={{ fontSize: 14, marginTop: 6, color: 'var(--ink)', fontWeight: 500 }}>{after}</div>
        </div>
      </div>
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--line)', fontSize: 13, color: 'var(--ink-2)', fontStyle: 'italic' }}>
        {note}
      </div>
    </div>
  );
}

// A row of 4 milestones showing the full journey
function JourneyBar() {
  const stages = [
    { n: '0', t: '原型', d: 'Ch 3 做完', color: 'var(--ink-3)' },
    { n: '1', t: '跑起来', d: '本地能开能看', color: 'var(--mist)' },
    { n: '2', t: '数据活起来', d: '真能存、真能读', color: 'var(--moss)' },
    { n: '3', t: '接入 AI', d: '真调 API 出内容', color: 'var(--amber)' },
    { n: '4', t: '打磨', d: '边缘状态 + 审美', color: 'var(--amber-ink)' },
    { n: '5', t: '上线（Ch 6）', d: '变成公网链接', color: 'var(--ink)' },
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, margin: '18px 0 28px',
    }}>
      {stages.map((s, i) => (
        <div key={i} style={{
          padding: '12px 8px', textAlign: 'center',
          background: i === 0 || i === 5 ? 'var(--bg-2)' : 'var(--bg)',
          border: '1px solid var(--line)', borderRadius: 10,
          opacity: i === 0 || i === 5 ? 0.6 : 1,
        }}>
          <div style={{
            fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: 2,
            color: s.color, marginBottom: 4,
          }}>S{s.n}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{s.t}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{s.d}</div>
        </div>
      ))}
    </div>
  );
}

// A cost/usage breakdown row
function CostRow({ label, value, note }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr auto 1.2fr', gap: 16,
      padding: '10px 0', borderBottom: '1px dashed var(--line)',
      alignItems: 'baseline',
    }}>
      <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 15, fontWeight: 600, color: 'var(--amber-ink)' }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{note}</div>
    </div>
  );
}

function ChapterReader() {
  const sections = [
    { id: 'a', label: '这一章要跨的那道关' },
    { id: 'b', label: 'Stage 1 · 先让原型在本地跑起来' },
    { id: 'c', label: 'Stage 2 · 让数据活起来' },
    { id: 'd', label: 'Stage 3 · 接入第一个 AI 能力' },
    { id: 'e', label: 'Stage 4 · 打磨到不 low' },
    { id: 'f', label: '调试心法 · 怎么跟报错相处' },
    { id: 'g', label: '上线前的 10 条自检清单' },
  ];
  const [active, setActive] = useState('a');
  const obsRef = useRef();

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    obsRef.current = io;
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <div>
      <Nav current="reader" />

      {/* Chapter header */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--ink-3)', fontSize: 13, marginBottom: 16 }}>
          <a href="index.html" style={{ color: 'inherit', textDecoration: 'none' }}>首页</a>
          <span>›</span>
          <span>Part 2 · 跟着 SleepForest 走一遍</span>
          <span>›</span>
          <span style={{ color: 'var(--ink)' }}>Ch 05</span>
        </div>
        <div className="eyebrow">Chapter 05 · 约 3 小时 · ★★★☆☆ · 全课最重的一章</div>
        <h1 className="serif" style={{ fontSize: 52, lineHeight: 1.15, margin: '14px 0 18px', letterSpacing: '-0.02em' }}>
          从原型到完整产品<br />
          <span style={{ color: 'var(--amber-ink)', fontSize: 36, fontWeight: 400 }}>数据 · AI · 打磨</span>
        </h1>
        <p style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 720, lineHeight: 1.8 }}>
          Ch 3 里你做出了一个<strong>能点的壳</strong>。Ch 4 里你学会了<strong>让 Agent 进到你的项目里改代码</strong>。
          但那离一个<strong>真能用</strong>的产品还差三步：数据活起来、接入 AI、打磨到不 low。
          这一章把 <span className="term">SleepForest</span> 拆到底，带你走完这三步——学完你会真的知道：
          "哦，原来一个 AI 产品就是这么做出来的。"
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <span className="tag tag-mono">数据</span>
          <span className="tag tag-mono">API</span>
          <span className="tag tag-mono">调试</span>
          <span className="tag tag-mono">打磨</span>
          <span className="tag tag-mono">审美</span>
        </div>
      </div>

      {/* Main layout */}
      <div className="print-grid" style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 32px 120px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64 }}>
        <div className="no-print" style={{ position: 'sticky', top: 80, alignSelf: 'start', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
          <TOC items={sections} active={active} onClick={scrollTo} />
          <div style={{ marginTop: 32, padding: 16, background: 'var(--bg-2)', borderRadius: 12, fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.7 }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: 2, marginBottom: 8, color: 'var(--amber-ink)' }}>章末交付物</div>
            1. 原型能在本地跑<br />
            2. 数据能存能读<br />
            3. 接入至少 1 个 AI 能力<br />
            4. 打磨了至少 5 个细节<br />
            5. 过了 10 条自检清单
          </div>
        </div>

        <article className="prose" style={{ maxWidth: 680 }}>

          {/* ─── A · Framing ─── */}
          <section id="a">
            <h2>A · 这一章要跨的那道关</h2>
            <p>前两章你做出来的东西，讲难听一点，是<strong>一张会动的图</strong>——看着像个 App，但里面啥都是死的。</p>
            <p>这一章我们要让它变<strong>活</strong>。一个"活的产品" = 原型 + 三件事：</p>
            <ul>
              <li>用户输入的东西，<strong>能存下来</strong>（刷新不丢、下次打开还在）</li>
              <li>里面的内容，<strong>不是写死的</strong>（AI 动态生成 / 从真实数据来）</li>
              <li>所有边缘状态（空、加载、报错）都<strong>有交代</strong>，不是一片空白</li>
            </ul>
            <p>把这三件事做对，你就从"做 demo"毕业，进入了<strong>"做产品"</strong>。</p>
            <h3>全程路线图</h3>
            <p>这一章走 4 个 Stage，每个 Stage 都带明确的验收标准：</p>
            <JourneyBar />
            <Callout kind="tip" title="读这章的方式">
              <strong>别跳读。</strong>四个 Stage 是环环相扣的——Stage 2 的数据要存在 Stage 1 的壳里，Stage 3 的 AI 要写回 Stage 2 的数据，Stage 4 的打磨围绕 Stage 3 的结果。按顺序走，每一步都<strong>亲手在 SleepForest 或你自己的项目里做一遍</strong>，做完了再往下。
            </Callout>
          </section>

          {/* ─── B · Stage 1 ─── */}
          <section id="b">
            <h2>B · Stage 1 · 先让原型在本地跑起来</h2>
            <p>Ch 3 下载下来的那个文件夹，在你电脑上现在还是一堆冷冰冰的文件。这一步的目标很简单——<strong>让它在浏览器里动起来。</strong></p>
            <Stage num="1" title="项目启动三件套" sub="Ch 3 的原型 → 能在浏览器打开"
              goal="在浏览器地址栏里能打开 http://localhost:3000，看到你 Ch 3 的界面，不报错">
              <p><strong>三步：</strong></p>
              <Code>{`# 1. 进项目目录
cd sleepforest

# 2. 装依赖（第一次才要，之后不用）
npm install

# 3. 启动本地开发服务器
npm run dev
# → 看到 "Local: http://localhost:3000" 就成了`}</Code>
              <p><code>npm install</code> 在干啥：看 <code>package.json</code> 这份"采购清单"，把里面列出来的所有开源库下载到 <code>node_modules/</code>。第一次会有点慢（几百 M），之后都是秒级。</p>
              <p><code>npm run dev</code> 在干啥：在你电脑本地<strong>开了一个 8 秒启动的迷你网站</strong>。它会盯着你的代码文件，一改动自动刷新浏览器。这就是所谓的"开发服务器"。</p>
              <Callout kind="stuck" title="装依赖卡住 / 报红">
                八成是 Node.js 版本不对。确认你装的是 <strong>Node 22 LTS</strong>（Ch 4 装的那版）。还不行就<strong>把整个报错丢给你的 Agent</strong>，一句话："我在 npm install，报了这个错，怎么办？"
              </Callout>
            </Stage>
          </section>

          {/* ─── C · Stage 2: data ─── */}
          <section id="c">
            <h2>C · Stage 2 · 让数据活起来</h2>
            <p>现在打开你的 Ch 3 原型，做一件事：<strong>随便输点内容，然后刷新页面。</strong></p>
            <p>输的内容没了，对吧？——这就是"死的 demo"和"活的产品"的第一道分界线。</p>
            <p>SleepForest 里典型的例子：用户选择的睡眠偏好（音量、呼吸节奏、喜欢哪个小动物）——如果每次打开都重置，用户第二天就不会用了。</p>

            <Stage num="2" title="从写死 → 会记住" sub="让用户输入的东西能存下来、能读回来"
              goal="输入 → 刷新页面 → 内容还在；关浏览器再开 → 还在">
              <p><strong>要"存东西"的三个去处</strong>（从简单到复杂）：</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10, margin: '14px 0' }}>
                {[
                  { n: '①', t: 'localStorage', d: '浏览器自带的小仓库。5MB 上限。只能存在当前用户的浏览器里。最适合：用户偏好、草稿、最近用过的东西。SleepForest 存用户选的角色就用它。' },
                  { n: '②', t: 'URL 参数 / 路由', d: '把状态写进网址里，比如 /read?story=5。好处：链接能分享、刷新不丢、回退能用。最适合：当前页面 / 选中项 / 筛选条件。' },
                  { n: '③', t: '真数据库（Supabase / Firebase）', d: '数据存在云上，多设备同步、多用户能看到彼此。最适合：用户账号、评论、内容社区。这块 Ch 8 再深入。' },
                ].map((x, i) => (
                  <div key={i} className="card" style={{ padding: 14, display: 'flex', gap: 14 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: 'var(--amber-soft)', color: 'var(--amber-ink)',
                      fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 600,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>{x.n}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{x.t}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 4, lineHeight: 1.7 }}>{x.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Callout kind="tip" title="Stage 2 的正确做法：用 localStorage 起步">
                你的第一个项目，<strong>80% 的需求</strong>用 localStorage 就够了。别一上来就 Supabase——多学一套概念、多 debug 一套网络问题。等你真遇到"要多人共享数据"再上云。
              </Callout>

              <h3>SleepForest 的真实例子</h3>
              <p>SleepForest 需要记住三件事：用户上次选的<strong>角色</strong>、<strong>音量</strong>、<strong>偏好的呼吸节奏</strong>。这些全进 localStorage：</p>
              <Code>{`// 存：用户选完角色，立刻写进去
localStorage.setItem('sf:character', 'fox');
localStorage.setItem('sf:volume', '0.6');

// 读：App 启动时，把存的偏好读回来
const savedChar = localStorage.getItem('sf:character') || 'fox';
const savedVol  = parseFloat(localStorage.getItem('sf:volume') || '0.5');`}</Code>
              <p>就这 4 行。整个 "记住用户偏好"的产品力 = <strong>4 行代码</strong>。</p>

              <h3>怎么让 Agent 帮你做这件事</h3>
              <p>在 Codex IDE 里，一句话：</p>
              <Code>{`> 用 localStorage 把用户选择的角色和音量存下来，
  下次打开时自动恢复。key 用 sf:character、sf:volume。
  验收标准：我选了狐狸、音量调到 60%，
  刷新页面后还是狐狸 + 60%。`}</Code>
              <p>注意这句 prompt 的三个精髓：<strong>说清楚要什么</strong>（存+读）、<strong>给命名约定</strong>（key 怎么起）、<strong>带验收标准</strong>（我怎么知道你做对了）。这就是 Ch 3 H 节"每条都有验收标准"的具体落地。</p>
            </Stage>
          </section>

          {/* ─── D · Stage 3: AI ─── */}
          <section id="d">
            <h2>D · Stage 3 · 接入第一个 AI 能力</h2>
            <p>这是全章最魔法的一步。也是最多人卡住的一步——因为几乎所有网上教程都只讲<strong>代码怎么写</strong>，不讲<strong>前后那些你会踩坑的事</strong>。我们把它拆成 5 个小步一个个来。</p>

            <Stage num="3" title="从写死文案 → 真调 AI 出内容"
              sub="用户每次操作，文案都由 LLM 动态生成"
              goal="切换到「雨夜 · 猫」场景 → 猫说的话每次都不一样；切到「森林 · 狐」→ 又是不同的风格">

              <h3>① API Key 从哪来 · 要花多少钱</h3>
              <p>调用 AI = 向 OpenAI / Anthropic / Google 这样的公司<strong>租用算力</strong>。每调一次花一点钱。你要先拿到他们给你的<strong>身份牌（API Key）</strong>。</p>
              <p>三个主流选择：</p>
              <div style={{ background: 'var(--bg-2)', borderRadius: 12, padding: 18, margin: '12px 0', fontSize: 14 }}>
                <CostRow label="Google Gemini" value="$0 起步" note="免费额度每天几百次，够你整个开发阶段用" />
                <CostRow label="OpenAI GPT-4o-mini" value="≈ $0.15 / 百万 token" note="便宜又聪明，按量付费需绑信用卡" />
                <CostRow label="Anthropic Claude Haiku" value="≈ $0.25 / 百万 token" note="中文细腻，适合写文案类场景" />
              </div>
              <p><strong>什么是 token？</strong>英文 1 个词 ≈ 1.3 tokens，中文 1 个字 ≈ 1.5 tokens。SleepForest 每次让 AI 讲一段 100 字的睡前独白——<strong>一次 ≈ 0.0001 美元，一个用户一晚上 20 次 ≈ 0.002 美元，1000 个用户一个月 ≈ 60 美元。</strong>开发阶段你自己玩一周，不会超过 1 美元。</p>
              <Callout kind="tip" title="本课推荐：起步用 Google Gemini">
                免费额度大方，不用绑卡，注册 5 分钟拿到 key。去 <code>aistudio.google.com/app/apikey</code> 点 "Create API Key"。粘贴下来，下一步会用到。
              </Callout>

              <h3>② API Key 放哪儿 · 绝不能直接写进代码</h3>
              <p>拿到 key 以后，<strong>千万不要</strong>写进组件代码里。API key 就像你家门钥匙——进了 Git 就等于<strong>复制了一把挂在公网上</strong>。三天内就会有人用你的 key 烧光你的额度（这不是段子，真实发生过）。</p>
              <p>正确做法：放到项目根目录的 <code>.env.local</code> 文件里（这个文件已经在 <code>.gitignore</code> 里，不会被提交）：</p>
              <Code>{`# .env.local（和 package.json 同一目录）
GEMINI_API_KEY=AIzaSy...你的 key...`}</Code>
              <p>这个叫<strong>环境变量</strong>。Ch 6 会展开讲"环境变量到底是什么、没它会有啥危害"——现在你先照做即可。</p>

              <h3>③ 和 AI 说话 · 三段式结构</h3>
              <p>所有 AI 调用本质都是"发一段话，收一段话"。但发的那段话不是随便写的，是三段式的：</p>
              <Code>{`// SleepForest 里调 Gemini 生成猫咪独白，真实代码：
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getSleepyLine(character, scene) {
  // ① System：定义"它是谁"
  const systemInstruction = \`You are a gentle, sleepy \${character} spirit
    in a \${scene} setting. Speak in soft, short Chinese sentences.
    Never exceed 40 characters. Use a whispering tone.\`;

  // ② User：告诉它"这一次要它干啥"
  const prompt = \`Say one comforting line to help the user drift to sleep.
    Don't use exclamation marks.\`;

  // ③ 参数：控制它的风格
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction,
    generationConfig: {
      temperature: 0.9,   // 0=呆板 1=发散；睡前故事要"每次不一样"，所以拉高
      maxOutputTokens: 60,// 最多 60 token，硬约束不让它啰嗦
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}`}</Code>

              <p><strong>三个参数，你要理解：</strong></p>
              <ul>
                <li><strong>systemInstruction</strong>：告诉它"你扮演谁"。就像导演给演员的角色设定。写得越具体，产出越稳。</li>
                <li><strong>temperature（0–1）</strong>：创造力旋钮。<code>0.2</code> 适合"提取信息"类任务（要稳）；<code>0.9</code> 适合"生成创作"类（要惊喜）。</li>
                <li><strong>maxOutputTokens</strong>：硬约束长度。AI 天然啰嗦，必须卡死上限。</li>
              </ul>

              <h3>④ 错误处理 · 最容易被忽略的 20%</h3>
              <p>新手教程都只讲"调成功怎么办"。但真实产品里，<strong>每 100 次调用，大概会挂 2–3 次</strong>：网络抖一下、key 过期、API 限流、内容被安全策略拦了……如果你不处理，用户就看到一个白屏。</p>
              <Code>{`async function getSleepyLineSafe(character, scene) {
  try {
    return await getSleepyLine(character, scene);
  } catch (err) {
    console.error('AI 调用失败：', err);
    // 准备好 5 句兜底文案，随机挑一句
    const fallbacks = [
      '放轻松，我陪着你。',
      '慢慢地，把今天放下来。',
      '呼吸。再呼吸。你在这里就好。',
      '月亮已经亮了，你可以合上眼了。',
      '轻轻地，什么都不用做。',
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}`}</Code>
              <p>这就是"做 demo"和"做产品"的分水岭——<strong>你是不是为它挂掉的那 2% 准备好了兜底？</strong></p>

              <h3>⑤ 加载状态 · 让用户知道它在思考</h3>
              <p>调 AI 不是瞬时的，通常要 1–3 秒。这期间你必须告诉用户"我在干活"：</p>
              <Code>{`const [loading, setLoading] = useState(false);
const [line, setLine] = useState('');

async function refreshLine() {
  setLoading(true);                 // ← 开始转圈
  const result = await getSleepyLineSafe(char, scene);
  setLine(result);
  setLoading(false);                // ← 结束转圈
}

// 界面上
{loading ? <BreathingDots /> : <p>{line}</p>}`}</Code>
              <p>SleepForest 里的 <code>&lt;BreathingDots /&gt;</code> 是三个缓慢呼吸的点——和产品风格一致，让等待本身也是体验的一部分。<strong>不要用默认的 spinner</strong>，那是最廉价的"我不在乎"。</p>

              <Callout kind="warn" title="Stage 3 完整的验收标准">
                ① 切换场景 → 文案变化 ② 同一个场景连点 3 次 → 三次文案都不同 ③ 断网一下 → 看到兜底文案而不是白屏 ④ 点的瞬间有加载动画 ⑤ 你的 API key 在 <code>.env.local</code> 里、不在代码里。<strong>五条全过才算 Stage 3 完成。</strong>
              </Callout>
            </Stage>
          </section>

          {/* ─── E · Stage 4: polish ─── */}
          <section id="e">
            <h2>E · Stage 4 · 打磨到不 low</h2>
            <p>做到这里你有了一个"能跑、能存、能调 AI"的产品。<strong>它还是 low 的。</strong>——因为所有边缘状态都没处理，所有细节都是默认值。</p>
            <p>打磨分两类：</p>

            <Stage num="4a" title="边缘状态的 5 连击" sub="空 / 加载 / 错 / 慢 / 回退"
              goal="每一个用户会遇到的场景，都有对应的界面表达">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
                {[
                  { n: '空', t: '空状态 (Empty state)', d: '第一次打开、数据还没有的时候，显示什么？SleepForest 里就是"欢迎回家，选个场景开始？"配一张小插画。不要留白屏。' },
                  { n: '载', t: '加载中 (Loading)', d: '不要用默认 spinner。用符合产品调性的：SleepForest 用呼吸的三个点，Arc 用脉动的光点。加载本身也是品牌。' },
                  { n: '错', t: '错误 (Error)', d: '兜底文案要人话、不要技术报错。❌ "Error: fetch failed (net::ERR_CONNECTION)" → ✓ "网络好像不太通，深呼吸，我们等一下再试？"' },
                  { n: '慢', t: '慢反馈 (Slow)', d: '2 秒以上没响应，要给个"还在想呢..."的提示。一直转圈 = 崩了的感觉。' },
                  { n: '回', t: '回退 (Fallback)', d: 'AI 挂了用兜底文案、数据没加载用本地缓存、动画不支持用静态图。每个"主路径"都要有一条"Plan B"。' },
                ].map((x, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: '1px dashed var(--line)' }}>
                    <div style={{
                      width: 40, textAlign: 'center', fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 600,
                      color: 'var(--amber-ink)', flexShrink: 0, paddingTop: 4,
                    }}>{x.n}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{x.t}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 3, lineHeight: 1.7 }}>{x.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Stage>

            <Stage num="4b" title="审美细节的 3 个真实例子" sub="SleepForest 里我改了什么"
              goal="你能说出「哪里不对」，才真的会做产品">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '6px 0 10px' }}>
                <PolishDetail
                  before="呼吸动画是线性的（匀速放大缩小）"
                  after="改成缓动（慢开始、慢结束）"
                  note="改之后立刻舒服了。人呼吸本来就不是匀速的——线性的动画会让你下意识紧张。一行 CSS 的区别：linear → ease-in-out。"
                />
                <PolishDetail
                  before="切场景时，背景音乐会「断」一下"
                  after="切场景时做了 300ms 的音量淡入淡出"
                  note="只有这种细节做对了，整个产品才配得上「助眠」两个字。用户说不出哪里好，但会觉得「这个 App 很舒服」。"
                />
                <PolishDetail
                  before="会话结束时音量突然变 0"
                  after="最后 60 秒音量线性降到 0"
                  note="睡着的瞬间你是听不到音乐的。让它悄悄消失，不让音乐的「结束」打扰你。这一个改动，就是「产品有没有灵魂」的分水岭。"
                />
              </div>
              <Callout kind="tip" title="品味是你的护城河">
                Vibe Coding 时代，<strong>写代码的门槛几乎为 0</strong>。同一个 prompt，不同的人做出来的产品差得很远——差的那部分，全是审美和细节。审美打磨不出 AI 能教的套路，你只能<strong>多用好产品、多问自己"哪里不对"</strong>。
              </Callout>
            </Stage>

            <h3>现在自己试一遍</h3>
            <p>下面是 SleepForest 的实时嵌入。点下面的 4 个场景切换、按播放、观察你的"不舒服"来自哪里——这就是你下一轮要打磨的细节：</p>
            <div style={{ margin: '16px 0 30px' }}>
              <SleepForestDemo height={440} defaultScene="RAIN" />
            </div>
          </section>

          {/* ─── F · Debugging ─── */}
          <section id="f">
            <h2>F · 调试心法 · 怎么跟报错相处</h2>
            <p>整个 Ch 5 里，你会遇到各种"咦，怎么不对"。这一节是调试的通用心法，按重要性排列：</p>

            <h3>① 报错了：原文整段贴回去，一个字都别改</h3>
            <p>不要自己翻译、不要自己归纳。红色字母对 Agent 来说就是<strong>地址信息</strong>，它靠这些字找 bug。你翻译一遍，它就找不到了。</p>
            <Code>{`> 我在 Stage 3 调 Gemini，报了这个：
  
  [完整错误粘过来，包括 stack trace 每一行]
  
  当时我点了"换一句"按钮。代码在 services/gemini.ts。
  帮我修。`}</Code>

            <h3>② 体验怪：用 "what + want" 两件事描述</h3>
            <p>肉眼看着不对但没报错——这是最难描述的 bug。格式固定：</p>
            <blockquote>
              <strong>What</strong>（现在怎么样）：切场景时音频要 1 秒才跟上<br />
              <strong>Want</strong>（我要怎么样）：希望画面和声音同时变
            </blockquote>
            <p>两项都给，Agent 就能修。只给一项，它瞎猜。</p>

            <h3>③ 小改 vs 大改：3 次法则</h3>
            <p>一个地方反复改超过 <strong>3 次</strong>还不对，说明根上有问题。别再"改一点点"——让 Agent 开一个新分支、<strong>整段重写</strong>。一直修补的代码会越来越烂，最后没人能读懂。</p>

            <h3>④ 最安全的一个问题</h3>
            <p>不懂 Agent 要干啥的时候，永远问：</p>
            <Code>{`> 为什么要这样做？用 3 句话解释。`}</Code>
            <p>它会给你讲清楚。你在解释里学到东西，下次就更懂了。这一条是你从"按按钮"进化到"真懂"的最短路径。</p>

            <Callout kind="stuck">
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li><strong>一步跑不通、后面都塞住了</strong> → 立刻回退到上一个能跑的版本，别硬冲</li>
                <li><strong>越改越乱、不知道当前状态</strong> → 让 Agent 帮你 <code>git commit</code> 一个安全点，再继续</li>
                <li><strong>想放弃了</strong> → 这很正常；找朋友讲一遍你在做什么，往往会重新点燃</li>
              </ul>
            </Callout>
          </section>

          {/* ─── G · Launch checklist ─── */}
          <section id="g">
            <h2>G · 上线前的 10 条自检清单</h2>
            <p>过了这 10 条，你就可以进 Ch 6 做部署了。过不了的，回到对应 Stage 补。</p>
            <div style={{
              background: 'var(--bg-2)', borderRadius: 14, padding: 24, margin: '18px 0',
              border: '1px solid var(--line)',
            }}>
              {[
                { g: 'Stage 1', s: '本地 npm run dev 一次就起，不报错' },
                { g: 'Stage 1', s: '所有页面 / 主要按钮都点过，没红字 console error' },
                { g: 'Stage 2', s: '用户输入 / 选择的东西，刷新页面后还在' },
                { g: 'Stage 2', s: '关浏览器再打开，偏好还在' },
                { g: 'Stage 3', s: 'API key 放在 .env.local，没写进代码' },
                { g: 'Stage 3', s: 'AI 能正常返回内容' },
                { g: 'Stage 3', s: '故意断网一次，看到的是兜底文案不是白屏' },
                { g: 'Stage 4', s: '空状态 / 加载中 / 报错 三种状态都有对应画面' },
                { g: 'Stage 4', s: '至少 5 个"别人看不到但我能看到"的打磨细节' },
                { g: 'Stage 4', s: '你自己愿意每天打开用一次' },
              ].map((it, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 14, padding: '10px 0',
                  borderBottom: i < 9 ? '1px dashed var(--line)' : 'none',
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 4, border: '1.5px solid var(--amber)',
                    flexShrink: 0, marginTop: 2,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: 'var(--ink)' }}>{it.s}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--f-mono)', marginTop: 2 }}>{it.g}</div>
                  </div>
                </div>
              ))}
            </div>
            <Callout kind="tip" title="做到了这里，你已经不是在「学编程」了">
              你在做<strong>产品</strong>。"能跑 + 会存 + 会调 AI + 处理好边缘 + 打磨过细节"——这套能力，是一个完整的产品经理 + 设计师 + 工程师最小闭环。世界上能独立做到这五件事的人，其实远比你想象的少。
            </Callout>
            <p>下一章，我们把它挂到公网上，让全世界有一个链接能打开它。</p>
          </section>

          {/* Chapter nav */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 60, paddingTop: 30, borderTop: '1px solid var(--line)' }}>
            <a href="chapter.html?ch=4" style={{ textDecoration: 'none' }}>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--f-mono)', letterSpacing: 2 }}>← 上一章</div>
              <div className="serif" style={{ fontSize: 18, color: 'var(--ink)', marginTop: 4 }}>Ch 04 · 认识 Agent</div>
            </a>
            <a href="chapter.html?ch=6" style={{ textDecoration: 'none', textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--f-mono)', letterSpacing: 2 }}>下一章 →</div>
              <div className="serif" style={{ fontSize: 18, color: 'var(--ink)', marginTop: 4 }}>Ch 06 · 部署上线</div>
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}

window.ChapterReader = ChapterReader;
