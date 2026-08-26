const menu=document.getElementById("menu"),nav=document.getElementById("navLinks");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
window.addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-innerHeight;document.getElementById("progress").style.width=h>0?(scrollY/h*100)+"%":"0%"});

const esc=s=>String(s??"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function card(n,i){const cls=n.featured?"news-card featured":"news-card";const img=n.image?`style="background-image:url('${esc(n.image)}')"`:"";return `<article class="${cls}"><div class="news-image ${n.category.toLowerCase().includes('esport')?'esports-image':n.tag.toLowerCase().includes('event')?'events-image':'ff-image'}" ${img}><span>${esc(n.tag||n.category)}</span>${n.featured?'<b>NEWS</b>':''}</div><div class="news-body"><div class="meta"><span>${esc(n.category)}</span><time>${esc(n.date)}</time></div><h3>${esc(n.title)}</h3><p>${esc(n.description)}</p><button class="story-link" data-story="${esc(n.id)}">Read story →</button></div></article>`}
function render(data){
 const news=data.news||[];document.getElementById('newsGrid').innerHTML=news.filter(n=>/free fire|esport/i.test(n.category)).slice(0,6).map(card).join('')||'<div class="empty">No news yet. Open Admin to add your first story.</div>';
 const games=news.filter(n=>/gaming|esport/i.test(n.category)).slice(0,3);document.getElementById('gamingGrid').innerHTML=games.map(n=>`<article class="mini-card"><span class="mini-icon">${n.category.toLowerCase().includes('esport')?'🏆':'🎮'}</span><div><small>${esc(n.category.toUpperCase())}</small><h3>${esc(n.title)}</h3><p>${esc(n.description)}</p><button class="story-link" data-story="${esc(n.id)}">Read story →</button></div></article>`).join('')||'<div class="empty">No gaming stories yet.</div>';
 document.getElementById('updatesList').innerHTML=(data.quickUpdates||[]).map(u=>`<div class="update"><span class="dot"></span><div><b>${esc(u.label)}</b><p>${esc(u.text)}</p></div><time>${esc(u.status)}</time></div>`).join('');
 document.querySelectorAll('[data-story]').forEach(b=>b.addEventListener('click',()=>{const n=news.find(x=>x.id===b.dataset.story);if(!n)return;alert(`${n.title}\n\n${n.content||n.description}`)}));
}
fetch('news.json?'+Date.now()).then(r=>r.ok?r.json():Promise.reject()).then(render).catch(()=>render({news:[],quickUpdates:[]}));
