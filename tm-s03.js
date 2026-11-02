(function(){var w=document.getElementById('how');if(!w)return;
var els=[].slice.call(w.querySelectorAll('.rv'));
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){var sib=[].slice.call(x.target.parentNode.children).filter(function(n){return n.classList.contains('rv')});x.target.style.transitionDelay=Math.max(0,sib.indexOf(x.target))*100+'ms';x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.2});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});

var lb=document.getElementById('tmLb'),li=lb.querySelector('img'),last=null;
function close(){lb.hidden=true;document.body.style.overflow='';if(last)last.focus()}
w.querySelectorAll('[data-lb]').forEach(function(b){b.addEventListener('click',function(){last=b;li.src=b.dataset.lb;li.alt=b.querySelector('img').alt;lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.lb-x').focus()})});
lb.addEventListener('click',function(e){if(e.target!==li)close()});addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden)close()})})();