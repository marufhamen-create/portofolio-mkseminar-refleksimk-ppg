
(()=>{
  const topbar=document.getElementById('topbar');
  const navToggle=document.getElementById('navToggle');
  const navLinks=document.getElementById('navLinks');
  const navAnchors=[...document.querySelectorAll('.links a')];
  const onScroll=()=>{topbar.classList.toggle('scrolled',window.scrollY>20);document.getElementById('backTop').classList.toggle('show',window.scrollY>600)};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  navToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');navToggle.classList.toggle('open',open);navToggle.setAttribute('aria-expanded',open);navToggle.setAttribute('aria-label',open?'Tutup menu':'Buka menu')});
  navAnchors.forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');navToggle.classList.remove('open');navToggle.setAttribute('aria-expanded','false')}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){navLinks.classList.remove('open');navToggle.classList.remove('open')}});

  // Active nav
  const sections=[...document.querySelectorAll('main section[id]')];
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){navAnchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}})},{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(s=>obs.observe(s));

  // Reveal
  const revObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revObs.unobserve(e.target)}})},{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>{const d=el.dataset.delay;if(d)el.style.transitionDelay=d+'ms';revObs.observe(el)});

  // Hero slider (aktif hanya jika slideshow tersedia)
  const slides=[...document.querySelectorAll('.hero-slide')], dots=[...document.querySelectorAll('.slider-dots button')];
  if(slides.length){
    let current=0,timer;
    const show=n=>{current=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===current));dots.forEach((d,i)=>d.classList.toggle('active',i===current))};
    const auto=()=>{clearInterval(timer);timer=setInterval(()=>show(current+1),5600)};
    const next=document.querySelector('.slide-arrow.next');
    const prev=document.querySelector('.slide-arrow.prev');
    if(next)next.addEventListener('click',()=>{show(current+1);auto()});
    if(prev)prev.addEventListener('click',()=>{show(current-1);auto()});
    dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);auto()}));
    const hs=document.getElementById('heroSlider');
    if(hs){hs.addEventListener('mouseenter',()=>clearInterval(timer));hs.addEventListener('mouseleave',auto)}
    auto();
  }

  // Course tabs
  const tabs=[...document.querySelectorAll('.course-tab')], panels=[...document.querySelectorAll('.reflection-panel')];
  function activateCourse(course,scroll=false){tabs.forEach(t=>{const on=t.dataset.course===course;t.classList.toggle('active',on);t.setAttribute('aria-selected',on?'true':'false')});panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===course));if(scroll)document.getElementById('refleksi').scrollIntoView({behavior:'smooth',block:'start'})}
  tabs.forEach(t=>t.addEventListener('click',()=>activateCourse(t.dataset.course,false)));
  document.querySelectorAll('[data-jump]').forEach(c=>c.addEventListener('click',()=>activateCourse(c.dataset.jump,true)));

  // Artifact filters
  document.querySelectorAll('.artifact-filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.artifact-filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.artifact-item').forEach(it=>it.classList.toggle('hidden',f!=='all'&&it.dataset.category!==f))}));

  // Moments
  const moments=document.getElementById('momentSlider');
  document.getElementById('momentNext').addEventListener('click',()=>moments.scrollBy({left:330,behavior:'smooth'}));
  document.getElementById('momentPrev').addEventListener('click',()=>moments.scrollBy({left:-330,behavior:'smooth'}));

  // PDF modal
  const modal=document.getElementById('pdfModal'), frame=document.getElementById('pdfFrame'), openPdf=document.getElementById('openPdf');
  document.querySelectorAll('.preview-doc').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();const pdf=el.dataset.pdf||el.getAttribute('href');frame.src=pdf+'#toolbar=1&navpanes=0';openPdf.href=pdf;if(typeof modal.showModal==='function')modal.showModal();else window.open(pdf,'_blank')}));
  document.getElementById('closeModal').addEventListener('click',()=>{modal.close();frame.src='' });
  modal.addEventListener('click',e=>{if(e.target===modal){modal.close();frame.src=''}});
  modal.addEventListener('close',()=>frame.src='');

  document.getElementById('backTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();
