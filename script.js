(function(){
  // Mobile menu
  var menu=document.getElementById('menu'),nav=document.getElementById('nav');
  menu.addEventListener('click',function(){var o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});

  // Today's classes
  var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var sched={
    1:[['6:00 am','Strength basics'],['7:30 am','Yoga flow'],['6:00 pm','HIIT']],
    2:[['6:00 am','HIIT'],['7:30 am','Mobility'],['6:30 pm','Strength circuit']],
    3:[['6:00 am','Yoga flow'],['6:00 pm','HIIT'],['7:15 pm','Core and abs']],
    4:[['6:00 am','Strength basics'],['7:30 am','Mobility'],['6:30 pm','Strength circuit']],
    5:[['6:00 am','HIIT'],['7:30 am','Yoga flow'],['6:00 pm','Weight-loss workshop']],
    6:[['7:00 am','Full-body strength'],['8:30 am','Yoga flow'],['10:00 am','HIIT']],
    0:[['7:00 am','Open yoga'],['9:00 am','Stretch and recover']]
  };
  var d=new Date().getDay(),list=document.getElementById('todayList');
  document.getElementById('todayTitle').textContent=days[d]+' at IronPulse';
  document.getElementById('todayNote').textContent=d===0?'Short Sunday hours, 6 am to 12 pm.':'Drop in, or book a spot at the desk.';
  sched[d].forEach(function(c){var li=document.createElement('li');var b=document.createElement('b');b.textContent=c[0];var s=document.createElement('span');s.textContent=c[1];li.appendChild(b);li.appendChild(s);list.appendChild(li)});

  // Active nav link on scroll
  var links=[].slice.call(document.querySelectorAll('nav a'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  function setActive(){var y=window.scrollY+120,cur=0;secs.forEach(function(s,i){if(s.offsetTop<=y)cur=i});links.forEach(function(a,i){a.classList.toggle('active',i===cur)})}
  window.addEventListener('scroll',setActive,{passive:true});setActive();

  // Contact form validation (front-end only, nothing is sent)
  var f=document.getElementById('form'),ok=document.getElementById('ok');
  function setErr(id,m){document.getElementById('e-'+id).textContent=m;return !m}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('name').value.trim(),em=document.getElementById('email').value.trim(),m=document.getElementById('msg').value.trim();
    var a=setErr('name',n.length<2?'Enter your name.':'');
    var b=setErr('email',/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)?'':'Enter a valid email address.');
    var c=setErr('msg',m.length<10?'Write at least 10 characters.':'');
    if(a&&b&&c){ok.textContent='Thanks '+n+'. We got your message about '+document.getElementById('plan').value.toLowerCase()+' and will call you back within a day.';ok.classList.add('show');f.reset();ok.focus&&ok.setAttribute('tabindex','-1')}
    else ok.classList.remove('show');
  });
  document.getElementById('yr').textContent=new Date().getFullYear();
})();
