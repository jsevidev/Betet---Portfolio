const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const root=document.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const tags=a=>(a||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('');
const btn=(u,t,c='')=>u?`<a class="btn ${c}" href="${esc(u)}" target="_blank" rel="noopener">${t}</a>`:'';
const btns=p=>btn(p.links?.demo,'Live Demo →')+btn(p.links?.repo,'Source Code','ghost');
const n2=i=>String(i+1).padStart(2,'0');
const split=t=>`<span class="sr">${esc(t)}</span><span aria-hidden="true">${t.split(' ').map(w=>`<span class="w">${[...w].map((c,i)=>`<span class="ch" style="--i:${i}">${esc(c)}</span>`).join('')}</span>`).join(' ')}</span>`;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
const reveal=()=>$$('.rv:not(.in)').forEach(x=>io.observe(x));
function theme(){const b=$('#theme'),set=t=>{root.dataset.theme=t;b.setAttribute('aria-pressed',t==='dark');$('meta[name=theme-color]').content=t==='dark'?'#0c100f':'#e9ecee'};
  set(root.dataset.theme||'light');b.onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';set(t);try{localStorage.setItem('theme',t)}catch(e){}}}
function loader(ready){const l=$('#loader'),done=()=>{root.classList.add('ready');try{sessionStorage.setItem('seen',1)}catch(e){}};
  if(!l||rm||root.classList.contains('seen')){l&&l.remove();ready.then(done);return}
  const bar=$('#ld-bar'),num=$('#ld-num'),t0=performance.now(),min=1100;
  const tick=now=>{const p=Math.min(1,(now-t0)/min);bar.style.transform=`scaleX(${p})`;num.textContent=Math.round(p*100);if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);
  Promise.all([ready,new Promise(r=>setTimeout(r,min))]).then(()=>{l.classList.add('out');done();setTimeout(()=>l.remove(),900)})}
theme();
const dataP=fetch('data/data.json').then(r=>r.json());
const ready=Promise.race([Promise.all([dataP,document.fonts.ready]).catch(()=>{}),new Promise(r=>setTimeout(r,4000))]);
loader(ready);
dataP.then(d=>{
  const p=d.profile;$('#logo').textContent=p.name;
  $('#links').innerHTML=btn(p.github,'GitHub ↗')+btn('mailto:'+p.email,'Email ↗')+btn(p.linkedin,'LinkedIn ↗');
  document.body.dataset.page==='project'?project(d):home(d);reveal();
}).catch(()=>document.body.insertAdjacentHTML('afterbegin','<p class="err">Could not load data/data.json. Deploy to GitHub Pages, or run: python -m http.server</p>'));
function home(d){
  const p=d.profile;$('#name').innerHTML=split(p.name);$('#name').setAttribute('aria-label',p.name);
  $('#pitch').textContent=p.pitch;$('#aboutText').textContent=p.about;$('#certText').textContent=d.certs.text;$('#certLink').href=d.certs.url;
  $('#contactLinks').innerHTML=btn(p.github,'GitHub')+btn('mailto:'+p.email,'Email','ghost')+btn(p.linkedin,'LinkedIn','ghost');
  const words=[...new Set([...d.skills.map(s=>s.name),...d.projects.flatMap(x=>x.stack||[])])].map(w=>`<span>${esc(w)}</span>`).join('');$('#marq').innerHTML=words+words;
  $('#skillList').innerHTML=d.skills.map((s,i)=>`<li class="rv" style="--i:${i%4}"><b>${esc(s.name)}</b><span>${s.projects.map(id=>esc(d.projects.find(q=>q.id===id)?.title||'')).join(', ')}</span></li>`).join('');
  const types=['all',...new Set(d.projects.map(x=>x.type))];
  const show=t=>{const l=d.projects.filter(x=>t==='all'||x.type===t);
    $('#list').innerHTML=l.map((x,i)=>`<article class="item rv${x.featured?' big':''}" style="--i:${i}"><span class="num">${n2(i)}</span><div><span class="type">${esc(x.type)}</span><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p><div>${tags(x.stack)}</div>${x.note?`<small>${esc(x.note)}</small>`:''}<div class="row">${x.featured?`<a class="btn" href="project.html?id=${esc(x.id)}">Read Case Study →</a>`:''}${btns(x)}</div></div></article>`).join('');
    $$('#filters button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===t));reveal()};
  $('#filters').innerHTML=types.map(t=>`<button class="chip" data-t="${t}" aria-pressed="false">${t}</button>`).join('');
  $('#filters').onclick=e=>{const t=e.target.dataset.t;if(!t)return;show(t);history.replaceState(null,'',t==='all'?location.pathname:'?type='+t)};
  const q=new URLSearchParams(location.search).get('type');show(types.includes(q)?q:'all');
  $('#foot').textContent=`© ${new Date().getFullYear()} ${p.name}`;
  const links=$$('.menu a'),so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.setAttribute('aria-current',a.hash==='#'+e.target.id))}),{rootMargin:'-40% 0px -55% 0px'});
  $$('main section').forEach(s=>so.observe(s));
}
function project(d){
  const p=d.projects.find(x=>x.id===new URLSearchParams(location.search).get('id')),m=$('#main');
  if(!p||!p.case){m.innerHTML='<p>Project not found. <a href="index.html#projects">Back to projects</a></p>';return}
  document.title=p.title+' | '+d.profile.name;
  const sec=(i,h,b)=>`<h2 class="rv"><small>${n2(i)}</small>${h}</h2>${b}`;
  m.innerHTML=`<h1 class="rv">${esc(p.title)}</h1><p class="lead rv" style="--i:1">${esc(p.summary)}</p><div class="rv" style="--i:2">${tags(p.stack)}</div><div class="row rv" style="--i:3">${btns(p)}</div>
  <div class="gallery rv">${(p.images||[]).map((s,n)=>`<a href="${esc(s)}" target="_blank" rel="noopener" aria-label="Open full screenshot ${n+1}"><img src="${esc(s)}" alt="${esc(p.title)} screenshot ${n+1} of ${p.images.length}" width="640" height="400" loading="lazy" decoding="async"></a>`).join('')}</div>
  ${sec(0,'The Problem',`<p class="rv">${esc(p.case.problem)}</p>`)}${sec(1,'What I Built',`<p class="rv">${esc(p.case.role)}</p>`)}${sec(2,'Hard Parts',`<ul class="rv">${p.case.hard.map(h=>`<li>${esc(h)}</li>`).join('')}</ul>`)}`;
}
