(function(){
var root=document.getElementById('mv');if(!root)return;
var stage=root.querySelector('.mv-stage'),layer=stage.querySelector('.mv-layer'),btn=root.querySelector('.mv-play'),segs=[].slice.call(root.querySelectorAll('.mv-seg button')),caps=[].slice.call(stage.querySelectorAll('[data-cap]'));
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var SC=[0,5,10,15.5,21.5],T=26;
function mk(c,h){var e=document.createElement('div');e.className=c;if(h)e.innerHTML=h;layer.appendChild(e);return e}
function cl(v){return v<0?0:v>1?1:v}
function ez(u){return u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2}
function k(t,a){if(t<=a[0][0])return a[0][1];for(var i=0;i<a.length-1;i++){if(t<=a[i+1][0]){var u=ez((t-a[i][0])/(a[i+1][0]-a[i][0]));return a[i][1]+(a[i+1][1]-a[i][1])*u}}return a[a.length-1][1]}
var E={};
E.P=mk('mv-orb mv-big','<span class="mv-pill mv-under">Enterprise platform</span>');
E.lob=['Marine','Aviation','PV&amp;T'].map(function(n){return mk('mv-pill mv-lob',n)});
E.um=mk('mv-pill mv-um','User management<span class="mv-tag">Not in the system</span>');
E.A=mk('mv-orb mv-a','<span class="mv-pill mv-under">Our admin</span>');
E.C=mk('mv-orb mv-c','<span class="mv-pill mv-under">Client ABC</span>');
E.B=mk('mv-orb mv-b','<span class="mv-pill mv-under">Backend</span>');
E.dots=[];for(var i=0;i<30;i++)E.dots.push(mk('mv-dot d'+(i%4)));
E.cnt=mk('mv-pill mv-cnt','<b>0</b> users set up by our admin');E.cntB=E.cnt.querySelector('b');
E.req=['New role','Role change','Permission change','Add member','Customisation'].map(function(n){return mk('mv-pill mv-req',n)});
E.st=mk('mv-state','<p class="mv-s1">They had a system.</p><p class="mv-s2">But no control over it.</p>');
var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','mv-lines');layer.insertBefore(svg,layer.firstChild);
var ln=document.createElementNS('http://www.w3.org/2000/svg','line');svg.appendChild(ln);
var W=1,H=1,port=false;
function L(){return port?{P:[.5,.5],m:[.27,.3],av:[.73,.3],pv:[.74,.7],A:[.26,.4],C:[.74,.4],B:[.26,.72],q:function(i){return[.66,.6+i*.068]}}:{P:[.5,.52],m:[.3,.33],av:[.7,.33],pv:[.75,.74],A:[.2,.52],C:[.8,.52],B:[.2,.85],q:function(i){return[.47,.3+i*.105]}}}
function size(){var r=stage.getBoundingClientRect();W=r.width;H=r.height;port=W/H<1.1;svg.setAttribute('viewBox','0 0 '+W+' '+H)}
function put(el,p,s,o){el.style.transform='translate('+(p[0]*W).toFixed(1)+'px,'+(p[1]*H).toFixed(1)+'px) translate(-50%,-50%) scale('+s.toFixed(3)+')';el.style.opacity=o.toFixed(3)}
function lerp(a,b,u){return[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u]}
function render(t){
  var G=L(),dim=k(t,[[21.5,1],[22.4,.1]]),fl=Math.sin(t*1.4)*.006;
  // platform
  var ps=k(t,[[0,.6],[1,1],[5,1],[5.8,.78],[10,.78],[11,1.9]]),po=k(t,[[0,0],[.8,1],[10,1],[11,.1]]);
  put(E.P,[G.P[0],G.P[1]+fl],ps,po*dim);E.P.classList.toggle('bgm',t>10);
  [G.m,G.av,G.pv].forEach(function(p,i){var a=1+i*.4,o=k(t,[[a,0],[a+.6,1],[4.4,1],[5.2,0]]);var u=k(t,[[4.4,0],[5.2,1]]);put(E.lob[i],lerp([p[0],p[1]+Math.sin(t*1.2+i)*.012],G.P,u),k(t,[[a,.6],[a+.6,1],[4.4,1],[5.2,.5]]),o)});
  // user management missing
  var uo=k(t,[[5.4,0],[6,1],[9.4,1],[10,0]]);put(E.um,[G.P[0],G.P[1]],k(t,[[5.4,.7],[6,1]]),uo*dim);E.um.classList.toggle('off',t>7.2);
  // admin
  var ao=k(t,[[6.4,0],[7.2,1]]);put(E.A,lerp([-.15,G.A[1]],G.A,k(t,[[6.4,0],[7.4,1]])),1+(t>15.5&&t<21.5?Math.max(0,.07-((t-16.4)%0.8)*.12):0),ao*dim);
  // client
  var co=k(t,[[10.2,0],[11,1]]);put(E.C,lerp([1.15,G.C[1]],G.C,k(t,[[10.2,0],[11.2,1]])),1,co*dim);
  // dots
  var n=0;E.dots.forEach(function(d,i){var s0=11.6+i*.075,u=cl((t-s0)/.7),ang=Math.PI*(1.12+i/29*.76)*1,ang2=ang,rx=port?.2:.11,ry=port?.14:.19;ang=Math.PI+(i/29)*Math.PI;var end=[G.C[0]+Math.cos(ang)*rx,G.C[1]+Math.sin(ang)*ry];if(u>=1)n++;
    var arc=Math.sin(ez(u)*Math.PI)*-.12;var p=lerp(G.A,end,ez(u));p[1]+=arc;put(d,p,k(t,[[s0,.4],[s0+.7,1]]),(t<s0?0:1)*k(t,[[15.5,1],[16,.45]])*dim)});
  E.cntB.textContent=n>=30?'30+':n;put(E.cnt,[G.C[0],G.C[1]-(port?.2:.31)],1,k(t,[[11.4,0],[11.8,1],[15.3,1],[15.8,0]])*dim);
  // backend + requests
  put(E.B,G.B,k(t,[[16,.6],[16.6,1]]),k(t,[[16,0],[16.6,1]])*dim);
  ln.setAttribute('x1',G.A[0]*W);ln.setAttribute('y1',G.A[1]*H+E.A.offsetWidth/2+44);ln.setAttribute('x2',G.B[0]*W);ln.setAttribute('y2',G.B[1]*H);svg.style.opacity=(k(t,[[16.8,0],[17.4,1]])*dim).toFixed(3);
  E.req.forEach(function(r,i){var s0=16.2+i*.85,u1=k(t,[[s0,0],[s0+.9,1]]),u2=k(t,[[s0+.9,0],[s0+1.4,1]]);var p=lerp(lerp(G.C,G.A,u1),G.q(i),u2);put(r,p,k(t,[[s0,.6],[s0+.3,1]]),k(t,[[s0,0],[s0+.25,1]])*dim)});
  // statement
  var so=k(t,[[22,0],[22.6,1],[25.4,1],[26,0]]);E.st.style.opacity=so.toFixed(3);E.st.classList.toggle('two',t>23.2);
  var sc=t<SC[1]?0:t<SC[2]?1:t<SC[3]?2:t<SC[4]?3:4;
  caps.forEach(function(c){var on=+c.dataset.cap===sc;c.classList.toggle('on',on)});
  segs.forEach(function(b,i){var a=SC[i],z=SC[i+1]||T;b.style.setProperty('--f',cl((t-a)/(z-a)).toFixed(3));b.setAttribute('aria-current',i===sc?'step':'false')});
}
var t=RM?24.5:0,playing=false,last=0,raf=0,vis=false,user=null;
function loop(now){if(!playing)return;var dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;if(t>=T)t=0;render(t);raf=requestAnimationFrame(loop)}
function play(){if(playing)return;playing=true;last=performance.now();btn.setAttribute('aria-pressed','true');btn.setAttribute('aria-label','Pause');raf=requestAnimationFrame(loop)}
function pause(){playing=false;cancelAnimationFrame(raf);btn.setAttribute('aria-pressed','false');btn.setAttribute('aria-label','Play')}
btn.addEventListener('click',function(){user=!playing;playing?pause():play()});
segs.forEach(function(b,i){b.addEventListener('click',function(){t=SC[i]+.01;render(t);if(!playing&&!RM){user=true;play()}})});
size();render(t);
addEventListener('resize',function(){size();render(t)});
if('IntersectionObserver' in window){new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis&&!RM&&user!==false)play();else if(!vis)pause()},{threshold:.35}).observe(stage)}else if(!RM)play();
})();
