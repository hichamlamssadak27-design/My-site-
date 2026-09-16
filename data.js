/* ================================================================
   data.js
   ----------------------------------------------------------------
   Shared by every page (index.html, channel.html, watch.html) via
   <script src="data.js"></script>. This file only DEFINES things
   (data + helper functions) - it does not render anything itself.
   Each page has its own small inline <script> at the bottom that
   uses these to draw its own content.

   TO ADD A CHANNEL: copy one of the objects inside CHANNELS.
   TO ADD A VIDEO: copy one of the objects inside a channel's
   `videos` array. `categories` should match ids in CATEGORIES.
   ================================================================ */

function escapeHTML(s){
  if(s===null || s===undefined) return '';
  return String(s).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
const escapeAttr = escapeHTML;

const PALETTE = ['#e8a33d','#7fa8a0','#d1524a','#9c8ad1','#5fa987'];

const CATEGORIES = [
  {id:'cooking', name:'Cooking', color:'#e8a33d'},
  {id:'travel', name:'Travel', color:'#7fa8a0'},
  {id:'tech', name:'Tech', color:'#d1524a'},
  {id:'sports', name:'Sports', color:'#9c8ad1'},
];

const CHANNELS = [
  {
    id:'kitchen', ident:'01', name:'Free Kitchen', handle:'@freekitchen', color:PALETTE[0], category:'cooking', avatarUrl:'https://i.pravatar.cc/150?img=12',
    subs:'412K subscribers', desc:'Simple recipes from kitchens around the world, no complicated measurements or odd tools.',
    videos:[
      {title:'How to Make Pizza Dough That Works the First Time', dur:'12:04', views:'88K views', viewsNum:88000, when:'3 days ago', desc:"A step-by-step guide to pizza dough that's soft inside and crisp outside, with the secrets of proper fermentation.", tags:['pizza','dough','home cooking','easy recipes','kitchen basics','meal prep','comfort food','weeknight dinner','cooking tips','food inspiration'], categories:['cooking'], thumbUrl:'https://picsum.photos/seed/pizzadough/400/225'},
      {title:'Five Quick Meals for Midweek', dur:'08:41', views:'145K views', viewsNum:145000, when:'1 week ago', desc:'Meals that take no more than twenty minutes to prepare, perfect for busy days.', tags:['quick meals','midweek','home cooking','easy recipes','kitchen basics','meal prep','comfort food','weeknight dinner','cooking tips','food inspiration'], categories:['cooking'], thumbUrl:'https://picsum.photos/seed/quickmeals/400/225'},
      {title:'The French Broth Secret No One Tells You', dur:'15:20', views:'62K views', viewsNum:62000, when:'2 weeks ago', desc:'The technique for building layers of flavor in a traditional French broth, using tools already in your kitchen.', tags:['french broth','french cuisine','home cooking','easy recipes','kitchen basics','meal prep','comfort food','weeknight dinner','cooking tips','food inspiration'], categories:['cooking'], thumbUrl:'https://picsum.photos/seed/frenchbroth/400/225'},
      {title:'Desserts With Only Three Ingredients', dur:'06:57', views:'201K views', viewsNum:201000, when:'1 month ago', desc:'Quick desserts that need no oven and no prior experience.', tags:['quick desserts','no oven','home cooking','easy recipes','kitchen basics','meal prep','comfort food','weeknight dinner','cooking tips','food inspiration'], categories:['cooking'], thumbUrl:'https://picsum.photos/seed/threeingredients/400/225'},
    ]
  },
  {
    id:'wanderer', ident:'02', name:'Wanderer', handle:'@wanderer', color:PALETTE[1], category:'travel', avatarUrl:'https://i.pravatar.cc/150?img=32',
    subs:'901K subscribers', desc:'Travel diaries without a script, from the back alleys of cities rather than tourist guidebooks.',
    videos:[
      {title:'Three Days Lost in the Old City of Fez', dur:'21:15', views:'320K views', viewsNum:320000, when:'2 days ago', desc:'A walking journey inside the walls, with no map and no plan.', tags:['fez','morocco','travel diary','budget travel','solo travel','city guide','local culture','backpacking','travel tips','wanderlust'], categories:['travel'], thumbUrl:'https://picsum.photos/seed/fez/400/225'},
      {title:'What to Eat in Istanbul on Ten Dollars', dur:'14:02', views:'510K views', viewsNum:510000, when:'5 days ago', desc:'A tour of street food vendors in neighborhoods far from the tourist trail.', tags:['istanbul','street food','travel diary','budget travel','solo travel','city guide','local culture','backpacking','travel tips','wanderlust'], categories:['travel'], thumbUrl:'https://picsum.photos/seed/istanbul/400/225'},
      {title:'The Night Train From Vienna to Venice', dur:'18:33', views:'190K views', viewsNum:190000, when:'3 weeks ago', desc:'Sleeping on a cross-border train and watching the mountains at dawn.', tags:['europe trains','night travel','travel diary','budget travel','solo travel','city guide','local culture','backpacking','travel tips','wanderlust'], categories:['travel'], thumbUrl:'https://picsum.photos/seed/nighttrain/400/225'},
    ]
  },
  {
    id:'code', ident:'03', name:'Plain Code', handle:'@plaincode', color:PALETTE[2], category:'tech', avatarUrl:'https://i.pravatar.cc/150?img=5',
    subs:'268K subscribers', desc:'Straight-to-the-point programming explanations with no long intros, for developers who just want the idea.',
    videos:[
      {title:'Understanding Closures in JavaScript in Ten Minutes', dur:'09:48', views:'77K views', viewsNum:77000, when:'Yesterday', desc:'A direct explanation of closures with short, practical examples.', tags:['javascript','closures','software engineering','programming tips','developer life','clean code','debugging','system design','coding habits','tech explainer'], categories:['tech'], thumbUrl:'https://picsum.photos/seed/closures/400/225'},
      {title:'Why Most Databases Fail Under Load', dur:'16:29', views:'54K views', viewsNum:54000, when:'4 days ago', desc:'A look at common performance bottlenecks and how to diagnose them early.', tags:['databases','performance','software engineering','programming tips','developer life','clean code','debugging','system design','coding habits','tech explainer'], categories:['tech'], thumbUrl:'https://picsum.photos/seed/databases/400/225'},
      {title:'Building an API From Scratch in One Sitting', dur:'27:10', views:'133K views', viewsNum:133000, when:'10 days ago', desc:'Designing and building a simple, production-ready API, testing every step.', tags:['api','backend','software engineering','programming tips','developer life','clean code','debugging','system design','coding habits','tech explainer'], categories:['tech'], thumbUrl:'https://picsum.photos/seed/apibuild/400/225'},
      {title:'Common Mistakes That Quietly Slow Down Your Code', dur:'11:05', views:'96K views', viewsNum:96000, when:'1 month ago', desc:'A practical list of the most frequent mistakes in everyday code and how to fix them.', tags:['coding mistakes','code quality','software engineering','programming tips','developer life','clean code','debugging','system design','coding habits','tech explainer'], categories:['tech'], thumbUrl:'https://picsum.photos/seed/codemistakes/400/225'},
    ]
  },
  {
    id:'sports', ident:'04', name:'The Snap', handle:'@thesnap', color:PALETTE[3], category:'sports', avatarUrl:'https://i.pravatar.cc/150?img=59',
    subs:'1.2M subscribers', desc:'Breaking down the decisive moments in sports, second by second.',
    videos:[
      {title:'The Play That Changed the Final: Full Breakdown', dur:'10:12', views:'640K views', viewsNum:640000, when:'1 day ago', desc:'A tactical breakdown of the decisive moment in the match, in slow motion replay.', tags:['football','championship final','sports analysis','game breakdown','tactics','highlight review','athlete mindset','match recap','coaching insight','performance analysis'], categories:['sports'], thumbUrl:'https://picsum.photos/seed/theplay/400/225'},
      {title:'How Referees Read Offside in Fractions of a Second', dur:'07:39', views:'298K views', viewsNum:298000, when:'6 days ago', desc:'A technical explanation of the decision-making process in tough offside calls.', tags:['officiating','var technology','sports analysis','game breakdown','tactics','highlight review','athlete mindset','match recap','coaching insight','performance analysis'], categories:['sports'], thumbUrl:'https://picsum.photos/seed/offside/400/225'},
    ]
  },
   {
    id:'hicham', ident:'05', name:'The hicham', handle:'@hicham', color:PALETTE[4], category:'sports', avatarUrl:'https://imglink.cc/cdn/419uHuNt5s.jpg',
    subs:'1.2M subscribers', desc:'Breaking down the decisive moments in sports, second by second.',
    videos:[
      {title:'Play That Changed the Final: Full Breakdown', dur:'10:12', views:'640K views', viewsNum:640000, when:'1 day ago', desc:'A tactical breakdown of the decisive moment in the match, in slow motion replay.', tags:['football','championship final','sports analysis','game breakdown','tactics','highlight review','athlete mindset','match recap','coaching insight','performance analysis'], categories:['sports'], thumbUrl:'https://imglink.cc/cdn/v41bn_pLSX.jpg'},
      {title:'Referees Read Offside in Fractions of a Second', dur:'07:39', views:'298K views', viewsNum:298000, when:'6 days ago', desc:'A technical explanation of the decision-making process in tough offside calls.', tags:['officiating','var technology','sports analysis','game breakdown','tactics','highlight review','athlete mindset','match recap','coaching insight','performance analysis'], categories:['sports'], thumbUrl:'https://imglink.cc/cdn/8cdWQWyH4n.jpg'},
    ]
  },
];

const LIVE_STREAMS = [
  {channelId:'sports', title:'Live Coverage: Tournament Quarterfinal', viewers:'34K watching now', desc:'Live, real-time commentary and analysis as the quarterfinal unfolds, with replays of every key moment as they happen.', tags:['live sports','quarterfinal','football','sports analysis','game breakdown','tactics','highlight review','match recap','coaching insight','performance analysis'], categories:['sports'], thumbUrl:'https://picsum.photos/seed/liveqf/400/225'},
  {channelId:'code', title:'Live Coding Session: Building an App From Scratch', viewers:'6.2K watching now', desc:'A real-time build session, writing and explaining every line as a small app comes together from an empty file.', tags:['live coding','software engineering','programming tips','developer life','clean code','debugging','system design','coding habits','tech explainer','build log'], categories:['tech'], thumbUrl:'https://picsum.photos/seed/livecode/400/225'},
];

/* ---------- helpers ---------- */
function formatCount(n, suffix){
  let s;
  if(n>=1000000) s = (Math.round(n/100000)/10)+'M';
  else if(n>=1000) s = Math.round(n/1000)+'K';
  else s = String(n);
  return s+' '+suffix;
}
function findChannel(id){ return CHANNELS.find(c=>c.id===id); }
function allVideosFlat(){
  const out=[];
  CHANNELS.forEach(c=>c.videos.forEach((v,i)=>out.push({c,v,i})));
  return out;
}
function channelTotalViews(c){ return c.videos.reduce((s,v)=>s+v.viewsNum, 0); }
function whenToDays(w){
  if(!w) return 9999;
  const s = w.toLowerCase();
  if(s==='yesterday') return 1;
  const m = s.match(/(\d+(?:\.\d+)?)\s*(day|week|month)/);
  if(!m) return 9999;
  const num = parseFloat(m[1]);
  if(m[2]==='day') return num;
  if(m[2]==='week') return num*7;
  if(m[2]==='month') return num*30;
  return 9999;
}

// Channel avatar: shows avatarUrl if set, otherwise a colored initial.
// A broken image link removes itself on error, revealing the initial.
function avatarHTML(c){
  const letter = escapeHTML(c.name[0]);
  const img = c.avatarUrl
    ? `<img src="${escapeAttr(c.avatarUrl)}" alt="" onerror="this.remove()">`
    : '';
  return `<div class="avatar" style="background:${c.color}">${letter}${img}</div>`;
}

// Video/live thumbnail: shows thumbUrl if set, otherwise a colored gradient.
function thumbHTML(v, color, seed, extra){
  const angle = (seed*47)%360;
  const img = (v && v.thumbUrl)
    ? `<img src="${escapeAttr(v.thumbUrl)}" alt="" onerror="this.remove()">`
    : '';
  return `<div class="thumb" style="background:linear-gradient(${angle}deg, ${color}33, ${color}11), var(--surface)">
    ${img}
    ${extra||''}
    <span class="play-glyph"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2.5L13 8L4 13.5V2.5Z" fill="#fff"/></svg></span>
  </div>`;
}

// Category chips row, reused on the watch page for a video or a live stream.
function categoryChipsHTML(categoryIds){
  const ids = categoryIds || [];
  const cats = ids.map(id=>CATEGORIES.find(c=>c.id===id)).filter(Boolean);
  if(cats.length===0) return '';
  return `<h3 class="up-next" style="margin-bottom:10px;">Categories</h3>
    <div class="tag-row" style="margin-bottom:28px;">` +
    cats.map(cat=>`<a class="tag-chip" style="border-color:${cat.color}66; color:${cat.color};" href="index.html?view=category&cat=${encodeURIComponent(cat.id)}">${escapeHTML(cat.name)}</a>`).join('') +
    `</div>`;
}

const SITE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>`;
const CAT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="#12181c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.2"/></svg>`;

// External destinations for the "Visit website" buttons (edit freely).
const WATCH_LINK = 'https://www.google.com';
const LIVE_LINK = 'https://www.google1.com';

// Marks the matching bottom-tab as active. Call once per page with
// the tab name that page belongs to ('feed','trending','live','categories','channels', or null).
function highlightTab(name){
  if(!name) return;
  const el = document.querySelector('.tab-btn[data-tab="'+name+'"]');
  if(el) el.classList.add('active');
}

// Builds the shared bottom tab bar. Every page calls this once.
function tabbarHTML(){
  const showDot = LIVE_STREAMS.length>0;
  return `
  <a class="tab-btn" data-tab="feed" href="index.html?view=feed">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11L12 4l8 7"/><path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9"/></svg>
    <span>Home</span>
  </a>
  <a class="tab-btn" data-tab="trending" href="index.html?view=trending">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-6 4 3 6-8"/><path d="M14 6h4v4"/></svg>
    <span>Trending</span>
  </a>
  <a class="tab-btn" data-tab="live" href="index.html?view=live">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M6.5 7.5a7 7 0 0 0 0 9M17.5 7.5a7 7 0 0 1 0 9"/></svg>
    <span>Live</span>
    ${showDot?'<span class="dot"></span>':''}
  </a>
  <a class="tab-btn" data-tab="categories" href="index.html?view=categories">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.2"/></svg>
    <span>Categories</span>
  </a>
  <a class="tab-btn" data-tab="channels" href="index.html?view=channels">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l3-4 3 4"/><circle cx="12" cy="13.5" r="2.5"/></svg>
    <span>Channels</span>
  </a>`;
}
