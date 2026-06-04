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
    "연차", "휴가", "휴직", "전자결재", "결재선", "신고", "급여", "퇴사",
    "인트라넷", "신청", "승인", "인사팀", "최대", "1년", "15일"
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

  if (normalized.includes("연차") || normalized.includes("휴가")) {
    return "연차는 입사 후 매월 1일씩 발생하며, 1년 차부터 최대 15일의 연차를 사용할 수 있습니다. 휴가 신청은 인트라넷 '휴가/연차 신청' 메뉴에서 간단하게 처리하실 수 있습니다.";
  }

  if (normalized.includes("육아휴직")) {
    return "육아휴직은 자녀가 만 8세 이하 또는 초등학교 2학년 이하인 경우 신청 가능합니다. 최대 1년까지 사용할 수 있으며, 필요 시 기간 연장이 가능합니다. 신청은 인트라넷 인사 시스템에서 진행해 주세요.";
  }

  if (normalized.includes("전자결재")) {
    return "전자결재는 인트라넷 상단 메뉴에서 '전자결재' 항목을 선택해 사용할 수 있습니다. 양식 작성 후 결재선을 추가하고 제출하면 자동으로 담당자에게 전달됩니다.";
  }

  if (normalized.includes("괴롭힘") || normalized.includes("직장 내 괴롭힘")) {
    return "직장 내 괴롭힘 신고는 인트라넷 '인사/윤리' 메뉴에서 온라인 신고서를 작성하거나 인사팀 이메일로 접수할 수 있습니다. 신고 후에는 즉시 보호 조치가 시행됩니다.";
  }

  if (normalized.includes("급여") || normalized.includes("월급")) {
    return "급여 지급일은 매월 말일이며, 세부 내역은 전자명세서에서 확인 가능합니다. 추가 문의는 인사팀으로 문의해 주세요.";
  }

  if (normalized.includes("퇴사") || normalized.includes("사직")) {
    return "퇴사 절차는 퇴사 신청서 작성 후 직속 상사와 인사팀 승인이 필요합니다. 퇴사 요청은 최소 2주 전에 제출해 주세요.";
  }

  return "문의 내용을 확인했습니다. 자세한 안내는 인사팀에 문의하거나 인트라넷 공지를 참고하시기 바랍니다.";
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
