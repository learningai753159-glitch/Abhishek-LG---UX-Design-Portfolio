(function(){var w=document.getElementById('how');if(!w)return;
var ids=['s3-r','s3-f','define','shaping'];
var ps=ids.map(function(i){return document.getElementById(i)}),rl=[].slice.call(w.querySelectorAll('.s3-rail li')),rail=w.querySelector('.s3-rail');
ps.forEach(function(p){p.classList.add('tab-p')});
var cur=-1;
function set(n){if(n===cur)return;cur=n;rl.forEach(function(r,i){r.classList.toggle('on',i===n);r.classList.toggle('done',i<n);var a=r.querySelector('a');if(i===n)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current')});ps.forEach(function(p,i){p.classList.toggle('tab-in',i===n)})}
function off(){return rail.offsetHeight+80}
function spy(){var y=off()+innerHeight*.2,n=0;ps.forEach(function(p,i){if(p.getBoundingClientRect().top<y)n=i});set(n)}
function to(i){window.scrollTo({top:ps[i].getBoundingClientRect().top+scrollY-off()+8,behavior:'smooth'})}
rl.forEach(function(r,i){r.querySelector('a').addEventListener('click',function(e){e.preventDefault();to(i)})});
document.querySelectorAll('a[href="#define"]').forEach(function(a){if(!w.contains(a))a.addEventListener('click',function(e){e.preventDefault();to(2)})});
addEventListener('scroll',spy,{passive:true});addEventListener('resize',spy);spy()})();
