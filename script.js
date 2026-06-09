const demoUsers = [
  { name: "관리자", email: "admin@shinsung.co.kr", password: "admin1234", department: "인사팀", role: "관리자", approved: true },
  { name: "김민수", email: "minsu@shinsung.co.kr", password: "user1234", department: "개발팀", role: "임직원", approved: true }
];

let currentUser = null;
let users = [...demoUsers];
let approvals = [
  { id: crypto.randomUUID(), type: "회원가입", name: "오지훈", content: "영업팀 / jihun@shinsung.co.kr", status: "pending" },
  { id: crypto.randomUUID(), type: "휴가", name: "김민수", content: "연차 2026-06-15 ~ 2026-06-15", status: "pending" }
];
let leaveRequests = [];
let attendanceLogs = [];

const notices = [
  { title: "2026년 하계 집중휴가 운영 안내", body: "7월 27일부터 8월 7일까지 부서별 집중휴가 일정을 등록해 주세요.", date: "2026.06.09" },
  { title: "상반기 성과면담 입력 마감", body: "팀장은 6월 21일까지 구성원 면담 결과를 HR 시스템에 입력해야 합니다.", date: "2026.06.07" },
  { title: "사내 보안 캠페인", body: "비밀번호 변경 및 2단계 인증 점검을 완료해 주세요.", date: "2026.06.05" },
  { title: "건강검진 예약 오픈", body: "임직원 건강검진 예약 페이지가 오픈되었습니다.", date: "2026.06.01" }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const todayLabel = $("#todayLabel");
const clockLabel = $("#clockLabel");
const userPanel = $("#userPanel");
const userNameLabel = $("#userNameLabel");
const userRoleLabel = $("#userRoleLabel");
const logoutBtn = $("#logoutBtn");
const loginForm = $("#loginForm");
const signupForm = $("#signupForm");
const loginMessage = $("#loginMessage");
const signupMessage = $("#signupMessage");
const approvalTable = $("#approvalTable");
const pendingCount = $("#pendingCount");
const attendanceCount = $("#attendanceCount");
const noticeList = $("#noticeList");
const leaveForm = $("#leaveForm");
const leaveFeed = $("#leaveFeed");
const attendanceLog = $("#attendanceLog");
const chatWindow = $("#chatWindow");

function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(date);
}

function formatTime(date = new Date()) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);
}

function setMessage(element, text, type = "") {
  element.textContent = text;
  element.className = `form-message ${type}`.trim();
}

function updateUserPanel() {
  if (!currentUser) {
    userPanel.querySelector(".user-avatar").textContent = "게";
    userNameLabel.textContent = "게스트";
    userRoleLabel.textContent = "로그인이 필요합니다";
    logoutBtn.hidden = true;
    return;
  }

  userPanel.querySelector(".user-avatar").textContent = currentUser.name.slice(0, 1);
  userNameLabel.textContent = currentUser.name;
  userRoleLabel.textContent = `${currentUser.department} · ${currentUser.role}`;
  logoutBtn.hidden = false;
}

function updateMetrics() {
  pendingCount.textContent = approvals.filter((item) => item.status === "pending").length;
  attendanceCount.textContent = new Set(attendanceLogs.filter((log) => log.action === "출근").map((log) => log.name)).size;
}

function statusBadge(status) {
  const label = status === "approved" ? "승인" : status === "rejected" ? "반려" : "대기";
  const className = status === "approved" ? "approved" : status === "rejected" ? "rejected" : "pending";
  return `<span class="badge ${className}">${label}</span>`;
}

function renderApprovals() {
  if (!approvals.length) {
    approvalTable.innerHTML = `<tr><td colspan="5">승인 요청이 없습니다.</td></tr>`;
    updateMetrics();
    return;
  }

  approvalTable.innerHTML = approvals.map((item) => `
    <tr>
      <td>${item.type}</td>
      <td>${item.name}</td>
      <td>${item.content}</td>
      <td>${statusBadge(item.status)}</td>
      <td>
        <div class="action-row">
          <button type="button" class="approve" data-approval="${item.id}" data-status="approved">승인</button>
          <button type="button" class="reject" data-approval="${item.id}" data-status="rejected">반려</button>
        </div>
      </td>
    </tr>
  `).join("");
  updateMetrics();
}

function renderNotices() {
  noticeList.innerHTML = notices.map((notice) => `
    <article class="notice-item">
      <div>
        <h3>${notice.title}</h3>
        <p>${notice.body}</p>
      </div>
      <span class="notice-date">${notice.date}</span>
    </article>
  `).join("");
}

function renderLeaveFeed() {
  if (!leaveRequests.length) {
    leaveFeed.innerHTML = `<article class="feed-item"><p>아직 등록된 휴가 신청이 없습니다.</p></article>`;
    return;
  }

  leaveFeed.innerHTML = leaveRequests.map((request) => `
    <article class="feed-item">
      <div>
        <h3>${request.type} · ${request.name}</h3>
        <p>${request.start} ~ ${request.end} / ${request.reason}</p>
      </div>
      ${statusBadge(request.status)}
    </article>
  `).join("");
}

function renderAttendance() {
  if (!attendanceLogs.length) {
    attendanceLog.innerHTML = `<article class="log-item"><p>오늘의 근태 기록이 없습니다.</p></article>`;
    updateMetrics();
    return;
  }

  attendanceLog.innerHTML = attendanceLogs.map((log) => `
    <article class="log-item">
      <div>
        <strong>${log.name} · ${log.action}</strong>
        <p>${log.department}</p>
      </div>
      <span class="log-time">${log.time}</span>
    </article>
  `).join("");
  updateMetrics();
}

function showSection(sectionId) {
  $$(".content-section").forEach((section) => section.classList.toggle("active", section.id === sectionId));
  $$(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.section === sectionId));
}

function addApproval(type, name, content) {
  approvals.unshift({ id: crypto.randomUUID(), type, name, content, status: "pending" });
  renderApprovals();
}

function requireLogin() {
  if (currentUser) return true;
  alert("로그인 후 이용할 수 있습니다.");
  document.getElementById("authSection").scrollIntoView({ behavior: "smooth" });
  return false;
}

function addChatMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `${sender}-message message`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function createBotAnswer(question) {
  const normalized = question.replace(/\s/g, "");
  if (/휴가|연차|반차|병가/.test(normalized)) {
    return "휴가신청 메뉴에서 종류, 시작일, 종료일, 사유를 입력하면 관리자 승인 목록에 자동 등록됩니다. 승인 상태는 휴가신청 영역에서 확인할 수 있습니다.";
  }
  if (/근태|출근|퇴근|체크/.test(normalized)) {
    return "근태관리 메뉴에서 출근 체크와 퇴근 체크를 누르면 현재 시각 기준으로 기록됩니다. 대시보드의 금일 출근 지표도 함께 갱신됩니다.";
  }
  if (/회원|가입|승인|관리자/.test(normalized)) {
    return "회원가입 요청은 관리자 승인 화면에 대기 상태로 등록됩니다. 관리자가 승인하면 계정이 활성화되고, 반려 시 로그인이 제한됩니다.";
  }
  if (/공지|안내/.test(normalized)) {
    return "공지사항 메뉴에서 이번 주 중요 HR 안내를 확인할 수 있습니다. 데모에서는 공지 등록 버튼으로 샘플 공지도 추가할 수 있습니다.";
  }
  if (/조직|부서|담당/.test(normalized)) {
    return "조직도 메뉴에서 대표이사와 인사팀, 경영지원팀, 영업팀, 개발팀, 생산관리팀 담당자를 확인할 수 있습니다.";
  }
  return "문의하신 내용은 HR 담당자가 확인할 수 있도록 인사팀(hr@shinsung.co.kr)에 접수해 주세요. 휴가, 근태, 승인, 공지, 조직도 관련 질문은 제가 즉시 안내할 수 있습니다.";
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = $("#loginEmail").value.trim();
  const password = $("#loginPassword").value;
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    setMessage(loginMessage, "이메일 또는 비밀번호를 확인해 주세요.", "error");
    return;
  }
  if (!user.approved) {
    setMessage(loginMessage, "관리자 승인 대기 중인 계정입니다.", "error");
    return;
  }

  currentUser = user;
  updateUserPanel();
  setMessage(loginMessage, `${user.name}님, 환영합니다.`, "success");
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("#signupName").value.trim();
  const department = $("#signupDept").value;
  const email = $("#signupEmail").value.trim();
  const password = $("#signupPassword").value;

  if (users.some((user) => user.email === email)) {
    setMessage(signupMessage, "이미 등록된 이메일입니다.", "error");
    return;
  }

  users.push({ name, email, password, department, role: "임직원", approved: false });
  addApproval("회원가입", name, `${department} / ${email}`);
  signupForm.reset();
  setMessage(signupMessage, "가입 요청이 등록되었습니다. 관리자 승인 후 로그인할 수 있습니다.", "success");
});

approvalTable.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-approval]");
  if (!button) return;

  const request = approvals.find((item) => item.id === button.dataset.approval);
  if (!request) return;

  request.status = button.dataset.status;
  if (request.type === "회원가입" && request.status === "approved") {
    const email = request.content.split("/").pop().trim();
    const user = users.find((item) => item.email === email);
    if (user) user.approved = true;
  }
  renderApprovals();
  renderLeaveFeed();
});

logoutBtn.addEventListener("click", () => {
  currentUser = null;
  updateUserPanel();
  setMessage(loginMessage, "로그아웃되었습니다.", "success");
});

leaveForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requireLogin()) return;

  const request = {
    type: $("#leaveType").value,
    start: $("#leaveStart").value,
    end: $("#leaveEnd").value,
    reason: $("#leaveReason").value,
    name: currentUser.name,
    status: "pending"
  };
  leaveRequests.unshift(request);
  addApproval("휴가", request.name, `${request.type} ${request.start} ~ ${request.end}`);
  leaveForm.reset();
  renderLeaveFeed();
});

function recordAttendance(action) {
  if (!requireLogin()) return;
  attendanceLogs.unshift({
    name: currentUser.name,
    department: currentUser.department,
    action,
    time: formatTime()
  });
  renderAttendance();
}

$("#checkInBtn").addEventListener("click", () => recordAttendance("출근"));
$("#checkOutBtn").addEventListener("click", () => recordAttendance("퇴근"));

$("#chatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = $("#chatInput");
  const question = input.value.trim();
  if (!question) return;

  addChatMessage(question, "user");
  input.value = "";
  window.setTimeout(() => addChatMessage(createBotAnswer(question), "bot"), 250);
});

$$(".suggestions button").forEach((button) => {
  button.addEventListener("click", () => {
    $("#chatInput").value = button.dataset.question;
    $("#chatForm").requestSubmit();
  });
});

$$(".nav-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showSection(link.dataset.section);
  });
});

$$("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => showSection(button.dataset.scroll));
});

$("#seedRequestBtn").addEventListener("click", () => {
  addApproval("회원가입", "문서윤", "경영지원팀 / seoyun@shinsung.co.kr");
});

$("#noticeAddBtn").addEventListener("click", () => {
  notices.unshift({
    title: "신규 HR 포털 베타 오픈",
    body: "로그인, 휴가신청, 근태관리, AI 챗봇 기능을 시범 운영합니다.",
    date: new Date().toISOString().slice(0, 10).replaceAll("-", ".")
  });
  renderNotices();
});

function init() {
  todayLabel.textContent = formatDate();
  setInterval(() => {
    clockLabel.textContent = formatTime();
  }, 1000);
  clockLabel.textContent = formatTime();
  updateUserPanel();
  renderApprovals();
  renderNotices();
  renderLeaveFeed();
  renderAttendance();
}

init();
