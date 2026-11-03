(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme");
  try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  btn.addEventListener("click", function () {
    var cur = root.getAttribute("data-theme");
    if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  var copy = document.getElementById("copy");
  var email = document.getElementById("email");
  copy.addEventListener("click", function () {
    var done = function () { copy.textContent = "Copied"; setTimeout(function () { copy.textContent = "Copy email"; }, 1800); };
    var fallback = function () {
      var r = document.createRange(); r.selectNodeContents(email);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      copy.textContent = "Press Ctrl+C";
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email.textContent).then(done, fallback);
    } else { fallback(); }
  });
})();
