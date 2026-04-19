// Top navigation shared across pages
const Nav = ({ current = 'home' }) => (
  <div className="nav">
    <a href="index.html" style={{ textDecoration: 'none', color: 'inherit' }} className="brand">
      <span className="brand-dot" />
      <span>Holland 的零基础编程课</span>
    </a>
    <div className="tabs">
      <a href="index.html"><button className={'tab ' + (current === 'home' ? 'active' : '')}>首页</button></a>
      <a href="overview.html"><button className={'tab ' + (current === 'overview' ? 'active' : '')}>课程地图</button></a>
      <a href="chapter-5.html"><button className={'tab ' + (current === 'reader' ? 'active' : '')}>章节阅读</button></a>
      <a href="prompt-lab.html"><button className={'tab ' + (current === 'prompt' ? 'active' : '')}>Prompt 练习台</button></a>
      <a href="codex-demo.html"><button className={'tab ' + (current === 'codex' ? 'active' : '')}>Codex 演示</button></a>
    </div>
    <div className="who">
      <span>学员</span>
      <div className="avatar">H</div>
    </div>
  </div>
);

window.Nav = Nav;
