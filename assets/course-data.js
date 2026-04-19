// Course data: 8 chapters, parts, stages, metadata.
// Single source of truth for homepage map + chapter reader.

const COURSE = {
  title: '零基础 Vibe Coding',
  subtitle: '从「有想法」到「网上有人在用」，压缩成一周。',
  author: 'Holland',
  totalHours: '约 14 小时',

  parts: [
    {
      id: 'p1', name: 'Part 1', title: '心法与准备', tagline: '搞懂是什么、想清楚做什么',
      hours: '~2h',
    },
    {
      id: 'p2', name: 'Part 2', title: '跟着 SleepForest 走一遍', tagline: '拆解一个完整项目，看懂每一步',
      hours: '~6h',
    },
    {
      id: 'p3', name: 'Part 3', title: '自己做一遍', tagline: '从白纸到上线 + 下一步路线图',
      hours: '~6h',
    },
  ],

  chapters: [
    {
      id: 1, partId: 'p1', num: '01',
      title: 'Vibe Coding 是什么',
      goal: '听完之后你会有一种"这事儿我能干"的感觉',
      duration: '45 分钟', difficulty: 1, handsOn: false,
      tags: ['概念', '案例欣赏'],
    },
    {
      id: 2, partId: 'p1', num: '02',
      title: '找到你的 Concept',
      goal: '离开时，你会有一个用一句话讲得清楚的项目想法',
      duration: '1 小时', difficulty: 1, handsOn: true,
      tags: ['MVP', '1-Pager'],
    },
    {
      id: 3, partId: 'p2', num: '03',
      title: '用 Google AI Studio 做原型',
      goal: '在浏览器里做出一个能点、能交互的原型。不写一行代码',
      duration: '90 分钟', difficulty: 2, handsOn: true,
      tags: ['AI Studio', 'Prompt'],
    },
    {
      id: 4, partId: 'p2', num: '04',
      title: '认识 Codex',
      goal: '第一次让 Codex 改动一个真实项目',
      duration: '90 分钟', difficulty: 2, handsOn: true,
      tags: ['Codex', 'CLI'],
    },
    {
      id: 5, partId: 'p2', num: '05',
      title: '从原型到完整产品（含调试与打磨）',
      goal: '看懂一个完整前端项目怎么组成、一步步把原型长大成产品',
      duration: '3 小时', difficulty: 3, handsOn: true,
      tags: ['组件', 'API', '调试', '品味'],
      featured: true,
    },
    {
      id: 6, partId: 'p2', num: '06',
      title: '什么是 Vercel？部署上线',
      goal: '你的项目从"只在我电脑上能跑"变成"全世界都能打开的一个链接"',
      duration: '90 分钟', difficulty: 2, handsOn: true,
      tags: ['Git', 'Vercel', '环境变量'],
    },
    {
      id: 7, partId: 'p3', num: '07',
      title: '动手实战 · 从零做你自己的项目',
      goal: '一个上线的、能分享的、你自己从零做的小项目',
      duration: '4–6 小时', difficulty: 4, handsOn: true,
      tags: ['大作业', '8 Stage'],
    },
    {
      id: 8, partId: 'p3', num: '08',
      title: '继续 Vibe 下去',
      goal: '把「能搭建」拆成 5 种底层能力，给你一套工具之外、值得练一辈子的东西',
      duration: '1 小时', difficulty: 1, handsOn: false,
      tags: ['核心感悟', '能力本质', '3 个月节奏'],
    },
  ],

  principles: [
    { k: '先讲明白，再做明白', v: '前半程只看、不急着动手' },
    { k: '从概念到上线',       v: '不讲半截，走完整条链路' },
    { k: '品味比语法重要',     v: 'Vibe Coding 时代，这句话会反复出现' },
  ],
};

window.COURSE = COURSE;
