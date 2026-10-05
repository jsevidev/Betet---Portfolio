const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const tags=a=>(a||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('');
const btn=(u,t,c='')=>u?`<a class="btn sm ${c}" href="${esc(u)}" target="_blank" rel="noopener">${t}</a>`:'';
const btns=p=>btn(p.links?.demo,'Live demo')+btn(p.links?.repo,'Source code','ghost');
const card=p=>`<article class="card"><span class="type">${esc(p.type)}</span><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><div>${tags(p.stack)}</div>${p.note?`<small>${esc(p.note)}</small>`:''}<div class="row">${p.featured?`<a class="btn sm" href="project.html?id=${esc(p.id)}">Read case study</a>`:''}${btns(p)}</div></article>`;
fetch('data/data.json').then(r=>r.json()).then(d=>{
  $('#logo').textContent=d.profile.name;
  $('#foot').textContent=`${d.profile.name}. Built with plain HTML, CSS and JS.`;
  document.body.dataset.page==='project'?project(d):home(d);
}).catch(()=>document.body.insertAdjacentHTML('afterbegin','<p class="err">Could not load data/data.json. Deploy to GitHub Pages, or run: python -m http.server</p>'));
function home(d){
  const p=d.profile;document.title=p.name+' | Portfolio';
  $('#name').textContent=p.name;$('#pitch').textContent=p.pitch;$('#aboutText').textContent=p.about;
  $('#certText').textContent=d.certs.text;$('#certLink').href=d.certs.url;
  $('#links').innerHTML=btn(p.github,'GitHub')+btn('mailto:'+p.email,'Email','ghost')+btn(p.linkedin,'LinkedIn','ghost');
  $('#skillList').innerHTML=d.skills.map(s=>`<li><b>${esc(s.name)}</b> used in ${s.projects.map(id=>{const x=d.projects.find(q=>q.id===id);return x?esc(x.title):''}).join(', ')}</li>`).join('');
  const types=['all',...new Set(d.projects.map(x=>x.type))];
  const show=t=>{const l=d.projects.filter(x=>t==='all'||x.type===t);
    $('#featured').innerHTML=l.filter(x=>x.featured).map(card).join('');
    $('#others').innerHTML=l.filter(x=>!x.featured).map(card).join('');
    document.querySelectorAll('#filters button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));};
  $('#filters').innerHTML=types.map(t=>`<button data-t="${t}">${t}</button>`).join('');
  $('#filters').onclick=e=>e.target.dataset.t&&show(e.target.dataset.t);
  show('all');
}
function project(d){
  const p=d.projects.find(x=>x.id===new URLSearchParams(location.search).get('id')),m=$('#case');
  if(!p||!p.case){m.innerHTML='<p>Project not found. <a href="index.html#projects">Back to projects</a></p>';return}
  document.title=p.title+' | '+d.profile.name;
  m.innerHTML=`<h1>${esc(p.title)}</h1><p class="lead">${esc(p.summary)}</p><div>${tags(p.stack)}</div><div class="row">${btns(p)}</div>
  <div class="shots">${(p.images||[]).map(i=>`<a href="${esc(i)}" target="_blank"><img src="${esc(i)}" alt="${esc(p.title)} screenshot"></a>`).join('')}</div>
  <h2>The problem</h2><p>${esc(p.case.problem)}</p><h2>What I built</h2><p>${esc(p.case.role)}</p>
  <h2>Hard parts</h2><ul>${p.case.hard.map(h=>`<li>${esc(h)}</li>`).join('')}</ul>`;
}
