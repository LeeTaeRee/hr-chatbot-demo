const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatHistory = document.getElementById("chatHistory");
const aiAnswer = document.getElementById("aiAnswer");
const emptyState = document.getElementById("emptyState");
const historyList = document.getElementById("historyList");
const faqButtons = document.querySelectorAll(".faq-btn");
const newConversationBtn = document.getElementById("newConversationBtn");

const conversations = [];

function highlightKeywords(text) {
  const keywords = [
    "연차", "휴가", "퇴직", "퇴직금", "근로시간", "휴게시간", "직장 내 괴롭힘", "괴롭힘",
    "1년", "15일", "30일", "40시간", "52시간", "14일", "유급"
  ];
  
  let result = text;
  keywords.forEach(keyword => {
    const regex = new RegExp(`(${keyword})`, 'g');
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
  const title = role === "user" ? "직원" : "AI Assistant";

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
  const normalized = question.trim().toLowerCase();

  if (normalized.includes("퇴직금") || normalized.includes("퇴직 급여") || normalized.includes("퇴직 수당")) {
    return "표준 취업규칙에 따르면, 퇴직금은 1년 이상 계속 근로한 근로자가 퇴직할 때 평균임금 30일분을 지급합니다. 회사는 퇴직일로부터 14일 이내에 퇴직금을 지급해야 합니다.";
  }

  if (normalized.includes("퇴직") || normalized.includes("퇴사") || normalized.includes("사직")) {
    return "퇴직은 본인의 의사로 퇴직신청서를 제출하고 직속 상사 및 인사팀의 확인을 거쳐 처리됩니다. 표준 취업규칙에서는 최소 2주 전 서면 또는 전자 신청을 권장하며, 퇴직일자와 인수인계를 명확히 해야 합니다.";
  }

  if (normalized.includes("연차") || normalized.includes("연차휴가") || normalized.includes("년차")) {
    return "표준 취업규칙에 따르면, 연차 유급휴가는 입사 후 1년간 계속 근로한 자에게 15일을 부여합니다. 1년 미만 근로자는 매월 1일씩 발생하며, 2년차 이후에는 매년 1일씩 추가되어 최대 25일까지 부여될 수 있습니다.";
  }

  if (normalized.includes("휴가") || normalized.includes("휴직") || normalized.includes("휴일")) {
    return "휴가는 표준 취업규칙에서 연차휴가를 중심으로 규정되며, 연차는 1년간 계속 근로 시 15일 부여됩니다. 연차 사용 시 규정된 절차에 따라 결재를 받고, 사용 예정일을 사전에 알리는 것이 필요합니다.";
  }

  if (normalized.includes("근로시간") || normalized.includes("근로 시간") || normalized.includes("근무시간")) {
    return "표준 취업규칙에서는 1일 8시간, 1주 40시간을 기본 근로시간으로 정합니다. 필요 시 법정 한도 내에서 연장근로를 실시할 수 있으며, 통상 1주 최대 52시간을 초과하지 않아야 합니다.";
  }

  if (normalized.includes("휴게시간") || normalized.includes("휴게")) {
    return "표준 취업규칙에 따르면, 근로시간이 4시간 이상이면 최소 30분 이상의 휴게시간을 부여하며, 8시간 근로 시에는 최소 1시간의 휴게시간을 제공합니다. 휴게시간은 근로시간에 포함되지 않습니다.";
  }

  if (normalized.includes("괴롭힘") || normalized.includes("직장 내 괴롭힘") || normalized.includes("모욕") || normalized.includes("폭언")) {
    return "표준 취업규칙에서는 직장 내 괴롭힘을 금지하고 신고 절차와 피해자 보호 조치를 규정합니다. 신고는 회사의 인사팀 또는 상담 창구를 통해 접수하며, 접수 즉시 조사와 필요한 보호 조치를 시행합니다.";
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
