(function(){
var st=document.getElementById('story');if(!st)return;
var fr=st.querySelector('.st-frame'),svg=fr.querySelector('svg.sx'),NS='http://www.w3.org/2000/svg';
var caps=[].slice.call(st.querySelectorAll('[data-c]')),dots=[].slice.call(st.querySelectorAll('[data-go]'));
var mode=null,G={},cur=-1,raf=0;
function el(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function cl(v){return v<0?0:v>1?1:v}
function ez(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
var seed=7;function rnd(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646}
function build(){
  var port=fr.clientWidth<640;if(port===mode)return;mode=port;svg.innerHTML='';seed=7;
  var W=port?600:1000,H=port?900:600;svg.setAttribute('viewBox','0 0 '+W+' '+H);
  var L=['Client','Our admin','Backend'],tint=['#FBF9F5','#F0F4FA','#F2EEF9'];
  function lane(i){return port?{x:20+i*190,y:20,w:180,h:740}:{x:20,y:20+i*150,w:960,h:140}}
  function Q(i,s,c){var r=lane(i);c=c||0;return port?[r.x+r.w/2+c*58,r.y+80+s*(r.h-110)]:[r.x+170+s*(r.w-210),r.y+r.h/2+c*44]}
  L.forEach(function(n,i){var r=lane(i);el('rect',{x:r.x,y:r.y,width:r.w,height:r.h,rx:18,fill:tint[i],stroke:'#E6E1D8','stroke-width':1.5},svg);
    var t=el('text',{x:port?r.x+r.w/2:r.x+28,y:port?r.y+44:r.y+r.h/2+9,'class':'sx-lane','text-anchor':port?'middle':'start'},svg);t.textContent=n});
  var pts=[Q(0,.02),Q(0,.22),Q(1,.22),Q(1,.48),Q(2,.48),Q(2,.74),Q(0,.74),Q(0,.97)];
  var d='M'+pts.map(function(p){return p.join(' ')}).join(' L');
  el('path',{d:d,'class':'sx-ghost'},svg);
  G.route=el('path',{d:d,'class':'sx-route'},svg);G.len=G.route.getTotalLength();G.route.style.strokeDasharray=G.len;
  // mini cards (phase 2)
  G.mini=[];var gm=el('g',{},svg);
  for(var k=0;k<30;k++){var a=Q(0,.04+(k%6)*.07,-.75+Math.floor(k/6)*.375),b=Q(1,.04+k*.031,k%2?.42:-.42);
    var g=el('g',{'class':'sx-mini'},gm);el('rect',{x:-17,y:-11,width:34,height:22,rx:4,fill:['#fff','#ECECFF','#F2D1E5','#E3D5BC'][k%4]},g);el('path',{d:'M-10 -3H8M-10 3H2'},g);G.mini.push({g:g,a:a,b:b})}
  G.badge=el('g',{'class':'sx-badge'},svg);var bp=Q(0,port?.62:.78,0);G.badge.setAttribute('transform','translate('+bp[0]+' '+bp[1]+')');
  el('rect',{x:-110,y:-24,width:220,height:48,rx:24},G.badge);var bt=el('text',{y:8,'text-anchor':'middle'},G.badge);bt.textContent='Client ABC · 30+ people';
  // jam (phase 3)
  G.jam=[];var gj=el('g',{},svg);
  for(var m=0;m<72;m++){var li=m%3,p=Q(li,rnd()*.98,(rnd()*2-1)*.85),rot=(rnd()*2-1)*14;var g2=el('g',{'class':'sx-mini sx-jam'},gj);
    var inner=el('g',{transform:'rotate('+rot.toFixed(1)+')'},g2);el('rect',{x:-17,y:-11,width:34,height:22,rx:4,fill:['#fff','#ECECFF','#F2D1E5','#E3D5BC'][m%4]},inner);el('path',{d:'M-10 -3H8M-10 3H2'},inner);G.jam.push({g:g2,p:p,o:rnd()})}
  // main card
  G.card=el('g',{'class':'sx-card'},svg);el('rect',{x:-72,y:-26,width:144,height:52,rx:12},G.card);G.cardT=el('text',{y:8,'text-anchor':'middle'},G.card);G.cardT.textContent='New member';
  G.ck=el('path',{d:'M-62 0L-55 7L-44 -6','class':'sx-ck'},G.card);
  // multiply label
  G.mul=el('g',{'class':'sx-mul'},svg);var mx=W/2,my=port?400:245;el('rect',{x:mx-(port?250:300),y:my-46,width:port?500:600,height:92,rx:46},G.mul);var mt=el('text',{x:mx,y:my+14,'text-anchor':'middle'},G.mul);mt.textContent='× clients × lines of business';
  // timeline
  var ty=port?820:520,tx0=port?40:190,tx1=W-40;
  var tl=el('text',{x:port?40:48,y:port?ty-26:ty+8,'class':'sx-tl'},svg);tl.textContent='Waiting time';
  el('line',{x1:tx0,y1:ty,x2:tx1,y2:ty,'class':'sx-track'},svg);
  G.fill=el('line',{x1:tx0,y1:ty,x2:tx0,y2:ty,'class':'sx-fill'},svg);G.tx0=tx0;G.tx1=tx1;G.ty=ty;
  G.tLab=el('text',{x:tx0,y:ty+(port?44:46),'class':'sx-tv','text-anchor':'middle'},svg);
}
function draw(p){
  var t1=cl(p/.28),t2=cl((p-.3)/.25),t3=cl((p-.56)/.24);
  G.route.style.strokeDashoffset=G.len*(1-ez(t1));
  var pt=G.route.getPointAtLength(G.len*ez(t1));G.card.setAttribute('transform','translate('+pt.x+' '+pt.y+')');
  var done=t1>.98;G.cardT.textContent=done?'Done':'New member';G.ck.style.opacity=done?1:0;G.cardT.setAttribute('x',done?10:0);
  var o1=p<.3?1:1-cl((p-.3)/.06);G.card.style.opacity=o1;G.route.style.opacity=o1;
  G.mini.forEach(function(m,k){var ap=cl((t2-k*.008)/.12),mv=ez(cl((t2-.38-k*.012)/.3));var x=m.a[0]+(m.b[0]-m.a[0])*mv,y=m.a[1]+(m.b[1]-m.a[1])*mv;m.g.setAttribute('transform','translate('+x.toFixed(1)+' '+y.toFixed(1)+')');m.g.style.opacity=p<.3?0:ap});
  G.badge.style.opacity=p<.3?0:cl(t2*5)*(1-cl((p-.56)/.06));
  G.jam.forEach(function(j,i){var a=cl((t3-j.o*.7)/.12);j.g.setAttribute('transform','translate('+j.p[0].toFixed(1)+' '+j.p[1].toFixed(1)+') scale('+(.4+.6*a).toFixed(2)+')');j.g.style.opacity=a});
  G.mul.style.opacity=cl((t3-.55)/.25);
  var f=p<.3?.35*ez(t1):p<.56?.35+.65*ez(t2):1;var fx=G.tx0+(G.tx1-G.tx0)*f;G.fill.setAttribute('x2',fx);
  G.fill.classList.toggle('hot',p>=.56);
  G.tLab.setAttribute('x',Math.max(G.tx0+60,Math.min(G.tx1-60,fx)));
  G.tLab.textContent=p<.3?(t1>.85?'24h–2 days':''):(t2>.85?'3–4 days':'');
  var b=p<.3?0:p<.56?1:p<.82?2:3;
  if(b!==cur){cur=b;fr.dataset.beat=b;dots.forEach(function(d,i){d.setAttribute('aria-current',i===b?'step':'false')});caps.forEach(function(c){c.classList.toggle('on',+c.dataset.c===b)})}
}
function prog(){var r=st.getBoundingClientRect(),span=st.offsetHeight-innerHeight;return span>0?cl(-r.top/span):0}
function tick(){raf=0;draw(prog())}
function req(){if(!raf)raf=requestAnimationFrame(tick)}
var mids=[.16,.44,.7,.93];
dots.forEach(function(d,i){d.addEventListener('click',function(){var top=st.getBoundingClientRect().top+scrollY,span=st.offsetHeight-innerHeight;scrollTo({top:top+span*mids[i],behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})})});
build();draw(prog());
addEventListener('scroll',req,{passive:true});
addEventListener('resize',function(){var m=mode;build();if(m!==mode)cur=-1;req()});
})();
