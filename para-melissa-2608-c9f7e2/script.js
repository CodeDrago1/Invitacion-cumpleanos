const ACCESS_KEY = 'Cielo2608';
const lock = document.querySelector('#lockScreen');
const card = document.querySelector('#card');
const secret = document.querySelector('#secret');
const unlock = document.querySelector('#unlock');
const lockMessage = document.querySelector('#lockMessage');
const openLetter = document.querySelector('#openLetter');
const makeWish = document.querySelector('#makeWish');
const wishResult = document.querySelector('#wishResult');

function revealCard(){
  lock.style.opacity='0';
  lock.style.transition='opacity .45s ease';
  setTimeout(()=>{
    lock.style.display='none';
    card.classList.remove('hidden');
    card.setAttribute('aria-hidden','false');
    requestAnimationFrame(()=>document.querySelector('.hero-inner')?.classList.add('visible'));
  },430);
}

function tryUnlock(){
  if((secret.value||'').trim().toLowerCase()===ACCESS_KEY.toLowerCase()) revealCard();
  else {
    lockMessage.textContent='Mmm… esa no es la clave 💭';
    secret.animate([{transform:'translateX(0)'},{transform:'translateX(-7px)'},{transform:'translateX(7px)'},{transform:'translateX(0)'}],{duration:260});
  }
}
unlock?.addEventListener('click',tryUnlock);
secret?.addEventListener('keydown',e=>{if(e.key==='Enter')tryUnlock();});
openLetter?.addEventListener('click',()=>document.querySelector('#letter')?.scrollIntoView({behavior:'smooth'}));

if('IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target);}}),{threshold:.16});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));

makeWish?.addEventListener('click',()=>{
  makeWish.disabled=true;
  wishResult.textContent='✦ Tu deseo quedó guardado entre las nubes. ✦';
  for(let i=0;i<18;i++){
    const s=document.createElement('span');
    s.textContent=i%3===0?'♡':'✦';
    Object.assign(s.style,{position:'fixed',left:(45+Math.random()*10)+'vw',top:'65vh',fontSize:(14+Math.random()*18)+'px',color:i%3===0?'#f3a9c1':'#79bfe4',zIndex:9999,pointerEvents:'none'});
    document.body.appendChild(s);
    s.animate([{transform:'translate(0,0) scale(.7)',opacity:1},{transform:`translate(${(Math.random()-.5)*260}px,${-120-Math.random()*240}px) scale(1.25)`,opacity:0}],{duration:1200+Math.random()*900,easing:'ease-out'}).finished.then(()=>s.remove());
  }
  setTimeout(()=>{makeWish.disabled=false;},1800);
});
