document.addEventListener("DOMContentLoaded", function () {
  console.log("🔥 DOMContentLoaded イベント発生");

  function updateRemainingRequests() {
    console.log("🔥 残りリクエストを取得");
    fetch('/chatgpt/remaining_requests')
      .then(response => response.json())
      .then(data => {
        console.log("🔥 APIレスポンス:", data);
        const countElement = document.getElementById('remaining-count');
        if (countElement) {
          countElement.innerText = `あと ${data.remaining} 回使えます`;
          console.log("🔥 表示更新成功");
        } else {
          console.warn("⚠️ `remaining-count` の要素が見つかりません！");
        }
      })
      .catch(error => console.error("🚨 エラー:", error));
  }

  // ページロード時に実行
  updateRemainingRequests();

  // 1秒遅らせてボタンが確実にレンダリングされてからイベントを追加
  setTimeout(() => {
    const button = document.getElementById('chatgpt-button');
    if (button) {
      console.log("🔥 ボタンが見つかりました");
      button.addEventListener('click', function () {
        console.log("🔥 ChatGPT ボタンが押されました");
        setTimeout(updateRemainingRequests, 1000);
      });
    } else {
      console.warn("⚠️ `chatgpt-button` の要素が見つかりません！（setTimeout後）");
    }
  }, 1000);
});
