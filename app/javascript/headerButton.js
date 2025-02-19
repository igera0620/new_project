document.addEventListener("turbo:load", () => {
  console.log("ヘッダーボタンのスクリプトが読み込まれました！");

  const button = document.getElementById("toggle-header");
  const header = document.getElementById("main-header");

  if (header) {
    // 初期状態で必ず hidden を適用
    header.classList.add("hidden");
  }

  if (button && header) {
    console.log("ボタンとヘッダーが見つかりました！");
    
    button.addEventListener("click", () => {
      console.log("ボタンがクリックされました！");
      if (header.classList.contains("hidden")) {
        header.classList.remove("hidden");
      } else {
        header.classList.add("hidden");
      }
    });
  } else {
    console.warn("ボタンまたはヘッダーが見つかりません！");
  }
});
