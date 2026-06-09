const STORAGE_KEY = "shinsungHrPortalState";

const defaultState = {
  currentUserId: null,
  employees: [
    {
      id: "admin",
      employeeId: "SE0001",
      name: "관리자",
      department: "경영지원본부",
      position: "HR 관리자",
      email: "admin@shinsung-eng.co.kr",
      password: "admin123",
      role: "admin",
      status: "approved",
      leaveTotal: 20,
      leaveUsed: 4
    },
    {
      id: "emp-001",
      employeeId: "SE2026001",
      name: "김민준",
      department: "플랜트사업부",
      position: "책임엔지니어",
      email: "minjun.kim@shinsung-eng.co.kr",
      password: "demo1234",
      role: "employee",
      status: "approved",
      leaveTotal: 16,
      leaveUsed: 5
    },
    {
      id: "emp-002",
      employeeId: "SE2026002",
      name: "이서연",
      department: "전기설계팀",
      position: "선임",
      email: "seoyeon.lee@shinsung-eng.co.kr",
      password: "demo1234",
      role: "employee",
      status: "pending",
      leaveTotal: 15,
      leaveUsed: 2
    },
    {
      id: "emp-003",
      employeeId: "SE2026003",
      name: "박도윤",
      department: "시공관리팀",
      position: "대리",
      email: "doyun.park@shinsung-eng.co.kr",
      password: "demo1234",
      role: "employee",
      status: "inactive",
      leaveTotal: 15,
      leaveUsed: 7
    }
  ],
  attendance: [
    { employeeId: "SE0001", date: "2026-06-09", checkIn: "08:41", checkOut: "18:05", status: "정상" },
    { employeeId: "SE2026001", date: "2026-06-09", checkIn: "08:55", checkOut: "18:20", status: "정상" },
    { employeeId: "SE2026001", date: "2026-06-08", checkIn: "09:12", checkOut: "18:08", status: "지각" },
    { employeeId: "SE2026001", date: "2026-06-05", checkIn: "08:48", checkOut: "17:58", status: "정상" },
    { employeeId: "SE2026002", date: "2026-06-09", checkIn: "-", checkOut: "-", status: "승인 대기" }
  ],
  notices: [
    { id: "notice-001", date: "2026-06-09", title: "하계 안전점검 및 현장 PPE 착용 안내", body: "전 현장 임직원은 안전모, 안전화, 보안경 등 필수 보호구 착용 상태를 매일 점검해 주세요." },
    { id: "notice-002", date: "2026-06-03", title: "상반기 연차 사용계획 등록 요청", body: "팀별 프로젝트 일정을 고려하여 6월 말까지 하반기 연차 사용계획을 등록해 주세요." },
    { id: "notice-003", date: "2026-05-28", title: "사내 HR AI 챗봇 시범 운영", body: "연차, 근태, 가입 승인, 공지사항 관련 문의를 포털 중앙 챗봇에서 확인할 수 있습니다." }
  ],
  chat: [
    { role: "bot", text: "안녕하세요. 신성엔지니어링 HR AI 챗봇입니다. 연차, 근태, 공지, 가입 승인 절차를 안내해 드립니다." }
  ]
};

const views = {
  dashboard: document.getElementById("dashboardView"),
  signup: document.getElementById("signupView"),
  login: document.getElementById("loginView"),
  employees: document.getElementById("employeesView"),
  admin: document.getElementById("adminView"),
  leave: document.getElementById("leaveView"),
  attendance: document.getElementById("attendanceView"),
  notices: document.getElementById("noticesView"),
  organization: document.getElementById("organizationView")
};

const menuItems = document.querySelectorAll(".menu-item");
const sessionCard = document.getElementById("sessionCard");
const welcomeTitle = document.getElementById("welcomeTitle");
const welcomeText = document.getElementById("welcomeText");
const totalEmployees = document.getElementById("totalEmployees");
const pendingEmployees = document.getElementById("pendingEmployees");
const myLeaveDays = document.getElementById("myLeaveDays");
const summaryGrid = document.getElementById("summaryGrid");
const employeeTableBody = document.getElementById("employeeTableBody");
const employeeSearch = document.getElementById("employeeSearch");
const adminEmployeeList = document.getElementById("adminEmployeeList");
const leaveDetail = document.getElementById("leaveDetail");
const attendanceList = document.getElementById("attendanceList");
const noticeList = document.getElementById("noticeList");
const orgChart = document.getElementById("orgChart");
const sideUserName = document.getElementById("sideUserName");
const sideUserMeta = document.getElementById("sideUserMeta");
const todayAttendance = document.getElementById("todayAttendance");
const latestNoticeTitle = document.getElementById("latestNoticeTitle");
const latestNoticeDate = document.getElementById("latestNoticeDate");
const adminAlertCount = document.getElementById("adminAlertCount");
const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const toast = document.getElementById("toast");

let state = loadState();

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(defaultState));
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return cloneDefaultState();
  const parsed = JSON.parse(stored);
  return { ...cloneDefaultState(), ...parsed };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function getCurrentUser() {
  return state.employees.find((employee) => employee.id === state.currentUserId) || null;
}

function isAdmin() {
  const currentUser = getCurrentUser();
  return Boolean(currentUser && currentUser.role === "admin");
}

function statusLabel(status) {
  const labels = { approved: "승인", pending: "대기", inactive: "비활성" };
  return labels[status] || status;
}

function switchView(viewName) {
  Object.entries(views).forEach(([name, element]) => {
    element.classList.toggle("active", name === viewName);
  });
  menuItems.forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
}

function renderSession() {
  const user = getCurrentUser();
  if (user) {
    sessionCard.innerHTML = `
      <span class="eyebrow">로그인 상태</span>
      <strong>${escapeHtml(user.name)} ${escapeHtml(user.position)}</strong>
      <p>${escapeHtml(user.department)} · ${user.role === "admin" ? "관리자" : "직원"}</p>
    `;
    welcomeTitle.textContent = `${user.name}님, 좋은 하루입니다.`;
    welcomeText.textContent = `${user.department} ${user.position} 계정으로 접속 중입니다. HR 업무 현황을 확인하세요.`;
    sideUserName.textContent = user.name;
    sideUserMeta.textContent = `${user.employeeId} · ${user.department}`;
    myLeaveDays.textContent = `${user.leaveTotal - user.leaveUsed}일`;
  } else {
    sessionCard.innerHTML = `
      <span class="eyebrow">로그인 상태</span>
      <strong>게스트</strong>
      <p>데모 계정으로 로그인하거나 신규 직원을 등록하세요.</p>
    `;
    welcomeTitle.textContent = "환영합니다";
    welcomeText.textContent = "좌측 메뉴에서 회원가입 또는 로그인 후 HR 업무를 시작하세요.";
    sideUserName.textContent = "게스트";
    sideUserMeta.textContent = "로그인이 필요합니다.";
    myLeaveDays.textContent = "-";
  }
}

function renderMetrics() {
  const pendingCount = state.employees.filter((employee) => employee.status === "pending").length;
  totalEmployees.textContent = state.employees.length;
  pendingEmployees.textContent = pendingCount;
  adminAlertCount.textContent = `${pendingCount}건`;

  const latestNotice = state.notices[0];
  latestNoticeTitle.textContent = latestNotice ? latestNotice.title : "-";
  latestNoticeDate.textContent = latestNotice ? latestNotice.date : "공지사항을 확인하세요.";

  const user = getCurrentUser();
  const attendance = user ? state.attendance.find((item) => item.employeeId === user.employeeId && item.date === "2026-06-09") : null;
  todayAttendance.textContent = attendance ? `${attendance.checkIn} / ${attendance.checkOut}` : "-";
}

function renderDashboard() {
  const user = getCurrentUser();
  const approved = state.employees.filter((employee) => employee.status === "approved").length;
  const inactive = state.employees.filter((employee) => employee.status === "inactive").length;
  const leaveText = user ? `${user.leaveTotal}일 중 ${user.leaveUsed}일 사용` : "로그인 후 확인 가능";

  summaryGrid.innerHTML = [
    { title: "승인 직원", text: `${approved}명`, detail: "현재 포털 이용 가능 계정" },
    { title: "비활성 직원", text: `${inactive}명`, detail: "접속 제한 계정" },
    { title: "내 연차 현황", text: leaveText, detail: "연차 조회 메뉴에서 상세 확인" },
    { title: "HR 챗봇", text: "운영 중", detail: "연차·근태·공지·조직도 질문 지원" }
  ].map((item) => `
    <article class="summary-card">
      <strong>${escapeHtml(item.title)}</strong>
      <p>${escapeHtml(item.text)}</p>
      <small>${escapeHtml(item.detail)}</small>
    </article>
  `).join("");
}

function renderEmployeeTable() {
  const keyword = employeeSearch.value.trim().toLowerCase();
  const rows = state.employees
    .filter((employee) => [employee.employeeId, employee.name, employee.department, employee.position, employee.email].some((value) => value.toLowerCase().includes(keyword)))
    .map((employee) => `
      <tr>
        <td>${escapeHtml(employee.employeeId)}</td>
        <td>${escapeHtml(employee.name)}</td>
        <td>${escapeHtml(employee.department)}</td>
        <td>${escapeHtml(employee.position)}</td>
        <td><span class="badge ${employee.status}">${statusLabel(employee.status)}</span></td>
        <td>${escapeHtml(employee.email)}</td>
      </tr>
    `).join("");

  employeeTableBody.innerHTML = rows || `<tr><td colspan="6" class="empty-text">검색 결과가 없습니다.</td></tr>`;
}

function renderAdminList() {
  if (!isAdmin()) {
    adminEmployeeList.innerHTML = `<div class="empty-text">관리자 계정으로 로그인해야 가입 승인/비활성화 기능을 사용할 수 있습니다.</div>`;
    return;
  }

  adminEmployeeList.innerHTML = state.employees.map((employee) => {
    const approveButton = employee.status === "pending" ? `<button class="approve-btn" data-action="approve" data-id="${employee.id}">승인</button>` : "";
    const activeToggle = employee.status === "inactive"
      ? `<button class="activate-btn" data-action="activate" data-id="${employee.id}">활성화</button>`
      : `<button class="disable-btn" data-action="disable" data-id="${employee.id}">비활성화</button>`;
    return `
      <article class="admin-row">
        <div>
          <strong>${escapeHtml(employee.name)} · ${escapeHtml(employee.position)}</strong>
          <p>${escapeHtml(employee.employeeId)} / ${escapeHtml(employee.department)} / ${escapeHtml(employee.email)}</p>
          <span class="badge ${employee.status}">${statusLabel(employee.status)}</span>
        </div>
        <div class="admin-actions">${approveButton}${activeToggle}</div>
      </article>
    `;
  }).join("");
}

function renderLeave() {
  const user = getCurrentUser();
  if (!user) {
    leaveDetail.innerHTML = `<div class="empty-text">로그인 후 본인의 연차 현황을 확인할 수 있습니다.</div>`;
    return;
  }

  const remain = user.leaveTotal - user.leaveUsed;
  const usedRate = Math.round((user.leaveUsed / user.leaveTotal) * 100);
  leaveDetail.innerHTML = `
    <h3>${escapeHtml(user.name)}님의 연차 현황</h3>
    <p>총 ${user.leaveTotal}일 · 사용 ${user.leaveUsed}일 · 잔여 ${remain}일</p>
    <div class="leave-progress" aria-label="연차 사용률"><span style="width:${usedRate}%"></span></div>
    <p>연차 신청은 팀장 승인 후 인사팀에서 최종 반영됩니다.</p>
  `;
}

function renderAttendance() {
  const user = getCurrentUser();
  const records = user
    ? state.attendance.filter((item) => item.employeeId === user.employeeId)
    : state.attendance.slice(0, 4);

  attendanceList.innerHTML = records.map((item) => `
    <article class="attendance-row">
      <strong>${escapeHtml(item.date)}</strong>
      <span>출근 ${escapeHtml(item.checkIn)} · 퇴근 ${escapeHtml(item.checkOut)}</span>
      <span class="badge ${item.status === "정상" ? "approved" : "pending"}">${escapeHtml(item.status)}</span>
    </article>
  `).join("") || `<div class="empty-text">근태 기록이 없습니다.</div>`;
}

function renderNotices() {
  noticeList.innerHTML = state.notices.map((notice) => `
    <article class="notice-item">
      <strong>${escapeHtml(notice.title)}</strong>
      <span class="eyebrow">${escapeHtml(notice.date)}</span>
      <p>${escapeHtml(notice.body)}</p>
    </article>
  `).join("");
}

function renderOrganization() {
  const departments = state.employees.reduce((acc, employee) => {
    if (!acc[employee.department]) acc[employee.department] = [];
    acc[employee.department].push(employee);
    return acc;
  }, {});

  orgChart.innerHTML = Object.entries(departments).map(([department, employees]) => `
    <article class="org-team">
      <strong>${escapeHtml(department)}</strong>
      <p>${employees.map((employee) => `${escapeHtml(employee.name)} ${escapeHtml(employee.position)}`).join(" · ")}</p>
    </article>
  `).join("");
}

function getBotAnswer(question) {
  const text = question.toLowerCase();
  if (text.includes("연차")) return "연차 조회 메뉴에서 총 연차, 사용 연차, 잔여 연차를 확인할 수 있습니다. 신청은 팀장 승인 후 인사팀에서 최종 반영합니다.";
  if (text.includes("근태") || text.includes("출근") || text.includes("퇴근")) return "근태 조회 메뉴에서 최근 출퇴근 기록과 상태를 확인하세요. 누락 또는 이상 기록은 경영지원본부 HR 담당자에게 문의하면 됩니다.";
  if (text.includes("가입") || text.includes("승인")) return "직원 회원가입 후 상태는 '대기'가 됩니다. 관리자 계정으로 로그인한 뒤 관리자 회원관리 메뉴에서 승인 또는 비활성화를 처리할 수 있습니다.";
  if (text.includes("공지")) return "공지사항 메뉴에서 안전점검, 연차 사용계획, HR 챗봇 운영 안내 등 최신 공지를 확인할 수 있습니다.";
  if (text.includes("조직")) return "조직도 메뉴에서 부서별 구성원과 직급을 확인할 수 있습니다. 데모 데이터 기준으로 부서가 자동 그룹화됩니다.";
  return "문의하신 내용은 HR 포털 데모 기준으로 확인 중입니다. 연차, 근태, 공지, 가입 승인, 조직도 관련 질문을 입력하면 더 정확히 안내해 드립니다.";
}

function renderChat() {
  chatWindow.innerHTML = state.chat.map((message) => `
    <div class="chat-message ${message.role === "user" ? "user" : "bot"}">
      <div class="chat-bubble">${escapeHtml(message.text)}</div>
    </div>
  `).join("");
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function refreshAll() {
  renderSession();
  renderMetrics();
  renderDashboard();
  renderEmployeeTable();
  renderAdminList();
  renderLeave();
  renderAttendance();
  renderNotices();
  renderOrganization();
  renderChat();
  saveState();
}

function handleSignup(event) {
  event.preventDefault();
  const employeeId = document.getElementById("signupEmployeeId").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();

  if (state.employees.some((employee) => employee.employeeId.toLowerCase() === employeeId.toLowerCase() || employee.email.toLowerCase() === email)) {
    showToast("이미 등록된 사번 또는 이메일입니다.");
    return;
  }

  state.employees.push({
    id: `emp-${Date.now()}`,
    employeeId,
    name: document.getElementById("signupName").value.trim(),
    department: document.getElementById("signupDepartment").value.trim(),
    position: document.getElementById("signupPosition").value.trim(),
    email,
    password: document.getElementById("signupPassword").value,
    role: "employee",
    status: "pending",
    leaveTotal: 15,
    leaveUsed: 0
  });

  event.target.reset();
  refreshAll();
  switchView("login");
  showToast("가입 신청이 완료되었습니다. 관리자 승인 후 로그인하세요.");
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;
  const employee = state.employees.find((item) => item.email.toLowerCase() === email && item.password === password);

  if (!employee) {
    showToast("이메일 또는 비밀번호를 확인하세요.");
    return;
  }

  if (employee.status !== "approved") {
    showToast(`현재 계정 상태는 '${statusLabel(employee.status)}'입니다. 관리자에게 문의하세요.`);
    return;
  }

  state.currentUserId = employee.id;
  event.target.reset();
  refreshAll();
  switchView("dashboard");
  showToast(`${employee.name}님 로그인되었습니다.`);
}

function updateEmployeeStatus(employeeId, status) {
  const employee = state.employees.find((item) => item.id === employeeId);
  if (!employee) return;
  employee.status = status;
  if (state.currentUserId === employee.id && status !== "approved") state.currentUserId = null;
  refreshAll();
  showToast(`${employee.name} 계정 상태가 '${statusLabel(status)}'로 변경되었습니다.`);
}

menuItems.forEach((item) => item.addEventListener("click", () => switchView(item.dataset.view)));
document.querySelectorAll("[data-jump]").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.jump)));
document.getElementById("signupForm").addEventListener("submit", handleSignup);
document.getElementById("loginForm").addEventListener("submit", handleLogin);
employeeSearch.addEventListener("input", renderEmployeeTable);

document.getElementById("logoutBtn").addEventListener("click", () => {
  state.currentUserId = null;
  refreshAll();
  showToast("로그아웃되었습니다.");
});

document.getElementById("seedBtn").addEventListener("click", () => {
  state = cloneDefaultState();
  refreshAll();
  switchView("dashboard");
  showToast("데모 데이터가 초기화되었습니다.");
});

adminEmployeeList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const nextStatus = { approve: "approved", disable: "inactive", activate: "approved" }[button.dataset.action];
  updateEmployeeStatus(button.dataset.id, nextStatus);
});

document.getElementById("chatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;
  state.chat.push({ role: "user", text: question });
  state.chat.push({ role: "bot", text: getBotAnswer(question) });
  chatInput.value = "";
  refreshAll();
});

document.querySelectorAll(".suggestion-row button").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    state.chat.push({ role: "user", text: question });
    state.chat.push({ role: "bot", text: getBotAnswer(question) });
    refreshAll();
  });
});

document.getElementById("clearChatBtn").addEventListener("click", () => {
  state.chat = cloneDefaultState().chat;
  refreshAll();
});

refreshAll();
