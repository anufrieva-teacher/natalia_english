
const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];
$('#burger')?.addEventListener('click',()=>$('#mainNav').classList.toggle('open'));
function card(item){return `<article class="card"><h3>${item.title}</h3><p>${item.description||''}</p><span class="tag">${item.level||item.category||''}</span><div style="margin-top:18px"><a class="btn secondary" href="${item.link||'#'}">Открыть</a></div></article>`}
async function loadCards(el){let src=el.dataset.source||el.dataset.load;let limit=el.dataset.limit;try{let data=await fetch(`/data/${src}.json`).then(r=>r.json()); if(limit)data=data.slice(0,+limit); el.innerHTML=data.map(card).join(''); setupFilters(data,el);}catch(e){el.innerHTML='<p class="muted">Не удалось загрузить данные.</p>'}}
$$('[data-source],[data-load]').forEach(loadCards);
function setupFilters(data,grid){const input=$('#filterSearch'); const chips=$$('.chip'); if(!input&&!chips.length)return; function render(){let q=(input?.value||'').toLowerCase();let active=$('.chip.active')?.dataset.filter||'all';let filtered=data.filter(x=>(active==='all'||x.tag===active||x.category===active||x.level?.includes(active))&&(x.title+x.description+x.category+x.level).toLowerCase().includes(q));grid.innerHTML=filtered.map(card).join('')||'<p class="muted">Ничего не найдено.</p>'} input?.addEventListener('input',render); chips.forEach(ch=>ch.addEventListener('click',()=>{chips.forEach(c=>c.classList.remove('active'));ch.classList.add('active');render()}));}
// blog post
if($('#postTitle')){fetch('/data/blog.json').then(r=>r.json()).then(posts=>{let id=new URLSearchParams(location.search).get('id');let p=posts.find(x=>x.id===id)||posts[0];$('#postTitle').textContent=p.title;$('#postLead').textContent=p.description;$('#postContent').innerHTML=p.content||'<p>Материал скоро появится.</p>'})}
$('#generateJson')?.addEventListener('click',()=>{let obj={id:($('#aTitle').value||'new-item').toLowerCase().replaceAll(' ','-'),title:$('#aTitle').value,level:$('#aLevel').value,category:$('#aCategory').value,description:$('#aDescription').value,link:$('#aLink').value,tag:$('#aLevel').value};$('#jsonOutput').textContent=JSON.stringify(obj,null,2)});


const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},{threshold:.12});revealItems.forEach(el=>io.observe(el));}else{revealItems.forEach(el=>el.classList.add('is-visible'));}
