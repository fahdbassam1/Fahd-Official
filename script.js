// زر يهتز عند النسخ
function animateCopyButton() {
  const btn = document.querySelector(
    '.btn.copy-btn, .btn[onclick="copyLink()"]'
  );
  if (btn) {
    btn.classList.add("shake");
    setTimeout(() => btn.classList.remove("shake"), 600);
  }
}

// نسخ الرابط مع رسالة منبثقة
function copyLink() {
  const url = window.location.href;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(url)
      .then(() => showToast("Link copied to clipboard!"))
      .catch(() => fallbackCopyTextToClipboard(url));
  } else {
    fallbackCopyTextToClipboard(url);
  }
  animateCopyButton();
}

// رسالة منبثقة احترافية
function showToast(message) {
  let toast = document.getElementById("custom-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "custom-toast";
    toast.style.position = "fixed";
    toast.style.bottom = "32px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "rgba(24,28,42,0.98)";
    toast.style.color = "#ffd700";
    toast.style.padding = "14px 32px";
    toast.style.borderRadius = "12px";
    toast.style.fontWeight = "bold";
    toast.style.fontSize = "1.1rem";
    toast.style.boxShadow = "0 4px 24px rgba(255,215,0,0.13)";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
  }, 1800);
}

// نسخ بديل للمتصفحات القديمة
function fallbackCopyTextToClipboard(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand("copy");
    showToast("Link copied to clipboard!");
  } catch (err) {
    alert("Failed to copy link");
  }
  document.body.removeChild(tempInput);
  animateCopyButton();
}

// تأثير hover للأزرار
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => btn.classList.add("hovered"));
  btn.addEventListener("mouseleave", () => btn.classList.remove("hovered"));
});

// عداد زيارات لكل رابط
const linkIds = [
  "insta1",
  "insta2",
  "tiktok1",
  "tiktok2",
  "youtube",
  "whatsapp",
  "telegram",
];

linkIds.forEach((id) => {
  const link = document.getElementById(id);
  const countSpan = document.getElementById("count-" + id);
  if (link && countSpan) {
    let count = Number(localStorage.getItem("visit-" + id) || 0);
    countSpan.textContent = count;
    link.addEventListener("click", () => {
      count++;
      countSpan.textContent = count;
      localStorage.setItem("visit-" + id, count);
    });
  }
});
