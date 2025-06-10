// script.js
document.addEventListener('DOMContentLoaded', () => {
  const trackForm = document.getElementById('trackForm');
  const resultDiv = document.getElementById('result');
  trackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const trackingId = document.getElementById('trackingId').value.trim();
    resultDiv.innerHTML = 'Loading...';

    try {
      const response = await fetch(`/track/${trackingId}`);
      if (!response.ok) {
        throw new Error('Tracking ID not found');
      }
      const data = await response.json();
      resultDiv.innerHTML = `
        <h3>Tracking ID: ${data.id}</h3>
        <p>Status: <strong>${data.status}</strong></p>
        <p>Location: ${data.location}</p>
        <p>Estimated Delivery: ${data.eta}</p>
      `;
    } catch (err) {
      resultDiv.innerHTML = `<p style="color: red;">${err.message}</p>`;
    }
  });

  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      alert(result.message || result.error);
    } catch (err) {
      alert('Something went wrong');
    }
  });
});
