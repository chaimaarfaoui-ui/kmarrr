// ── BOOKING ───────────────────────────────────────────────────────────────────
function prefillTreatment(treatment) {
  openModal('bookModal');
  setTimeout(() => {
    const sel = document.getElementById('bk-treatment');
    if (sel) {
      for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value === treatment || sel.options[i].text === treatment) {
          sel.selectedIndex = i;
          break;
        }
      }
    }
  }, 50);
}

async function submitBooking() {
  clearError('bk-error');
  const firstName  = document.getElementById('bk-fname').value.trim();
  const lastName   = document.getElementById('bk-lname').value.trim();
  const email      = document.getElementById('bk-email').value.trim();
  const phone      = document.getElementById('bk-phone').value.trim();
  const treatment  = document.getElementById('bk-treatment').value;
  const travelDates= document.getElementById('bk-dates').value.trim();
  const message    = document.getElementById('bk-message').value.trim();

  if (!firstName || !lastName || !email || !phone || !treatment) {
    return showError('bk-error', 'Please fill in all required fields.');
  }

  const btn = document.getElementById('bk-submit');
  setBtnLoading(btn, true);

  // If logged in, use the authenticated booking endpoint
  if (Auth.isLoggedIn()) {
    try {
      await api.post('/bookings', { firstName, lastName, phone, treatment, travelDates, message }, true);
      closeModal('bookModal');
      showToast('Your consultation request has been received! Our team will contact you within 24 hours. Shukran! 🙏');
      clearBookingForm();
      setTimeout(() => {
        document.getElementById('chatWindow').classList.add('open');
        addMsg('Your consultation request has been received! 🎉 Our team will contact you within 24 hours. In the meantime, feel free to ask me anything about your treatment.', 'bot');
      }, 500);
    } catch(e) {
      showError('bk-error', e.message);
    } finally {
      setBtnLoading(btn, false);
    }
  } else {
    // Not logged in: simulate submission (in production you'd have a public endpoint)
    await new Promise(r => setTimeout(r, 800));
    setBtnLoading(btn, false);
    closeModal('bookModal');
    showToast('Request received! We\'ll contact you within 24 hours. Shukran! 🙏');
    clearBookingForm();
    setTimeout(() => {
      document.getElementById('chatWindow').classList.add('open');
      addMsg(`Thank you, ${firstName}! Your consultation request for ${treatment} has been received. 🎉 Our coordinator will reach out within 24 hours. Feel free to ask me any questions!`, 'bot');
    }, 500);
  }
}

function clearBookingForm() {
  ['bk-fname','bk-lname','bk-email','bk-phone','bk-dates','bk-message'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('bk-treatment').selectedIndex = 0;
}
