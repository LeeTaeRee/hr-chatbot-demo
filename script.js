// 신성 HR Assistant — GitHub Pages용 순수 JavaScript

const departments = ["대외협력2팀","경영지원팀","공조영업팀","공사1팀","기술연구소","CS팀","제조팀","안전보건경영실"];
const titles = ["사원","대리","과장","차장","부장","팀장","대표이사"];

const defaultUsers = [
  {employeeId:"SS240603", id:"emp001", pw:"emp123", name:"이수연", dept:"공조사업부", team:"공조영업팀", title:"사원", role:"user", phone:"010-2222-3333", email:"sy.lee@shinsung.co.kr", leave:{total:21, used:5.5, remaining:15.5}, ot:0, approved:true},
  {employeeId:"SS240222", id:"admin@company.com", pw:"Admin123!", name:"이태리", dept:"대외협력2팀", team:"대외협력2팀", title:"사원", role:"admin", phone:"02-1234-5678", email:"tr.lee@shinsung.co.kr", leave:{total:20, used:4, remaining:16}, ot:8, approved:true},
  {employeeId:"SS000001", id:"exec@company.com", pw:"Exec123!", name:"박대표", dept:"경영전략실", team:"대표이사", title:"대표이사", role:"executive", phone:"010-0000-1111", email:"ceo@shinsung.co.kr", leave:{total:25, used:2, remaining:23}, ot:0, approved:true},
  {employeeId:"SS220050", id:"manager@company.com", pw:"Mgr123!", name:"최팀장", dept:"공조사업부", team:"공조영업팀", title:"팀장", role:"manager", phone:"010-5555-6666", email:"choi@shinsung.co.kr", leave:{total:21, used:7, remaining:14}, ot:15, approved:true}
];

const employees = [
  {employeeId:"SS000001", name:"박대표", title:"대표이사", dept:"경영전략실", team:"대표이사", phone:"010-0000-1111", email:"ceo@shinsung.co.kr"},
  {employeeId:"SS240222", name:"이태리", title:"사원", dept:"대외협력실", team:"대외협력2팀", phone:"02-2600-9603", email:"tr.lee@shinsung.co.kr"},
  {employeeId:"SS240603", name:"김민준", title:"팀장", dept:"법무팀", team:"법무팀", phone:"010-2222-3333", email:"mj.kim@shinsung.co.kr"},
  {employeeId:"SS220050", name:"최팀장", title:"팀장", dept:"공조사업부", team:"공조영업팀", phone:"010-5555-6666", email:"choi@shinsung.co.kr"},
  {employeeId:"SS230014", name:"이수연", title:"사원", dept:"공조사업부", team:"공조영업팀", phone:"010-2222-3333", email:"sy.lee@shinsung.co.kr"},
  {employeeId:"SS210092", name:"지한솔", title:"대리", dept:"공조사업부", team:"공조영업팀", phone:"02-2600-9621", email:"hs.ji@shinsung.co.kr"},
  {employeeId:"SS190012", name:"서효석", title:"상무", dept:"공조사업부", team:"공조사업부", phone:"02-2600-9620", email:"hs.seo@shinsung.co.kr"},
  {employeeId:"SS240701", name:"이기원", title:"부장", dept:"공조사업부", team:"공조영업팀", phone:"02-2600-9622", email:"gw.lee@shinsung.co.kr"},
  {employeeId:"SS240702", name:"고완식", title:"부장", dept:"공조사업부", team:"공조영업팀", phone:"02-2600-9623", email:"ws.go@shinsung.co.kr"},
  {employeeId:"SS240703", name:"전은영", title:"대리", dept:"공조사업부", team:"공조영업팀", phone:"02-2600-9624", email:"ey.jeon@shinsung.co.kr"},
  {employeeId:"SS240704", name:"권순형", title:"5급갑", dept:"공조사업부", team:"공조영업팀", phone:"02-2600-9625", email:"sh.kwon@shinsung.co.kr"},
  {employeeId:"SS200031", name:"최종대", title:"팀장", dept:"대외협력실", team:"대외협력1팀", phone:"02-2600-9601", email:"jd.choi@shinsung.co.kr"},
  {employeeId:"SS210020", name:"채수운", title:"부장", dept:"대외협력실", team:"대외협력1팀", phone:"02-2600-9602", email:"sw.chae@shinsung.co.kr"},
  {employeeId:"SS180003", name:"윤인규", title:"전무", dept:"공사부", team:"공사1팀", phone:"02-2600-9650", email:"ik.yoon@shinsung.co.kr"},
  {employeeId:"SS200777", name:"김한영", title:"이사", dept:"기술연구소", team:"하이테크개발팀", phone:"02-2600-9680", email:"hy.kim@shinsung.co.kr"}
];

const orgUploadedEmployees = [{"employeeId": "ORG0001", "name": "이경민", "title": "계약직", "dept": "공사1팀", "team": "공사1팀", "phone": "-", "email": "-"}, {"employeeId": "ORG0002", "name": "김민서", "title": "계약직", "dept": "공사1팀", "team": "공사1팀", "phone": "-", "email": "-"}, {"employeeId": "ORG0003", "name": "진성욱", "title": "계약직", "dept": "공사1팀", "team": "공사1팀", "phone": "-", "email": "-"}, {"employeeId": "ORG0004", "name": "오대양", "title": "계약직", "dept": "공사2팀", "team": "공사2팀", "phone": "-", "email": "-"}, {"employeeId": "ORG0005", "name": "황남열", "title": "4급", "dept": "CS팀", "team": "CS팀", "phone": "-", "email": "-"}];

const vacationRows = [
  {dept:"경영전략실", team:"대표이사", name:"박대표", title:"대표이사", start:"2026-08-05", end:"2026-08-07", status:"제출완료"},
  {dept:"법무팀", team:"법무팀", name:"김민준", title:"팀장", start:"2026-07-28", end:"2026-08-01", status:"제출완료"},
  {dept:"법무팀", team:"법무팀", name:"이하늘", title:"대리", start:"2026-08-04", end:"2026-08-06", status:"제출완료"},
  {dept:"법무팀", team:"법무팀", name:"박서연", title:"사원", start:"", end:"", status:"미제출"},
  {dept:"공조사업부", team:"공조영업팀", name:"최팀장", title:"팀장", start:"2026-07-21", end:"2026-07-25", status:"제출완료"},
  {dept:"공조사업부", team:"공조영업팀", name:"이수연", title:"사원", start:"2026-08-11", end:"2026-08-14", status:"제출완료"},
  {dept:"공조사업부", team:"공조영업팀", name:"지한솔", title:"대리", start:"", end:"", status:"미제출"},
  {dept:"대외협력실", team:"대외협력2팀", name:"이태리", title:"사원", start:"2026-08-18", end:"2026-08-20", status:"제출완료"},
  {dept:"공사부", team:"공사1팀", name:"윤인규", title:"전무", start:"2026-08-01", end:"2026-08-02", status:"제출완료"},
  {dept:"기술연구소", team:"하이테크개발팀", name:"김한영", title:"이사", start:"", end:"", status:"미제출"}
];

const schedules = [
  {time:"10:00", title:"팀 회의", place:"회의실 A"},
  {time:"14:00", title:"법무 검토", place:"회의실 B"},
  {time:"16:00", title:"하계휴가 현황 보고", place:"대표이사 보고자료"}
];

const noticeRows = [
  {important:true, title:"사직원 작성 및 제출시 변경사항 안내의 건", writer:"이태리", date:"2026.03.24", views:243},
  {important:true, title:"계약서 검토 요청시 준수사항", writer:"전하늘", date:"2024.09.19", views:187},
  {important:false, title:"마곡사옥 소방시설 작동점검 안내문", writer:"석상민", date:"2026.06.18", views:31},
  {important:false, title:"직급체계 변경에 따른 영문 직함 변경 안내", writer:"이태리", date:"2026.06.17", views:89},
  {important:false, title:"법인카드 전표 페이퍼리스(Paperless) 도입 안내", writer:"권정수", date:"2026.06.17", views:72},
  {important:false, title:"06/18 입금내역 (16:00)", writer:"이예림", date:"2026.06.16", views:55},
  {important:false, title:"창립기념일 선물 만족도 조사의 건", writer:"서정민", date:"2026.06.15", views:44},
  {important:false, title:"2026년 7월 직무역량교육 안내", writer:"임다빈", date:"2026.06.11", views:67},
  {important:false, title:"2026년 2분기 산업안전교육 안내", writer:"김은지", date:"2026.06.11", views:58},
  {important:false, title:"상반기 연차 사용 촉진 안내", writer:"이태리", date:"2026.05.10", views:134}
];

const calEvents = {
  "2026-6-10":[["trip","출장"]], "2026-6-12":[["leave","연차"]],
  "2026-6-18":[["half","반차"]], "2026-6-20":[["leave","연차"]],
  "2026-6-27":[["trip","출장"]], "2026-7-21":[["summer","여름휴가"]], "2026-8-11":[["summer","여름휴가"]]
};

const policy = [
  {keys:["연차","휴가","반차"], text:"연차는 [근태관리 > 근태 신청 / 수정]에서 신청할 수 있습니다.\n\n1년간 80% 이상 출근 시 15일이 부여되며, 3년 이상 근속자는 매 2년마다 1일씩 가산됩니다.\n\n팀장 결재 후 확정되며, 확정된 일정은 일정관리와 캘린더에 반영됩니다.", form:"attendance"},
  {keys:["경조","결혼","부고","사망"], text:"경조금은 [복리후생 관리 > 복리후생 신청 > 경조금]에서 신청할 수 있습니다.\n\n본인 결혼은 휴가 6일과 경조금 50만 원, 부모상은 휴가 6일과 경조금 50만 원 기준입니다.\n\n사유 발생일 이후 2개월 이내 신청해 주세요.", form:"gyeongjo"},
  {keys:["출장","출장비","출장원","숙박"], text:"출장원은 [근태관리 > 출장원 신청]에서 작성합니다.\n\n국내출장 숙박비는 팀장/팀원 기준 1일 4만 원이며, 편도 50km 초과 및 사전 승인 조건을 충족해야 합니다.", form:"trip"},
  {keys:["급여","월급","급여일"], text:"급여는 매월 25일 지급됩니다. 25일이 휴일이면 전일 지급됩니다.\n\n급여 계산기간은 전월 21일부터 당월 20일까지입니다.", form:null},
  {keys:["교육","학자금"], text:"교육 신청은 [복리후생 관리 > 복리후생 신청 > 교육]에서 가능합니다.\n\n교육명, 기관, 기간, 비용, 직무 관련성을 입력해 신청하면 결재 후 처리됩니다.", form:"edu"},
  {keys:["보일러"], text:"보일러 관련 복리후생 신청은 [복리후생 관리 > 복리후생 신청 > 보일러]에서 접수할 수 있습니다.\n\n대상자, 설치/수리 구분, 희망일, 요청 사유를 작성해 주세요.", form:"boiler"},
  {keys:["증명서","재직","경력"], text:"재직증명서와 경력증명서는 [복리후생 관리 > 복리후생 신청 > 증명서]에서 신청할 수 있습니다.\n\n사용 목적과 제출처를 입력하면 담당자 확인 후 발급됩니다.", form:"cert"}
];

let state = {
  user:null,
  page:"home",
  month:5,
  year:2026,
  requests: JSON.parse(localStorage.getItem("ss_requests") || "[]"),
  userSchedules: JSON.parse(localStorage.getItem("ss_schedules") || "[]"),
  users: JSON.parse(localStorage.getItem("ss_users") || "null") || defaultUsers
};

const $ = (s)=>document.querySelector(s);
const $$ = (s)=>Array.from(document.querySelectorAll(s));
const saveUsers = ()=>localStorage.setItem("ss_users", JSON.stringify(state.users));
const saveRequests = ()=>localStorage.setItem("ss_requests", JSON.stringify(state.requests));
const saveSchedules = ()=>localStorage.setItem("ss_schedules", JSON.stringify(state.userSchedules));

function normalizeDemoUsers(){
  // 기존 브라우저 localStorage에 예전 데모 계정이 남아 있어도
  // 직원/팀장/대표/인사담당자 권한이 정확히 보이도록 기본 데모 계정은 최신값으로 고정합니다.
  const byKey = new Map(state.users.map(u => [u.id, u]));
  defaultUsers.forEach(d => byKey.set(d.id, {...(byKey.get(d.id)||{}), ...d}));
  state.users = Array.from(byKey.values());
  saveUsers();
}

document.addEventListener("DOMContentLoaded", init);

function init(){
  normalizeDemoUsers();
  departments.forEach(d=>$("#signupDept").insertAdjacentHTML("beforeend",`<option>${d}</option>`));
  titles.forEach(t=>$("#signupTitle").insertAdjacentHTML("beforeend",`<option>${t}</option>`));
  $$("[data-auth-tab]").forEach(btn=>btn.onclick=()=>toggleAuth(btn.dataset.authTab));
  $("#loginBtn").onclick=login;
  $("#signupBtn").onclick=signup;
  $("#logoutBtn").onclick=logout;
  if($("#profileLogoutBtn")) $("#profileLogoutBtn").onclick=logout;
  if($("#topProfileBtn")) $("#topProfileBtn").onclick=()=>$("#profileDropdown").classList.toggle("hidden");
  $("#modalClose").onclick=closeModal;
  $("#modalCancel").onclick=closeModal;
  $("#modalSubmit").onclick=submitModal;
  $("#prevMonth").onclick=()=>{state.month--; if(state.month<0){state.month=11;state.year--} renderCalendar()};
  $("#nextMonth").onclick=()=>{state.month++; if(state.month>11){state.month=0;state.year++} renderCalendar()};
  $("#loginPw").addEventListener("keydown", e=>{if(e.key==="Enter") login()});
  document.body.addEventListener("click", e=>{
    const g=e.target.closest("[data-global]");
    if(g){ handleGlobalAction(g.dataset.global); return; }
    const p=e.target.closest("[data-page]"); if(p) changePage(p.dataset.page);
    const form=e.target.closest("[data-form]"); if(form) openForm(form.dataset.form);
    const chip=e.target.closest("[data-ask]"); if(chip) askChat(chip.dataset.ask);
  });
  renderToday();
  renderCalendar();
}

function handleGlobalAction(action){
  if(action==="logout") return logout();
  if(action==="alarm") return toast("새 알림이 없습니다.");
  if(action==="setting") return toast("설정 메뉴는 데모에서는 비활성화되어 있습니다.");
  if(action==="notice") return changePage("notice");
  if(action==="chart") return changePage("vacationReport");
}

function toggleAuth(tab){
  $$("[data-auth-tab]").forEach(b=>b.classList.toggle("active", b.dataset.authTab===tab));
  $("#loginForm").classList.toggle("hidden", tab!=="login");
  $("#signupForm").classList.toggle("hidden", tab!=="signup");
}

function login(){
  const id=$("#loginId").value.trim(), pw=$("#loginPw").value;
  const user=state.users.find(u=>(u.id===id || u.employeeId===id) && u.pw===pw);
  if(!user) return toast("아이디 또는 비밀번호를 확인해 주세요.");
  if(!user.approved) return toast("아직 승인 대기 중입니다.");
  state.user=user;
  state.page="ai"; // 로그인 시 무조건 AI 상담 화면으로 초기화
  $("#loginPage").classList.add("hidden");
  $("#app").classList.remove("hidden");
  renderShell();
  changePage("ai");
  toast(`${user.name}님 환영합니다.`);
}

function signup(){
  const name=$("#signupName").value.trim(), employeeId=$("#signupEmpNo").value.trim(), id=$("#signupId").value.trim(), pw=$("#signupPw").value;
  const dept=$("#signupDept").value, title=$("#signupTitle").value;
  if(!name||!employeeId||!id||!pw||!dept||!title) return toast("모든 항목을 입력해 주세요.");
  if(pw.length<4) return toast("비밀번호는 4자 이상으로 입력해 주세요.");
  if(state.users.some(u=>u.id===id||u.employeeId===employeeId)) return toast("이미 등록된 아이디 또는 사번입니다.");
  state.users.push({employeeId,id,pw,name,dept,team:dept,title,role:"user",approved:true,phone:"",email:id.includes("@")?id:"",leave:{total:15,used:0,remaining:15},ot:0});
  saveUsers();
  toggleAuth("login");
  toast("회원가입 완료! 데모에서는 바로 로그인 가능합니다.");
}

function logout(){
  state.user=null;
  state.page="home";
  sessionStorage.clear();
  $("#profileDropdown")?.classList.add("hidden");
  $("#app").classList.add("hidden");
  $("#loginPage").classList.remove("hidden");
  $("#loginId").value="";
  $("#loginPw").value="";
  $("#content").innerHTML="";
}

function renderShell(){
  const u=state.user;
  $("#sideAvatar").innerHTML=`<span class="person-icon"></span>`;
  $("#sideName").textContent=u.name;
  $("#sideMeta").textContent=`${u.dept} ${u.title}`;
  $("#sideEmpNo").textContent=u.employeeId;
  if($("#topProfileAvatar")) $("#topProfileAvatar").innerHTML=`<span class="person-icon"></span>`;
  if($("#topProfileName")) $("#topProfileName").textContent=u.name;
  if($("#topProfileRole")) $("#topProfileRole").textContent=`${u.dept} ${u.title}`;
  $("#rightProfileCard").innerHTML=`
    <div class="right-profile-inner right-profile-menu-card">
      <div class="right-profile-top">
        <span class="top-avatar"><span class="person-icon"></span></span>
        <div><b>${u.name} ${u.title}</b><p>${u.dept} · ${u.employeeId}</p></div>
      </div>
      <div class="right-profile-actions">
        <button type="button" data-page="myinfo">내정보</button>
        <button type="button" onclick="logout()">로그아웃</button>
      </div>
    </div>`;
  updateRightbar();
  renderNav();
}

const icons = {
  ai:`<svg viewBox="0 0 24 24"><path d="M5 8.5h14v8H5z"/><path d="M9 8.5V6m6 2.5V6M8.8 12h.01M15.2 12h.01M10 15h4"/><path d="M5 13H3m18 0h-2"/></svg>`,
  attendance:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/></svg>`,
  status:`<svg viewBox="0 0 24 24"><path d="M7 7h10M7 12h10M7 17h10"/><path d="M4 7h.01M4 12h.01M4 17h.01"/></svg>`,
  trip:`<svg viewBox="0 0 24 24"><path d="M4 12l16-7-7 16-2-7z"/></svg>`,
  tripStatus:`<svg viewBox="0 0 24 24"><path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`,
  welfare:`<svg viewBox="0 0 24 24"><path d="M20 12v8H4v-8M3 8h18v4H3z"/><path d="M12 8v12M12 8c-2.5 0-4-1-4-2.5S10 3 12 8Zm0 0c2.5 0 4-1 4-2.5S14 3 12 8Z"/></svg>`,
  schedule:`<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>`,
  vacation:`<svg viewBox="0 0 24 24"><path d="M4 19c3-4 13-4 16 0M6 10c3-5 9-5 12 0"/><path d="M12 10v8"/></svg>`,
  report:`<svg viewBox="0 0 24 24"><path d="M5 19V5M5 19h14"/><path d="M8 16v-4M12 16V8M16 16v-7"/></svg>`,
  admin:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 3.1a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L5.1 11a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.3 3.1h5l.3-3.1a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z"/></svg>`,
  approval:`<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>`,
  org:`<svg viewBox="0 0 24 24"><path d="M12 6v4M6 14h12M6 14v4M12 14v4M18 14v4"/><rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="18" width="6" height="3" rx="1"/><rect x="9" y="18" width="6" height="3" rx="1"/><rect x="15" y="18" width="6" height="3" rx="1"/></svg>`,
  edu:`<svg viewBox="0 0 24 24"><path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v6M6 10.5v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/></svg>`
};

function renderNav(){
  const nav=$("#nav");
  const role = state.user.role;
  const menu = [
    {label:"AI 상담", page:"ai", icon:"ai"},
    {section:"근태관리"},
    {label:"근태 신청 / 수정", page:"attendance", icon:"attendance", sub:true},
    {label:"근태현황", page:"attendanceStatus", icon:"status", sub:true},
    {label:"출장원 신청", page:"tripApply", icon:"trip", sub:true},
    {label:"출장원 현황", page:"tripStatus", icon:"tripStatus", sub:true},
    {label:"하계휴가 조사", page:"vacation", icon:"vacation", sub:true},
    {section:"복리후생"},
    {label:"복리후생 신청", page:"welfare", icon:"welfare", sub:true},
    {label:"복리후생 현황", page:"welfareStatus", icon:"status", sub:true},
    {section:"일정"},
    {label:"일정관리", page:"schedule", icon:"schedule"}
  ];
  if(["manager","executive"].includes(role)) {
    menu.push({section:"관리"});
    menu.push({label:"승인관리", page:"approval", icon:"approval", sub:true});
    menu.push({label: role==="executive" ? "전체 관리" : "팀 현황", page:"vacationReport", icon:"report", sub:true});
  }
  if(role==="admin") {
    menu.push({section:"인사담당자"});
    menu.push({label:"전체 관리", page:"vacationReport", icon:"report", sub:true});
    menu.push({label:"계정/접수 관리", page:"admin", icon:"admin", sub:true});
  }
  menu.push({section:"조직"});
  menu.push({label:"조직도", page:"org", icon:"org", sub:true});
  nav.innerHTML = menu.map(m=>{
    if(m.section) return `<div class="nav-section">${m.section}</div>`;
    return `<button class="nav-btn ${m.sub?'sub':''}" data-page="${m.page}"><span class="nav-icon">${icons[m.icon]||''}</span>${m.label}</button>`;
  }).join("");
}
function changePage(page){
  state.page=page;
  $$(".nav-btn").forEach(b=>b.classList.toggle("active", b.dataset.page===page));
  const titles = {
    home:["홈","신성엔지니어링 HR Portal에 오신 것을 환영합니다."],
    ai:["AI 상담","규정 문의와 신청 업무를 챗봇으로 빠르게 처리하세요."],
    attendance:["근태 신청 / 수정","연차, 반차, 외출, 조퇴를 신청하거나 수정 요청합니다."],
    attendanceStatus:["근태현황","월별 출근, 연차, 초과근무 현황을 확인합니다."],
    tripApply:["출장원 신청","출장 목적, 기간, 비용을 작성합니다."],
    tripStatus:["출장원 현황","출장 신청 및 승인 상태를 확인합니다."],
    vacation:["하계휴가 조사","팀원 제출 여부와 내 휴가 일정을 확인합니다."],
    welfare:["복리후생 신청","경조금, 교육, 보일러, 증명서를 신청합니다."],
    welfareStatus:["복리후생 신청 현황","복리후생 신청 건의 처리상태를 확인합니다."],
    schedule:["일정관리","부서/팀 일정과 개인 일정을 확인합니다."],
    org:["임직원 정보","사번, 부서, 직급, 연락처를 검색합니다."],
    myinfo:["내정보","내 사번과 그룹웨어 연동 예정 정보를 확인합니다."],
    approval:["승인관리","팀장/대표이사 승인 대기 건을 확인합니다."],
    vacationReport:["하계휴가 현황보고","팀장/대표이사 보고용 전체 현황을 확인합니다."],
    admin:["관리자","임직원 계정과 신청 데이터를 관리합니다."]
  };
  $("#pageTitle").textContent=titles[page]?.[0]||"HR Portal";
  $("#pageDesc").textContent=titles[page]?.[1]||"";
  const map = {
    home:renderHome, ai:renderAI, attendance:renderAttendance, attendanceStatus:renderAttendanceStatus, tripApply:renderTripApply, tripStatus:renderTripStatus,
    vacation:renderVacation, welfare:renderWelfare, welfareStatus:renderWelfareStatus, schedule:renderSchedule, org:renderOrg, myinfo:renderMyInfo,
    approval:renderApproval, vacationReport:renderVacationReport, admin:renderAdmin
  };
  $("#content").innerHTML = "";
  (map[page]||renderHome)();
}

function updateRightbar(){
  const u=state.user || defaultUsers[0];
  const leavePct = Math.round((u.leave.remaining/u.leave.total)*1000)/10;
  const pending = pendingCount();
  $("#rbLeave").textContent=u.leave.remaining;
  $("#rbLeaveTotal").textContent=u.leave.total;
  $("#rbLeavePct").textContent=`${leavePct}%`;
  $("#rbLeaveBar").style.width=`${leavePct}%`;
  if($("#rbUsed")){
    const usedPct = Math.round((u.leave.used/u.leave.total)*1000)/10;
    $("#rbUsed").textContent=u.leave.used;
    $("#rbUsedBar").style.width=`${usedPct}%`;
  }
  if($("#rbPending")){
    $("#rbPending").textContent=pending;
    $("#rbPendingPct").textContent=pending ? "확인필요" : "완료";
    $("#rbPendingBar").style.width=pending ? "70%" : "100%";
  }
}

function renderToday(){
  const items = getTodaySchedules();
  $("#todayList").innerHTML=items.map(s=>`<div class="today-item"><time>${s.time||"종일"}</time><div><b>${s.title}</b><p>${s.place||s.team||""}</p></div></div>`).join("");
}
function getTodaySchedules(){
  const approved = state.userSchedules.filter(s=>s.status==="승인").map(s=>({time:"종일", title:s.title, place:s.team||s.dept}));
  return [...schedules, ...approved].slice(0,5);
}

function renderCalendar(){
  const y=state.year, m=state.month;
  $("#calTitle").textContent=`${y}년 ${m+1}월`;
  const names=["일","월","화","수","목","금","토"];
  const first=new Date(y,m,1).getDay();
  const last=new Date(y,m+1,0).getDate();
  let html=names.map(n=>`<div class="cal-name">${n}</div>`).join("");
  for(let i=0;i<first;i++) html+=`<div class="cal-day dim"></div>`;
  for(let d=1;d<=last;d++){
    const key=`${y}-${m+1}-${d}`;
    const dynamic = state.userSchedules.filter(ev=>{
      if(ev.status!=="승인" || !ev.start) return false;
      const dt=new Date(ev.start);
      return dt.getFullYear()===y && dt.getMonth()===m && dt.getDate()===d;
    }).map(ev=>["schedule",ev.title]);
    const dots=[...(calEvents[key]||[]), ...dynamic].map(([type])=>`<i class="${type==='leave'?'leave':type==='trip'?'trip':type==='edu'?'edu':type==='half'?'half':type==='summer'?'summer':'schedule'}"></i>`).join("");
    const today=new Date();
    const isToday = y===today.getFullYear() && m===today.getMonth() && d===today.getDate();
    html+=`<div class="cal-day ${isToday?'today':''}">${d}<div class="cal-dots">${dots}</div></div>`;
  }
  $("#calendar").innerHTML=html;
}

function renderAI(){
  $("#content").innerHTML = `
  <div class="chat-layout single">
    <div class="card chat-card navy-chat">
      <div class="chat-head">
        <span class="chatbot-avatar-img"><img src="assets/chatbot.png" class="chatbot-avatar" alt="챗봇"></span>
        <div><h3>신성 HR Assistant</h3><p>연차·경조금·출장·급여 등 인사 문의를 도와드립니다.</p></div>
        <button class="ghost" onclick="newChat()">대화 초기화</button>
      </div>
      <div id="chatBox" class="chat-box"></div>
      <div class="chat-tools">
        <div class="chips">
          ${["연차 신청 방법","경조금 기준","출장비 정산","급여 지급일","더보기"].map(x=>`<button class="chip" data-ask="${x}">${x}</button>`).join("")}
        </div>
        <div class="chat-input"><input id="chatInput" placeholder="질문을 입력하세요..."/><button class="send" onclick="sendChat()">➤</button></div>
      </div>
    </div>
  </div>`;
  newChat();
  $("#chatInput").addEventListener("keydown",e=>{if(e.key==="Enter") sendChat()});
}
const FORM_LABELS = {
  attendance:"근태 신청하기", trip:"출장원 신청하기", gyeongjo:"경조금 신청하기",
  edu:"교육 신청하기", boiler:"보일러 신청하기", cert:"증명서 신청하기", vacation:"하계휴가 제출하기"
};

function botMsg(text, formType){
  const btn = formType
    ? `<button class="chat-apply-btn" data-form="${formType}">📋 ${FORM_LABELS[formType]||"신청서 작성하기"}</button>`
    : "";
  return `<div class="msg"><span class="msg-bot-wrap"><img src="assets/chatbot.png" class="msg-bot-icon" alt="챗봇"></span><div><div class="msg-name">신성 HR Assistant</div><div class="bubble">${text}</div>${btn}</div></div>`;
}
function userMsg(text){return `<div class="msg user"><div class="tiny-photo"><span class="person-icon"></span></div><div><div class="msg-name">나</div><div class="bubble">${text}</div></div></div>`}

let chatHistory = [];

function newChat(){
  chatHistory = [];
  const box=$("#chatBox"); if(!box) return;
  box.innerHTML = botMsg(`안녕하세요, ${state.user.name}님.\n신성 HR Assistant입니다.\n연차, 경조금, 출장, 급여 관련 문의를 도와드리겠습니다.`, null);
}

function sendChat(){ const v=$("#chatInput").value.trim(); if(!v) return; askChat(v); $("#chatInput").value=""; }

function askChat(q){
  const box=$("#chatBox"); if(!box) return;
  box.insertAdjacentHTML("beforeend", userMsg(q));
  box.scrollTop = box.scrollHeight;

  const hit = policy.find(p=>p.keys.some(k=>q.replace(/\s/g,"").includes(k)));

  const loadId = "load_" + Date.now();
  box.insertAdjacentHTML("beforeend", `<div id="${loadId}" class="msg"><span class="msg-bot-wrap"><img src="assets/chatbot.png" class="msg-bot-icon" alt="챗봇"></span><div><div class="msg-name">신성 HR Assistant</div><div class="bubble" style="color:var(--sub)">답변을 생성하는 중...</div></div></div>`);
  box.scrollTop = box.scrollHeight;

  chatHistory.push({role:"user", content: q});

  const systemPrompt = `당신은 신성엔지니어링(주)의 사내 HR 어시스턴트입니다. 친절하고 명확하게 답변하세요.

[회사 인사 규정]
1. 연차: 1년 80% 이상 출근 시 15일 부여. 3년 이상 근속자 매 2년마다 1일 가산. 팀장 결재 후 확정.
2. 경조금: 본인결혼 휴가6일+경조금50만원, 부모상 휴가6일+경조금50만원. 사유 발생 후 2개월 이내 신청.
3. 출장: 국내 숙박비 팀장/팀원 기준 1일 4만원. 편도 50km 초과 및 사전 승인 조건.
4. 급여: 매월 25일 지급(휴일이면 전일). 계산기간 전월 21일~당월 20일.
5. 교육: 교육명, 기관, 기간, 비용, 직무관련성 입력 후 결재.
6. 보일러: 대상자, 설치/수리 구분, 희망일, 요청사유 작성.
7. 재직/경력증명서: 사용목적과 제출처 입력 후 담당자 확인 발급.

신청이 필요한 경우 신청서를 안내하세요. 답변은 간결하게 200자 이내로 해주세요.`;

  fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-sonnet-4-6",
      max_tokens:400,
      system: systemPrompt,
      messages: chatHistory
    })
  })
  .then(r=>r.json())
  .then(data=>{
    const el = document.getElementById(loadId);
    if(el) el.remove();
    const reply = data.content?.[0]?.text || "죄송합니다, 잠시 후 다시 시도해 주세요.";
    chatHistory.push({role:"assistant", content: reply});
    box.insertAdjacentHTML("beforeend", botMsg(reply, hit?.form));
    box.scrollTop = box.scrollHeight;
  })
  .catch(()=>{
    const el = document.getElementById(loadId);
    if(el) el.remove();
    const text = hit ? hit.text : "문의하신 내용은 인사담당자 확인이 필요합니다.\n\n연차, 경조금, 출장, 급여일, 교육, 보일러, 증명서 문의를 도와드립니다.";
    chatHistory.push({role:"assistant", content: text});
    box.insertAdjacentHTML("beforeend", botMsg(text, hit?.form));
    box.scrollTop = box.scrollHeight;
  });
}

function renderHomeKpi(){
  const u=state.user;
  return `<div class="welcome"><div><h1>안녕하세요, ${u.name}님! 👋</h1><p>오늘도 좋은 하루 되세요. &nbsp;|&nbsp; 2026년 6월 21일 (일)</p></div></div>
  <div class="kpi compact-kpi">
    <div class="card"><span>잔여 연차</span><strong>${u.leave.remaining}<em>일</em></strong><p>/ ${u.leave.total}일 사용 가능</p><div class="bar"><i style="width:${u.leave.remaining/u.leave.total*100}%"></i></div></div>
    <div class="card"><span>사용 연차</span><strong>${u.leave.used}<em>일</em></strong><p>/ ${u.leave.total}일 중 사용</p><div class="bar"><i style="width:${u.leave.used/u.leave.total*100}%"></i></div></div>
    <div class="card"><span>이번달 출근일수</span><strong>18<em>일</em></strong><p>/ 22일 출근율 81.8%</p><div class="bar"><i style="width:81.8%"></i></div></div>
  </div>`;
}
function pendingCount(){
  const base = state.requests.filter(r=>!r.done).length;
  return base || (state.user?.role==="user" ? 2 : state.user?.role==="admin" ? 8 : 4);
}

function renderHome(){
  const recentNotice = noticeRows.slice(0,5).map(n=>`<li><span>${n.important?'<b class="notice-important">중요</b>':''}${n.title}</span><em>${n.date}</em></li>`).join("");
  $("#content").innerHTML = renderHomeKpi()+`
  <div class="home-main-grid">
    <div>
      <div class="card work-card">
        <h3>오늘 근무</h3>
        <p>출퇴근은 ERP 시스템과 추후 연동 예정입니다.</p>
        <div class="work-status">
          <div><span>출근</span><strong id="clockInText">미체크</strong></div>
          <div><span>퇴근</span><strong id="clockOutText">-</strong></div>
          <div><span>근무상태</span><strong>근무 전</strong></div>
        </div>
        <div class="work-buttons"><button class="primary" onclick="clockIn()">출근 체크</button><button class="ghost" onclick="clockOut()">퇴근 체크</button></div>
      </div>
    </div>
    <div>
      <div class="card"><h3>공지사항</h3><ul class="notice-mini">${recentNotice}</ul><button class="ghost full" data-page="notice" style="margin-top:12px">공지사항 전체보기</button></div>
      <div class="card" style="margin-top:16px"><h3>오늘 일정</h3><div class="today-list">${schedules.map(s=>`<div class="today-item"><time>${s.time}</time><div><b>${s.title}</b><p>${s.place}</p></div></div>`).join("")}</div></div>
    </div>
  </div>`;
}

function clockIn(){ const t=new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'}); const el=$("#clockInText"); if(el) el.textContent=t; toast("출근 체크되었습니다. ERP 연동 예정입니다."); }
function clockOut(){ const t=new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'}); const el=$("#clockOutText"); if(el) el.textContent=t; toast("퇴근 체크되었습니다. ERP 연동 예정입니다."); }

function renderNotice(){
  $("#content").innerHTML = `<div class="card notice-card"><div class="notice-top"><div><b>총 ${noticeRows.length}건</b></div><input id="noticeSearch" placeholder="공지사항 검색" oninput="filterNotice()"></div><div id="noticeTable"></div></div>`;
  filterNotice();
}
function filterNotice(){
  const q=($("#noticeSearch")?.value||"").toLowerCase();
  const rows=noticeRows.filter(n=>[n.title,n.writer,n.date].join(" ").toLowerCase().includes(q));
  $("#noticeTable").innerHTML = tableHtml([["제목","작성자","작성일","조회"],...rows.map(n=>[`${n.important?'<b class="notice-important">중요</b> ':''}${n.title}`,n.writer,n.date,n.views])]);
}
function renderApproval(){
  const pending = state.requests.filter(r=>r.status!=="승인" && r.status!=="반려");
  const rows = pending.length ? pending.map(r=>[
    r.date,
    r.title,
    r.user,
    badge(r.status||"승인대기"),
    `<button class="small-approve" onclick="approveRequest('${r.id}')">승인</button> <button class="small-reject" onclick="rejectRequest('${r.id}')">반려</button>`
  ]) : [["-","승인 대기 건이 없습니다.","-",badge("완료"),"-"]];
  $("#content").innerHTML = renderHomeKpi()+tableCard("승인 대기", [["신청일","구분","신청자","상태","처리"],...rows]);
}

function approveRequest(id){
  const r=state.requests.find(x=>x.id===id);
  if(!r) return;
  r.status="승인";
  r.done=true;
  if(r.type==="schedule" && r.fields){
    state.userSchedules.push({
      title:r.fields.title||"일정 등록",
      start:r.fields.start||"2026-06-18",
      end:r.fields.end||r.fields.start||"2026-06-18",
      dept:r.fields.dept||state.user.dept,
      team:r.fields.team||state.user.team,
      related:r.fields.related||[],
      memo:r.fields.memo||"",
      owner:r.user,
      status:"승인"
    });
    saveSchedules();
  }
  saveRequests();
  updateRightbar();
  renderApproval();
  renderCalendar();
  toast("승인 처리되었습니다.");
}

function rejectRequest(id){
  const r=state.requests.find(x=>x.id===id);
  if(!r) return;
  r.status="반려";
  r.done=true;
  saveRequests();
  updateRightbar();
  renderApproval();
  toast("반려 처리되었습니다.");
}


function renderAttendance(){
  $("#content").innerHTML = renderHomeKpi()+`
  <div class="grid grid-3">
    <button class="card action-card" data-form="attendance"><div class="action-icon">🕘</div><h3>근태 신청</h3><p>연차·반차·외출·조퇴 신청</p></button>
    <button class="card action-card" data-form="attmod"><div class="action-icon">✏️</div><h3>근태 수정</h3><p>지각·결근·출퇴근 누락 수정</p></button>
    <button class="card action-card" data-page="attendanceStatus"><div class="action-icon">📊</div><h3>근태현황</h3><p>월별 현황 조회</p></button>
  </div>`;
}

function renderAttendanceStatus(){
  $("#content").innerHTML = renderHomeKpi()+tableCard("근태현황",[
    ["일자","구분","시간","상태"],["2026.06.17","연차","종일","승인"],["2026.06.18","반차","오전","승인"],["2026.06.20","출근 누락","퇴근시간 미체크","승인대기"]
  ]);
}

function renderTripApply(){
  $("#content").innerHTML = `<div class="card erp-form-card">
    <div class="form-title-row"><h3>출장원 신청</h3><button class="primary" data-form="trip">출장원 양식 작성</button></div>
    <p class="erp-note">출장원 신청은 ERP 출장원(경비정산) 양식을 참고하여 구성했습니다. 현재는 데모 데이터이며, 실제 운영 시 ERP 데이터 업로드/연동이 필요합니다.</p>
    <div class="erp-grid">
      <label>출장일자</label><input type="date" value="2026-06-01"><input type="date" value="2026-06-22">
      <label>출장구분</label><select><option>국내</option><option>해외</option><option>시내</option></select><input placeholder="출장자 자동 입력">
      <label>출장지</label><input placeholder="예: 부산 OO현장" class="wide">
      <label>출장목적</label><textarea class="wide" placeholder="예: 현장 공종분리 협의"></textarea>
    </div>
    <h4>결재라인</h4>
    <div class="approval-line">
      <div><small>1 담당자</small><b>${state.user.name}</b><span>기안</span></div>
      <div><small>2 팀장</small><b>팀장</b><span>대기</span></div>
      <div><small>3 대표님</small><b>대표이사</b><span>대기</span></div>
      <div><small>접수자</small><b>인사담당자</b><span>접수</span></div>
    </div>
  </div>`;
}
function renderTripStatus(){
  $("#content").innerHTML = `${tableCard("출장원 현황",[
    ["신청일","출장구분","출장자","출장지","기간","결재상태","원화합계"],
    ["2026.05.20","국내","이병훈","하이닉스 용인 현장","2026.05.20","결재완료","56,200"],
    ["2026.06.10","국내","이태리","부산 OO현장","2026.06.24~06.25","승인대기","120,000"],
    ["2026.06.18","시내","지한솔","대전 고객사","2026.06.27","진행","30,000"]
  ])}<div class="card" style="margin-top:16px"><h3>결재 진행현황</h3>${tableHtml([["순번","구분","결재상태","결재자","직위","부서","결재일시"],["0","기안","신청",state.user.name,state.user.title,state.user.team,"2026-06-21 09:00"],["1","결재","대기","팀장","팀장",state.user.team,"-"],["2","결재","대기","대표이사","대표이사","경영전략실","-"],["3","접수","대기","인사담당자","사원","경영지원팀","-"]])}</div>`;
}

function renderWelfare(){
  $("#content").innerHTML = `<div class="card welfare-intro"><h3>복리후생 신청</h3><p>신청 양식을 선택하면 챗봇 안내와 함께 신청서를 작성할 수 있습니다.</p></div><div class="grid grid-4">
    ${[{f:"gyeongjo",i:"🎊",t:"경조금 신청",d:"결혼·출산·사망 등 경조 신청"},{f:"edu",i:"📚",t:"교육 신청",d:"교육비·직무교육 신청"},{f:"boiler",i:"🛠️",t:"보일러 신청",d:"보일러 설치/수리 지원 신청"},{f:"cert",i:"📄",t:"증명서 신청",d:"재직·경력증명서 발급"}].map(x=>`<button class="card action-card" data-form="${x.f}"><div class="action-icon">${x.i}</div><h3>${x.t}</h3><p>${x.d}</p></button>`).join("")}
  </div><div class="card" style="margin-top:16px"><h3>복리후생 현황</h3><p>인사담당자/대표이사는 전체 현황, 팀장은 소속 부서 또는 팀원 현황을 확인할 수 있도록 구성합니다.</p></div>`;
}
function renderWelfareStatus(){
  const demo = [
    {type:"경조금", date:"2026-05-20", user:"이수연", dept:"공조영업팀", status:"승인", note:"본인결혼 경조금 지급"},
    {type:"교육", date:"2026-06-03", user:"지한솔", dept:"공조영업팀", status:"진행", note:"직무교육 신청"},
    {type:"증명서", date:"2026-06-12", user:"이태리", dept:"대외협력2팀", status:"완료", note:"재직증명서 1부"},
    {type:"보일러", date:"2026-06-18", user:"박서연", dept:"법무팀", status:"승인대기", note:"임직원 보일러 신청"}
  ];
  const scoped = state.user.role==="user"
    ? demo.filter(x=>x.user===state.user.name || x.dept===state.user.team).slice(0,2)
    : state.user.role==="manager"
      ? demo.filter(x=>x.dept===state.user.team || x.dept===state.user.dept)
      : demo;
  const helper = state.user.role==="user" ? "내 신청현황만 표시합니다."
    : state.user.role==="manager" ? "소속 부서/팀원 신청현황만 표시합니다."
    : "전체 임직원 복리후생 신청현황을 표시합니다.";
  $("#content").innerHTML = `<div class="card welfare-status-card">
    <div class="form-title-row"><div><h3>복리후생 신청현황</h3><p>${helper}</p></div><button class="ghost" data-page="welfare">신청 양식 선택</button></div>
    ${tableHtml([["신청일","구분","신청자","부서/팀","상태","비고"],...scoped.map(r=>[r.date,r.type,r.user,r.dept,badge(r.status),r.note])])}
  </div>`;
}

function renderVacation(){
  $("#content").innerHTML = `<div class="card vacation-simple">
    <h3>하계휴가 조사</h3>
    <p>직원용 화면에서는 개인 희망 일정 입력만 표시합니다. 전체 현황은 인사담당자/관리자 화면에서 확인합니다.</p>
    <div class="form-2" style="margin-top:16px">
      <div><label>휴가 시작일</label><input type="date"></div>
      <div><label>휴가 종료일</label><input type="date"></div>
    </div>
    <label>비고</label>
    <textarea placeholder="특이사항 또는 희망사항 입력"></textarea>
    <button class="primary" data-form="vacation" style="margin-top:16px">제출하기</button>
  </div>`;
}

function renderVacationReport(){
  const total=vacationRows.length, done=vacationRows.filter(r=>r.status==="제출완료").length;
  const byDeptData = [...new Set(vacationRows.map(r=>r.dept))].map(d=>{
    const arr=vacationRows.filter(r=>r.dept===d), ok=arr.filter(r=>r.status==="제출완료").length;
    return {dept:d, total:arr.length, done:ok, rate:Math.round(ok/arr.length*100), missing:arr.filter(r=>r.status==="미제출").map(r=>r.name).join(", ")||"-"};
  });
  const byDept = byDeptData.map(x=>[x.dept, `${x.done}/${x.total}`, `${x.rate}%`, x.missing]);
  const chart = byDeptData.map(x=>`<div class="report-bar-row"><div class="report-label">${x.dept}</div><div class="report-track"><i style="width:${x.rate}%"></i></div><b>${x.rate}%</b></div>`).join("");
  const executiveNote = state.user.role==="executive" ? `<div class="card report-highlight"><h3>대표이사님용 요약</h3><p>전체 제출률은 <b>${Math.round(done/total*100)}%</b>입니다. 미제출 부서는 팀장에게 재안내 후 최종 취합하는 흐름으로 보고하면 깔끔합니다.</p></div>` : "";
  $("#content").innerHTML = `<div class="kpi">
    <div class="card"><span>전체 대상</span><strong>${total}<em>명</em></strong></div>
    <div class="card"><span>제출완료</span><strong>${done}<em>명</em></strong></div>
    <div class="card"><span>미제출</span><strong>${total-done}<em>명</em></strong></div>
    <div class="card"><span>제출률</span><strong>${Math.round(done/total*100)}<em>%</em></strong></div>
  </div>
  ${executiveNote}
  <div class="card report-chart"><h3>부서별 하계휴가 제출률</h3>${chart}</div>
  ${tableCard("대표이사 보고용 부서별 현황", [["부서","제출","제출률","미제출자"],...byDept])}
  ${vacTable("전체 하계휴가 상세", vacationRows)}
  <div class="card" style="margin-top:16px"><h3>보고 멘트 예시</h3><p>현재 하계휴가 조사 대상 ${total}명 중 ${done}명이 제출하여 제출률은 ${Math.round(done/total*100)}%입니다. 미제출 인원은 각 팀장에게 재안내 후 최종 취합 예정입니다.</p></div>`;
}

// 일정 목록 데이터 (데모)
const demoScheduleList = [
  {type:"leave", color:"#16A26A", title:"연차 사용", owner:"이수연 사원", start:"2026.06.12 (금)", end:"2026.06.12 (금)", related:[{initials:"이수"},{initials:"김민"}], extra:2},
  {type:"half",  color:"#7C3AED", title:"반차 사용", owner:"김민준 팀장", start:"2026.06.18 (목)", end:null, related:[{initials:"박서"},{initials:"지한"}], extra:1},
  {type:"trip",  color:"#F59E0B", title:"출장 (부산)", owner:"이태리 사원", start:"2026.06.20 (토)", end:"2026.06.21 (일)", related:[{initials:"채수"},{initials:"최종"},{initials:"윤인"}], extra:3},
  {type:"summer",color:"#3182CE", title:"여름휴가",   owner:"최한솔 대리", start:"2026.07.21 (화)", end:"2026.07.24 (금)", related:[{initials:"이기"},{initials:"고완"}], extra:1}
];

function renderSchedule(){
  const y=state.year, m=state.month;
  if(!state.panelRelated) state.panelRelated=[];
  if(!state.scheduleFilter) state.scheduleFilter="전체";

  // 달력 셀 생성
  const first=new Date(y,m,1).getDay();
  const last=new Date(y,m+1,0).getDate();
  const baseEvents=[
    {day:12,type:"leave",text:"이수연 사원"},{day:18,type:"half",text:"김민준 팀장"},
    {day:20,type:"trip",text:"이태리 사원"},{day:21,type:"summer",text:"여름휴가"}
  ];
  const approvedEvents=state.userSchedules.filter(s=>s.status==="승인"&&s.start).map(s=>{
    const dt=new Date(s.start);
    return {day:dt.getDate(),type:"schedule",text:s.title,full:s};
  });
  const allEvs=[...baseEvents,...approvedEvents];
  const today=new Date();
  let cells='';
  for(let i=0;i<first;i++) cells+=`<div class="ngrid-cell empty"></div>`;
  for(let d=1;d<=last;d++){
    const isToday=y===today.getFullYear()&&m===today.getMonth()&&d===today.getDate();
    const dots=allEvs.filter(e=>e.day===d).map(e=>`<i class="ldot ${e.type}"></i>`).join("");
    cells+=`<div class="ngrid-cell${isToday?' is-today':''}"><span class="ngrid-num">${d}</span><div class="ngrid-dots">${dots}</div></div>`;
  }

  // 일정 목록 필터
  const filterMap={전체:null,연차:"leave",반차:"half",출장:"trip",여름휴가:"summer",기타:"schedule"};
  const fType=filterMap[state.scheduleFilter];
  const allItems=[...demoScheduleList,...state.userSchedules.filter(s=>s.status==="승인").map(s=>({type:"schedule",color:"#16A26A",title:s.title,owner:state.user.name+" "+state.user.title,start:s.start,end:s.end||s.start,related:[],extra:0}))];
  const filtered=fType?allItems.filter(x=>x.type===fType):allItems;

  const filterTabs=["전체","연차","반차","출장","여름휴가","기타"].map(f=>
    `<button class="sched-tab${state.scheduleFilter===f?' active':''}" onclick="setSchedFilter('${f}')">${f}</button>`
  ).join("");

  const listRows=filtered.map((it,i)=>{
    const period=it.end&&it.end!==it.start?`${it.start} ~ ${it.end}`:it.start||"-";
    const avatars=(it.related||[]).slice(0,2).map(r=>`<span class="sched-avatar">${r.initials||"●"}</span>`).join("");
    const extraBadge=it.extra?`<span class="sched-extra">+${it.extra}</span>`:"";
    return `<div class="sched-row">
      <span class="sched-dot" style="background:${it.color||'#16A26A'}"></span>
      <div class="sched-info">
        <b>${it.title}</b>
        <span>${it.owner||""}</span>
      </div>
      <div class="sched-period">${period}</div>
      <div class="sched-avatars">${avatars}${extraBadge}</div>
      <button class="sched-more" title="더보기">⋮</button>
    </div>`;
  }).join("")||`<div class="sched-empty">등록된 일정이 없습니다.</div>`;

  // 관련자 입력 UI
  const relatedPeople=state.panelRelated.map((p,i)=>`<span class="related-chip">${p.name} ${p.title}<button onclick="removePanelRelated(${i})">×</button></span>`).join("");

  $("#content").innerHTML=`
  <div class="nsched-wrap">
    <!-- 내 일정 추가 폼 -->
    <div class="card nsched-form-card">
      <div class="nsched-form-title">내 일정 추가</div>
      <div class="nsched-form-row">
        <div class="nsched-field nsched-field-wide">
          <label>일정명</label>
          <input id="nsfTitle" placeholder="일정을 입력하세요">
        </div>
        <div class="nsched-field">
          <label>시작일</label>
          <div class="nsched-date-wrap"><input id="nsfStart" type="date" placeholder="날짜 선택"><span class="nsched-cal">📅</span></div>
        </div>
        <div class="nsched-field">
          <label>종료일</label>
          <div class="nsched-date-wrap"><input id="nsfEnd" type="date" placeholder="날짜 선택"><span class="nsched-cal">📅</span></div>
        </div>
      </div>
      <div class="nsched-related-row">
        <label>업무 관련자</label>
        <div class="nsched-related-controls">
          <button class="nsched-rel-btn" onclick="focusNsfSearch()">+ 추가</button>
          <button class="nsched-rel-btn" onclick="focusNsfSearch()">+ 조직도</button>
          <div class="nsched-rel-search-inline">
            <input id="nsfRelInput" placeholder="이름 검색 (예: 김)" oninput="searchNsfRelated(this.value)" autocomplete="off">
            <div id="nsfRelResults" class="nsched-rel-results hidden"></div>
          </div>
        </div>
        <button class="primary nsched-save-btn" onclick="submitNsched()">저장</button>
      </div>
      <div id="nsfRelChips" class="nsched-rel-chips">${relatedPeople}</div>
    </div>

    <!-- 일정 목록 -->
    <div class="card nsched-list-card">
      <div class="nsched-list-head">
        <div class="nsched-tabs">${filterTabs}</div>
        <select class="nsched-sort" onchange="">
          <option>최신순</option><option>오래된순</option>
        </select>
      </div>
      <div class="nsched-list">${listRows}</div>
    </div>

    <!-- 달력 -->
    <div class="card nsched-cal-card">
      <div class="nsched-cal-head">
        <button onclick="prevSchedMonth()">‹</button>
        <b>${y}년 ${m+1}월</b>
        <button onclick="nextSchedMonth()">›</button>
      </div>
      <div class="nsched-week"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>
      <div class="nsched-grid">${cells}</div>
      <div class="nsched-legend">
        <span><i class="ldot leave"></i>연차</span>
        <span><i class="ldot half"></i>반차</span>
        <span><i class="ldot trip"></i>출장</span>
        <span><i class="ldot summer"></i>여름휴가</span>
      </div>
    </div>
  </div>`;
}

function setSchedFilter(f){state.scheduleFilter=f;renderSchedule();}
function prevSchedMonth(){state.month--;if(state.month<0){state.month=11;state.year--;}renderSchedule();}
function nextSchedMonth(){state.month++;if(state.month>11){state.month=0;state.year++;}renderSchedule();}

function focusNsfSearch(){
  const inp=$("#nsfRelInput");
  if(inp){ inp.focus(); inp.select(); }
}
function toggleNsfRelated(){focusNsfSearch();}
function searchNsfRelated(q){
  const box=$("#nsfRelResults");if(!box)return;
  if(!q.trim()){box.classList.add("hidden");return;}
  const results=employees.filter(e=>e.name.includes(q)&&e.name!==state.user.name&&!state.panelRelated.find(r=>r.name===e.name));
  if(!results.length){box.innerHTML=`<div class="nsched-rel-item no-result">검색 결과 없음</div>`;box.classList.remove("hidden");return;}
  box.innerHTML=results.map(e=>`<div class="nsched-rel-item" onclick="addNsfRelated('${e.name}','${e.title}','${e.dept}')">${e.name} <span>${e.title} · ${e.dept}</span></div>`).join("");
  box.classList.remove("hidden");
}
function addNsfRelated(name,title,dept){
  if(!state.panelRelated)state.panelRelated=[];
  if(state.panelRelated.find(r=>r.name===name))return;
  state.panelRelated.push({name,title,dept});
  const chips=$("#nsfRelChips");
  if(chips)chips.innerHTML=state.panelRelated.map((p,i)=>`<span class="related-chip">${p.name} ${p.title}<button onclick="removePanelRelated(${i})">×</button></span>`).join("");
  const inp=$("#nsfRelInput");if(inp)inp.value="";
  const res=$("#nsfRelResults");if(res)res.classList.add("hidden");
  toast(`${name} 님을 업무 관련자로 추가했습니다.`);
}
function submitNsched(){
  const title=$("#nsfTitle")?.value?.trim()||"";
  const start=$("#nsfStart")?.value||"";
  const end=$("#nsfEnd")?.value||"";
  if(!title)return toast("일정명을 입력해 주세요.");
  if(!start)return toast("시작일을 선택해 주세요.");
  const related=state.panelRelated||[];
  state.requests.unshift({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),type:"schedule",title,user:state.user.name,date:new Date().toLocaleString("ko-KR"),status:"승인대기",done:false,fields:{title,start,end,related,dept:state.user.dept,team:state.user.team}});
  saveRequests();updateRightbar();
  state.panelRelated=[];
  toast("일정이 등록되었습니다. 관리자 승인 후 반영됩니다.");
  renderSchedule();
}

function togglePanelSearch(){
  const box = $("#panelSearchBox");
  const btn = $("#panelAddBtn");
  if(!box) return;
  const isHidden = box.classList.contains("hidden");
  box.classList.toggle("hidden", !isHidden);
  if(isHidden){
    btn.textContent = "✕ 닫기";
    btn.classList.add("panel-add-btn-active");
    setTimeout(()=>{ const inp=$("#panelSearchInput"); if(inp) inp.focus(); }, 50);
  } else {
    btn.textContent = "+ 추가";
    btn.classList.remove("panel-add-btn-active");
    const res=$("#panelSearchResults"); if(res) res.classList.add("hidden");
    const inp=$("#panelSearchInput"); if(inp) inp.value="";
  }
}

function searchPanelRelated(q){
  const box=$("#panelSearchResults");
  if(!box) return;
  if(!q.trim()){box.classList.add("hidden");return;}
  if(!state.panelRelated) state.panelRelated=[];
  const results=employees.filter(e=>
    e.name.includes(q) &&
    e.name!==state.user.name &&
    !state.panelRelated.find(r=>r.name===e.name)
  );
  if(!results.length){
    box.innerHTML=`<div class="panel-search-item no-result">검색 결과 없음</div>`;
    box.classList.remove("hidden");
    return;
  }
  box.innerHTML=results.map(e=>`
    <div class="panel-search-item" onclick="addPanelRelated('${e.name}','${e.title}','${e.dept}')">
      <span class="psr-name">${e.name}</span>
      <span class="psr-meta">${e.title} · ${e.dept}</span>
    </div>`).join("");
  box.classList.remove("hidden");
}

function addPanelRelated(name, title, dept){
  if(!state.panelRelated) state.panelRelated=[];
  if(state.panelRelated.find(r=>r.name===name)) return;
  state.panelRelated.push({name, title, dept});
  // 목록 갱신
  const list=$("#panelRelatedList");
  if(list){
    list.innerHTML = state.panelRelated.map((p,i)=>`
      <div class="panel-related-item">
        <span><i class="lg schedule"></i>${p.name} <em>${p.title}</em></span>
        <button class="panel-related-remove" onclick="removePanelRelated(${i})" title="삭제">×</button>
      </div>`).join("");
  }
  // 검색창 초기화
  const inp=$("#panelSearchInput"); if(inp) inp.value="";
  const res=$("#panelSearchResults"); if(res) res.classList.add("hidden");
  toast(`${name} 님을 업무 관련자로 추가했습니다.`);
}

function removePanelRelated(idx){
  if(!state.panelRelated) return;
  const removed = state.panelRelated.splice(idx, 1);
  const list=$("#panelRelatedList");
  if(list){
    list.innerHTML = state.panelRelated.length
      ? state.panelRelated.map((p,i)=>`
          <div class="panel-related-item">
            <span><i class="lg schedule"></i>${p.name} <em>${p.title}</em></span>
            <button class="panel-related-remove" onclick="removePanelRelated(${i})" title="삭제">×</button>
          </div>`).join("")
      : `<p class="panel-empty-hint">관련자 없음</p>`;
  }
  if(removed.length) toast(`${removed[0].name} 님을 관련자에서 제거했습니다.`);
}

function openScheduleModal(){
  $("#modalTitle").textContent = "일정 등록";
  $("#modal").dataset.type = "schedule";
  window._selectedRelated = [];
  $("#modalBody").innerHTML = `
    <label>일정명</label>
    <input name="scheduleTitle" placeholder="예: 팀 회의">
    <div class="form-2">
      <div><label>시작일</label><input name="scheduleStart" type="date"></div>
      <div><label>종료일</label><input name="scheduleEnd" type="date"></div>
    </div>
    <label>업무 관련자 추가</label>
    <div class="related-search-wrap">
      <div class="related-btn-row">
        <button type="button" class="related-manual-btn" onclick="toggleRelatedSearch()">+ 추가</button>
        <button type="button" class="related-org-btn" onclick="openRelatedOrg()">+ 조직도</button>
      </div>
      <div id="relatedSearchArea" class="related-search-box hidden">
        <input id="relatedSearchInput" placeholder="이름으로 검색 (예: 김)" autocomplete="off" oninput="searchRelated(this.value)">
      </div>
      <div id="relatedResults" class="related-results hidden"></div>
      <div id="selectedRelated" class="selected-related"></div>
    </div>
    <label>내용</label>
    <textarea name="scheduleMemo" placeholder="일정 상세 내용"></textarea>
  `;
  $("#modal").classList.remove("hidden");
}

function toggleRelatedSearch(){
  const area=$("#relatedSearchArea");
  if(!area) return;
  const hidden=area.classList.contains("hidden");
  area.classList.toggle("hidden",!hidden);
  if(hidden){ const inp=$("#relatedSearchInput"); if(inp) inp.focus(); }
}
function openRelatedOrg(){
  // 조직도에서 선택: 간단히 검색박스를 열고 안내
  const area=$("#relatedSearchArea");
  if(area) area.classList.remove("hidden");
  const inp=$("#relatedSearchInput");
  if(inp){ inp.placeholder="조직도에서 이름 검색 (예: 이)"; inp.focus(); }
}

function searchRelated(q){
  const box=$("#relatedResults");
  if(!q.trim()){box.classList.add("hidden");return;}
  const results=employees.filter(e=>e.name.includes(q)&&e.name!==state.user.name);
  if(!results.length){box.innerHTML=`<div class="related-item no-result">검색 결과 없음</div>`;box.classList.remove("hidden");return;}
  box.innerHTML=results.map(e=>`<div class="related-item" onclick="selectRelated('${e.name}','${e.title}','${e.dept}')">${e.name} <span>${e.title} · ${e.dept}</span></div>`).join("");
  box.classList.remove("hidden");
}

function selectRelated(name,title,dept){
  if(!window._selectedRelated) window._selectedRelated=[];
  if(window._selectedRelated.find(r=>r.name===name)) return;
  window._selectedRelated.push({name,title,dept});
  renderSelectedRelated();
  $("#relatedSearchInput").value="";
  $("#relatedResults").classList.add("hidden");
}

function removeRelated(name){
  window._selectedRelated=window._selectedRelated.filter(r=>r.name!==name);
  renderSelectedRelated();
}

function renderSelectedRelated(){
  const box=$("#selectedRelated");
  if(!box) return;
  box.innerHTML=window._selectedRelated.map(r=>`<span class="related-chip">${r.name} ${r.title} <button onclick="removeRelated('${r.name}')">×</button></span>`).join("");
}

function showScheduleDetail(idx){
  const list=state.userSchedules.filter(x=>x.status==="승인");
  const s=list[idx];
  if(!s) return;
  const related=(s.related||[]).map(r=>`<span class="related-chip">${r.name} ${r.title}</span>`).join("") || `<span style="color:#94a3b8;font-size:13px">없음</span>`;
  const period = s.start ? (s.end && s.end !== s.start ? `${s.start} ~ ${s.end}` : s.start) : "-";
  $("#modalTitle").textContent="일정 상세";
  $("#modal").dataset.type="readonly";
  $("#modalBody").innerHTML=`
    <div class="schedule-detail">
      <div class="sd-row"><b>일정명</b><p style="font-size:15px;font-weight:800;color:#122033">${s.title}</p></div>
      <div class="sd-row"><b>기간</b><p>${period}</p></div>
      <div class="sd-row"><b>업무 관련자</b><div class="sd-chips" style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px">${related}</div></div>
      ${s.memo?`<div class="sd-row"><b>내용</b><p style="white-space:pre-line">${s.memo}</p></div>`:""}
      <div class="sd-row"><b>상태</b><p><span class="badge">${s.status}</span></p></div>
    </div>`;
  $("#modalSubmit").style.display="none";
  $("#modal").classList.remove("hidden");
}

// submitModal 에서 schedule 처리 override
const _origSubmitModal = submitModal;
function submitModal(){
  const type=$("#modal").dataset.type;
  if(type==="readonly"){closeModal();$("#modalSubmit").style.display="";return;}
  if(type==="schedule"){
    const title=$("[name='scheduleTitle']")?.value?.trim()||"일정 등록";
    const start=$("[name='scheduleStart']")?.value||"";
    const end=$("[name='scheduleEnd']")?.value||"";
    const memo=$("[name='scheduleMemo']")?.value?.trim()||"";
    if(!start) return toast("일정 시작일을 입력해 주세요.");
    const related=window._selectedRelated||[];
    const fields={title,start,end,memo,related,dept:state.user.dept,team:state.user.team};
    state.requests.unshift({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),type:"schedule",title,user:state.user.name,date:new Date().toLocaleString("ko-KR"),status:"승인대기",done:false,fields});
    saveRequests();updateRightbar();closeModal();
    toast("일정이 제출되었습니다. 관리자 승인 후 반영됩니다.");
    return;
  }
  // 기존 로직
  const title=$("#modalTitle").textContent;
  state.requests.unshift({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),type,title,user:state.user.name,date:new Date().toLocaleString("ko-KR"),status:"승인대기",done:false,fields:{}});
  saveRequests();updateRightbar();closeModal();
  toast("제출되었습니다. 관리자 승인 후 반영됩니다.");
}

function renderOrg(){
  const allEmps=[...employees,...orgUploadedEmployees];
  $("#content").innerHTML = `
  <div class="org-search-bar">
    <input id="orgSearch" placeholder="이름, 부서, 사번 검색" oninput="filterOrg()">
    <select id="orgDept" onchange="filterOrg()">
      <option value="">전체 부서</option>
      ${[...new Set(allEmps.map(e=>e.dept))].map(d=>`<option>${d}</option>`).join("")}
    </select>
  </div>
  <div class="card org-table-card">
    <div id="orgTable"></div>
  </div>
  <div class="card" style="margin-top:16px">
    <h3>조직도 업로드 반영</h3>
    <p>업로드한 2026년 6월 조직도 기준으로 공조사업부/공조영업팀 주요 인원 데이터를 반영했습니다. 운영 시에는 그룹웨어 조직도 API와 연동하여 자동 업데이트하는 구조로 확장 가능합니다.</p>
  </div>`;
  filterOrg();
}

function filterOrg(){
  const q=($("#orgSearch")?.value||"").toLowerCase(), d=$("#orgDept")?.value||"";
  const allEmps=[...employees,...orgUploadedEmployees];
  const rows=allEmps.filter(e=>(!d||e.dept===d) && [e.name,e.dept,e.team,e.employeeId,e.title].join(" ").toLowerCase().includes(q));
  $("#orgTable").innerHTML=tableHtml([["사번","이름","직급","부서/팀","연락처","이메일"],...rows.map(e=>[e.employeeId,e.name,e.title,`${e.dept} · ${e.team}`,e.phone,e.email])]);
}

function renderMyInfo(){
  const u=state.user;
  $("#content").innerHTML = `<div class="grid grid-2">
    <div class="card profile-card"><div class="profile-photo">${u.name[0]}</div><h3>${u.name} ${u.title}</h3><p>${u.dept} · ${u.team}<br/>${u.email||"-"}</p></div>
    <div class="card"><h3>내 정보</h3>${tableHtml([["항목","내용"],["사번",u.employeeId],["이름",u.name],["부서/팀",`${u.dept} / ${u.team}`],["직급",u.title],["권한",roleName(u.role)],["연락처",u.phone||"-"],["이메일",u.email||"-"]])}<p style="margin-top:14px">※ 사번/부서/직급은 추후 그룹웨어 연동 예정입니다.</p></div>
  </div>`;
}

function renderAdmin(){
  $("#content").innerHTML = `${tableCard("임직원 계정", [["사번","아이디","이름","부서","직급","권한"],...state.users.map(u=>[u.employeeId,u.id,u.name,u.dept,u.title,roleName(u.role)])])}<div style="margin-top:16px">${tableCard("전체 신청 데이터", [["일시","구분","신청자","상태"],...state.requests.map(r=>[r.date,r.title,r.user,r.status||"승인대기"])])}</div>`;
}

function renderRequestStatus(title, filter=()=>true){
  const rows=state.requests.filter(filter);
  $("#content").innerHTML = tableCard(title, [["일시","구분","신청자","상태"],...rows.map(r=>[r.date,r.title,r.user,r.status||"승인대기"])]);
}

function openForm(type){
  if(type==="schedule"){return openScheduleModal();}
  const names={attendance:"근태신청서",attmod:"근태수정신청서",trip:"출장원 신청서",gyeongjo:"경조금 신청서",edu:"교육 신청서",boiler:"보일러 신청서",cert:"증명서 신청서",vacation:"하계휴가 조사",schedule:"일정 등록"};
  $("#modalTitle").textContent=names[type]||"신청서";
  $("#modal").dataset.type=type;
  const common = `<div class="form-2"><div><label>성명</label><input value="${state.user.name}"></div><div><label>사번</label><input value="${state.user.employeeId}"></div></div><div class="form-2"><div><label>부서/팀</label><input value="${state.user.team||state.user.dept}"></div><div><label>직급</label><input value="${state.user.title}"></div></div>`;
  const approval = `<h4 class="modal-subtitle">결재라인</h4><div class="approval-line modal-approval"><div><small>1 담당자</small><b>${state.user.name}</b><span>기안</span></div><div><small>2 팀장</small><b>팀장</b><span>대기</span></div><div><small>3 대표님</small><b>대표이사</b><span>대기</span></div><div><small>접수자</small><b>인사담당자</b><span>접수</span></div></div>`;
  const bodies = {
    attendance:`${common}<label>신청구분</label><select><option>연차</option><option>반차(오전)</option><option>반차(오후)</option><option>외출</option><option>조퇴</option><option>출장</option></select><div class="form-2"><div><label>시작일</label><input type="date"></div><div><label>종료일</label><input type="date"></div></div><label>사유</label><textarea placeholder="신청 사유 입력"></textarea>${approval}`,
    attmod:`${common}<label>수정구분</label><select><option>출근 누락</option><option>퇴근 누락</option><option>지각 정정</option><option>결근 정정</option></select><label>수정 사유</label><textarea></textarea>${approval}`,
    trip:`${common}<label>출장구분</label><select><option>국내</option><option>해외</option><option>시내</option></select><label>출장지</label><input placeholder="예: 부산 OO현장"><div class="form-2"><div><label>출장 시작일</label><input type="date"></div><div><label>출장 종료일</label><input type="date"></div></div><label>출장 목적</label><textarea placeholder="업무 목적을 입력하세요"></textarea><label>예상 비용</label><input placeholder="예: 120,000원">${approval}`,
    gyeongjo:`${common}<label>경조 구분</label><select><option>본인 결혼</option><option>자녀 결혼</option><option>부모상</option><option>조부모상</option><option>배우자 출산</option></select><label>경조 일자</label><input type="date"><label>비고</label><textarea></textarea>${approval}`,
    edu:`${common}<label>교육명</label><input><label>교육기관</label><input><div class="form-2"><div><label>시작일</label><input type="date"></div><div><label>종료일</label><input type="date"></div></div><label>신청 사유</label><textarea></textarea>${approval}`,
    boiler:`${common}<label>신청 구분</label><select><option>신규 설치</option><option>수리</option><option>교체</option></select><label>희망일</label><input type="date"><label>요청사항</label><textarea></textarea>${approval}`,
    cert:`${common}<label>증명서 종류</label><select><option>재직증명서</option><option>경력증명서</option><option>원천징수영수증</option></select><label>제출처</label><input><label>사용목적</label><textarea></textarea>${approval}`,
    vacation:`${common}<div class="form-2"><div><label>휴가 시작일</label><input type="date"></div><div><label>휴가 종료일</label><input type="date"></div></div><label>비고</label><textarea placeholder="희망사항 입력"></textarea>`,
    schedule:`<label>일정명</label><input name="scheduleTitle" placeholder="예: 팀 회의"><div class="form-2"><div><label>시작일</label><input name="scheduleStart" type="date"></div><div><label>종료일</label><input name="scheduleEnd" type="date"></div></div><div class="form-2"><div><label>부서 선택 필수</label><select name="scheduleDept">${departments.map(d=>`<option>${d}</option>`).join("")}</select></div><div><label>팀 선택 필수</label><input name="scheduleTeam" placeholder="팀명 직접 입력 가능"></div></div><label>업무 관련자 추가</label><input name="schedulePeople" placeholder="이름 선택 또는 직접 수기 입력"><label>내용</label><textarea name="scheduleMemo" placeholder="일정 상세 내용을 입력하세요"></textarea>`
  };
  $("#modalBody").innerHTML=bodies[type]||`<label>내용</label><textarea></textarea>`;
  $("#modal").classList.remove("hidden");
}
function closeModal(){
  $("#modal").classList.add("hidden");
  $("#modalBody").innerHTML="";
  $("#modalSubmit").style.display="";
}

// submitModal은 위(renderSchedule 근처)에서 정의됨

function vacSummary(rows){
  const total=rows.length, done=rows.filter(r=>r.status==="제출완료").length;
  return `<p>대상 ${total}명 중 <b style="color:var(--teal)">${done}명 제출</b>, ${total-done}명 미제출</p><div class="bar" style="margin-top:12px"><i style="width:${total?done/total*100:0}%"></i></div>`;
}
function vacTable(title, rows){
  return `<div style="margin-top:16px">${tableCard(title, [["부서","팀","직급","이름","기간","상태"],...rows.map(r=>[r.dept,r.team,r.title,r.name,r.start?`${r.start} ~ ${r.end}`:"-",badge(r.status)])])}</div>`;
}
function badge(v){ return `<span class="badge ${v==="미제출"?"red":""}">${v}</span>`; }
function roleName(r){ return {user:"직원",manager:"팀장",executive:"대표이사",admin:"인사담당자"}[r]||r; }
function tableCard(title, rows){ return `<div class="card"><h3>${title}</h3>${tableHtml(rows)}</div>`; }
function tableHtml(rows){ return `<table class="table"><thead><tr>${rows[0].map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.slice(1).map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("") || `<tr><td colspan="${rows[0].length}">데이터가 없습니다.</td></tr>`}</tbody></table>`; }
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2200); }



/* ===== 체리 최종 수정 v10: 업로드 아이콘/프로필 드롭다운/홈/조직도/일정관리 ===== */
function login(){
  const id=$("#loginId").value.trim(), pw=$("#loginPw").value;
  const user=state.users.find(u=>(u.id===id || u.employeeId===id) && u.pw===pw);
  if(!user) return toast("아이디 또는 비밀번호를 확인해 주세요.");
  if(!user.approved) return toast("아직 승인 대기 중입니다.");
  state.user=user;
  state.page="home";
  $("#loginPage").classList.add("hidden");
  $("#app").classList.remove("hidden");
  renderShell();
  changePage("home");
  toast(`${user.name}님 환영합니다.`);
}

function renderShell(){
  const u=state.user;
  $("#sideAvatar").innerHTML=`<span class="person-icon"></span>`;
  $("#sideName").textContent=u.name;
  $("#sideMeta").textContent=`${u.dept} ${u.title}`;
  $("#sideEmpNo").textContent=u.employeeId;
  $("#rightProfileCard").innerHTML=`
    <div class="right-profile-inner right-profile-dropdown-card">
      <button type="button" class="profile-main-toggle" onclick="toggleProfileMenu()">
        <span class="top-avatar"><span class="person-icon"></span></span>
        <div>
          <b>${u.name} ${u.title}</b>
          <p>${u.dept} · ${u.employeeId}</p>
        </div>
        <span class="profile-caret">⌄</span>
      </button>
      <div id="rightProfileMenu" class="right-profile-dropdown hidden">
        <button type="button" data-page="myinfo">내정보</button>
        <button type="button" onclick="logout()">로그아웃</button>
      </div>
    </div>`;
  updateRightbar();
  renderNav();
}

function toggleProfileMenu(){
  const el=$("#rightProfileMenu");
  if(el) el.classList.toggle("hidden");
}

function renderHomeKpi(){
  const u=state.user;
  return `<div class="welcome welcome-final welcome-top-only">
    <div class="welcome-left">
      <span class="welcome-bot-tile"><img src="assets/chatbot.png" alt="신성 HR Assistant 챗봇"></span>
      <div>
        <h1>안녕하세요! ${u.name}님 👋</h1>
        <p>오늘도 좋은 하루 보내세요. &nbsp;|&nbsp; 2026년 6월 21일 (일)</p>
      </div>
    </div>
    <button class="primary" data-page="ai">AI 상담 바로가기</button>
  </div>`;
}
function pendingCount(){
  const base = state.requests.filter(r=>!r.done).length;
  return base || (state.user?.role==="user" ? 2 : state.user?.role==="admin" ? 8 : 4);
}

function renderHome(){
  $("#content").innerHTML = renderHomeKpi()+`
  <div class="home-main-grid home-main-grid-clean">
    <div>
      <div class="card work-card">
        <h3>오늘 근무</h3>
        <p>출퇴근은 ERP 시스템과 추후 연동 예정입니다.</p>
        <div class="work-status">
          <div><span>출근</span><strong id="clockInText">미체크</strong></div>
          <div><span>퇴근</span><strong id="clockOutText">-</strong></div>
          <div><span>근무상태</span><strong>근무 전</strong></div>
        </div>
        <div class="work-buttons"><button class="primary" onclick="clockIn()">출근 체크</button><button class="ghost" onclick="clockOut()">퇴근 체크</button></div>
      </div>
    </div>
    <div>
      <div class="card"><h3>오늘 일정</h3><div class="today-list light-today-list">${schedules.map(s=>`<div class="today-item"><time>${s.time}</time><div><b>${s.title}</b><p>${s.place}</p></div></div>`).join("")}</div></div>
    </div>
  </div>`;
}




function demoTalk(){ alert("데모 화면입니다. 향후 사내 메신저 연동 예정입니다."); }
