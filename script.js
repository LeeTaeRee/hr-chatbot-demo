const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatHistory = document.getElementById("chatHistory");
const aiAnswer = document.getElementById("aiAnswer");
const emptyState = document.getElementById("emptyState");
const historyList = document.getElementById("historyList");
const faqButtons = document.querySelectorAll(".faq-btn");
const newConversationBtn = document.getElementById("newConversationBtn");

const conversations = [];

const qaPatterns = [
  {
    keywords: ["퇴직금", "퇴직금 계산", "퇴직금 얼마", "퇴직금 지급", "퇴직 금액", "퇴직수당", "퇴직급여", "퇴직금 기준"],
    response: "퇴직금은 표준 취업규칙에 따라 1년 이상 계속 근로한 근로자가 퇴직할 때 평균임금 30일분을 지급합니다. 회사는 퇴직일로부터 14일 이내에 퇴직금을 지급해야 합니다."
  },
  {
    keywords: ["퇴직", "퇴사", "사직", "퇴직 절차", "퇴직 방법", "퇴직하려면"],
    response: "퇴직은 본인의 의사로 퇴직신청서를 제출하고 직속 상사 및 인사팀의 확인을 거쳐 처리됩니다. 표준 취업규칙에서는 최소 2주 전에 퇴직 의사를 알려야 하며, 인수인계 절차를 마쳐야 합니다."
  },
  {
    keywords: ["연차", "연차휴가", "연차 몇 개", "연차 개수", "연차 발생", "연차 발생 기준", "연차 기준", "년차", "몇 일"],
    response: "연차 유급휴가는 입사 후 1년간 계속 근로한 경우 15일이 부여됩니다. 1년 미만 근로자는 매월 1일씩 발생하며, 2년차 이후에는 매년 1일씩 추가 발생하여 최대 25일까지 부여될 수 있습니다."
  },
  {
    keywords: ["휴가", "휴일", "휴가 사용", "휴가 신청", "휴가 절차"],
    response: "휴가는 표준 취업규칙에서 연차 유급휴가를 중심으로 규정됩니다. 휴가 사용 시에는 사전에 신청하고 승인 절차를 거쳐야 하며, 회사의 근로 운영 계획에 따라 사용 시기가 조정될 수 있습니다."
  },
  {
    keywords: ["근로시간", "근무시간", "1일 8시간", "1주 40시간", "52시간", "기본 근로시간", "근로 시간", "1주 몇 시간"],
    response: "표준 취업규칙에서는 1일 기본 근로시간을 8시간, 1주 기본 근로시간을 40시간으로 정합니다. 필요 시 법정 한도 내에서 연장근로를 실시할 수 있으며, 1주 최대 52시간을 초과하지 않아야 합니다."
  },
  {
    keywords: ["휴게시간", "휴게", "휴게시간 몇 분", "점심시간", "점심", "식사시간", "휴게 시간", "쉬는 시간"],
    response: "표준 취업규칙에 따르면 4시간 이상 근로 시 최소 30분, 8시간 이상 근로 시 최소 1시간의 휴게시간을 부여해야 하며, 휴게시간은 근로시간에 포함되지 않습니다."
  },
  {
    keywords: ["직장 내 괴롭힘", "괴롭힘 신고", "괴롭힘", "폭언", "갑질", "모욕", "직장 괴롭힘", "괴롭힘 신고 절차"],
    response: "표준 취업규칙에서는 직장 내 괴롭힘을 금지하며 신고 절차와 피해자 보호 조치를 규정합니다. 신고는 인사팀 또는 지정된 상담 창구를 통해 접수되며, 접수 즉시 조사와 필요한 보호 조치가 시행됩니다."
  },
  {
    keywords: ["육아휴직", "육아 휴직", "육아휴직 조건", "육아휴직 사용", "육아휴직 언제", "육아 휴직 조건"],
    response: "육아휴직은 자녀가 만 8세 이하 또는 초등학교 2학년 이하인 근로자가 사용할 수 있으며, 기본적으로 최대 1년 동안 사용할 수 있습니다. 육아휴직을 사용할 때는 사전에 신청하고 인사팀의 승인을 받아야 합니다."
  },
  {
    keywords: ["경조휴가", "경조", "산휴", "장례", "결혼", "경조휴일", "가족 경사"],
    response: "경조휴가는 표준 취업규칙에 따라 본인 또는 가족의 경조사(출산, 결혼, 장례 등) 시 유급휴일로 부여되는 휴가입니다. 경조휴가의 일수와 대상 범위는 회사의 구체적인 취업규칙에 따라 정하며, 경사일이 확정되면 인사팀에 신청하여 처리합니다."
  }
];

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

function highlightKeywords(text) {
  const keywords = [
    "연차", "휴가", "퇴직", "퇴직금", "근로시간", "휴게시간", "직장 내 괴롭힘", "괴롭힘",
    "육아휴직", "1년", "15일", "40시간", "52시간", "30분", "1시간"
  ];

  let result = text;
  keywords.forEach((keyword) => {
    const regex = new RegExp(`(${keyword})`, "g");
    result = result.replace(regex, `<span class="keyword">$1</span>`);
  });
  return result;
}

function renderHistory() {
  if (!historyList) return;

  historyList.innerHTML = "";

  if (conversations.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "history-empty";
    emptyMessage.textContent = "최근 질문이 없습니다";
    historyList.appendChild(emptyMessage);
    return;
  }

  conversations.slice().reverse().forEach((entry) => {
    const item = document.createElement("div");
    item.className = "history-item";
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

function generateAiAnswer(question) {
  const normalized = normalizeText(question);

  for (const pattern of qaPatterns) {
    if (includesAny(normalized, pattern.keywords)) {
      return pattern.response;
    }
  }

  return "취업규칙에서 확인되지 않습니다.";
}

function handleUserQuestion(question) {
  if (!question) return;

  appendMessage("user", question);
  const answerText = generateAiAnswer(question);
  appendMessage("ai", answerText);
  aiAnswer.innerHTML = highlightKeywords(answerText);

  conversations.push({ question, answer: answerText, timestamp: new Date().toISOString() });
  renderHistory();
}

function handleSend() {
  const text = userInput.value.trim();
  if (!text) {
    return;
  }

  handleUserQuestion(text);
  userInput.value = "";
  userInput.focus();
}

function startNewConversation() {
  if (chatHistory) {
    chatHistory.innerHTML = "";
  }
  if (emptyState) {
    emptyState.style.display = "flex";
  }
  if (aiAnswer) {
    aiAnswer.textContent = "선택한 질문의 답변이 여기에 표시됩니다";
  }
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
    if (question) {
      handleUserQuestion(question);
    }
  });
});

if (newConversationBtn) {
  newConversationBtn.addEventListener("click", startNewConversation);
}

renderHistory();
