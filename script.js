const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatHistory = document.getElementById("chatHistory");
const aiAnswer = document.getElementById("aiAnswer");
const emptyState = document.getElementById("emptyState");
const historyList = document.getElementById("historyList");
const faqButtons = document.querySelectorAll(".faq-btn");
const newConversationBtn = document.getElementById("newConversationBtn");

const conversations = [];

const answerBank = [
  {
    keywords: ["연차", "연차휴가", "연차 몇 개", "연차 개수", "연차 발생", "연차 발생 기준", "연차 기준", "년차"],
    answer: {
      title: "연차 유급휴가 발생 기준",
      description: "연차 유급휴가는 입사 후 1년간 계속 근로한 직원에게 15일이 부여됩니다. 1년 미만 근로자는 매월 1일씩 연차가 발생하며, 2년차 이후에는 매년 1일씩 추가되어 최대 25일까지 부여됩니다.",
      steps: [
        "인사 시스템에 로그인",
        "내 연차 현황 확인",
        "연차 사용 계획 수립",
        "연차 신청서 제출 및 승인 요청"
      ],
      documents: ["연차 신청서", "연차 사용 계획서"],
      department: "인사팀",
      notes: "연차는 연 단위로 산정되며, 미사용 연차는 회사 취업규칙에 따라 이월 또는 보상될 수 있습니다."
    }
  },
  {
    keywords: ["퇴직금", "퇴직금 계산", "퇴직금 얼마", "퇴직급여", "퇴직수당"],
    answer: {
      title: "퇴직금 계산 기준",
      description: "퇴직금은 1년 이상 계속 근로한 근로자가 퇴직할 때 평균임금 30일분을 지급받는 제도입니다. 퇴직일을 기준으로 평균임금을 산정하여 지급합니다.",
      steps: [
        "퇴직 의사 확인 및 직속 상사에 통보",
        "퇴직 신청서 제출",
        "인사팀 퇴직금 산정 요청",
        "퇴직금 지급일 확인 및 수령"
      ],
      documents: ["퇴직 신청서", "재직 및 기여 증빙 서류"],
      department: "인사팀",
      notes: "퇴직금은 퇴직일로부터 14일 이내 지급되어야 합니다. 계약직이나 수습 기간 중인 경우 규정이 다를 수 있습니다."
    }
  },
  {
    keywords: ["직장 내 괴롭힘", "괴롭힘", "괴롭힘 신고", "괴롭힘 신고 절차", "직장괴롭힘"],
    answer: {
      title: "직장 내 괴롭힘 신고 절차",
      description: "직장 내 괴롭힘은 회사 취업규칙에서 금지되며, 피해자는 안전하게 신고할 수 있는 절차가 마련되어 있습니다.",
      steps: [
        "괴롭힘 사례를 문서로 정리",
        "내부 신고 채널 접속",
        "괴롭힘 신고서 작성 및 제출",
        "인사팀 또는 윤리위원회 상담 요청"
      ],
      documents: ["괴롭힘 신고서", "증빙 자료(메시지, 녹음 등)"],
      department: "인사팀 / 윤리위원회",
      notes: "신고자는 신고 이후 불이익을 받지 않으며, 회사는 신고 접수 후 즉시 조사 및 보호 조치를 시행해야 합니다."
    }
  },
  {
    keywords: ["육아휴직", "육아 휴직", "육아휴직 신청", "육아휴직 조건", "육아휴직 사용", "육아휴직 언제"],
    answer: {
      title: "육아휴직 신청 절차",
      description: "육아휴직은 자녀가 만 8세 이하 또는 초등학교 2학년 이하인 근로자가 사용할 수 있으며, 기본적으로 최대 1년까지 사용할 수 있습니다.",
      steps: [
        "인사 시스템 접속",
        "육아휴직 신청서 작성",
        "가족관계증명서 등 증빙서류 첨부",
        "팀장 승인 요청",
        "인사팀 최종 승인"
      ],
      documents: ["육아휴직 신청서", "가족관계증명서", "자녀 주민등록등본"],
      department: "인사팀",
      notes: "휴직 시작 최소 30일 전 신청하는 것이 원칙이며, 사내 규정에 따라 추가 서류가 필요할 수 있습니다."
    }
  },
  {
    keywords: ["전자결재", "전자 결재", "결재", "전자결재 사용", "결재 시스템"],
    answer: {
      title: "전자결재 이용 안내",
      description: "전자결재는 회사 인트라넷을 통해 문서 결재를 처리하는 표준 절차입니다. 결재선 설정과 내용 입력 후 제출하면 자동으로 다음 결재자에게 전달됩니다.",
      steps: [
        "인트라넷 로그인",
        "전자결재 메뉴 진입",
        "결재 문서 양식 선택",
        "결재선 추가 및 내용 입력",
        "제출 및 승인 대기"
      ],
      documents: ["결재 요청서", "첨부 문서(예: 보고서, 견적서)"],
      department: "인사팀 / 각 부서 결재자",
      notes: "결재 요청 전에 관련 부서와 사전 협의를 완료하면 승인 속도가 빨라집니다."
    }
  },
  {
    keywords: ["경조휴가", "경조", "결혼휴가", "장례휴가", "산휴", "가족 경사"],
    answer: {
      title: "경조휴가 신청 안내",
      description: "경조휴가는 본인 또는 가족의 경조사 발생 시 회사 규정에 따라 부여되는 휴가입니다. 신청 방식과 허용 일수는 취업규칙에 따라 정해집니다.",
      steps: [
        "경조사 발생 사실 확인",
        "경조휴가 신청서 작성",
        "경조사 관련 증빙서류 첨부",
        "팀장 승인 요청",
        "인사팀 최종 승인"
      ],
      documents: ["경조휴가 신청서", "가족관계증명서", "결혼식 초대장 또는 장례식 영수증"],
      department: "인사팀",
      notes: "경조휴가 신청은 가능한 한 사전 통보해야 하며, 긴급한 경우 사후 제출도 가능합니다."
    }
  },
  {
    keywords: ["교육신청", "교육 신청", "사내 교육", "교육 프로그램"],
    answer: {
      title: "교육 신청 절차",
      description: "사내 교육은 회사에서 제공하는 직무 및 역량 강화 프로그램으로, 사전에 신청 후 승인 절차를 거쳐 참여할 수 있습니다.",
      steps: [
        "교육 포털 접속",
        "참여 희망 교육 선택",
        "교육 신청서 제출",
        "팀장 승인 요청",
        "교육 담당 부서 확인 및 일정 확정"
      ],
      documents: ["교육 신청서", "교육 계획서(필요 시)"],
      department: "인사팀 / 교육 담당 부서",
      notes: "교육 일정은 부서 운영 상황에 따라 조정될 수 있으므로 신청 후 반드시 확정 일정을 확인하세요."
    }
  },
  {
    keywords: ["복리후생", "복지", "복리후생 신청", "사내 복지", "福利厚生"],
    answer: {
      title: "복리후생 안내",
      description: "복리후생은 직원의 생활 안정과 만족도를 높이기 위해 제공되는 제도로, 식대, 교통비, 건강지원, 휴가 혜택 등이 포함됩니다.",
      steps: [
        "복리후생 안내 페이지 확인",
        "해당 프로그램 신청 조건 확인",
        "복리후생 신청서 작성",
        "관련 증빙서류 첨부",
        "인사팀 승인 요청"
      ],
      documents: ["복리후생 신청서", "관련 증빙서류"],
      department: "인사팀",
      notes: "프로그램별 신청 기간과 자격 요건이 다르므로 사전에 안내 자료를 꼼꼼히 확인하세요."
    }
  },
  {
    keywords: ["휴게시간", "휴게 시간", "점심시간", "휴게시간 몇 분", "점심시간 몇 분", "식사시간"],
    answer: {
      title: "휴게시간 기준 안내",
      description: "휴게시간은 근로 중 휴식을 보장하기 위한 제도입니다. 4시간 이상 근로 시 최소 30분, 8시간 이상 근로 시 최소 1시간의 휴게시간을 부여해야 합니다.",
      steps: [
        "근무 일정 확인",
        "휴게시간 계획 수립",
        "팀장과 휴게시간 조율",
        "지정된 시간에 휴게시간 확보"
      ],
      documents: ["휴게시간 신청서(필요 시)"],
      department: "인사팀 / 해당 부서 관리자",
      notes: "휴게시간은 근로시간에 포함되지 않으며, 지정된 시간에 반드시 휴식을 취해야 합니다."
    }
  }
];

const fallbackAnswer = {
  title: "취업규칙에서 확인되지 않습니다.",
  description: "입력하신 내용은 현재 사내 취업규칙에 명시되어 있지 않습니다. 인사팀에 문의하여 정확한 규정과 절차를 확인하세요.",
  steps: ["인사팀 문의", "관련 규정 확인 요청", "승인 여부 확인"],
  documents: ["문의 내용 요약"],
  department: "인사팀",
  notes: "규정은 회사별로 다를 수 있으므로 반드시 실제 취업규칙을 확인해야 합니다."
};

function normalizeText(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\u3000-\u303F\p{P}]/gu, "")
    .replace(/\s+/g, " ");
}

function includesAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function findAnswer(question) {
  const normalized = normalizeText(question);

  for (const entry of answerBank) {
    if (includesAny(normalized, entry.keywords)) {
      return entry.answer;
    }
  }

  return fallbackAnswer;
}

function renderAnswerCard(answer) {
  const stepsMarkup = answer.steps
    .map((step, index) => `<li><strong>${index + 1}.</strong> ${step}</li>`)
    .join("");

  const documentsMarkup = answer.documents.length
    ? `<ul class="answer-list">${answer.documents.map((doc) => `<li>${doc}</li>`).join("")}</ul>`
    : `<p>별도 서류가 필요하지 않습니다.</p>`;

  return `
    <div class="answer-card">
      <div class="answer-card-header">
        <span class="answer-badge">안내</span>
        <h4>${answer.title}</h4>
        <p>${answer.description}</p>
      </div>

      <div class="answer-section">
        <h5>진행 절차</h5>
        <ol class="answer-list steps-list">
          ${stepsMarkup}
        </ol>
      </div>

      <div class="answer-section grid-section">
        <div>
          <h5>준비 서류</h5>
          ${documentsMarkup}
        </div>
        <div>
          <h5>담당 부서</h5>
          <p>${answer.department}</p>
        </div>
      </div>

      <div class="answer-section">
        <h5>주의사항</h5>
        <p>${answer.notes}</p>
      </div>
    </div>
  `;
}

function renderHistory() {
  if (!historyList) return;

  historyList.innerHTML = "";

  if (conversations.length === 0) {
    historyList.innerHTML = `<p class="history-empty">최근 질문이 없습니다</p>`;
    return;
  }

  conversations.slice().reverse().forEach((entry) => {
    const item = document.createElement("button");
    item.className = "history-item";
    item.type = "button";
    item.innerHTML = `
      <span>최근 질문</span>
      <strong>${entry.question}</strong>
    `;
    item.addEventListener("click", () => {
      handleUserQuestion(entry.question);
    });
    historyList.appendChild(item);
  });
}

function appendMessage(role, text) {
  if (emptyState) {
    emptyState.style.display = "none";
  }

  const messageEl = document.createElement("div");
  messageEl.className = `chat-message ${role}`;
  const avatar = role === "user" ? "직" : "AI";
  const title = role === "user" ? "직원" : "AI 챗봇";

  messageEl.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-body">
      <span class="message-title">${title}</span>
      <div class="message-bubble"><p>${text}</p></div>
    </div>
  `;

  chatHistory.appendChild(messageEl);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function handleUserQuestion(question) {
  if (!question) return;

  appendMessage("user", question);
  const answer = findAnswer(question);
  appendMessage("ai", answer.title);
  aiAnswer.innerHTML = renderAnswerCard(answer);

  conversations.push({ question, answer: answer.title, timestamp: new Date().toISOString() });
  renderHistory();
}

function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  handleUserQuestion(text);
  userInput.value = "";
  userInput.focus();
}

function startNewConversation() {
  if (chatHistory) chatHistory.innerHTML = "";
  if (emptyState) emptyState.style.display = "flex";
  if (aiAnswer) aiAnswer.innerHTML = `<div class="answer-card empty-card"><p>질문을 입력하거나 FAQ를 선택하면 표준 취업규칙 기반 답변이 카드 형태로 표시됩니다.</p></div>`;
  conversations.length = 0;
  renderHistory();
}

sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSend();
  }
});

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.getAttribute("data-question");
    if (question) handleUserQuestion(question);
  });
});

if (newConversationBtn) {
  newConversationBtn.addEventListener("click", startNewConversation);
}

renderHistory();
