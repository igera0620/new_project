document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 DOMContentLoaded イベント発生");

  // `menu-form` クラスを持つフォームだけを対象にする
  const forms = document.querySelectorAll("form.menu-form");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      console.log("🚀 フォーム送信イベント発火！", form.action);
      const loadingSpinner = document.getElementById("loading-spinner");

      if (loadingSpinner) {
        loadingSpinner.classList.remove("hidden"); // ローディングを表示
        console.log("✅ ローディングマーク表示！");
      } else {
        console.warn("⚠️ loading-spinner が見つからない！");
      }
    });
  });
});
