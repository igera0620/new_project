export function showWorkoutDetailModal(data) {
  console.log("🔥 showWorkoutDetailModal が呼ばれました！", data);

  setTimeout(() => {
    let modalElement = document.getElementById("workoutModal");
    let detailEl = document.getElementById("workoutDetail");

    if (!modalElement || !detailEl) {
      console.error("❌ エラー: モーダルまたは詳細エリアが見つかりません！");
      return;
    }

    let titleEl = document.getElementById("workoutTitle");
    let descEl = document.getElementById("workoutDescription");
    let dateEl = document.getElementById("workoutDate");
    let timeEl = document.getElementById("workoutTime");
    let completedEl = document.getElementById("workoutCompleted");

    if (!titleEl || !descEl || !dateEl || !timeEl || !completedEl) {
      console.error("❌ エラー: モーダル内の要素が見つかりません！");
      return;
    }

    titleEl.innerText = data.title || "タイトルなし";
    descEl.innerText = data.description || "説明なし";
    dateEl.innerText = data.date || "日付なし";
    timeEl.innerText = `${data.start_time || "未定"} 〜 ${data.end_time || "未定"}`;
    completedEl.innerText = data.completed ? "✔ 完了" : "✖ 未完了";

    detailEl.style.display = "block"; // 🔥 詳細エリアを表示

    import("bootstrap").then((bootstrap) => {
      let modal = new bootstrap.Modal(modalElement);
      modal.show();
    }).catch(error => {
      console.error("❌ Bootstrap の読み込みに失敗しました！", error);
    });

  }, 500);
}
