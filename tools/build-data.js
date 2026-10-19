/* 数据构建脚本：校验题库 + 把正确答案位置打散（避免"全选 B 也能过"）
   用法：node tools/build-data.js
   读取现有 data/*.js 的内容，重新生成同一批文件（不含注释，纯数据）。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'data');

const FILES = {
  'cs': 'm01-cs.js',
  'media': 'm02-media-std.js', 'std': 'm02-media-std.js',
  'os': 'm03-os.js',
  'lang': 'm04-lang.js',
  'ds': 'm05-ds.js',
  'se': 'm06-se-oo-db.js', 'oo': 'm06-se-oo-db.js', 'db': 'm06-se-oo-db.js',
  'net': 'm07-net.js', 'en': 'm07-net.js', 'office': 'm07-net.js',
  'c': 'm08-c.js',
  'java': 'm09-java.js',
  'pm': 'm10-pm.js',
  'pmx': 'm11-pmx.js'
};

// 1. 载入现有数据
global.window = {};
fs.readdirSync(DATA).filter(f => f.endsWith('.js')).forEach(f => require(path.join(DATA, f)));
const modules = window.RK_DATA.modules;
const questions = window.RK_DATA.questions;

// 2. 打散答案位置：第 i 题的正确项放到 i%4
questions.forEach((q, i) => {
  const target = i % 4;
  if (q.a === target) return;
  const opts = q.o.slice();
  const correct = opts[q.a];
  opts[q.a] = opts[target];
  opts[target] = correct;
  q.o = opts;
  q.a = target;
});

// 3. 校验
const problems = [];
const seen = new Set();
questions.forEach(q => {
  if (seen.has(q.id)) problems.push('重复 id: ' + q.id);
  seen.add(q.id);
  if (!Array.isArray(q.o) || q.o.length !== 4) problems.push('选项数不是4: ' + q.id);
  if (new Set(q.o).size !== 4) problems.push('选项重复: ' + q.id);
  if (typeof q.a !== 'number' || q.a < 0 || q.a > 3) problems.push('答案下标非法: ' + q.id);
  if (!q.q || !q.e || !q.tag || !q.m) problems.push('字段缺失: ' + q.id);
  if (!FILES[q.m]) problems.push('未知模块: ' + q.m + ' (' + q.id + ')');
});
const warnings = [];
modules.forEach(m => {
  if (!m.cards || !m.cards.length) problems.push('模块无卡片: ' + m.id);
  if (!questions.some(q => q.m === m.id)) warnings.push('模块无题目（只当讲义用）: ' + m.id);
});
if (problems.length) { console.error('校验失败:\n' + problems.join('\n')); process.exit(1); }

// 4. 按文件分组写出
const groups = {};
modules.forEach(m => { (groups[FILES[m.id]] = groups[FILES[m.id]] || { mods: [], qs: [] }).mods.push(m); });
questions.forEach(q => { (groups[FILES[q.m]] = groups[FILES[q.m]] || { mods: [], qs: [] }).qs.push(q); });

Object.keys(groups).forEach(file => {
  const g = groups[file];
  const out = 'window.RK_DATA = window.RK_DATA || {};\n' +
    'window.RK_DATA.modules = (window.RK_DATA.modules || []).concat(' + JSON.stringify(g.mods, null, 2) + ');\n' +
    'window.RK_DATA.questions = (window.RK_DATA.questions || []).concat(' + JSON.stringify(g.qs, null, 2) + ');\n';
  fs.writeFileSync(path.join(DATA, file), out, 'utf8');
});

const dist = [0, 0, 0, 0];
questions.forEach(q => dist[q.a]++);
console.log('OK  模块', modules.length, '卡片', modules.reduce((s, m) => s + m.cards.length, 0),
  '题目', questions.length);
console.log('答案分布 A/B/C/D:', dist.map(x => Math.round(x / questions.length * 100) + '%').join(' '));
console.log('各模块题量:', Object.entries(questions.reduce((a, q) => (a[q.m] = (a[q.m] || 0) + 1, a), {})).map(([k, v]) => k + ':' + v).join(' '));
console.log('写出文件:', Object.keys(groups).join(', '));
if (warnings.length) console.log('提示:\n  ' + warnings.join('\n  '));
