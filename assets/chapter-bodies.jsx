// Per-chapter bodies for the generic reader. Ch 1, 2, 3, 4, 6, 7, 8.
// Each entry: { subtitle, sections: [{id, label}], Body: () => JSX, homework: [string...] }

const { Callout, CodeBlock, Compare, CardList } = window.C;

window.CHAPTER_BODIES = {

  // ───────────────────────────────────────────────────────────── Ch 1
  1: {
    subtitle: '给你"这事儿我能干"的底气',
    sections: [
      { id: 'a', label: '一条推特开始的故事' },
      { id: 'b', label: '到底变了啥：从"写代码"到"描述意图"' },
      { id: 'c', label: '为什么是现在：三条线撞上了' },
      { id: 'd', label: '几个真实做出来的东西' },
      { id: 'e', label: '课程结束你手上有什么' },
      { id: 'f', label: '心态：像带实习生，而不是学代码' },
      { id: 'g', label: '常见问题' },
    ],
    Body: () => (
      <>
        <section id="a">
          <h2>A · 一条推特开始的故事</h2>
          <p>2024 年 2 月，Andrej Karpathy（前 Tesla 自动驾驶负责人、OpenAI 创始成员之一）发了条推特。大意是：</p>
          <blockquote>
            "我最近写代码，完全是跟着感觉走（vibing）。让 AI 去写，我连代码都不看了。有 bug 就把报错原文丢回去让它修，修不好就绕过去。代码能不能完全理解已经不重要了。"
          </blockquote>
          <p>整个科技圈炸了。不是因为他说了什么惊天秘密——而是<strong>连这种级别的人都不"写"代码了，那"写代码"这件事到底还存在吗？</strong></p>
          <p><strong>Vibe Coding</strong> 这个词就是从这条推里来的。Vibe = 感觉 / 氛围。Vibe Coding = 跟着感觉做东西，而不是一行行敲代码。</p>
          <p>听起来很随便，但背后是个很严肃的变化：AI 的编程能力在过去一两年里突然越过了一条线——从"能补全几行代码"变成了"能从头做完一个项目"。这条线一过，规则就变了。</p>
        </section>

        <section id="b">
          <h2>B · 到底变了啥：从"写代码"到"描述意图"</h2>
          <p>拿一个最小的例子：你想在网页上加一个按钮，点一下显示"你好"。</p>
          <Compare
            leftLabel="以前的做法 · 传统编程"
            rightLabel="现在的做法 · Vibe Coding"
            left={
              <>
                <p>你得知道 HTML 是啥、JavaScript 是啥、事件监听是啥，然后写这种东西：</p>
                <pre style={{ fontFamily: 'var(--f-mono)', fontSize: 12, lineHeight: 1.7, margin: '8px 0', whiteSpace: 'pre-wrap' }}>{`<button id="greet">点我</button>
<p id="msg"></p>
<script>
  document.getElementById('greet')
    .addEventListener('click', () => {
      document.getElementById('msg')
        .textContent = '你好';
    });
</script>`}</pre>
                <p style={{ fontSize: 14 }}>光看这几行小白就懵了：为啥有尖括号？getElementById 是啥鬼？</p>
              </>
            }
            right={
              <>
                <p>你跟 AI 说一句话：</p>
                <pre style={{ fontFamily: 'var(--f-mono)', fontSize: 13, margin: '8px 0' }}>{`"加一个按钮，按下去显示'你好'"`}</pre>
                <p>代码它全帮你写。你只看结果：按钮出来了吗？点下去对不对？不对就再说"字太小，换大点"——它继续改。</p>
                <p style={{ color: 'var(--accent)', fontWeight: 500, marginTop: 10 }}>
                  你全程没写一行代码。你做的事是：<strong>描述 → 判断 → 再描述</strong>。
                </p>
              </>
            }
          />
          <Callout kind="tip" title="打个比方">
            以前学编程 = 自己盖房子。砌砖、水电、装修都得学，学到能盖完一面墙，很多人已经放弃了。<br />
            Vibe Coding = 跟装修师傅说需求。"客厅要暖色调、厨房加个岛台。"——你不用懂电线怎么走，但你要知道<strong>你想住什么样的房子</strong>。
          </Callout>
          <p>变化的不是"换了一种编程语言"，而是<strong>你的角色变了</strong>：你从施工工人变成了甲方。你负责说你要什么、看它做得对不对、哪里要改。AI 是施工队。</p>
        </section>

        <section id="c">
          <h2>C · 为什么是现在：三条线撞上了</h2>
          <p>Vibe Coding 能在 2024–2025 年突然跑起来，是三件事同时到位：</p>
          <CardList items={[
            { n: '①', t: 'AI 突然够聪明了', d: '2022 年以前的 AI 写代码大概相当于学了三个月的实习生；现在的 Claude / GPT / Gemini 已经稳稳能做完一个完整小项目。' },
            { n: '②', t: '工具链合拢了', d: '以前要把代码来回复制到 ChatGPT 里，现在有了 Codex / Cursor，AI 能直接读你电脑上的项目、直接改、直接跑。中间那层手工消失了。' },
            { n: '③', t: '上线变免费了', d: 'Vercel / Netlify 让你不用买服务器、不用配域名——点几下，给你一个 https 链接，发给谁谁都能打开。' },
          ]} />
          <Callout kind="tip" title="一句话总结">
            AI 够聪明 + 工具够好 + 上线够便宜 = 从"有想法"到"有人在用"的门槛，<strong>第一次低到了一个普通人一周能跨过去</strong>。
          </Callout>
        </section>

        <section id="d">
          <h2>D · 几个真实做出来的东西</h2>
          <p>说再多不如看例子。先看三个已经被全世界用过的爆款——它们的作者不是大厂工程师，就是普通人 + AI 编辑器 + 一个周末。</p>
          <CardList items={[
            { n: '🐱', t: '小猫补光灯 · 一个人 + Cursor + 一个周末',
              d: 'iOS App Store 爆款。一句话需求："半夜自拍、打光灯太丑，能不能有一只小猫陪我补光？" 全屏白光 + 中间一只跟着你动作眨眼的小猫。作者不是 iOS 工程师，靠 Cursor 一个周末做完上架。' },
            { n: '✈️', t: 'fly.pieter.com · Pieter Levels + Cursor + 3 小时',
              d: '浏览器里就能玩的 3D 飞行小游戏，打开就能开飞机。上线 10 天 MRR 破 10 万美金。Pieter 一开始也只是"想试试 AI 做 3D 游戏能到什么程度"。' },
            { n: '🍎', t: 'Cal AI · 两个高中生 + 一个暑假',
              d: '拍一下食物照片，直接告诉你热量。下载破 500 万。作者是两个还没上大学的学生——没学过机器学习，也没做过 App，但做出了今天 App Store 健康榜最前面的东西。' },
          ]} />
          <Callout kind="tip" title="看它们三个的共同点">
            <strong>作者都不是专业工程师</strong>；<strong>一句话能讲清楚"这玩意儿干嘛的"</strong>；<strong>只解决一个极小、极具体的问题</strong>，不追求完整，追求"能发出去"。本课会反复回到这三个案例，拆它们的套路。
          </Callout>
          <p style={{ marginTop: 18 }}>再给你几个更轻量的灵感——这些也许就是你第一周能做的东西：</p>
          <CardList items={[
            { t: 'SleepForest · 本课主例', d: '4 个场景 + 4 只小动物 + 4-7-8 呼吸法 + AI 实时独白。需求一句话："睡不着，想有人陪着呼吸。" Ch 3–6 我们会一起把它从零做一遍。' },
            { t: '"今晚吃什么"轮盘', d: '纯静态，没接 AI。把常吃的菜加进去，点一下随机。做完大概半小时。' },
            { t: 'AI 读书笔记整理器', d: '把碎片笔记丢进去，AI 整理成结构化的读书笔记。核心代码不到 30 行。' },
            { t: '生日倒数 + 心愿页', d: '打开显示离生日还有多少天，下面是心愿清单，能勾能删。发给朋友当邀请函。' },
          ]} />
          <Callout kind="note" title="共同点">
            都是<strong>很小、很具体、解决一个日常问题</strong>的东西，但都<strong>真的挂在网上、真的有人在用</strong>。这就是你学完之后手上会有的东西。
          </Callout>
        </section>

        <section id="e">
          <h2>E · 课程结束你手上有什么</h2>
          <CardList items={[
            { n: '①', t: '一个 https:// 开头的真链接', d: '不是截图、不是 demo，是一个发给任何人都能打开的网址。解决的是你自己想解决的问题。' },
            { n: '②', t: '一条能再走一遍的完整路径', d: '从"有个模糊想法"一直到"上线有人用"，这套流程走过一遍不会忘。下次有新想法，你知道第一步做什么。' },
            { n: '③', t: '一张"下一步学什么"的地图', d: '加登录、加数据库、做成手机 App、接付费——不是全教你，而是让你知道每条路有多长、自己决定走哪条。' },
          ]} />
        </section>

        <section id="f">
          <h2>F · 心态：像带实习生，而不是学代码</h2>
          <p>整个课里你会反复看到这句话。先种进脑子里：</p>
          <blockquote>AI 是一个<strong>反应快但经验不足</strong>的实习生。你让它做事，它会做。做得对不对、好不好、要不要重来——你判断。</blockquote>
          <p>抱着"帮我做出来"的心态，你会失望。抱着"我带它一起做"的心态，你会做得出来。</p>
        </section>

        <section id="g">
          <h2>G · 常见问题</h2>
          <CardList items={[
            { t: '我英文很差行吗', d: '全程中文。跟 AI 对话也用中文——现在的 AI 对中文理解不比英文差，描述"感觉"类需求甚至更好。工具界面有英文的地方我会截图带你走。' },
            { t: '连装软件都怕搞砸', d: 'Ch 4 会一步步带你装，Mac / Windows 分开讲。环境只有第一次麻烦，装完就不用管了。' },
            { t: '和学编程有啥区别', d: '学编程 = 学怎么写代码（语法、逻辑、数据结构）。这门课教的是怎么让 AI 帮你写代码——你要掌握的是描述能力、判断力、审美。就像经营餐厅不用学厨艺，你需要的是品味。' },
            { t: '学完算"会编程"吗', d: '看定义。如果"会" = 手写排序算法，不算。如果"会" = 能做出一个有人用的小产品，那算。2026 年，后一种正在变得比前一种更有价值。' },
            { t: '做出来的东西质量行吗', d: '看你打磨。不打磨确实是玩具。Ch 5 专门讲打磨，Ch 7 你自己做的项目也要收 3 条反馈再迭代。认真做，绝对不是玩具。' },
          ]} />
        </section>
      </>
    ),
    homework: [
      '找 3 个你日常"要是有个 App 就好了"的瞬间，各写一句话',
      '从里面挑一个你最有感觉的，告诉朋友，观察他们的反应',
      '不用动手写代码——这章就是先在脑子里搭个底气',
    ],
  },

  // ───────────────────────────────────────────────────────────── Ch 2
  2: {
    subtitle: '把想法压缩成一句话',
    sections: [
      { id: 'a', label: '为什么要先想清楚再动手' },
      { id: 'b', label: '灵感从哪来：三条挖掘路径' },
      { id: 'c', label: '一句话公式' },
      { id: 'd', label: 'SleepForest 反推演示' },
      { id: 'e', label: '第一个项目的"体检标准"' },
      { id: 'f', label: '3 个最常见的死法' },
    ],
    Body: () => (
      <>
        <section id="a">
          <h2>A · 为什么要先想清楚再动手</h2>
          <p>因为 AI 不是你肚子里的蛔虫。你说得越模糊，它做出来的东西就越跑偏——然后你花两小时改，发现方向从根上就是错的。<strong>先花 60 分钟想清楚"做啥"，后面能省 6 个小时的弯路。</strong></p>
          <p>我见过最典型的失败不是"做不出来"，而是<strong>"做出来了，但不是我想要的"</strong>。为啥？因为开始之前他自己也不知道自己要什么。</p>
        </section>

        <section id="b">
          <h2>B · 灵感从哪来：三条挖掘路径</h2>
          <p>你不需要改变世界的创意。你需要的是一个<strong>自己真心想用的小东西</strong>。</p>
          <h3>路径 A · 你每天被什么烦着</h3>
          <CardList items={[
            { t: '每天晚上想不出吃啥', d: '→ 「今晚吃什么」轮盘' },
            { t: '读完书笔记散在三个地方', d: '→ 读书笔记整理器' },
            { t: '睡前总忍不住刷手机', d: '→ SleepForest 助眠' },
            { t: '和朋友约饭总来回改时间', d: '→ 简易日程投票器' },
          ]} />
          <h3>路径 B · 你周末愿意花 3 小时捣鼓什么</h3>
          <CardList items={[
            { t: '喜欢看星座', d: '→ 每日星座运势页面' },
            { t: '喜欢养植物', d: '→ 浇水提醒器' },
            { t: '喜欢跑步', d: '→ 配速计算器' },
            { t: '喜欢猫', d: '→ 每日随机猫咪图' },
          ]} />
          <h3>路径 C · 身边人经常抱怨什么</h3>
          <p>你妈总记不住药什么时候吃 → 吃药提醒页。你朋友找不到好的自习室 → 自习室推荐汇总。你同事每次写会议纪要都重复一样的格式 → 会议纪要模板生成器。</p>
          <Callout kind="tip" title="关键心法">
            不要想"市场上有没有人需要"。第一个项目，给你自己做、给身边 5–10 个人用就够了。<strong>有用 &gt; 有市场。</strong>
          </Callout>
        </section>

        <section id="c">
          <h2>C · 一句话公式：把任何想法压成 MVP</h2>
          <p>试着把你的想法填进这个句式：</p>
          <Callout kind="warn">
            <div style={{ fontFamily: 'var(--f-serif)', fontSize: 22, fontWeight: 500, textAlign: 'center', lineHeight: 1.5 }}>
              「一个 <u>&nbsp;形容词&nbsp;</u> 的 <u>&nbsp;东西&nbsp;</u>，用来 <u>&nbsp;目的&nbsp;</u>」
            </div>
          </Callout>
          <p>举几个例子：</p>
          <ul style={{ paddingLeft: 22, lineHeight: 2 }}>
            <li>「一个 <strong>会陪你做呼吸法</strong> 的 <strong>助眠小页面</strong>，用来 <strong>帮你睡前放下手机</strong>」</li>
            <li>「一个 <strong>随机转轮盘</strong> 的 <strong>选择器</strong>，用来 <strong>决定今晚吃什么</strong>」</li>
            <li>「一个 <strong>能自动整理碎片笔记</strong> 的 <strong>读书助手</strong>，用来 <strong>读完一本书产出一份结构化笔记</strong>」</li>
          </ul>
          <p>填不进去，说明你还没想清。继续想。填进去了 = 可以开始了。</p>
        </section>

        <section id="d">
          <h2>D · SleepForest 反推演示</h2>
          <p>我拿主例给你演示从"模糊感觉"到"清晰 1-Pager"的全过程：</p>
          <CardList items={[
            { n: '①', t: '原始感受（模糊）', d: '"有时候晚上睡不着，手机放不下来，如果有个什么东西能帮我过渡到困的状态就好了。"' },
            { n: '②', t: '压缩成一句话', d: '「一个会陪你做 4-7-8 呼吸法、讲睡前故事的小动物助眠 App，用来帮你从"清醒刷手机"过渡到"有点困了"」' },
            { n: '③', t: '核心 3 个功能', d: '场景选择（雨/森/海/教室）· 呼吸引导（4-7-8）· AI 角色独白' },
            { n: '④', t: '砍掉的功能', d: '用户登录 · 历史记录 · 付费订阅 · 多语言——每一刀都有原因（见下）' },
          ]} />
          <Callout kind="note" title="为什么要砍">
            每多一个功能，开发时间 ×2、卡住概率 ×2。<strong>第一个项目的精神：砍到不能再砍，只留你最想验证的那个核心体验。</strong>别的等上线收到反馈再加。
          </Callout>
        </section>

        <section id="e">
          <h2>E · 第一个项目的"体检标准"</h2>
          <p>你的想法过一遍这四条：</p>
          <CardList items={[
            { n: '✓', t: '一个人自己能用', d: '不需要对方也注册。发给朋友打开就能用。' },
            { n: '✓', t: '不需要登录账号', d: '"用户系统"是个坑，第一次碰会把你搞崩。' },
            { n: '✓', t: '不需要记住历史', d: '刷新清零完全可以接受。需要存数据的放后面做。' },
            { n: '✓', t: '你自己真心想用', d: '如果你都觉得"做出来也不会打开"，那方向就不对。' },
          ]} />
          <p>这些限制后面会慢慢放宽。Ch 8 会聊怎么加登录、数据库、付费。但那都是后话——<strong>先把第一个完整地做出来</strong>。</p>
        </section>

        <section id="f">
          <h2>F · 3 个最常见的死法</h2>
          <h3>死法 1 · 想做太大</h3>
          <p>"我要做一个比微信还好用的社交 App"——兄弟，微信有 3 万工程师。你第一个项目做个"朋友间匿名留言板"就已经很不错了。<strong>越大的想法，第一行代码越远。</strong></p>
          <h3>死法 2 · 讲不清楚到底做的啥</h3>
          <p>"我想做一个能让人开心的东西"——你自己都讲不清，AI 更猜不出来。好想法一定能压成一句话。压不出来不是因为太高深，是<strong>还没想透</strong>。</p>
          <h3>死法 3 · 被已有产品吓住</h3>
          <p>"Todo App 已经有 1000 个了"——那又怎样？你做的版本 + 你的审美 + 你身边 10 个朋友需要的那个特定功能，这组合独一无二。<strong>第一个项目的目标不是"打败竞品"，是"我朋友今天真的用上了"。</strong></p>
        </section>
      </>
    ),
    homework: [
      '用一句话公式，写出你的项目 pitch',
      '列出最核心的 3 个功能 + 砍掉的 3 个功能（写清楚为什么砍）',
      '写 3 个使用场景想象：谁、在什么时候、怎么用它',
      '给任意一个不懂技术的朋友看一遍，能 30 秒内复述出来就算过',
    ],
  },

  // ───────────────────────────────────────────────────────────── Ch 3
  3: {
    subtitle: '让 AI 做出第一版能点的东西',
    sections: [
      { id: 'a', label: '原型工具全景：四个主流选择' },
      { id: 'b', label: 'AI Studio · 免费全栈的首选' },
      { id: 'c', label: 'Google Stitch · 设计稿优先' },
      { id: 'd', label: 'Vercel v0 · 前端组件生成器' },
      { id: 'e', label: 'Claude Artifacts · 对话里出原型' },
      { id: 'f', label: '怎么选：一张决策图' },
      { id: 'g', label: '好 Prompt 的三要素' },
      { id: 'h', label: '每条改动都要有验收标准' },
      { id: 'i', label: 'SleepForest v1 → v5 迭代日志' },
      { id: 'j', label: '导出给下一步' },
    ],
    Body: () => {
      // Tool card with inline SVG "logo"
      const ToolCard = ({ brand, name, tagline, url, good, bad, bestFor, verdict, logo }) => (
        <div style={{
          border: '1px solid var(--line)', borderRadius: 16, background: 'var(--bg)',
          padding: 24, margin: '16px 0', display: 'grid', gridTemplateColumns: '56px 1fr', gap: 20,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: brand, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: '0 4px 14px -6px rgba(0,0,0,.18)',
          }}>{logo}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>{name}</div>
              <code style={{ fontSize: 12, color: 'var(--ink-3)' }}>{url}</code>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2, fontStyle: 'italic' }}>{tagline}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--moss-ink, var(--ink-3))', marginBottom: 6 }}>👍 强在</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: 'var(--ink-2)' }}>
                  {good.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </div>
              <div>
                <div className="eyebrow" style={{ color: 'var(--ink-3)', marginBottom: 6 }}>👎 弱在</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: 'var(--ink-3)' }}>
                  {bad.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>
            <div style={{
              marginTop: 14, paddingTop: 12, borderTop: '1px dashed var(--line)',
              display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center',
            }}>
              <span className="eyebrow" style={{ color: 'var(--amber-ink)' }}>最适合</span>
              <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{bestFor}</span>
            </div>
            <div style={{
              marginTop: 10, fontSize: 13, color: 'var(--ink)', fontWeight: 500,
            }}>本课推荐度：<span style={{ color: 'var(--amber-ink)' }}>{verdict}</span></div>
          </div>
        </div>
      );

      // Minimal SVG "logos" — not real brand marks, purely stylistic glyphs
      const logoStudio = (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 3 L24 20 L4 20 Z" fill="#fff" opacity=".95"/>
          <circle cx="14" cy="22" r="2.2" fill="#fff"/>
        </svg>
      );
      const logoStitch = (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="5" y="5" width="8" height="8" rx="1.5" fill="#fff"/>
          <rect x="15" y="5" width="8" height="8" rx="1.5" fill="#fff" opacity=".65"/>
          <rect x="5" y="15" width="8" height="8" rx="1.5" fill="#fff" opacity=".65"/>
          <rect x="15" y="15" width="8" height="8" rx="1.5" fill="#fff"/>
        </svg>
      );
      const logoV0 = (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <text x="14" y="21" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="16" fontWeight="700" fill="#fff">v0</text>
        </svg>
      );
      const logoClaude = (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 8 Q14 3 22 8 L22 18 Q14 23 6 18 Z" fill="#fff" opacity=".9"/>
          <circle cx="14" cy="13" r="2" fill="#D97757"/>
        </svg>
      );

      return (
      <>
        <section id="a">
          <h2>A · 原型工具全景：四个主流选择</h2>
          <p>2025 年能把一句话变成"能点的网页"的工具不止一个。下面这四个是目前绝大多数 Vibe Coding 工作流的起点：</p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, margin: '20px 0',
          }}>
            {[
              { bg: '#4285F4', name: 'AI Studio', role: 'Google 全栈预览', logo: logoStudio },
              { bg: '#8E6FE8', name: 'Google Stitch', role: '设计稿 → 代码', logo: logoStitch },
              { bg: '#000', name: 'Vercel v0', role: '前端组件/页面', logo: logoV0 },
              { bg: '#D97757', name: 'Claude Artifacts', role: '对话里出原型', logo: logoClaude },
            ].map((x, i) => (
              <div key={i} style={{
                border: '1px solid var(--line)', borderRadius: 12, padding: 14, textAlign: 'center', background: 'var(--bg)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: x.bg, margin: '0 auto 10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{x.logo}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{x.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{x.role}</div>
              </div>
            ))}
          </div>
          <Callout kind="tip" title="先剧透结论">
            零基础做第一个可交互原型——<strong>AI Studio</strong> 最无脑。后面随着你变熟，可以用 Stitch 做设计稿、v0 单独打磨组件、Claude Artifacts 快速验证想法。四个不是互斥的，是你工具箱里的四把刀。
          </Callout>
        </section>

        <section id="b">
          <ToolCard
            brand="#4285F4"
            logo={logoStudio}
            name="AI Studio"
            url="aistudio.google.com"
            tagline="Google 家的全栈工作室 — Gemini 出代码，自动预览，自动部署"
            good={[
              '一句话出一个能跑的完整小网页',
              '免费额度很大，零成本上手',
              '内置预览窗口 + 手机扫码看效果',
              '可直接 Deploy 得到一个公开链接',
            ]}
            bad={[
              '输出偏"演示级"，复杂项目还是要搬去本地',
              '只吃英文+中文的 Prompt，代码生成风格偏保守',
            ]}
            bestFor={'你第一次想把脑子里的产品变成「能点的东西」——从 0 到 1 的那一跳'}
            verdict="⭐⭐⭐⭐⭐ · 本课 Ch 3 默认工具"
          />
        </section>

        <section id="c">
          <ToolCard
            brand="#8E6FE8"
            logo={logoStitch}
            name="Google Stitch"
            url="stitch.withgoogle.com"
            tagline="Google Labs 出品 — 先有设计稿，再出 HTML / Figma / 代码"
            good={[
              '输出像设计师画的：组件化、有层级、配色讲究',
              '能同时导出 Figma + HTML，方便你跟设计师协作',
              '适合"我对视觉有要求"的场景',
            ]}
            bad={[
              '产物更偏静态视觉，交互逻辑不如 AI Studio 到位',
              '目前需要 Google 账号 + 有时候要排队',
            ]}
            bestFor={'你已经知道产品长啥样，想先把「设计感」立住，再交给 Codex 接手'}
            verdict="⭐⭐⭐⭐ · 推荐在 Ch 3 做完第一版后，复做一次 Stitch 对比"
          />
        </section>

        <section id="d">
          <ToolCard
            brand="#000"
            logo={logoV0}
            name="Vercel v0"
            url="v0.app"
            tagline="Vercel 家的组件工厂 — 前端工程师的偏爱"
            good={[
              '出来的代码干净规整，直接能塞进真实项目',
              '天然用 shadcn/ui + Tailwind，后续接手最省力',
              '"Deploy to Vercel" 一键上线，和 Ch 6 无缝衔接',
            ]}
            bad={[
              '偏工程视角，零基础看着容易懵',
              '对"整个 App"的把握不如 AI Studio 全面——更像"做一个好组件"',
            ]}
            bestFor="做局部的精致组件（登录卡片、Pricing 页、一段英雄区），或你打算在 Vercel 长期托管"
            verdict="⭐⭐⭐⭐ · Ch 6 上线时重新遇见它"
          />
        </section>

        <section id="e">
          <ToolCard
            brand="#D97757"
            logo={logoClaude}
            name="Claude Artifacts"
            url="claude.ai"
            tagline="聊天里直接开一个可运行窗口 — 边聊边改"
            good={[
              '对话流最顺：改需求 = 再说一句话',
              '对"氛围/审美"的 Prompt 领会力极强',
              '适合探索：同一个想法，换个形态再试一次',
            ]}
            bad={[
              '一次只能做一个页面/一个组件，做不了多页应用',
              '导出到本地需要手动拷贝代码',
            ]}
            bestFor={'想法还没成型时的「捏橡皮泥」阶段 — 做 3 个不同方向的 demo 选一个'}
            verdict={'⭐⭐⭐⭐ · Ch 2 的「一句话」过不了自己那关时，来这里试手感'}
          />
        </section>

        <section id="f">
          <h2>F · 怎么选：一张决策图</h2>
          <div style={{
            background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 14,
            padding: 24, margin: '18px 0', fontSize: 14, lineHeight: 2, color: 'var(--ink-2)',
          }}>
            <div><strong>你现在处于哪个状态？</strong></div>
            <div style={{ marginTop: 12, paddingLeft: 16, borderLeft: '2px solid var(--amber)' }}>
              <div>🧪 <strong>想法还在飘</strong>，想快速试 3 个方向 → <span style={{ color: 'var(--amber-ink)' }}>Claude Artifacts</span></div>
              <div>🚀 <strong>一句话已经写清</strong>，想做出一个能用的完整原型 → <span style={{ color: 'var(--amber-ink)' }}>AI Studio</span>（本课默认）</div>
              <div>🎨 <strong>对视觉很在意</strong>，想先把设计稿立住 → <span style={{ color: 'var(--amber-ink)' }}>Google Stitch</span></div>
              <div>🧩 <strong>只想做一个精致组件</strong>，或打算在 Vercel 上线 → <span style={{ color: 'var(--amber-ink)' }}>Vercel v0</span></div>
            </div>
          </div>
          <Callout kind="note" title="不用一次选对">
            四个都免费（或者有不错的免费额度）。<strong>本课正文用 AI Studio 走完整条线</strong>，你后面自己真做东西时，每个都玩一遍半小时——哪个顺手就用哪个。别在"选工具"上卡住超过 10 分钟，那比选错工具还糟。
          </Callout>
          <div style={{ margin: '24px 0' }}>
            <a href="prompt-lab.html"><button className="btn btn-amber">打开 Prompt 练习台 →</button></a>
          </div>
        </section>

        <section id="g">
          <h2>G · 好 Prompt 的三要素</h2>
          <p>工具选好之后，真正决定结果的是<strong>你怎么说话</strong>。给 AI 讲清楚三件事，不管用哪个工具，出来的东西都八九不离十：</p>
          <CardList items={[
            { n: '①', t: '视觉', d: '颜色、字体、布局风格。"深绿背景 + 奶油米色字 + 圆角卡片 + 手绘插画"。' },
            { n: '②', t: '氛围', d: '让人感觉怎样？"温柔"、"安静"、"像深夜的咖啡店"——AI 真的能理解这种情绪形容词。' },
            { n: '③', t: '内容', d: '要有哪些元素？按钮上写什么字？文案的语气是？越具体 AI 做得越准。' },
          ]} />
          <Callout kind="warn" title="最常见的错误">
            只讲功能，不讲风格。"做一个待办清单" → AI 给你默认的蓝色极简风。<strong>你没说要啥，它就给你最安全的那个。</strong>
          </Callout>
          <h3 style={{ marginTop: 24 }}>怎么告诉 AI「我要什么风格」</h3>
          <CardList items={[
            { n: '方式 A', t: '用文字形容词', d: '"暗色、温柔、低饱和、手绘感、像 Moleskine 本子。"够用，但不一定准。' },
            { n: '方式 B', t: '用知名产品类比', d: '"视觉参考 Calm 和 Headspace。"AI 对主流 App 的风格有认知，这个办法最好使。' },
            { n: '方式 C', t: '直接贴截图', d: '四个工具都支持上传图片。把 2–3 张你喜欢的 App 截图贴进去，说"按这个感觉做"。这个最准。' },
          ]} />
          <h3 style={{ marginTop: 24 }}>第一个 Prompt 模板（可抄）</h3>
          <CodeBlock>{`我要做一个 [Ch 2 的一句话]。

【功能】
- [功能 1]
- [功能 2]
- [功能 3]

【视觉风格】
- 配色：[关键词]
- 字体：[关键词]
- 布局：[关键词]
- 氛围：[3 个形容词]
- 参考：[1–2 个产品名 / 上传截图]

【内容】
- 页面标题：...
- 主按钮文案：...
- (其他具体文案...)

请用 React + Tailwind，生成一个能跑的单页原型。`}</CodeBlock>
          <p>把 Ch 2 的 1-Pager 往里一填，就是你的第一个 Prompt。</p>
        </section>

        <section id="h">
          <h2>H · 黄金原则：每条改动都要有验收标准</h2>
          <p>你可能见过一种说法："一次只改一件事。" 这个说法太保守了。真相是——<strong>一次可以改很多件事，只要你每条都能独立判断它对不对。</strong></p>
          <Compare
            left={<><strong>一把糊的需求</strong><br /><br />"颜色不对，字太小，按钮位置怪，动画卡，插画不好看。"<br /><br />改完你只会有一个整体感受："好像好一点？但还是怪。" 你说不清是哪条达标了、哪条没达标——所以你根本没法精准地提下一轮。</>}
            right={<><strong>每条带标准的需求</strong><br /><br />1. 配色改成深绿+奶油米 <em>（像 Moleskine 本子）</em><br />2. 正文字号 ≥ 16px <em>（手机上不用眯眼）</em><br />3. 主按钮放底部中央 <em>（拇指能点到）</em><br />4. 过渡动画 ≤ 400ms <em>（不拖沓）</em><br /><br />改完你一条一条过：① ✓ ② ✓ ③ ✗ ④ ✓。第③条单独再提一次就行。</>}
            leftLabel="❌ 没标准"
            rightLabel="✓ 有标准"
          />
          <Callout kind="tip" title="核心心法">
            批量改没问题。<strong>没有验收标准的改动才是问题。</strong>每条需求你写下来的时候，同时问自己一句："改完我怎么知道它对了？" 答不上来——就是你还没想清楚，AI 也猜不出来。
          </Callout>
          <p>具体的验收标准可以是：</p>
          <CardList items={[
            { n: '📐', t: '可量化的数字', d: '"字号 16px 以上"、"卡片圆角 12px"、"动画不超过 400ms"' },
            { n: '🎯', t: '可对照的参考', d: '"配色像 Moleskine 本子"、"按钮感觉像 Linear 的 CTA"、"卡片像 Arc 浏览器的 tab"' },
            { n: '👆', t: '可操作的行为', d: '"拇指能点到"、"不用横向滚动"、"在 iPhone SE 上完整显示"' },
            { n: '👀', t: '一眼能判断的感觉', d: '"看起来温柔"、"不像金融 App"、"有深夜咖啡店的感觉"——只要你看一眼就能说出"是/不是"' },
          ]} />
          <p>这个习惯养成了，你用 Codex、Claude Code、Trae 都一样好使。<strong>它不是 AI 的限制，是你表达精度的训练。</strong></p>
        </section>

        <section id="i">
          <h2>I · SleepForest 从 v1 到 v5 的迭代日志</h2>
          <p>我做 SleepForest 的真实过程，5 轮让你看清节奏（这一版全程用 AI Studio）：</p>
          <CardList items={[
            { n: 'v1', t: '第一版：骨架', d: '"一个深色助眠页，4 个场景按钮，中间一只小动物。" → 出来页面结构对，但颜色是纯黑 + 一只卡通狐狸，不是我想要的感觉。' },
            { n: 'v2', t: '改氛围', d: '"把纯黑换成深森林绿 + 一点暖黄点光，像夜里的森林。" → 氛围到位了。狐狸还是太卡通。' },
            { n: 'v3', t: '改插画', d: '"小动物改成低多边形几何风格，几何块拼成，配色柔和。" → 成了！这就是我要的。' },
            { n: 'v4', t: '加交互', d: '"点击下方场景按钮，中间的小动物切换（森林=狐狸/雨夜=猫/海边=鲸/教室=熊）。" → 切换有了，但太硬。' },
            { n: 'v5', t: '加动画', d: '"切换时加一个 600ms 的淡出淡入过渡，小动物的呼吸感慢一点。" → 完工。' },
          ]} />
          <Callout kind="note" title="注意节奏">
            每一轮都<strong>带明确的验收标准</strong>（比如 v2 是 "深森林绿 + 暖黄点光"，标准是 "像夜里的森林"）。五轮加起来不到 40 分钟，做出一个视觉完整、能点能玩的原型。
          </Callout>
        </section>

        <section id="j">
          <h2>J · 导出给下一步</h2>
          <p>满意的那一版，把代码<strong>完整下载下来</strong>（AI Studio 右上角有 Download / Stitch 和 v0 都有 Export / Claude Artifacts 右上角能复制代码）。得到一个文件夹，里面是一个真的网页项目。</p>
          <p>下一章，Codex 在这个项目上接手——从"看得到"进化成"真能跑"。</p>
        </section>
      </>
      );
    },
    homework: [
      '从 4 个工具里选 1 个主用（推荐 AI Studio），另外挑 1 个玩半小时感受差别',
      '用 G 的模板写出你的第一个 Prompt（填满视觉 + 氛围 + 内容）',
      '至少迭代 5 轮，每轮提需求时都配上「改完我怎么判断它对了」的验收标准',
      '做一个"视觉参考册"——存 5 张你喜欢的 App 截图备用',
      '下载代码到本地，准备给 Ch 4 用',
    ],
  },

  // ───────────────────────────────────────────────────────────── Ch 4
  4: {
    subtitle: '让 AI 真的进到你的项目里改代码',
    sections: [
      { id: 'a', label: '从"只会说"到"会做"' },
      { id: 'b', label: '三个桌面端 Agent：全景对比' },
      { id: 'c', label: 'Codex IDE · 本课默认' },
      { id: 'd', label: 'Claude Code · 写码质量最稳' },
      { id: 'e', label: 'Trae · 字节出品，中文友好' },
      { id: 'f', label: '怎么选：一张决策图' },
      { id: 'g', label: '10 分钟装好：Desktop 一键版' },
      { id: 'h', label: '核心心法 · 描述结果，不描述代码' },
      { id: 'i', label: '节奏 · Plan → Apply → Verify' },
      { id: 'j', label: '第一次对话：刻意小' },
    ],
    Body: () => {
      const ToolCard = ({ brand, name, tagline, url, good, bad, bestFor, verdict, logo }) => (
        <div style={{
          border: '1px solid var(--line)', borderRadius: 16, background: 'var(--bg)',
          padding: 24, margin: '16px 0', display: 'grid', gridTemplateColumns: '56px 1fr', gap: 20,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: brand, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: '0 4px 14px -6px rgba(0,0,0,.18)',
          }}>{logo}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>{name}</div>
              <code style={{ fontSize: 12, color: 'var(--ink-3)' }}>{url}</code>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2, fontStyle: 'italic' }}>{tagline}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--moss-ink, var(--ink-3))', marginBottom: 6 }}>👍 强在</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: 'var(--ink-2)' }}>
                  {good.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </div>
              <div>
                <div className="eyebrow" style={{ color: 'var(--ink-3)', marginBottom: 6 }}>👎 弱在</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: 'var(--ink-3)' }}>
                  {bad.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>
            <div style={{
              marginTop: 14, paddingTop: 12, borderTop: '1px dashed var(--line)',
              display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center',
            }}>
              <span className="eyebrow" style={{ color: 'var(--amber-ink)' }}>最适合</span>
              <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{bestFor}</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>
              本课推荐度：<span style={{ color: 'var(--amber-ink)' }}>{verdict}</span>
            </div>
          </div>
        </div>
      );

      const logoCodex = (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" stroke="#fff" strokeWidth="2" fill="none"/>
          <path d="M10 14 L13 17 L18 11" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
      const logoClaudeCode = (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M7 8 L14 4 L21 8 L21 20 L14 24 L7 20 Z" fill="#fff" opacity=".95"/>
          <path d="M11 14 L13 16 L17 11" stroke="#D97757" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
      const logoTrae = (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 4 L14 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M8 9 L20 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="14" cy="18" r="3" fill="#fff"/>
        </svg>
      );

      return (
      <>
        <section id="a">
          <h2>A · 从"只会说"到"会做"</h2>
          <p>Ch 3 里你用 AI Studio 做出了第一版能点的原型。但那是 AI <strong>给你一整份代码</strong>——你要改一行字都得整包重出。</p>
          <p>这一章要跨的关是：<strong>让 AI 住进你的项目里，直接改代码、直接跑、直接看到结果。</strong></p>
          <Compare
            left={<>
              <strong>ChatGPT / 网页版 AI</strong><br /><br />
              你：怎么把标题改成红色？<br />
              它：你可以加 CSS color: red ...<br /><br />
              <em>然后你自己打开文件、复制、粘贴、保存、刷新浏览器。它只能"告诉你"。</em>
            </>}
            right={<>
              <strong>Coding Agent（Codex / Claude Code / Trae）</strong><br /><br />
              你：把标题改成红色。<br />
              它：<span style={{ color: 'var(--amber-600)' }}>[读 App.tsx][改第 18 行][保存][重启 dev server]</span><br /><br />
              <em>它直接动手。你刷新浏览器就看到了。"不只告诉，还做。"</em>
            </>}
            leftLabel="只会说"
            rightLabel="会做"
          />
          <Callout kind="tip" title="代差级工具">
            Coding Agent 能<strong>读你项目所有文件、改它们、运行它们、看运行结果</strong>。这是一次跨代升级——用过一次你就不愿意退回网页版了。
          </Callout>
        </section>

        <section id="b">
          <h2>B · 三个桌面端 Agent：全景对比</h2>
          <p>2025 年这个领域跑在最前面的三个桌面端工具：</p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '20px 0',
          }}>
            {[
              { bg: '#10A37F', name: 'Codex IDE', role: 'OpenAI 官方', logo: logoCodex },
              { bg: '#D97757', name: 'Claude Code', role: 'Anthropic 官方', logo: logoClaudeCode },
              { bg: '#1E3A8A', name: 'Trae', role: '字节跳动', logo: logoTrae },
            ].map((x, i) => (
              <div key={i} style={{
                border: '1px solid var(--line)', borderRadius: 12, padding: 14, textAlign: 'center', background: 'var(--bg)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: x.bg, margin: '0 auto 10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{x.logo}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{x.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{x.role}</div>
              </div>
            ))}
          </div>
          <Callout kind="tip" title="先剧透结论">
            零基础首选 <strong>Codex IDE</strong>（下载一个 App 登录即用）。对代码质量要求高、或已经在 VS Code / Cursor 里工作 → Claude Code。国内网络不稳定、纯中文用户 → Trae。<strong>三个的"心法"是一样的</strong>（Plan + Apply + Verify），换工具只是换皮肤。
          </Callout>
          <div style={{ margin: '24px 0' }}>
            <a href="codex-demo.html"><button className="btn btn-amber">看 Agent 对话演示 →</button></a>
          </div>
        </section>

        <section id="c">
          <ToolCard
            brand="#10A37F"
            logo={logoCodex}
            name="Codex IDE"
            url="openai.com/codex"
            tagline="OpenAI 官方桌面版 — 下载、登录、选项目，三步到位"
            good={[
              '一个独立 App，不用懂 VS Code 也能用',
              '直接用 OpenAI 账号登录，零环境配置',
              'Plan / Approve / Apply 流程引导得最清晰',
              '官方维护，和 GPT 模型迭代同步最快',
            ]}
            bad={[
              '每月按 token 计费，重度使用有点肉疼',
              '对非常大的老项目（100+ 文件）反应偶尔偏慢',
            ]}
            bestFor={'\u96f6\u57fa\u7840\u7b2c\u4e00\u6b21\u88c5 Agent\u3001\u5e0c\u671b\u4e00\u952e\u5c31\u80fd\u7528\u7684\u4eba'}
            verdict="⭐⭐⭐⭐⭐ · 本课默认"
          />
        </section>

        <section id="d">
          <ToolCard
            brand="#D97757"
            logo={logoClaudeCode}
            name="Claude Code"
            url="claude.com/product/claude-code"
            tagline="Anthropic 官方 — 终端版起家，现已有 VS Code 扩展 + 桌面 App"
            good={[
              '代码质量和规划能力目前社区公认最稳',
              '对大项目的上下文理解特别好',
              '免费额度（Pro $20/月）用得很深',
              '支持本地跑命令、读 log、自动 debug',
            ]}
            bad={[
              '安装比 Codex IDE 多一步（要装 CLI 或扩展）',
              '国内网络需要稳定的代理',
            ]}
            bestFor={'\u5df2\u7ecf\u5728 VS Code / Cursor \u91cc\u5de5\u4f5c\u3001\u6216\u5bf9\u4ee3\u7801\u8d28\u91cf\u6709\u8981\u6c42\u7684\u4eba'}
            verdict="⭐⭐⭐⭐⭐ · 进阶主力"
          />
        </section>

        <section id="e">
          <ToolCard
            brand="#1E3A8A"
            logo={logoTrae}
            name="Trae"
            url="trae.ai"
            tagline="字节跳动出品 — 类 Cursor 的独立 IDE，免费模型额度大方"
            good={[
              '全中文界面，零基础中文用户最友好',
              '国内网络直连，不用配代理',
              '免费额度包含 Claude / GPT 模型调用',
              '安装包一键装完，像 VS Code 一样用',
            ]}
            bad={[
              '生态和插件比 VS Code 少',
              '国际用户社区相对小，出问题搜中文资料为主',
            ]}
            bestFor={'\u56fd\u5185\u7528\u6237\u3001\u4e0d\u60f3\u6298\u817e\u4ee3\u7406\u548c\u4fe1\u7528\u5361\u7684\u4eba'}
            verdict="⭐⭐⭐⭐ · 国内网络首选"
          />
        </section>

        <section id="f">
          <h2>F · 怎么选：一张决策图</h2>
          <div style={{
            background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 14,
            padding: 24, margin: '18px 0', fontSize: 14, lineHeight: 2, color: 'var(--ink-2)',
          }}>
            <div><strong>你的情况是？</strong></div>
            <div style={{ marginTop: 12, paddingLeft: 16, borderLeft: '2px solid var(--amber)' }}>
              <div>🆕 <strong>第一次装 Agent，越简单越好</strong> → <span style={{ color: 'var(--amber-ink)' }}>Codex IDE</span></div>
              <div>🇨🇳 <strong>国内网络，不想折腾代理</strong> → <span style={{ color: 'var(--amber-ink)' }}>Trae</span></div>
              <div>🧠 <strong>项目已经有点复杂，要最稳的写码质量</strong> → <span style={{ color: 'var(--amber-ink)' }}>Claude Code</span></div>
              <div>💼 <strong>已经是 VS Code / Cursor 用户</strong> → <span style={{ color: 'var(--amber-ink)' }}>Claude Code（扩展版）</span></div>
            </div>
          </div>
          <Callout kind="note" title="不用一次选对">
            三个的交互逻辑是<strong>同一套</strong>——学会一个，换工具只要半小时。别在选工具上卡住超过 20 分钟。<strong>本课正文用 Codex IDE 走完整条线</strong>。
          </Callout>
        </section>

        <section id="g">
          <h2>G · 10 分钟装好：Desktop 一键版</h2>
          <p>以前 Agent 工具都是命令行，劝退一半人。现在三个都有桌面 App，步骤全部变成"下载 → 双击 → 登录"：</p>
          <CardList items={[
            { n: '①', t: '去官网下安装包', d: 'Codex IDE: openai.com/codex · Claude Code: claude.com/product/claude-code · Trae: trae.ai。选你的操作系统（Mac / Windows），下载。' },
            { n: '②', t: '双击安装', d: '像装任何其他 App 一样。Mac 用户记得拖进 Applications 文件夹。' },
            { n: '③', t: '打开 + 登录', d: 'Codex IDE 用 OpenAI 账号、Claude Code 用 Anthropic 账号、Trae 用手机号/Google 账号。点一下登录按钮，浏览器跳转回来就登上了。' },
            { n: '④', t: '打开你 Ch 3 的项目', d: '在 App 里 File → Open Folder，选你在 Ch 3 下载的项目文件夹。侧边栏出现文件列表 = 你进去了。' },
            { n: '⑤', t: '打开右侧对话框', d: '把本章 H、I 两节的心法放进去，第一句话可以是 "帮我看一下这个项目，告诉我它的结构"。' },
          ]} />
          <Callout kind="stuck" title="报错了怎么办">
            把报错<strong>原文</strong>贴进浏览器的 ChatGPT 里，加一句"我在装 [工具名]，这是报错，怎么办"。90% 的安装问题这么问就能解决。<strong>不要自己瞎猜</strong>——AI 是 debug 神器。
          </Callout>
          <Callout kind="note" title="如果你想玩 CLI 版">
            三个工具都保留了命令行版本（给喜欢终端的老派开发者）。零基础用户无视这部分即可——桌面版能做的事完全一样。
          </Callout>
        </section>

        <section id="h">
          <h2>H · 核心心法 · 描述结果，不描述代码</h2>
          <p>这一条是 Coding Agent 时代最重要的能力。<strong>你让 AI 做事的方式，决定它做出来的质量。</strong></p>
          <Compare
            left={<>
              <strong>❌ 描述代码</strong><br /><br />
              "在 App.tsx 的 useState 里加一个 isPlaying 的布尔变量，然后在 onClick 里 setIsPlaying(!isPlaying)，再用三目运算符根据 isPlaying 显示不同 icon。"
              <br /><br />
              <em>你在替它写代码。如果你能写到这个精度，你已经不需要它了。</em>
            </>}
            right={<>
              <strong>✓ 描述结果</strong><br /><br />
              "让播放按钮能切换状态：没播的时候显示 ▶，播放中显示 ▮▮，点一下来回切。"
              <br /><br />
              <em>你只说要什么效果。怎么实现让它定。</em>
            </>}
            leftLabel="当程序员"
            rightLabel="当产品经理"
          />
          <Callout kind="warn" title="记这一句">
            <strong>你是甲方，Agent 是施工队。</strong>甲方说"我要一个温馨的阳台"。施工队负责挑砖、定尺寸、砌墙。你要是亲自告诉工人哪块砖放哪——那你就自己盖就行了，要工人干嘛？
          </Callout>
          <p>这一条在<strong>所有</strong>工具上都适用。Codex / Claude Code / Trae 换来换去，这个心法不变。</p>
        </section>

        <section id="i">
          <h2>I · 节奏 · Plan → Apply → Verify</h2>
          <p>三个工具背后是同一套交互节奏。记住这三步，用哪个都顺：</p>
          <CardList items={[
            { n: '1', t: 'Plan · 它先说打算做啥', d: '你说完需求，它不会立刻动手，会先给你一份"我打算改这几个文件，改成这样"的计划。' },
            { n: '2', t: 'Apply · 你点头它才动手', d: '你看 Plan 觉得方向对，点 Approve / 回车确认。它才开始改代码，改完会显示 diff（哪行改了啥）。' },
            { n: '3', t: 'Verify · 你亲自去看结果', d: '刷新浏览器、点一下功能，验收你最早设定的标准。不对就告诉它"第 2 条没达标，再改"。' },
          ]} />
          <Callout kind="tip" title="Plan 是你的安全带">
            看到方向不对，立刻打断："不对，我的意思是……"。<strong>改 Plan 永远比改代码便宜。</strong>
          </Callout>
          <h3 style={{ marginTop: 24 }}>Approve / Reject 怎么判断？</h3>
          <p>Plan 发过来，脑子里过三条线：</p>
          <CardList items={[
            { n: '①', t: '改对地方了吗', d: '它要动的文件是不是相关文件？不相关的文件突然被改要警惕。' },
            { n: '②', t: '范围合适吗', d: '一个"改颜色"的需求，它要动 8 个文件——过度了。告诉它"只改 X 文件就行"。' },
            { n: '③', t: '方向对吗', d: '它理解对了你的意图吗？有时候它理解成另一件事，那就直接拒绝 + 澄清。' },
          ]} />
          <Callout kind="warn" title="最危险的一句话">
            <strong>"你看着办吧。"</strong>——Agent 听到这句会自由发挥。做出来的东西你看不懂、也改不了。<strong>永远给它明确的方向。</strong>
          </Callout>
        </section>

        <section id="j">
          <h2>J · 第一次对话：刻意小</h2>
          <p>不要一上来就"加一个大功能"。第一次对话永远<strong>刻意小</strong>——目的是跑通流程，建立感觉：</p>
          <CodeBlock>{`> 把 Header 背景色从白色改成温暖的米色
  （大概像咖啡加很多奶的那种米色）`}</CodeBlock>
          <p>Agent 会这样走完这一轮：</p>
          <ol style={{ paddingLeft: 22, lineHeight: 1.9 }}>
            <li>🔍 <strong>读</strong> 相关文件，理解当前是什么</li>
            <li>📋 <strong>提 Plan</strong>：打算改哪个文件、改成什么</li>
            <li>⏸ <strong>等你确认</strong>（Approve / Reject）</li>
            <li>✏️ <strong>执行</strong>，显示 diff</li>
            <li>✅ 你刷新浏览器，按验收标准过一遍</li>
          </ol>
          <p>这一个完整回合跑过 3 次，你就知道它怎么工作了。剩下都是这个动作的放大版。</p>
          <p>下一章 Ch 5，我们把精力从"会用 Agent"升级到<strong>"让产品从原型变成真能上线的东西"</strong>——数据怎么活起来、AI 能力怎么接进去、细节怎么打磨。那一章是整个课程最核心的一章。</p>
        </section>
      </>
      );
    },
    homework: [
      '从 Codex IDE / Claude Code / Trae 三个里选一个装好 + 登录成功',
      '用你的 Agent 对 Ch 3 的原型做 5 次小改（颜色 / 文案 / 间距 / 布局 随便），每条都带验收标准',
      '故意做一次"描述代码"的坏示范 vs"描述结果"的好示范，感受差距',
      '至少中断过一次 Plan（发现方向不对，告诉它重来）',
      '你能用 30 秒向朋友解释"Plan / Apply / Verify"三步的区别就算过',
    ],
  },

  // ───────────────────────────────────────────────────────────── Ch 6
  6: {
    subtitle: '从"只在我电脑上能跑"到"全世界有个链接"',
    sections: [
      { id: 'a', label: '为什么是 Vercel' },
      { id: 'b', label: 'Git 是什么（最小必要版）' },
      { id: 'c', label: '10 分钟上线流程' },
      { id: 'd', label: '环境变量：藏你的 API Key' },
      { id: 'e', label: '链接拿到手之后' },
    ],
    Body: () => (
      <>
        <section id="a">
          <h2>A · 为什么是 Vercel</h2>
          <p>"上线"过去是件麻烦事：买服务器、配域名、写部署脚本……Vercel 把这些都变成<strong>点几下鼠标</strong>。你提交代码，它自动打包 + 发布，2 分钟后你有一个真链接。</p>
          <Callout kind="tip">它免费额度对个人项目绰绰有余。做完 10 个小项目也不会花钱。</Callout>
        </section>

        <section id="b">
          <h2>B · Git 是什么（最小必要版）</h2>
          <p>Vercel 要从 <strong>GitHub</strong> 拉代码，所以你得先把项目推到 GitHub。Git 的完整体系能讲一本书，你现在只要懂这三个动作：</p>
          <CardList items={[
            { n: '①', t: 'commit', d: '拍一张"当前代码的照片"。出 bug 了可以回到任何一张旧照片。' },
            { n: '②', t: 'push',   d: '把本地的所有照片上传到 GitHub，云端有备份。' },
            { n: '③', t: 'pull',   d: '把云端的照片拉回本地（多设备或多人协作用）。' },
          ]} />
          <Callout kind="note">
            你<strong>不需要</strong>手敲这些命令。让 Codex 替你做："把当前改动提交上去，commit message 写 '加了暗色模式'。"就行。</Callout>
        </section>

        <section id="c">
          <h2>C · 10 分钟上线流程</h2>
          <CardList items={[
            { n: '①', t: '在 GitHub 新建一个 repo', d: '名字随便。Private 或 Public 都行。' },
            { n: '②', t: '让 Codex 把你的项目推上去', d: '"帮我初始化 git，连到这个 GitHub 地址，把所有代码 push 上去。"' },
            { n: '③', t: '去 vercel.com 登录（用 GitHub 账号）', d: '它会自动列出你的 repo。' },
            { n: '④', t: '选你的 repo，点 Deploy', d: '啥都别改。默认设置就能跑。' },
            { n: '⑤', t: '等 60 秒', d: '你得到一个 xxx.vercel.app 的链接。打开它。你的 App 在网上了。' },
          ]} />
          <Callout kind="tip" title="你做到这一步，你就是一个已经'上过线'的人了">
            这一下比前面所有代码都重要。因为它意味着<strong>任何人都能点开你的东西</strong>。世界对你的 App 有了反应。</Callout>
        </section>

        <section id="d">
          <h2>D · 环境变量：藏你的 API Key</h2>
          <p>如果你在 Ch 5 接了 Gemini / OpenAI，你的 API Key 是<strong>不能提交到 GitHub</strong>的——提交了别人会偷来用，账单算你的。</p>
          <CardList items={[
            { t: '本地开发：放在 .env.local 文件里', d: 'Codex 装项目时会帮你建好。.gitignore 已经把它排除了，不会被 push。' },
            { t: '上线后：在 Vercel 后台配置', d: 'Project Settings → Environment Variables → 粘贴 key。部署会自动用它。' },
          ]} />
          <Callout kind="warn" title="最常见的事故">
            不小心把 .env.local 提交了。看到自己 key 在 GitHub 上能搜到，马上去 OpenAI / Google 后台<strong>删掉那个 key</strong>，重新生成一个。</Callout>
        </section>

        <section id="e">
          <h2>E · 链接拿到手之后</h2>
          <p>发给 3 个朋友。不要用"你看我做了什么"开头——<strong>用一句问句</strong>：</p>
          <blockquote>"帮我试下这个，你最想看到它加什么？"</blockquote>
          <p>他们的回答，就是你下一轮迭代的素材。你已经从"学写代码"毕业，进入"做产品"了。</p>
        </section>
      </>
    ),
    homework: [
      '把你的项目推到 GitHub（用 Codex 帮你做）',
      '部署到 Vercel，拿到 xxx.vercel.app 链接',
      '如果有 API Key，正确配好环境变量',
      '把链接发给 3 个朋友，收集他们的第一反应',
    ],
  },

  // ───────────────────────────────────────────────────────────── Ch 7
  7: {
    subtitle: '从白纸开始，一次走完整条链路',
    sections: [
      { id: 'a', label: '8 Stage 流程总览' },
      { id: 'b', label: 'Stage 1–2 · 概念与原型' },
      { id: 'c', label: 'Stage 3–5 · 从原型到产品' },
      { id: 'd', label: 'Stage 6–7 · 打磨与上线' },
      { id: 'e', label: 'Stage 8 · 拿到反馈' },
      { id: 'f', label: '每一步大概卡在哪' },
    ],
    Body: () => (
      <>
        <section id="a">
          <h2>A · 8 Stage 流程总览</h2>
          <p>前 6 章你跟着 SleepForest 走过一遍。这一章，你<strong>自己再走一遍</strong>。题目任选，节奏你定。</p>
          <CardList items={[
            { n: '1', t: 'Concept', d: '一句话 + 1-Pager。' },
            { n: '2', t: 'Prototype', d: 'AI Studio 做出能点的原型。' },
            { n: '3', t: 'Skeleton', d: '下载到本地，Codex 接手。' },
            { n: '4', t: 'Core Feature', d: '接入那一个"灵魂"功能（AI、音频、数据库）。' },
            { n: '5', t: 'Polish', d: '动画、间距、文案，5 个小细节。' },
            { n: '6', t: 'Bug Hunt', d: '找 3 个不同浏览器 / 手机测一轮。' },
            { n: '7', t: 'Deploy', d: 'Vercel 上线。' },
            { n: '8', t: 'Share & Learn', d: '发给 5 个人，整理他们的反应。' },
          ]} />

          <h3 style={{ marginTop: 32 }}>先看 3 个跑过这一遍的真实项目</h3>
          <p>下面这三个都是"一个人 + AI"在几天到两周内做出来、被网上的陌生人实打实用过的东西。你做的东西不一定要像它们——但你会发现，它们走的就是<strong>同一条 8 Stage 链路</strong>：</p>
          <CardList items={[
            { n: '🐱', t: '小猫补光灯 · 一人 + Cursor + 一个周末',
              d: '打开网页整屏变成补光板，一只几何风小猫站在中间，摆动作它就跟着反应——专门解决"晚上自拍光不够"。作者用 Cursor 两天写完发在即刻，一周之内全网刷屏，成了中文互联网最广为人知的 Vibe Coding 代表作。灵魂功能压到一句：屏幕当补光板 + 会动的猫。' },
            { n: '✈️', t: 'fly.pieter.com · levelsio + Cursor + 3 小时',
              d: 'Pieter Levels 在 X 上直播让 Cursor 生成的浏览器 3D 飞行游戏。Three.js 一把梭、没有 UI、点进去就飞。就靠"一个人 + AI + 3 小时"这件事出圈，10 天内做到月入六位数美金。灵魂功能：一把能飞的杆。' },
            { n: '🍎', t: 'Cal AI · 两个高中生 + Cursor + GPT',
              d: '拍一下你吃的东西，AI 直接给卡路里。没传统开发团队、没融资，两个高中生在宿舍里做出来的。一年 500 万下载、年化 ARR 超千万美金，登过 App Store 健康榜第一。灵魂功能：一次拍照 → 一个数字。' },
          ]} />
          <Callout kind="tip" title="共同点">
            三个项目都把灵魂功能压到<strong>一句话能讲完、第一屏就发生、不需要注册</strong>。这就是 Vibe Coding 时代小项目的标准模板——<strong>不做"平台"，做"一下子就懂的小东西"</strong>。你的 8 Stage 要对标的不是大厂产品，是这种「周末级」的单点利器。
          </Callout>
        </section>

        <section id="b">
          <h2>B · Stage 1–2 · 概念与原型</h2>
          <p>这两步不要贪多。用 Ch 2 的模板写到能 30 秒讲清楚，再进 AI Studio。</p>
          <p>一个合格的「一句话」长什么样？看真实案例——</p>
          <CardList items={[
            { t: '小猫补光灯', d: '"打开就是一块补光板，中间一只陪你自拍的小猫。" —— 21 个字，听完直接脑补出画面、知道谁会用、怎么用。' },
            { t: 'fly.pieter.com', d: '"浏览器打开就能开飞机，什么引导都没有。" —— 不解释机制、不讲技术栈，直接说体验。' },
            { t: 'Cal AI', d: '"拍一下食物，告诉你卡路里。" —— 一个动作、一个输出。比"我要做一个健康管理平台"好一百倍。' },
          ]} />
          <Callout kind="warn" title="时间盒子">
            概念最多 2 小时，原型最多 2 小时。超时就<strong>先接受当前版本</strong>，进下一 stage——后面还可以回来改。你写出的一句话，如果比上面三条长、或朋友听完还要追问"然后呢？"，就是没收敛好，回去砍。</Callout>
        </section>

        <section id="c">
          <h2>C · Stage 3–5 · 从原型到产品</h2>
          <p>这是最长的一段，也是你真正"长功夫"的地方。建议节奏：</p>
          <CardList items={[
            { t: 'Stage 3 · 把原型让 Codex 接管', d: '"帮我读一下这个项目，告诉我它的结构" 是一句很好的开场白。' },
            { t: 'Stage 4 · 一次只接一个灵魂功能', d: '不要同时做"AI 生成文本"+"加音频"+"保存历史"。一个跑通，再下一个。对照案例——小猫补光灯的灵魂功能只有"全屏白光 + 猫跟动作反应"；Cal AI 只有"拍照 → 一个数字"；fly.pieter.com 只有"按键 → 飞机动"。越狠地砍，越容易做完。' },
            { t: 'Stage 5 · 刻意留一个下午做打磨', d: '这是 Ch 5 讲过的东西——审美差距就是产品差距。小猫补光灯能出圈，核心不是"补光"这个功能，而是猫的几何造型好看、呼吸动画有呼吸感、点按钮时光晕扩散有质感。剥掉这些细节，它就是一张白屏。' },
          ]} />
        </section>

        <section id="d">
          <h2>D · Stage 6–7 · 打磨与上线</h2>
          <p>Bug Hunt 不是"等 bug 出现"——是<strong>主动去找</strong>。换一个浏览器试（Chrome → Safari），换一个手机试（iOS → Android），网络断开再连上看会不会崩。</p>
          <p>举个真实的坑：小猫补光灯最初版本在 iOS Safari 上全屏变白后点击会把地址栏顶出来，整块补光被切掉——这种 bug 你在 Mac Chrome 里永远遇不到。作者上线前专门拉了 5 台不同的手机过一轮，才挖出来。<strong>只在自己电脑上测 = 没测。</strong></p>
          <p>上线流程照着 Ch 6 走一遍就好。你第二次做应该在 30 分钟内完成。</p>
        </section>

        <section id="e">
          <h2>E · Stage 8 · 拿到反馈</h2>
          <p>发给 5 个人。5 这个数字是刻意的——少了拿不到不同意见，多了你会陷入"到底听谁的"的焦虑。</p>
          <p>把他们的反应整理成一个表：</p>
          <CodeBlock>{`| 朋友 | 第一反应 | 第一次困惑的地方 | 最想要的改进 |
|------|---------|-----------------|-------------|
| A    | ...     | ...             | ...         |
...`}</CodeBlock>
          <p>看表里的<strong>重复项</strong>——3 个人都说的一件事，一般就是真的事。</p>
        </section>

        <section id="f">
          <h2>F · 每一步大概卡在哪</h2>
          <Callout kind="stuck">
            <strong>概念卡住</strong> → 90% 是想做太大，砍一半。<br/>
            <strong>原型出不来想要的感觉</strong> → Prompt 里加"参考：XXX App 的视觉"。<br/>
            <strong>Codex 改坏了</strong> → git 回退到上一个 commit，让它用不同思路重来。<br/>
            <strong>上线 404</strong> → 99% 是 Vercel 的 build settings 没对齐；把错误原文贴回 Codex。<br/>
            <strong>做到一半失去动力</strong> → 很正常。去散步 30 分钟，回来看你的 Stage 表，找最小的下一步。
          </Callout>
        </section>
      </>
    ),
    homework: [
      '完成一个属于你自己的 8 Stage 跑通',
      '产出物：一个可以打开的链接 + 一页「反馈整理」',
      '没做到上线也没关系——把你卡在哪个 Stage、为什么卡，写清楚',
    ],
  },

  // ───────────────────────────────────────────────────────────── Ch 8
  8: {
    subtitle: '核心不是工具，是「能搭建」这件事本身',
    sections: [
      { id: 'a', label: 'Vibe Coding 的核心感悟' },
      { id: 'b', label: '「能搭建」拆开来是哪 5 种能力' },
      { id: 'c', label: '这 5 种能力怎么练' },
      { id: 'd', label: '接下来 3 个月的节奏' },
      { id: 'e', label: '最后几句话' },
    ],
    Body: () => (
      <>
        <section id="a">
          <h2>A · Vibe Coding 的核心感悟</h2>
          <p>课程走完了。盘一下，你真正学到的不是「Cursor 怎么用」、「Vercel 怎么点」——这些东西 6 个月之后工具会换、流程会变、UI 也会重做。</p>
          <p>你真正拿到手里的，是<strong>「能搭建」</strong>这件事本身。</p>
          <Compare
            left={<><strong>写代码</strong><br/>熟练使用某一种编程语言的语法和生态，让机器理解你要干什么。</>}
            right={<><strong>搭建</strong><br/>把脑子里的模糊想法，拆成一个个具体步骤，让 AI（或你自己）实现出来，并且知道每一步好坏的标准。</>}
            leftLabel="过去的核心能力"
            rightLabel="Vibe Coding 时代的核心能力"
          />
          <p>「写代码」这件事本身正在被 AI 吃掉。但「搭建」不会——因为它不是一门技术，是一套认知。</p>
          <Callout kind="tip" title="这一章要讲的">
            把「搭建」这件事拆开看：它不是一种能力，是<strong>五种底层能力的组合</strong>。它们每一个都和「会写代码」没关系；但少了它们，就算 AI 再强，也做不出能被人用的东西。
          </Callout>
        </section>

        <section id="b">
          <h2>B · 「能搭建」拆开来是哪 5 种能力</h2>
          <p>这 5 种能力，你在前面 7 章里已经悄悄练过了。这里给它们起个名字：</p>
          <CardList items={[
            { n: '1', t: '拆解（Decompose）', d: '把一个大的、模糊的想法，切成「AI 一次能处理」的小块。每一块可以被讲清楚、被实现、被验证。整门课里的 8 Stage、Plan 模式、"先做最小版本"，本质都是在练这一条。' },
            { n: '2', t: '描述（Describe）', d: '用语言把一个还没存在的东西讲清楚。Prompt 是描述；写 1-Pager 是描述；给 Codex 的 "Plan" 也是描述。Vibe Coding 时代里，写作能力 ≈ 编程能力。' },
            { n: '3', t: '品味（Taste）', d: '在一堆"都能跑"的方案里，知道哪个是好的。颜色、间距、一个按钮放在哪、一个文案用不用"你"开头——这些细节没有对错，只有品味。品味决定了 AI 做出来的东西是 60 分还是 90 分。' },
            { n: '4', t: '调试（Debug）', d: '不是「修 bug 的技术」，是一种信念——<strong>问题一定有根因，只要切得够小就找得到</strong>。Vibe Coding 时代，调试不再是读栈追代码，而是"缩小范围 → 隔离变量 → 最小复现"这种思维方式。' },
            { n: '5', t: '发布（Ship）', d: '最反直觉的一条。90% 的人卡在「还不够好」，所以永远发不出去。能发布的人，不是做得比别人好，是更早地愿意把不完美的东西交出去，换取真实反馈。' },
          ]} />
          <Callout kind="note" title="为什么是这 5 个">
            因为它们是<strong>工具之外的东西</strong>。Cursor 会被下一个 AI 编辑器替代，但「拆解一个问题」的能力换个工具依然有效。AI 越强，这 5 种能力的价值越大——因为"剩下能让你区别于别人"的东西，就只剩这些了。
          </Callout>
        </section>

        <section id="c">
          <h2>C · 这 5 种能力怎么练</h2>
          <p>每一条都有一个<strong>日常就能做</strong>的练法。不用等"下一个项目"才开始。</p>

          <h3>1 · 拆解：写下来，再去问 AI</h3>
          <p>下一次想让 AI 做点什么之前，<strong>先用三行字写下来你要它做的三步</strong>。如果你连三行都写不出来，说明不是 AI 不行——是你自己还没想清楚。</p>
          <CardList items={[
            { n: '·', t: '每天练法', d: '打开一个你喜欢的 App，挑一个它的功能（比如"小猫补光灯"的"长按切色温"），自己逆向拆：如果让我做，会先做哪一步、再做哪一步？能拆到"一句话说得清"的粒度就行了。' },
          ]} />

          <h3>2 · 描述：把"生气地抱怨 AI"变成"换一种说法"</h3>
          <p>当 AI 给你错答案时，不要立刻说「AI 真笨」。先问自己：<strong>我是不是没讲清楚？</strong> 同一件事试着用 3 种不同的说法再问一次，对比哪种出来的结果最准。这就是 prompt 的"手感"。</p>
          <CardList items={[
            { n: '·', t: '每天练法', d: '写。日记、公众号、小红书、Twitter 都行。写作量越大，描述能力越强。一个能把自己思路清楚写出来的人，几乎都会是好的 Vibe Coder。反过来也成立。' },
          ]} />

          <h3>3 · 品味：每周逼自己说 10 次"为什么好"</h3>
          <p>品味不是天生的，是积累出来的。但积累需要<strong>有意识</strong>。大部分人刷了 10000 个 App 也没长品味，是因为他们从来没在看的时候问自己："这个好在哪？"</p>
          <CardList items={[
            { n: '·', t: '每周练法', d: '存 10 张你觉得好的界面截图，每张写一句"它好在哪"。不准写"就是好看"，要说出来——"字重对比大胆"、"留白多"、"按钮圆角和卡片圆角对上了"。一开始说不出来很正常，练 4 周你就能说了。' },
            { n: '·', t: '参考对象', d: '认真用一周 Linear、Arc、Things、Raycast、Notion。不是当工具用，是当"教材"用。每次用的时候都问："他们为什么这样做，不那样做？"' },
          ]} />

          <h3>4 · 调试：下次卡住，先停下来问三句</h3>
          <p>调试的本质是"<strong>不慌地缩小范围</strong>"。新手的问题不是调不出来，是一遇到问题就瞎改一通，越改越乱。</p>
          <CardList items={[
            { n: '·', t: '每次卡住时', d: '先停 30 秒，问自己三句话——「我 100% 确认什么是对的？」「我 100% 确认什么是错的？」「最小的、能复现这个错的东西是什么？」把这三句话答清楚，80% 的问题自己就浮出来了。' },
            { n: '·', t: '每天练法', d: '不仅代码能练。生活里任何"东西坏了"的时刻都能练——Wi-Fi 不好、某个 App 闪退、打印机出不了纸。试着像调试一样去定位它，而不是立刻重启/骂骂咧咧。这是一种可以日常磨的肌肉。' },
          ]} />

          <h3>5 · 发布：给自己一个 deadline，丑也发</h3>
          <p>这一条最反直觉，也最关键。你会想："等我再改改就发。" 这个"再改改"永远没有终点。<strong>fly.pieter.com 上线的第一版界面粗糙到不行，10 天后开始赚钱；小猫补光灯的第一个 TestFlight 只有一个按钮，就那样发了。</strong></p>
          <CardList items={[
            { n: '·', t: '每周练法', d: '每周发一个东西出去。不一定是 App——一篇文章、一条短视频、一个 Figma 截图、甚至一个 bug 百出的 demo 链接。重点不是内容多好，是"我按下了那个发布按钮"。' },
            { n: '·', t: '心法', d: '所有产品的第一个用户看到的东西，都比作者自己想象的"可以发"的门槛低得多。你以为别人会嘲笑你——99% 的情况下，没人在看，剩下 1% 里的大部分人是来鼓励你的。' },
          ]} />

          <Callout kind="tip" title="一个你可以贴在桌上的公式">
            <strong>搭建力 = 拆解 × 描述 × 品味 × 调试 × 发布</strong><br/>
            是乘法，不是加法。任何一项是 0，整体就是 0。所以别只练你喜欢的那一项。
          </Callout>
        </section>

        <section id="d">
          <h2>D · 接下来 3 个月的节奏</h2>
          <p>能力是磨出来的，不是读出来的。给自己一个 3 个月的真实节奏，把上面那 5 种能力装进去练：</p>
          <CardList items={[
            { n: '月 1', t: '再做 2 个小项目', d: '每个 1–2 周。别求大，求"再跑一遍 8 Stage"。核心不是产品本身——是让"拆解 → 描述 → 发布"的肌肉形成记忆。Pieter Levels 的 "12 startups in 12 months" 就是这个逻辑，他后来的 PhotoAI、Remote OK 都是在这种节奏里长出来的。' },
            { n: '月 2', t: '找到一个真的在用你东西的人', d: '不是朋友捧场——是陌生人。哪怕只有 1 个。然后为他做迭代。这一步是在练「调试」和「品味」——因为真实反馈会把你的自恋和盲区一刀切开。小猫补光灯第一周的迭代（眨眼速度、色温、前置摄像头）全部来自即刻上陌生人的反馈，不是作者脑补。' },
            { n: '月 3', t: '做一个稍大的项目', d: '加数据库、登录、多页面。这时候补一点 JavaScript / React 的基础也不迟——但要带着具体问题去学，不要从头啃教科书。Cal AI 就是从"一键拍照算卡路里"这个最小核心，半年长成带订阅、账户、社群的 SaaS，每一步的加法都是因为用户要。' },
          ]} />
          <h3>几个值得泡的地方</h3>
          <CardList items={[
            { t: '即刻 · #AI编程 / #独立开发', d: '中文独立开发者最密集的地方。别只潜水——发一条"我做了这个"，你会发现这社区比你想象的友好。' },
            { t: 'X · #buildinpublic', d: 'Pieter Levels、Marc Lou、@jasonzhou1993 等一人 founder 天天在这里公开"今天做了啥、今天赚了多少"。跟 5 个你喜欢的 builder，刷一个月，你对"一个人能做到什么程度"的认知会整个被更新。' },
            { t: 'Show HN / Product Hunt', d: '学"什么是好的 one-person app"。fly.pieter.com、Cal AI 都是在这两个地方第一次被大范围看见的。' },
          ]} />
        </section>

        <section id="e">
          <h2>E · 最后几句话</h2>
          <p>这门课真正教给你的不是"学会编程"，是<strong>"会搭建"</strong>。这是两件完全不同的事。前者是一门技术，会被时代替代；后者是一套认知，会陪你很久。</p>
          <p>工具会一直变。今天叫 Cursor，明天叫别的。但拆解一个问题、把它讲清楚、知道什么是好的、不慌地调试、愿意发布——这五件事换什么工具都有效。<strong>你现在拿到的，是不怕被替代的东西。</strong></p>
          <blockquote>
            "品味比语法重要。"<br />
            这句话从 Ch 1 到现在出现了不下 10 次。你现在应该懂它在说什么——它是在说，真正值得练的，是那些不会被工具替代掉的能力。
          </blockquote>
          <p>下次见，在你的 <code>xxx.vercel.app</code> 链接下面。</p>
          <p style={{ textAlign: 'right', color: 'var(--ink-3)', marginTop: 40 }}>— Holland</p>
        </section>
      </>
    ),
    homework: [
      '在 5 种能力（拆解 / 描述 / 品味 / 调试 / 发布）里，诚实地给自己打分，1–10 分。最低的那一项，是你下个月要重点练的。',
      '写一段话（200 字左右）：这门课之前 vs 之后，你对"做东西"这件事的理解变了什么。',
      '写下来：接下来 3 个月想做的 3 个小项目，每个用一句话讲清楚。（这本身就是在练「描述」。）',
    ],
  },
};
