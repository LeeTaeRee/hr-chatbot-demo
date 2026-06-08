const STORAGE_KEY = "peoplehub-members";
const SESSION_KEY = "peoplehub-session";

const sampleMembers = [
  {
    name: "김민지",
    employeeId: "EMP-2026-001",
    department: "인사팀",
    email: "minji.kim@company.com",
    password: "password123",
    status: "active"
  },
  {
    name: "이준호",
    employeeId: "EMP-2026-014",
    department: "개발팀",
    email: "junho.lee@company.com",
    password: "password123",
    status: "pending"
  },
  {
    name: "박서연",
    employeeId: "EMP-2026-023",
    department: "마케팅팀",
    email: "seoyeon.park@company.com",
    password: "password123",
    status: "inactive"
  }
];

const policyData = [
  {
    title: "연차휴가 운영 규정",
    keywords: ["연차", "휴가", "반차", "휴가신청"],
    summary: "연차는 근태 시스템에서 최소 1영업일 전 신청하고 팀장 승인 후 사용할 수 있습니다. 긴급한 사유는 사후 신청이 가능합니다.",
    owner: "인사팀",
    updated: "2026-05-10"
  },
  {
    title: "재택근무 및 유연근무 규정",
    keywords: ["재택", "유연", "근무", "원격"],
    summary: "재택근무는 주 2회까지 가능하며 업무 계획과 보안 점검 항목을 제출해야 합니다.",
    owner: "인사팀 / 정보보안팀",
    updated: "2026-04-18"
  },
  {
    title: "경조휴가 지원 규정",
    keywords: ["경조", "경조휴가", "결혼", "장례"],
    summary: "본인 결혼, 직계가족 조사 등 경조 사유별 휴가 일수와 지원금이 다르게 적용됩니다.",
    owner: "인사팀",
    updated: "2026-03-27"
  },
  {
    title: "교육 신청 및 비용 지원 규정",
    keywords: ["교육", "교육신청", "자격증", "세미나"],
    summary: "직무 관련 교육은 팀장 승인 후 신청할 수 있으며, 수료증 제출 시 교육비가 정산됩니다.",
    owner: "인재개발팀",
    updated: "2026-02-14"
  },
  {
    title: "퇴직금 및 퇴직 절차 규정",
    keywords: ["퇴직", "퇴직금", "사직", "퇴사"],
    summary: "퇴직 예정자는 최소 30일 전 사직 의사를 제출하고 인수인계 확인 후 퇴직 정산을 진행합니다.",
    owner: "인사팀 / 재무팀",
    updated: "2026-01-30"
  }
];

const chatbotAnswers = [
  {
    keywords: ["연차", "휴가", "반차"],
    answer: "연차는 근태 시스템에서 신청서를 작성한 뒤 팀장 승인을 받으면 사용할 수 있습니다. 반차는 오전·오후 단위로 선택하고, 긴급 휴가는 사용 후 3영업일 이내 증빙을 첨부하세요."
  },
  {
    keywords: ["육아", "출산", "가족돌봄"],
    answer: "육아휴직은 희망 시작일 30일 전 신청서를 제출하는 것이 원칙입니다. 대상 자녀 정보, 휴직 기간, 대체 업무 인수인계 계획을 함께 등록해 주세요."
  },
  {
    keywords: ["퇴직", "퇴직금", "퇴사"],
    answer: "퇴직금은 계속 근로기간 1년 이상 직원에게 지급되며, 평균임금과 근속기간을 기준으로 산정합니다. 정확한 금액은 재무팀 정산 확정 후 안내됩니다."
  },
  {
    keywords: ["괴롭힘", "신고", "고충"],
    answer: "직장 내 괴롭힘은 고충 상담 창구 또는 인사팀에 신고할 수 있습니다. 신고자 보호가 우선이며, 접수 후 사실 확인과 조치 계획 수립 절차가 진행됩니다."
  },
  {
    keywords: ["급여", "원천", "명세서"],
    answer: "급여명세서는 매월 급여일에 포털에서 확인할 수 있습니다. 원천징수영수증, 소득 증빙 등 추가 서류는 재무팀에 발급 요청해 주세요."
  }
];

const signupForm = document.querySelector("#signupForm");
const loginForm = document.querySelector("#loginForm");
const signupMessage = document.querySelector("#signupMessage");
const loginState = document.querySelector("#loginState");
const memberTableBody = document.querySelector("#memberTableBody");
const memberSearch = document.querySelector("#memberSearch");
const resetMembersBtn = document.querySelector("#resetMembersBtn");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatWindow = document.querySelector("#chatWindow");
const policySearchForm = document.querySelector("#policySearchForm");
const policyInput = document.querySelector("#policyInput");
const policyResults = document.querySelector("#policyResults");

function getMembers() {
  const savedMembers = localStorage.getItem(STORAGE_KEY);

  if (!savedMembers) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleMembers));
    return [...sampleMembers];
  }

  return JSON.parse(savedMembers);
}

function saveMembers(members) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
}

function normalizeText(value) {
  return value.trim().toLowerCase();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setMessage(element, message, type) {
  element.textContent = message;
  element.className = `form-message ${type}`;
}

function getStatusLabel(status) {
  const labels = {
    pending: "승인 대기",
    active: "활성",
    inactive: "비활성"
  };

  return labels[status] || status;
}

function renderMembers(filter = "") {
  const members = getMembers();
  const query = normalizeText(filter);
  const filteredMembers = members.filter((member) => {
    const searchable = `${member.name} ${member.employeeId} ${member.department} ${member.email}`.toLowerCase();
    return searchable.includes(query);
  });

  if (filteredMembers.length === 0) {
    memberTableBody.innerHTML = `
      <tr>
        <td colspan="6">검색 결과가 없습니다.</td>
      </tr>
    `;
    return;
  }

  memberTableBody.innerHTML = filteredMembers
    .map((member) => `
      <tr>
        <td>${escapeHtml(member.name)}</td>
        <td>${escapeHtml(member.employeeId)}</td>
        <td>${escapeHtml(member.department)}</td>
        <td>${escapeHtml(member.email)}</td>
        <td><span class="status-badge status-${member.status}">${getStatusLabel(member.status)}</span></td>
        <td>
          <div class="action-group">
            <button type="button" data-action="active" data-email="${escapeHtml(member.email)}">승인</button>
            <button type="button" data-action="inactive" data-email="${escapeHtml(member.email)}">비활성화</button>
            <button class="danger" type="button" data-action="delete" data-email="${escapeHtml(member.email)}">삭제</button>
          </div>
        </td>
      </tr>
    `)
    .join("");
}

function updateMemberStatus(email, status) {
  const members = getMembers().map((member) => (
    member.email === email ? { ...member, status } : member
  ));
  saveMembers(members);
  renderMembers(memberSearch.value);
}

function deleteMember(email) {
  const members = getMembers().filter((member) => member.email !== email);
  saveMembers(members);
  renderMembers(memberSearch.value);
}

function updateLoginState() {
  const sessionEmail = localStorage.getItem(SESSION_KEY);
  const member = getMembers().find((item) => item.email === sessionEmail);

  if (!member) {
    loginState.classList.remove("active");
    loginState.querySelector("p").textContent = "로그인 전입니다.";
    return;
  }

  loginState.classList.add("active");
  loginState.querySelector("p").textContent = `${member.name}님, ${member.department} 계정으로 로그인했습니다.`;
}

function getChatbotAnswer(question) {
  const normalizedQuestion = normalizeText(question);
  const matchedAnswer = chatbotAnswers.find((item) => (
    item.keywords.some((keyword) => normalizedQuestion.includes(keyword))
  ));

  return matchedAnswer
    ? matchedAnswer.answer
    : "현재 등록된 HR 지식에서 정확한 답변을 찾지 못했습니다. 규정 검색을 함께 이용하거나 인사팀 담당자에게 문의해 주세요.";
}

function appendMessage(role, text) {
  const message = document.createElement("div");
  message.className = `message ${role}`;
  message.innerHTML = `
    <strong>${role === "user" ? "나" : "HR 봇"}</strong>
    <p>${escapeHtml(text)}</p>
  `;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function searchPolicies(query) {
  const normalizedQuery = normalizeText(query);
  return policyData.filter((policy) => (
    policy.title.toLowerCase().includes(normalizedQuery)
    || policy.summary.toLowerCase().includes(normalizedQuery)
    || policy.keywords.some((keyword) => keyword.includes(normalizedQuery))
  ));
}

function renderPolicies(query) {
  const results = searchPolicies(query);

  if (results.length === 0) {
    policyResults.innerHTML = `<p class="empty-result">"${escapeHtml(query)}"에 대한 규정을 찾지 못했습니다. 다른 키워드로 검색해 주세요.</p>`;
    return;
  }

  policyResults.innerHTML = results
    .map((policy) => `
      <article class="policy-card">
        <h3>${escapeHtml(policy.title)}</h3>
        <p>${escapeHtml(policy.summary)}</p>
        <p><strong>담당 부서:</strong> ${escapeHtml(policy.owner)}</p>
        <p><strong>최근 개정일:</strong> ${escapeHtml(policy.updated)}</p>
      </article>
    `)
    .join("");
}

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newMember = {
    name: document.querySelector("#signupName").value.trim(),
    employeeId: document.querySelector("#signupEmployeeId").value.trim(),
    department: document.querySelector("#signupDepartment").value,
    email: normalizeText(document.querySelector("#signupEmail").value),
    password: document.querySelector("#signupPassword").value,
    status: "pending"
  };

  const members = getMembers();
  const isDuplicate = members.some((member) => (
    member.email === newMember.email || member.employeeId === newMember.employeeId
  ));

  if (isDuplicate) {
    setMessage(signupMessage, "이미 등록된 이메일 또는 사번입니다.", "error");
    return;
  }

  saveMembers([...members, newMember]);
  signupForm.reset();
  setMessage(signupMessage, "회원가입이 완료되었습니다. 관리자 승인 후 로그인할 수 있습니다.", "success");
  renderMembers(memberSearch.value);
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = normalizeText(document.querySelector("#loginEmail").value);
  const password = document.querySelector("#loginPassword").value;
  const member = getMembers().find((item) => item.email === email && item.password === password);

  if (!member) {
    loginState.classList.remove("active");
    loginState.querySelector("p").textContent = "이메일 또는 비밀번호가 일치하지 않습니다.";
    return;
  }

  if (member.status !== "active") {
    loginState.classList.remove("active");
    loginState.querySelector("p").textContent = `현재 계정 상태는 '${getStatusLabel(member.status)}'입니다. 관리자에게 문의하세요.`;
    return;
  }

  localStorage.setItem(SESSION_KEY, member.email);
  loginForm.reset();
  updateLoginState();
});

memberSearch.addEventListener("input", (event) => {
  renderMembers(event.target.value);
});

memberTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const { action, email } = button.dataset;

  if (action === "delete") {
    deleteMember(email);
    return;
  }

  updateMemberStatus(email, action);
});

resetMembersBtn.addEventListener("click", () => {
  saveMembers(sampleMembers);
  localStorage.removeItem(SESSION_KEY);
  memberSearch.value = "";
  renderMembers();
  updateLoginState();
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = chatInput.value.trim();

  if (!question) return;

  appendMessage("user", question);
  appendMessage("bot", getChatbotAnswer(question));
  chatInput.value = "";
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    appendMessage("user", question);
    appendMessage("bot", getChatbotAnswer(question));
  });
});

policySearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPolicies(policyInput.value.trim());
});

document.querySelectorAll("[data-policy]").forEach((button) => {
  button.addEventListener("click", () => {
    policyInput.value = button.dataset.policy;
    renderPolicies(policyInput.value);
  });
});

renderMembers();
updateLoginState();
