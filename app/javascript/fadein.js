document.addEventListener("turbo:load", () => {
  console.log("🚀 フェードインスクリプトが読み込まれました！");

  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length > 0) {
    console.log(`✅ ${fadeElements.length} 個のフェードイン要素を検出`);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
          observer.unobserve(entry.target); // 一度適用したら監視を解除
          console.log("🎬 フェードイン適用！");
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-1000");
      observer.observe(el);
    });
  } else {
    console.warn("⚠️ フェードイン要素が見つかりません！");
  }
});
