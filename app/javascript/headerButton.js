document.addEventListener("turbo:load", () => {
  console.log("Turbo: ヘッダーボタンのスクリプトが読み込まれました！");

  const button = document.getElementById("toggle-header");

  if (button) {
    console.log("ボタンが見つかりました！");
    
    button.addEventListener("click", () => {
      console.log("ボタンがクリックされました！");
      button.classList.add("animate-wiggle");

      setTimeout(() => {
        button.classList.remove("animate-wiggle");
      }, 500);
    });
  } else {
    console.warn("ボタンが見つかりません！");
  }
});
