(function(){
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var nav=document.getElementById('nav');
function onScroll(){nav.classList.toggle('scrolled',scrollY>20);iris();if(typeof sweep==='function')sweep()}
var mm=document.getElementById('mmenu'),mb=nav.querySelector('.menu-btn');
function menu(o){mm.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';if(o)mm.querySelector('[data-close]').focus();else mb.focus()}
mb.addEventListener('click',function(){menu(true)});
mm.querySelector('[data-close]').addEventListener('click',function(){menu(false)});
mm.addEventListener('click',function(e){if(e.target.closest('ul a'))menu(false)});
addEventListener('keydown',function(e){if(e.key==='Escape'&&mm.classList.contains('open'))menu(false)});
document.querySelectorAll('.draw path').forEach(function(p){try{p.style.setProperty('--len',Math.ceil(p.getTotalLength()+2))}catch(e){}});
var els=document.querySelectorAll('.rv,.draw');
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in','on')})}
else{var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in','on');io.unobserve(en.target)}})},{threshold:.12,rootMargin:'0px 0px -5% 0px'});els.forEach(function(e){io.observe(e)})}
function sweep(){var vh=innerHeight;els.forEach(function(e){if(!e.classList.contains('in')&&e.getBoundingClientRect().top<vh)e.classList.add('in','on')})}
sweep();setTimeout(sweep,300);setTimeout(function(){els.forEach(function(e){e.classList.add('in','on')})},2500);
var toast=document.getElementById('toast'),tt;
function say(m){toast.textContent=m;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('on')},2200)}
document.querySelectorAll('[data-toast]').forEach(function(b){b.addEventListener('click',function(){say(b.dataset.toast)})});
document.querySelectorAll('[data-todo]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();say(a.textContent.replace(' ↗','')+' link to add')})});
/* film frames */
function film(el,src){var w=el.querySelector('.win'),vd=w.querySelector('.vid'),v=vd.querySelector('video');
el.loadSrc=function(s){vd.classList.remove('has-v');if(!s)return;v.onerror=function(){vd.classList.remove('has-v')};v.oncanplay=function(){vd.classList.add('has-v');v.play().catch(function(){})};v.src=s;v.load()};
el.querySelector('.play').addEventListener('click',function(){el.classList.add('is-playing');if(src&&!v.src)el.loadSrc(src);else if(v.src)v.play().catch(function(){});w.querySelector('.x').focus()});
w.querySelector('.x').addEventListener('click',function(){v.pause();el.classList.remove('is-playing');el.querySelector('.play').focus()});return el}
var hero=film(document.getElementById('heroFilm'),'assets/me-in-a-minute.mp4');
/* writing row */
var wr=document.getElementById('wrow'),wn=document.querySelectorAll('.w-nav');
function wUpd(){wn[0].disabled=wr.scrollLeft<4;wn[1].disabled=wr.scrollLeft+wr.clientWidth>=wr.scrollWidth-4}
if(wr&&wn.length){wn.forEach(function(b){b.addEventListener('click',function(){var w=wr.querySelector('.wc').offsetWidth+24;wr.scrollBy({left:+b.dataset.dir*w*2,behavior:RM?'auto':'smooth'})})});
wr.addEventListener('scroll',wUpd,{passive:true});addEventListener('resize',wUpd);wUpd();}
/* iris */
var ir=document.getElementById('iris'),dk=ir.querySelector('.iris-dark');
function iris(){if(RM)return;var r=ir.getBoundingClientRect(),vh=innerHeight,span=r.height-vh;if(span<=0)return;var p=Math.min(1,Math.max(0,-r.top/span));var e=p<.8?Math.pow(p/.8,1.7):1;var max=Math.hypot(innerWidth,vh)/2+40;dk.style.setProperty('--r',(5+e*max)+'px');var o=Math.min(1,Math.max(0,(p-.7)/.25));dk.style.setProperty('--o',o);var c=function(a,b){return Math.round(a+(b-a)*o)};dk.style.setProperty('--tc','rgb('+c(154,242)+','+c(149,239)+','+c(140,233)+')')}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',iris);onScroll();
})();

/* after hours */
(function(){var lb=document.getElementById('ahLb'),lc=document.getElementById('ahLbC'),root=document.getElementById('after-hours'),last=null;if(!lb||!root)return;
function src(s){var r=s&&s.shadowRoot,i=r&&r.querySelector('img');return i&&i.getAttribute('src')&&i.naturalWidth!==0?i.src:(s&&s.getAttribute('src'))||''}
function open(fr){if(fr.closest('.hc-c:not(.on)'))return false;var k=fr.dataset.kind,im=fr.querySelector(':scope>img'),u=im?im.src:src(fr.querySelector('image-slot'));if(k==='art'&&!u)return false;last=document.activeElement;
lc.innerHTML=k==='film'?'<div class="ah-vid"><b>'+fr.dataset.name+'</b></div>':'<img alt="" src="'+u+'">';
lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.ah-x').focus();return true}
function close(){lb.hidden=true;lc.innerHTML='';document.body.style.overflow='';if(last)last.focus()}
root.addEventListener('click',function(e){var fr=e.target.closest('[data-kind]');if(!fr)return;if(open(fr)){e.preventDefault();e.stopPropagation()}},true);
lb.addEventListener('click',function(e){if(e.target===lb||e.target.closest('.ah-x'))close()});
addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden)close()});
})();

/* ai video strip */
(function(){var t=document.querySelector('.fs-t');if(!t)return;
[].slice.call(t.children).forEach(function(li){var c=li.cloneNode(true);c.setAttribute('aria-hidden','true');t.appendChild(c)});
t.querySelectorAll('.fs-f').forEach(function(li){var v=li.querySelector('video'),w=li.querySelector('.fs-v');if(!v||!v.dataset.src)return;
v.autoplay=true;v.muted=true;v.addEventListener('loadeddata',function(){w.classList.add('has-v');v.play().catch(function(){})});v.addEventListener('error',function(){w.classList.remove('has-v')});
v.preload='none';
if('IntersectionObserver' in window){new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){if(!v.getAttribute('src'))v.src=v.dataset.src;v.play().catch(function(){})}else v.pause()})},{rootMargin:'200px'}).observe(li)}else v.src=v.dataset.src})})();

/* ai art viewer */
(function(){var big=document.getElementById('artBig');if(!big)return;var ts=[].slice.call(document.querySelectorAll('.art-t')),n=document.getElementById('artN'),cap=document.getElementById('artCap'),cur=0;
function go(i){cur=(i+ts.length)%ts.length;var t=ts[cur],im=t.querySelector('img'),alt=t.getAttribute('aria-label').replace('Show ','');big.classList.add('fade');setTimeout(function(){big.src=im.src;big.alt=alt;big.classList.remove('fade')},200);n.textContent=String(cur+1).padStart(2,'0');cap.textContent=alt;ts.forEach(function(x,k){x.classList.toggle('on',k===cur)})}
ts.forEach(function(t,i){t.addEventListener('click',function(){go(i)})});
document.querySelectorAll('.art-nav .art-b').forEach(function(b){b.addEventListener('click',function(){go(cur+ +b.dataset.d)})});
})();

/* horizontal cards */
(function(){var t=document.getElementById('hcT');if(!t)return;var cs=[].slice.call(t.querySelectorAll('.hc-c')),ds=[].slice.call(document.querySelectorAll('.hc-d')),cur=0,raf=0;
function to(i){i=Math.max(0,Math.min(cs.length-1,i));var c=cs[i];t.scrollTo({left:c.offsetLeft-(t.clientWidth-c.offsetWidth)/2,behavior:'smooth'})}
function upd(){raf=0;var mid=t.scrollLeft+t.clientWidth/2,b=0,bd=1e9;cs.forEach(function(c,i){var d=Math.abs(c.offsetLeft+c.offsetWidth/2-mid);if(d<bd){bd=d;b=i}});cur=b;cs.forEach(function(c,i){c.classList.toggle('on',i===b)});ds.forEach(function(d,i){d.classList.toggle('on',i===b)})}
t.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});
cs.forEach(function(c,i){c.addEventListener('click',function(){if(!c.classList.contains('on'))to(i)})});
ds.forEach(function(d,i){d.addEventListener('click',function(){to(i)})});
document.querySelectorAll('.hc-b').forEach(function(b){b.addEventListener('click',function(){to(cur+ +b.dataset.d)})});
t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();to(cur+1)}if(e.key==='ArrowLeft'){e.preventDefault();to(cur-1)}});t.tabIndex=0;
addEventListener('resize',function(){to(cur)});upd()})();
