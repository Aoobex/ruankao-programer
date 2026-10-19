/* 软考程序员 5天冲刺 — 纯前端离线版，数据存 localStorage */
(function () {
  const DATA = window.RK_DATA || { modules: [], questions: [] };
  const MODULES = DATA.modules;
  const QUESTIONS = DATA.questions;
  const BY_ID = {};
  QUESTIONS.forEach(q => { BY_ID[q.id] = q; });
  const M = {};
  MODULES.forEach(m => { M[m.id] = m; });

  /* 知识卡例题：按 模块id + 卡片序号 挂到卡片上 */
  const EX = {};
  (DATA.examples || []).forEach(e => { EX[e.m + '#' + e.i] = e.ex; });
  MODULES.forEach(m => m.cards.forEach((c, i) => {
    const ex = EX[m.id + '#' + i];
    if (ex) c.ex = ex;
  }));

  /* ---------- 状态 ---------- */
  const KEY = 'rk5.v1';
  const DEF = { cards: {}, days: {}, picked: {}, wrong: {}, mock: [], start: todayStr(), examDate: '' };
  let S = load();
  function todayStr() { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function load() {
    // 深拷贝默认值，避免和 DEF 共享同一个对象（否则“清空进度”会残留计数）
    const base = JSON.parse(JSON.stringify(DEF));
    try { return Object.assign(base, JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { return base; }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(S)); }

  /* ---------- 计划 ---------- */
  const PLAN = [
    { d: 1, title: '打地基：计算机系统 + C 语言入门', mods: ['cs', 'c'], hours: '4h 知识卡 + 2h 刷题',
      tasks: ['学完「计算机系统基础」18 张卡（进制/补码/校验码必背）', '学完「C 语言速成」前 8 张卡（骨架、分支、循环、数组）', '刷 cs + c 模块题目各 20 道，错题看解析', '今天目标：上午卷正确率 ≥ 50%'] },
    { d: 2, title: '操作系统 + 程序设计语言', mods: ['os', 'lang'], hours: '4h 知识卡 + 2h 刷题',
      tasks: ['学「操作系统基础」：三态模型、P/V 操作、页面置换、磁盘调度', '学「程序设计语言基础」：编译过程、传值传址、后缀表达式', '刷 os + lang 各 20 道', '把「P/V 操作」和「编译各阶段错误」两张卡背到能默写'] },
    { d: 3, title: '重头戏：数据结构与算法', mods: ['ds', 'media', 'std'], hours: '5h 知识卡 + 2h 刷题',
      tasks: ['学「数据结构与算法」24 张卡：树的性质、排序对比表、图的性质表必须背熟', '刷 ds 全部 55 道，正确率目标 ≥ 55%', '顺带过「多媒体基础」「标准化与知识产权」共 15 张卡（白给分）', '手动算一遍：哈夫曼 WPL、循环队列元素个数、二分查找次数'] },
    { d: 4, title: '软件工程 + 面向对象 + 数据库 + 网络', mods: ['se', 'oo', 'db', 'net'], hours: '5h 知识卡 + 2h 刷题',
      tasks: ['学「软件工程」：耦合/内聚顺序、测试方法、McCabe 复杂度', '学「面向对象」：UML 图、类图关系符号、设计模式', '学「数据库」：三级模式、ER 转关系、SQL、范式', '学「网络基础」：OSI 七层、端口号、子网划分', '刷这 4 个模块各 20 道'] },
    { d: 5, title: '下午题套路 + 全真模考', mods: ['pm', 'pmx', 'java', 'en', 'office'], hours: '3h 套路 + 2 次模考',
      tasks: ['学「下午题套路」12 张卡 + 「下午题例题精讲」6 道例题（含代码和答案）', '学「Java 速成」8 张卡', '过「专业英语」6 张卡 + 「办公软件与信息处理」6 张卡', '完成 2 次 75 题模考，各控制在 90 分钟内', '把错题本清零：所有错题重做一遍'] }
  ];

  /* ---------- 工具 ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }
  function questionsOf(mid) { return QUESTIONS.filter(q => q.m === mid); }
  function cardKey(mid, i) { return mid + '#' + i; }
  function cardProgress(m) { let n = 0; m.cards.forEach((c, i) => { if (S.cards[cardKey(m.id, i)]) n++; }); return n; }
  function answeredCount() { return Object.keys(S.picked).length; }
  function correctCount() { return Object.values(S.picked).filter(p => p.ok).length; }
  function rate() { const a = answeredCount(); return a ? Math.round(correctCount() / a * 100) : 0; }
  function totalCards() { return MODULES.reduce((s, m) => s + m.cards.length, 0); }
  function knownCards() { return Object.keys(S.cards).length; }
  function daysLeft() {
    if (!S.examDate) return 5;
    const t = new Date(S.examDate + 'T00:00:00'), n = new Date(todayStr() + 'T00:00:00');
    return Math.max(0, Math.round((t - n) / 86400000));
  }
  function weakest() {
    return MODULES.map(m => {
      const qs = questionsOf(m.id);
      const done = qs.filter(q => S.picked[q.id]);
      const ok = done.filter(q => S.picked[q.id].ok).length;
      return { m, total: qs.length, done: done.length, ok, r: done.length ? ok / done.length : -1 };
    }).sort((a, b) => (a.r < 0 ? 9 : a.r) - (b.r < 0 ? 9 : b.r)).slice(0, 3);
  }

  /* 内联 onclick 里不能出现双引号（会截断 HTML 属性），统一用单引号数组 */
  function jsArr(mods) { return mods && mods.length ? '[' + mods.map(m => "'" + m + "'").join(',') + ']' : 'null'; }

  /* ---------- 路由 ---------- */
  let tab = 'home';
  window.go = function (t) { tab = t; render(); window.scrollTo(0, 0); };
  function renderTop() {
    document.getElementById('topStats').innerHTML =
      '已刷 <b>' + answeredCount() + '</b> 题 · 正确率 <b>' + rate() + '%</b> · 知识卡 <b>' + knownCards() + '/' + totalCards() + '</b>' +
      (S.examDate ? ' · 距考试 <b>' + daysLeft() + '</b> 天' : '');
  }
  function render() {
    document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    renderTop();
    const el = document.getElementById('main');
    el.innerHTML = ({ home: vHome, plan: vPlan, learn: vLearn, quiz: vQuiz, mock: vMock, wrong: vWrong }[tab] || vHome)();
    if (tab === 'quiz' && quizState) renderQuizBody();
    if (tab === 'mock' && mockState) mountMock();
  }

  /* ---------- 首页 ---------- */
  function vHome() {
    const dl = daysLeft();
    const dayIdx = Math.min(5, Math.max(1, 6 - dl));
    const plan = PLAN[dayIdx - 1] || PLAN[4];
    const weak = weakest().filter(w => w.done > 0);
    return `
    <h1>${S.examDate ? '距考试还有 ' + dl + ' 天' : '5 天冲刺计划'}</h1>
    <p class="sub">上午 75 题单选（45 分及格）· 下午 5 题填空（45 分及格）· 两科都要过。目标是每科 <b>60 分</b>，留足余量。</p>

    <div class="grid g3" style="margin:18px 0">
      <div class="card"><div class="sub">题库总量</div><div style="font-size:30px;font-weight:700">${QUESTIONS.length}<span class="sub" style="font-size:14px"> 题</span></div><div class="sub">${MODULES.length} 个模块</div></div>
      <div class="card"><div class="sub">我的正确率</div><div style="font-size:30px;font-weight:700;color:${rate() >= 60 ? 'var(--accent)' : 'var(--accent2)'}">${rate()}%</div><div class="bar" style="margin-top:8px"><i style="width:${rate()}%"></i></div></div>
      <div class="card"><div class="sub">知识卡掌握</div><div style="font-size:30px;font-weight:700">${knownCards()}<span class="sub" style="font-size:14px"> / ${totalCards()}</span></div><div class="bar" style="margin-top:8px"><i style="width:${Math.round(knownCards() / totalCards() * 100)}%"></i></div></div>
    </div>

    <div class="card hl">
      <div class="row"><h3>今天该干这些（第 ${dayIdx} 天：${esc(plan.title)}）</h3><span class="spacer"></span><span class="pill">${plan.hours}</span></div>
      <ul style="margin:10px 0 14px 18px;display:grid;gap:6px">${plan.tasks.map(t => '<li style="color:#c7d1db">' + esc(t) + '</li>').join('')}</ul>
      <div class="row">
        <button class="btn" onclick="startQuiz([${plan.mods.map(x => "'" + x + "'").join(',')}],20)">练这 ${plan.mods.length} 个模块的题</button>
        <button class="btn ghost" onclick="go('learn')">学知识卡</button>
        <button class="btn ghost" onclick="go('mock')">直接模考</button>
      </div>
    </div>

    ${weak.length ? `<h2>最该补的三个模块</h2><div class="grid g3">${weak.map(w => `
      <div class="card"><div class="row"><b>${esc(w.m.name)}</b><span class="spacer"></span><span class="pill ${w.m.priority}">${w.r === -1 ? '未做' : Math.round(w.r * 100) + '%'}</span></div>
      <div class="sub" style="margin:6px 0 10px">已做 ${w.done}/${w.total} 题</div>
      <button class="btn sm ghost" onclick="startQuiz(['${w.m.id}'],15)">马上练</button></div>`).join('')}</div>` : ''}

    <h2>怎么用这个系统（先看这个）</h2>
    <div class="card">
      <ol style="margin-left:18px;display:grid;gap:8px;color:#c7d1db">
        <li><b>先学后刷</b>：每天先看完当天模块的「知识卡」，卡片上的每一条都是直接背的结论。</li>
        <li><b>刷题只刷不会的</b>：选完立刻出解析，做错的自动进错题本，「错题本」里点一下就能重做。</li>
        <li><b>第 5 天必须模考</b>：75 题限时 120 分钟，模考分数按 75 分制折算，≥45 及格，目标 ≥60。</li>
        <li><b>别追求全懂</b>：分值高的先学（数据结构 12 分、计算机系统 10 分、网络 9 分、操作系统 8 分）。</li>
      </ol>
      <hr>
      <div class="row"><span class="sub">考试日期（可选，用来倒计时）</span>
        <input type="date" value="${S.examDate}" onchange="setExamDate(this.value)" style="background:var(--panel2);border:1px solid var(--line);color:var(--text);border-radius:8px;padding:6px 10px">
        <button class="btn sm ghost" onclick="resetAll()">清空全部进度</button></div>
    </div>`;
  }

  window.setExamDate = function (v) { S.examDate = v; save(); render(); };
  window.resetAll = function () {
    if (!confirm('确定清空所有学习进度？')) return;
    Object.keys(S).forEach(k => delete S[k]);
    Object.assign(S, JSON.parse(JSON.stringify(DEF)));
    quizState = null; mockState = null;
    save(); render();
  };

  /* ---------- 5天计划 ---------- */
  function vPlan() {
    return `<h1>5 天计划表</h1><p class="sub">每天勾掉一次，节奏比“学得多”更重要。建议每天 6 小时，第 5 天全用来模考和错题。</p>
    ${PLAN.map(p => {
      const done = S.days[p.d];
      const mods = p.mods.map(id => M[id]).filter(Boolean);
      const qs = mods.reduce((s, m) => s + questionsOf(m.id).length, 0);
      return `<div class="day ${done ? 'done' : ''}">
        <div class="num">D${p.d}</div>
        <div class="body">
          <div class="row"><b>${esc(p.title)}</b><span class="spacer"></span><span class="pill">${p.hours}</span></div>
          <ul style="margin:8px 0 0 18px;display:grid;gap:5px">${p.tasks.map(t => '<li class="tasks" style="list-style:disc">' + esc(t) + '</li>').join('')}</ul>
          <div class="row" style="margin-top:10px">
            ${mods.map(m => `<button class="btn sm ghost" onclick="startQuiz(['${m.id}'],15)">刷 ${esc(m.name)}</button>`).join('')}
            <span class="spacer"></span><span class="badge">共 ${qs} 题</span>
            <button class="btn sm ${done ? 'ghost' : ''}" onclick="toggleDay(${p.d})">${done ? '✓ 已完成' : '标记完成'}</button>
          </div>
        </div></div>`;
    }).join('')}`;
  }
  window.toggleDay = function (d) { S.days[d] = !S.days[d]; save(); render(); };

  /* ---------- 知识卡 ---------- */
  let learnMod = MODULES[0] ? MODULES[0].id : '';
  let openCards = {};
  function vLearn() {
    const m = M[learnMod] || MODULES[0];
    if (!m) return '<div class="empty">没有知识卡数据</div>';
    const cp = cardProgress(m);
    return `<h1>知识卡</h1><p class="sub">点开卡片看要点，确认记住了就勾「已掌握」。每张卡都是能直接背的结论，并配一道「例题 · 这样用」演示怎么套公式。</p>
    <div class="modtabs" style="margin-top:16px">${MODULES.map(x => {
      const p = cardProgress(x);
      return `<button class="${x.id === m.id ? 'active' : ''}" onclick="setLearn('${x.id}')">${esc(x.name)} <span style="opacity:.7">${p}/${x.cards.length}</span></button>`;
    }).join('')}</div>
    <div class="row" style="margin:-6px 0 14px"><span class="sub">全部 ${MODULES.length} 个模块共 ${totalCards()} 张卡，可打印成纸质速查表考前翻。</span><span class="spacer"></span><button class="btn ghost sm" onclick="window.print()">打印成速查表</button></div>
    <div class="card">
      <div class="row"><b>${esc(m.name)}</b><span class="pill ${m.priority}">${m.priority === 'high' ? '高性价比' : m.priority === 'mid' ? '中等' : '快速过'}</span><span class="pill">第 ${m.day} 天</span><span class="pill">约 ${m.weight} 分</span><span class="spacer"></span>${questionsOf(m.id).length ? `<button class="btn sm ghost" onclick="startQuiz(['${m.id}'],15)">刷这章题</button>` : '<span class="badge">纯讲义</span>'}</div>
      <p class="sub" style="margin-top:8px">${esc(m.intro)}</p>
      <div class="bar" style="margin-top:10px"><i style="width:${Math.round(cp / m.cards.length * 100)}%"></i></div>
    </div>
    ${m.cards.map((c, i) => {
      const k = cardKey(m.id, i), on = !!S.cards[k], open = !!openCards[k];
      return `<details class="kcard" ${open ? 'open' : ''} ontoggle="setOpen('${k}',this.open)"><summary>${esc(c.t)}${on ? ' <span class="badge" style="color:var(--accent)">已掌握</span>' : ''}</summary>
      <div class="inner"><ul>${c.b.map(x => '<li>' + esc(x) + '</li>').join('')}</ul>
      ${(c.ex && c.ex.length) ? `<div class="ex">
        <div class="ex-hd">例题 · 这样用</div>
        ${c.ex.map(e => `<div class="ex-item">
          <div class="ex-q">${esc(e.q)}</div>
          <ol class="ex-s">${e.s.map(s => '<li>' + esc(s) + '</li>').join('')}</ol>
          <div class="ex-a">答案：<b>${esc(e.a)}</b></div>
        </div>`).join('')}
      </div>` : ''}
      ${c.code ? '<pre><code>' + esc(c.code) + '</code></pre>' : ''}
      ${c.tip ? '<div class="tip">💡 ' + esc(c.tip) + '</div>' : ''}
      <div class="row" style="margin-top:12px"><button class="btn sm ${on ? 'ghost' : ''}" onclick="toggleCard('${m.id}',${i})">${on ? '取消已掌握' : '标记已掌握'}</button></div>
      </div></details>`;
    }).join('')}`;
  }
  window.setLearn = function (id) {
    learnMod = id;
    // 切换模块时把上一个模块知识卡重新渲染即可
    if (tab !== 'learn') tab = 'learn';
    render();
  };
  window.setOpen = function (k, open) { if (open) openCards[k] = 1; else delete openCards[k]; };
  /* 打印速查表：details 未展开时浏览器不渲染内部内容，打印前全部展开，打完还原 */
  window.addEventListener('beforeprint', function () {
    document.querySelectorAll('details.kcard').forEach(d => {
      if (!d.open) { d.dataset.wasClosed = '1'; d.open = true; }
    });
  });
  window.addEventListener('afterprint', function () {
    document.querySelectorAll('details.kcard[data-was-closed]').forEach(d => {
      d.open = false; delete d.dataset.wasClosed;
    });
  });
  window.toggleCard = function (mid, i) {
    const k = cardKey(mid, i);
    if (S.cards[k]) delete S.cards[k]; else S.cards[k] = 1;
    openCards[k] = 1;
    save(); render();
  };

  /* ---------- 刷题 ---------- */
  let quizState = null;
  window.startQuiz = function (mods, n) {
    if (mods === false) return startWrong();          // 错题重做
    if (!mods) mods = null;                            // 全题库
    const all = questionsOf_multi(mods);
    if (!all.length) mods = null;                      // 该模块只有讲义，退回全题库
    const pool = shuffle(all.filter(q => !S.picked[q.id] || !S.picked[q.id].ok));
    const list = (pool.length >= (n || 20) ? pool : shuffle(all)).slice(0, n || 20);
    quizState = { list, idx: 0, mods };
    tab = 'quiz'; render();
  };
  function questionsOf_multi(mods) {
    if (!mods || !mods.length) return QUESTIONS.slice();
    return QUESTIONS.filter(q => mods.indexOf(q.m) >= 0);
  }
  function startWrong() {
    const list = shuffle(Object.keys(S.wrong).map(id => BY_ID[id]).filter(Boolean));
    if (!list.length) { alert('错题本是空的，先去刷题吧'); return; }
    quizState = { list, idx: 0, mods: null };
    tab = 'quiz'; render();
  }
  window.startWrong = startWrong;
  function vQuiz() {
    if (!quizState) {
      return `<h1>刷题</h1><p class="sub">选择题库范围，每组 15-25 题。做题时选完立刻出解析，错了自动进错题本。</p>
      <div class="card"><div class="row">
        <button class="btn" onclick="startQuiz(null,20)">随机 20 题（全题库）</button>
        <button class="btn blue" onclick="startQuiz(null,40)">随机 40 题</button>
      </div></div>
      <h2>按模块练习</h2>
      <div class="grid g3">${MODULES.filter(m => questionsOf(m.id).length).map(m => {
        const qs = questionsOf(m.id);
        const done = qs.filter(q => S.picked[q.id]);
        const ok = done.filter(q => S.picked[q.id].ok).length;
        const r = done.length ? Math.round(ok / done.length * 100) : -1;
        return `<div class="card"><div class="row"><b>${esc(m.name)}</b><span class="spacer"></span><span class="pill ${m.priority}">${m.weight}分</span></div>
        <div class="sub" style="margin:8px 0">${qs.length} 题 · ${done.length ? '正确率 ' + r + '%' : '未开始'}</div>
        <div class="bar"><i style="width:${r < 0 ? 0 : r}%"></i></div>
        <div class="row" style="margin-top:10px"><button class="btn sm" onclick="startQuiz(['${m.id}'],15)">练 15 题</button><button class="btn sm ghost" onclick="startQuiz(['${m.id}'],${Math.min(40, qs.length)})">练 ${Math.min(40, qs.length)} 题</button></div></div>`;
      }).join('')}</div>`;
    }
    return `<div id="quizBody"></div>`;
  }
  function renderQuizBody() {
    const st = quizState;
    const box = document.getElementById('quizBody');
    if (!box) return;
    if (st.idx >= st.list.length) { box.innerHTML = quizSummary(); return; }
    const q = st.list[st.idx];
    const p = S.picked[q.id];
    const m = M[q.m] || { name: q.m };
    box.innerHTML = `<div class="qwrap">
      <div class="qmeta"><span class="pill">${esc(m.name)}</span><span class="pill">${esc(q.tag || '')}</span><span class="pill">难度 ${q.lv || 1}</span><span class="spacer"></span><span>${st.idx + 1} / ${st.list.length}</span></div>
      <div class="bar" style="margin-bottom:16px"><i style="width:${Math.round(st.idx / st.list.length * 100)}%"></i></div>
      <div class="qtext">${esc(q.q)}</div>
      <div class="opts">${q.o.map((o, i) => {
        let cls = 'opt';
        if (p) { cls += ' locked'; if (i === q.a) cls += ' right'; else if (i === p.i) cls += ' wrong'; }
        return `<button class="${cls}" ${p ? '' : `onclick="pick('${q.id}',${i})"`}><span class="k">${'ABCD'[i]}</span><span>${esc(o)}</span></button>`;
      }).join('')}</div>
      ${p ? `<div class="explain"><b>${p.ok ? '✓ 答对了' : '✗ 正确答案：' + 'ABCD'[q.a]}</b><br>${esc(q.e)}</div>
        <div class="row" style="margin-top:14px"><button class="btn" onclick="nextQ()">下一题 →</button>
        <span class="spacer"></span><button class="btn ghost sm" onclick="startQuiz(${jsArr(st.mods)},${st.list.length})">换一批</button></div>`
        : `<div class="row" style="margin-top:14px"><span class="sub">选一个答案</span><span class="spacer"></span><button class="btn ghost sm" onclick="nextQ()">跳过</button></div>`}
    </div>`;
  }
  window.pick = function (id, i) {
    const q = BY_ID[id]; if (!q) return;
    const ok = i === q.a;
    S.picked[id] = { i, ok };
    if (!ok) { S.wrong[id] = (S.wrong[id] || 0) + 1; }
    save(); renderQuizBody(); renderTop();
  };
  window.nextQ = function () { quizState.idx++; renderQuizBody(); };
  function quizSummary() {
    const st = quizState;
    const done = st.list.filter(q => S.picked[q.id]);
    const ok = done.filter(q => S.picked[q.id].ok).length;
    const bad = done.length - ok;
    return `<div class="qwrap"><h1>本组完成</h1>
      <div class="row" style="margin:16px 0;gap:26px">
        <div><div class="sub">做题</div><div class="score-big">${done.length}<span class="sub" style="font-size:16px">/${st.list.length}</span></div></div>
        <div><div class="sub">正确</div><div class="score-big ${ok / Math.max(1, done.length) >= .6 ? 'pass' : 'fail'}">${ok}</div></div>
        <div><div class="sub">正确率</div><div class="score-big">${Math.round(ok / Math.max(1, done.length) * 100)}%</div></div>
      </div>
      ${bad ? `<p class="sub">做错的 ${bad} 题已进错题本，现在就去清一遍效率最高。</p>` : '<p class="sub">全对，继续下一组。</p>'}
      <div class="row" style="margin-top:18px">
        <button class="btn" onclick="startQuiz(${jsArr(st.mods)},${st.list.length})">再来一组</button>
        <button class="btn ghost" onclick="go('wrong')">看错题本</button>
        <button class="btn ghost" onclick="abandonQuiz()">返回题库</button>
      </div></div>`;
  }
  window.abandonQuiz = function () { quizState = null; render(); };

  /* ---------- 错题本 ---------- */
  function vWrong() {
    const ids = Object.keys(S.wrong);
    const list = ids.map(id => BY_ID[id]).filter(Boolean);
    if (!list.length) return `<h1>错题本</h1><div class="empty">还没有错题。<br><br><button class="btn" onclick="go('quiz')">去刷题</button></div>`;
    return `<h1>错题本（${list.length} 题）</h1><p class="sub">错过的题会一直留在这里，直到你做对一次。</p>
    <div class="card"><div class="row"><button class="btn" onclick="startQuiz(false,0)">全部重做</button>
      <span class="sub">建议顺序：先做错得多的（×2 以上的）</span></div></div>
    ${list.sort((a, b) => S.wrong[b.id] - S.wrong[a.id]).map(q => {
      const m = M[q.m] || { name: q.m };
      return `<div class="card"><div class="qmeta" style="display:flex;gap:8px;margin-bottom:8px"><span class="pill">${esc(m.name)}</span><span class="pill">${esc(q.tag || '')}</span><span class="pill" style="color:var(--bad)">错 ${S.wrong[q.id]} 次</span></div>
      <div class="qtext" style="font-size:15px">${esc(q.q)}</div>
      <div class="sub" style="margin:8px 0;color:var(--accent)">正确答案：${'ABCD'[q.a]}. ${esc(q.o[q.a])}</div>
      <div class="explain">${esc(q.e)}</div>
      <div class="row" style="margin-top:12px"><button class="btn sm ghost" onclick="removeWrong('${q.id}')">移出错题本</button><button class="btn sm ghost" onclick="startQuiz(['${q.m}'],15)">再练这个模块</button></div></div>`;
    }).join('')}`;
  }
  window.removeWrong = function (id) { delete S.wrong[id]; save(); render(); };
  window.startWrong = function () {
    const list = Object.keys(S.wrong).map(id => BY_ID[id]).filter(Boolean);
    if (!list.length) return;
    quizState = { list, idx: 0, mods: null };
    tab = 'quiz'; render();
  };

  /* ---------- 模考 ---------- */
  let mockState = null, mockTimer = null;
  let mockSec = 0;
  function vMock() {
    if (mockState && mockState.phase === 'run') return `<div id="mockRun"></div>`;
    const hist = S.mock.slice(-5);
    return `<h1>模拟考试</h1><p class="sub">从题库按分值权重抽 75 题，限时 120 分钟，75 分制。45 分及格，目标 60 分。</p>
    <div class="card hl"><div class="row" style="gap:26px">
      <div><div class="sub">题量</div><div style="font-size:22px;font-weight:700">75 题</div></div>
      <div><div class="sub">时长</div><div style="font-size:22px;font-weight:700">120 分钟</div></div>
      <div><div class="sub">及格 / 目标</div><div style="font-size:22px;font-weight:700">45 / 60</div></div>
      <span class="spacer"></span>
      <button class="btn" onclick="startMock()">开始模考</button>
      <button class="btn ghost" onclick="startMock(30)">30 题快测</button>
    </div></div>
    ${hist.length ? `<h2>历史成绩</h2><table><tr><th>时间</th><th>得分</th><th>正确</th><th>结论</th></tr>
      ${hist.map(h => `<tr><td>${esc(h.t)}</td><td class="num">${h.score}/75</td><td class="num">${h.ok}/${h.n}</td><td class="${h.score >= 45 ? 'pass' : 'fail'}">${h.score >= 60 ? '稳' : h.score >= 45 ? '及格线' : '还需努力'}</td></tr>`).join('')}</table>` : ''}
    <h2>模考怎么用</h2>
    <div class="card"><ul style="margin-left:18px;display:grid;gap:6px;color:#c7d1db">
      <li>先做完会的，拿不准的标记后回头再看，别卡在一题上超过 2 分钟。</li>
      <li>交卷后看「失分最多的模块」，直接跳过去专项练。</li>
      <li>第 5 天至少做 2 次完整 75 题，把时间感练出来。</li>
    </ul></div>`;
  }
  /* 上午卷真实分值分布，模考按这个比例抽题（合计 75）
     没出现的 java / pm 是下午卷内容，用「刷题」里的模块专项练 */
  const MOCK_W = { cs: 8, media: 3, os: 7, lang: 5, ds: 12, se: 6, oo: 5, db: 7, net: 9, std: 2, office: 3, en: 5, c: 3 };
  window.startMock = function (n) {
    const target = n || 75;
    const totalW = Object.values(MOCK_W).reduce((a, b) => a + b, 0);
    let list = [];
    const picked = {};
    Object.keys(MOCK_W).forEach(mid => {
      const cnt = Math.max(1, Math.round(target * MOCK_W[mid] / totalW));
      shuffle(questionsOf(mid)).slice(0, cnt).forEach(q => { list.push(q); picked[q.id] = 1; });
    });
    // 四舍五入可能少一两个，从全题库补齐，保证正好 target 题
    if (list.length < target) {
      shuffle(QUESTIONS).forEach(q => { if (list.length < target && !picked[q.id]) { list.push(q); picked[q.id] = 1; } });
    }
    list = shuffle(list).slice(0, target);
    mockState = { list, picks: {}, idx: 0, phase: 'run', started: Date.now() };
    mockSec = target >= 75 ? 120 * 60 : Math.round(target * 1.6 * 60);
    tab = 'mock'; render();
  };
  function mockRemaining() {
    const used = Math.floor((Date.now() - mockState.started) / 1000);
    return Math.max(0, mockSec - used);
  }
  function mountMock() {
    clearInterval(mockTimer);
    const holder = document.getElementById('mockRun');
    if (!holder) return;
    holder.innerHTML = `<div class="card" style="position:sticky;top:56px;z-index:10">
      <div class="row"><b>模拟考试</b><span class="pill">${mockState.list.length} 题</span>
      <span class="spacer"></span><span class="timer" id="tmr">--:--</span>
      <button class="btn ghost sm" onclick="abandonMock()">放弃</button>
      <button class="btn" onclick="submitMock()">交卷</button></div></div>
      <div class="grid" style="grid-template-columns:1fr;gap:14px"><div id="mockQ"></div>
      <div class="card"><b>答题卡</b><div class="qlist" id="mockList" style="margin-top:10px"></div></div></div>`;
    tick(); mockTimer = setInterval(tick, 1000);
    renderMockQ();
  }
  window.abandonMock = function () { clearInterval(mockTimer); mockState = null; render(); };
  function tick() {
    if (!mockState || mockState.phase !== 'run') { clearInterval(mockTimer); return; }
    const r = mockRemaining();
    const el = document.getElementById('tmr');
    if (el) { el.textContent = pad(Math.floor(r / 60)) + ':' + pad(r % 60); el.classList.toggle('warn', r < 300); }
    if (r <= 0) submitMock();
  }
  function renderMockQ() {
    const q = mockState.list[mockState.idx];
    const sel = mockState.picks[q.id];
    const box = document.getElementById('mockQ');
    box.innerHTML = `<div class="qwrap">
      <div class="qmeta"><span class="pill">${esc((M[q.m] || {}).name || q.m)}</span><span class="spacer"></span><span>第 ${mockState.idx + 1} / ${mockState.list.length} 题</span></div>
      <div class="qtext">${esc(q.q)}</div>
      <div class="opts">${q.o.map((o, i) => `<button class="opt ${sel === i ? 'right' : ''}" onclick="mockPick(${i})"><span class="k">${'ABCD'[i]}</span><span>${esc(o)}</span></button>`).join('')}</div>
      <div class="row" style="margin-top:16px">
        <button class="btn ghost" onclick="mockNav(-1)" ${mockState.idx === 0 ? 'disabled' : ''}>← 上一题</button>
        <button class="btn" onclick="mockNav(1)">下一题 →</button>
        <span class="spacer"></span><button class="btn ghost sm" onclick="submitMock()">交卷</button>
      </div></div>`;
    renderMockList();
  }
  function renderMockList() {
    const el = document.getElementById('mockList'); if (!el) return;
    el.innerHTML = mockState.list.map((q, i) => `<button class="qitem ${mockState.picks[q.id] !== undefined ? 'done' : ''} ${i === mockState.idx ? 'cur' : ''}" onclick="mockGoto(${i})"><span class="n">${i + 1}</span><span>${esc(String(q.q).slice(0, 26))}${String(q.q).length > 26 ? '…' : ''}</span></button>`).join('');
  }
  window.mockPick = function (i) { mockState.picks[mockState.list[mockState.idx].id] = i; renderMockQ(); };
  window.mockNav = function (d) {
    const n = mockState.idx + d;
    if (n < 0 || n >= mockState.list.length) return;
    mockState.idx = n; renderMockQ();
  };
  window.mockGoto = function (i) { mockState.idx = i; renderMockQ(); };
  window.submitMock = function () {
    clearInterval(mockTimer);
    const st = mockState;
    let ok = 0;
    st.list.forEach(q => {
      const p = st.picks[q.id];
      if (p !== undefined) {
        const good = p === q.a;
        if (good) ok++;
        S.picked[q.id] = { i: p, ok: good };
        if (!good) S.wrong[q.id] = (S.wrong[q.id] || 0) + 1;
      }
    });
    const score = Math.round(ok / st.list.length * 75);
    S.mock.push({ t: todayStr() + ' ' + new Date().toTimeString().slice(0, 5), score, ok, n: st.list.length });
    save();
    const byMod = {};
    st.list.forEach((q, i) => {
      byMod[q.m] = byMod[q.m] || { ok: 0, n: 0 };
      byMod[q.m].n++;
      if (st.picks[q.id] === q.a) byMod[q.m].ok++;
    });
    const rows = Object.keys(byMod).map(mid => ({ mid, ...byMod[mid], name: (M[mid] || {}).name || mid })).sort((a, b) => (a.ok / a.n) - (b.ok / b.n));
    document.getElementById('main').innerHTML = `<h1>模考结果</h1>
      <div class="card hl"><div class="row" style="gap:30px">
        <div><div class="sub">得分（75 分制）</div><div class="score-big ${score >= 45 ? 'pass' : 'fail'}">${score}</div></div>
        <div><div class="sub">答对</div><div style="font-size:26px;font-weight:700">${ok} / ${st.list.length}</div></div>
        <div><div class="sub">结论</div><div style="font-size:20px;font-weight:700" class="${score >= 60 ? 'pass' : 'fail'}">${score >= 60 ? '这个状态能过' : score >= 45 ? '刚过线，再补短板' : '还差 ' + (45 - score) + ' 分'}</div></div>
      </div>
      <hr><div class="row"><button class="btn" onclick="go('wrong')">清错题（${Object.keys(S.wrong).length} 题）</button>
      <button class="btn ghost" onclick="go('mock')">再考一次</button>
      <button class="btn ghost" onclick="go('home')">回首页</button></div></div>
      <h2>分模块得分</h2><table><tr><th>模块</th><th>答对/总数</th><th>得分率</th><th></th></tr>
      ${rows.map(r => `<tr><td>${esc(r.name)}</td><td class="num">${r.ok}/${r.n}</td><td class="num ${r.ok / r.n >= .6 ? 'pass' : 'fail'}">${Math.round(r.ok / r.n * 100)}%</td>
      <td><button class="btn sm ghost" onclick="startQuiz(['${r.mid}'],15)">补这章</button></td></tr>`).join('')}</table>`;
    mockState = null;
    window.scrollTo(0, 0);
  };

  /* 错题本入口已在上面 startQuiz(false) 处理 */
  render();
})();
