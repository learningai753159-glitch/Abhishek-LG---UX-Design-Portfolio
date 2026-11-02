(function(){
var root=document.documentElement,KEY='alg-theme';
var DEFAULT='dark';try{var t=localStorage.getItem(KEY);root.setAttribute('data-theme',t||DEFAULT);}catch(e){root.setAttribute('data-theme',DEFAULT)}
document.addEventListener('DOMContentLoaded',function(){
var skin=!!document.querySelector('link[href*="notebook-skin"]');
function lum(c){var sc=c.indexOf('color(')===0?1:255;var m=c.match(/[\d.]+/g);if(!m||m.length<3||(m[3]!==undefined&&+m[3]<.5))return -1;var a=m.slice(0,3).map(function(v){v/=sc;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*a[0]+.7152*a[1]+.0722*a[2]}
function fixLight(){if(!skin)return;document.querySelectorAll('.nb-light,.nb-ink,.nb-ink-dark,.nb-onpen').forEach(function(e){e.classList.remove('nb-light','nb-ink','nb-ink-dark','nb-onpen')});if(root.getAttribute('data-theme')!=='dark')return;var all=document.querySelectorAll('body *');all.forEach(function(e){if(e.closest('.nb-light,.nb-onpen,.ru-window,svg,header.nav,footer.foot,.skip'))return;var cs=getComputedStyle(e);var bl0=lum(cs.backgroundColor);if(bl0>.55)e.classList.add('nb-light');else if(bl0>.25)e.classList.add('nb-onpen')});
function bgOf(e){while(e&&e!==document.documentElement){var l=lum(getComputedStyle(e).backgroundColor);if(l>=0)return l;e=e.parentElement}return lum(getComputedStyle(document.body).backgroundColor)}
all.forEach(function(e){if(e.closest('.nb-light,.nb-onpen,.ru-window,svg,.skip'))return;var has=false;for(var k=0;k<e.childNodes.length;k++){if(e.childNodes[k].nodeType===3&&e.childNodes[k].nodeValue.trim()){has=true;break}}if(!has)return;var fl=lum(getComputedStyle(e).color),bl=bgOf(e);if(fl<0||bl<0)return;var hi=Math.max(fl,bl)+.05,lo=Math.min(fl,bl)+.05;if(hi/lo>=4.5)return;if(bl<.2)e.classList.add('nb-ink');else if(fl>.5)e.classList.add('nb-ink-dark')})}
if(document.readyState!=='complete')addEventListener('load',fixLight);fixLight();
var tb=document.querySelector('[data-theme-toggle]');if(tb)tb.setAttribute('aria-pressed',root.getAttribute('data-theme')==='dark');
if(tb)tb.addEventListener('click',function(){var d=root.getAttribute('data-theme')==='dark'?'light':'dark';root.setAttribute('data-theme',d);try{localStorage.setItem(KEY,d)}catch(e){}tb.setAttribute('aria-pressed',d==='dark');fixLight()});
var mb=document.querySelector('[data-menu]'),nl=document.querySelector('.nav-links');
if(mb&&nl){mb.addEventListener('click',function(){var o=nl.classList.toggle('open');mb.setAttribute('aria-expanded',o)});nl.addEventListener('click',function(e){if(e.target.closest('a')){nl.classList.remove('open');mb.setAttribute('aria-expanded','false')}})}
document.querySelectorAll('.draw path').forEach(function(p){try{var l=Math.ceil(p.getTotalLength());p.style.setProperty('--len',l)}catch(e){}});
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var els=document.querySelectorAll('.rv,.draw');
if(reduce||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in','on')});}
else{document.querySelectorAll('.draw').forEach(function(d){d.classList.add('js-draw')});
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in','on');io.unobserve(en.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
els.forEach(function(e){io.observe(e)});}
var cb=document.querySelector('[data-copy]');
if(cb)cb.addEventListener('click',function(){var v=cb.getAttribute('data-copy'),lab=cb.querySelector('span');var done=function(){if(lab){var o=lab.textContent;lab.textContent='Copied';setTimeout(function(){lab.textContent=o},1800)}};if(navigator.clipboard)navigator.clipboard.writeText(v).then(done,done);else done()});
});
})();
