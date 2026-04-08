// ── CHAT ──────────────────────────────────────────────────────────────────────
var OPENROUTER_KEY = ''; // Set your OpenRouter key here or use a serverless function

var SYSTEM_PROMPT = [
  'You are the friendly AI assistant for MedTunisia, a medical tourism platform in Tunisia.',
  'Help patients find treatments, clinics, doctors and packages.',
  '',
  'CLINICS: Clinique Pasteur (Tunis, ISO 9001, HAS accredited) | Clinique Le Bardo (Tunis)',
  'DOCTORS: Dr. Hayathem Helali (maxillo-facial, 15+ yrs, Paris-trained) |',
  '         Dr. Haifa Fodha (plastic surgery, Faculte de Monastir) |',
  '         Dr. Aymen Jalloul (hair FUE/DHI, Hammamet) | Dr. Sonia Triki (anti-aging, Tunis)',
  'PRICING - all-inclusive (hotel + transfers + aftercare):',
  '  Face: Rhinoplasty from 2200 EUR (5d/4n) | Facelift 2600 EUR (6d/5n) | Blepharoplasty 1400 EUR',
  '  Breast: Augmentation 2400 EUR | Reduction 2400 EUR',
  '  Body: Liposuction from 1700 EUR | Tummy Tuck 3400 EUR | Body Lift 4200 EUR',
  '  Non-surgical: Hair Transplant from 900 EUR | Botox 300 EUR | Fillers 250 EUR | PRP 200 EUR',
  'SPECIAL: Combine 2+ surgeries and save 50% on the 2nd and 3rd procedure.',
  'CONTACT: WhatsApp +216 54 02 54 02',
  '',
  'Be warm, concise and helpful. Use occasional Arabic: Marhba (welcome), Shukran (thank you).',
  'Keep replies under 150 words. If the user wants to book, encourage them to use the Book Now button.'
].join('\n');

function toggleChat() {
  var w = document.getElementById('chatWindow');
  w.classList.toggle('open');
  if (w.classList.contains('open')) document.getElementById('chatInput').focus();
}

async function sendMsg() {
  var inp = document.getElementById('chatInput');
  var txt = inp.value.trim();
  if (!txt) return;
  inp.value = '';
  addMsg(txt, 'user');
  document.getElementById('quickReplies').style.display = 'none';
  showTyping();
  await callAI(txt);
}

function sendQuick(txt) {
  document.getElementById('chatInput').value = txt;
  sendMsg();
}

function addMsg(text, role) {
  var msgs = document.getElementById('chatMsgs');
  var div = document.createElement('div');
  div.className = 'msg ' + role;
  var t = new Date();
  var time = t.getHours() + ':' + String(t.getMinutes()).padStart(2, '0');
  div.innerHTML = '<div class="msg-bubble">' + text + '</div><div class="msg-time">' + time + '</div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  var msgs = document.getElementById('chatMsgs');
  var div = document.createElement('div');
  div.className = 'msg bot';
  div.id = 'typingIndicator';
  div.innerHTML = '<div class="msg-bubble"><div class="dot-row"><span></span><span></span><span></span></div></div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  var t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

var chatHistory = [];

async function callAI(userMsg) {
  chatHistory.push({ role: 'user', content: userMsg });
  try {
    var messages = [{ role: 'system', content: SYSTEM_PROMPT }].concat(chatHistory);
    var res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + OPENROUTER_KEY,
        'HTTP-Referer': window.location.origin
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: messages,
        max_tokens: 300
      })
    });
    var data = await res.json();
    removeTyping();
    var reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content)
      ? data.choices[0].message.content
      : "I'm sorry, I couldn't connect right now. Please try WhatsApp or call us directly.";
    addMsg(reply, 'bot');
    chatHistory.push({ role: 'assistant', content: reply });
  } catch (e) {
    removeTyping();
    addMsg('Connection error. Please WhatsApp us at +216 54 02 54 02 for immediate help.', 'bot');
  }
}
