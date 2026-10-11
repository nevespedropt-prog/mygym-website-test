document.addEventListener("click",function(e){var b=e.target.closest(".burger"),h=document.querySelector("header");if(b){h.classList.toggle("open");return}if(h&&h.classList.contains("open")&&e.target.closest(".mnav a"))h.classList.remove("open")});(function(){var d=new Date(),g=d.getDay(),h=d.getHours()+d.getMinutes()/60,o=[5,24],e=document.getElementById("openNow");if(e)e.textContent=(h>=o[0]&&h<o[1])?"We're open now.":"Closed right now. See hours.";})();

(function(){
var w=document.getElementById("wiz");if(!w)return;
var A={},cur=1,N=5,time=null,terms=false;
function show(n){cur=n;[].forEach.call(w.querySelectorAll(".step"),function(s){s.classList.toggle("on",+s.dataset.s===n)});
 document.getElementById("wbarI").style.width=(n*20)+"%";document.getElementById("wstep").textContent="Step "+n+" of "+N;
 document.getElementById("wback").style.visibility=n>1?"visible":"hidden";
 if(n===5)document.getElementById("wsum").textContent=(A.goal||"")+" · "+(A.level||"")+" · "+(A.freq||"")+" · "+(A.style||"")}
w.addEventListener("click",function(e){
 var c=e.target.closest(".qc");
 if(c){var g=c.parentNode;[].forEach.call(g.querySelectorAll(".qc"),function(x){x.classList.remove("on")});c.classList.add("on");A[g.dataset.g]=c.dataset.v;setTimeout(function(){show(Math.min(cur+1,N))},260);return}
 var o=e.target.closest("#wtime .opt");if(o){[].forEach.call(w.querySelectorAll("#wtime .opt"),function(x){x.classList.remove("on")});o.classList.add("on");time=o.dataset.v;document.getElementById("wmsg").textContent="";return}
 if(e.target.closest("#wterms")){terms=!terms;document.getElementById("wterms").classList.toggle("on",terms);document.getElementById("wmsg").textContent="";return}
 if(e.target.closest("#wback")){show(Math.max(cur-1,1));return}
 if(e.target.closest("#wbook")){var m=document.getElementById("wmsg");
  if(!time){m.textContent="Please choose AM or PM.";return}var em=(document.getElementById("wemail").value||"").trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)){m.textContent="Please enter a valid email so we can confirm your session.";document.getElementById("wemail").focus();return}if(!terms){m.textContent="Please agree to the terms & conditions.";return}
  var rec=A.style==="With friends"?["Small Group Personal Training","£60 a month · £15 each per session · minimum 4 sessions"]:A.style==="One to one"?["1-2-1 Personal Training","from £32.50 a session"]:["Your free session first","we'll find your best fit together"];
  var r=document.getElementById("wres");
  r.innerHTML="<div class=\"ok\">✉</div><h3>One more step: send it to us</h3><p>Your email app should open with your answers for a free <b>"+time+" PT session</b>. Press Send and we'll confirm the time by email to <b>"+em.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</b>.</p><div class=\"rec\"><span>We'd suggest</span><h4>"+rec[0]+"</h4><small>"+rec[1]+"</small></div><p class=\"fine\">Goal: "+A.goal+" · "+A.level+" · "+A.freq+"</p>";
  var body="Free PT session request%0D%0A%0D%0ATime: "+time+"%0D%0AGoal: "+A.goal+"%0D%0AExperience: "+A.level+"%0D%0AHow often: "+A.freq+"%0D%0AStyle: "+A.style+"%0D%0AEmail: "+em;r.innerHTML+="<p class=\"fine\"><a class=\"btn sm\" href=\"mailto:info@mygymlondon.co.uk?subject=Free%20PT%20session%20request&body="+body+"\">Open my email again</a></p>";window.location.href="mailto:info@mygymlondon.co.uk?subject=Free%20PT%20session%20request&body="+body;[].forEach.call(w.querySelectorAll(".step,.wprog,.wtop"),function(x){x.style.display="none"});r.classList.add("on");return}});
})();

(function(){
var URL="https://ldmksxyilykyfnqnuytv.supabase.co",KEY="sb_publishable_gboSvVSFxQT0xDSEzbeYxw_E1OO3TRp",APP="https://app.mygymlondon.co.uk";
var days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],short=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
var F=[["all","All classes"],["cardio","HIIT & cardio"],["strength","Strength"],["mind","Pilates"],["fifty","50+"],["kids","Kids"]];
var rows=[],sel=(new Date().getDay()+6)%7,flt="all";
function $(i){return document.getElementById(i)}
function cat(n){n=n.toLowerCase();if(/kids/.test(n))return"kids";if(/50\+|vitality/.test(n))return"fifty";if(/pilates|yoga/.test(n))return"mind";if(/cardio|hiit|box/.test(n))return"cardio";if(/strength|abs|body/.test(n))return"strength";return"all"}
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function paint(){
 var h="";days.forEach(function(d,i){h+='<button type="button" class="dt'+(i===sel?" sel":"")+'" data-d="'+i+'"><small>'+short[i]+'</small><b>'+short[i]+'</b></button>'});$("sdates").innerHTML=h;
 h="";F.forEach(function(f){h+='<button type="button" class="fc'+(f[0]===flt?" on":"")+'" data-f="'+f[0]+'">'+f[1]+'</button>'});$("sfilter").innerHTML=h;
 var list=rows.filter(function(r){return r.day_name===days[sel]&&(flt==="all"||cat(r.name)===flt)}).sort(function(a,b){return a.start_time<b.start_time?-1:1});
 h="";list.forEach(function(r){h+='<div class="slot"><span class="tm">'+esc(String(r.start_time).slice(0,5))+'</span><div><b>'+esc(r.name)+'</b><small>'+esc(r.info||"")+(r.coach?" · "+esc(r.coach):"")+(r.capacity?" · "+r.capacity+" places":"")+'</small></div><a class="btn sm" href="'+APP+'/#timetable">Book in the app</a></div>'});
 if(!list.length)h='<p class="note">No matching classes this day. Try another day or filter.</p>';
 $("sslots").innerHTML=h}
document.addEventListener("click",function(e){var t=e.target.closest("button");if(!t||!$("sdates"))return;if(t.dataset.d){sel=+t.dataset.d;paint();return}if(t.dataset.f){flt=t.dataset.f;paint()}});
document.addEventListener("click",function(e){var a=e.target.closest("[data-cf]");if(!a||!$("sfilter"))return;e.preventDefault();flt=a.dataset.cf;paint();$("timetable").scrollIntoView({behavior:"smooth",block:"start"})});
if(!$("sdates"))return;
fetch(URL+"/rest/v1/classes?select=day_name,start_time,name,coach,info,capacity&active=eq.true&kind=eq.class&order=sort",{headers:{apikey:KEY,Authorization:"Bearer "+KEY}})
 .then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){rows=d;$("ttsub").textContent="The same timetable as the MyGym app. Book your place in the app.";paint()})
 .catch(function(){$("ttsub").innerHTML='We could not load the timetable. <a href="'+APP+'/#timetable">Open it in the app</a>.';paint()});
})();

document.addEventListener("click",function(e){var g=e.target.closest("[data-go]");if(g){var t=document.getElementById(g.dataset.go);if(t)t.scrollIntoView({behavior:"smooth",block:"center"})}});
