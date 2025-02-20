document.addEventListener("DOMContentLoaded", function () {
  function updateRemainingRequests() {
    fetch('/chatgpt/remaining_requests')
      .then(response => response.json())
      .then(data => {
        const countElement = document.getElementById('remaining-count');
        if (countElement) {
          countElement.innerText = `あと ${data.remaining} 回使えます`;
        }
      })
      .catch(error => {});
  }

  updateRemainingRequests();

  setTimeout(() => {
    const button = document.getElementById('chatgpt-button');
    if (button) {
      button.addEventListener('click', function () {
        setTimeout(updateRemainingRequests, 1000);
      });
    }
  }, 1000);
});
