/* ============================================================
   CASE STUDY PAGE — renders from ?id= against window.WORKS
============================================================ */
(function () {
  var root = document.getElementById("cs-root");
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  var works = window.WORKS || [];
  var idx = works.findIndex(function (w) { return w.id === id; });
  var w = works[idx];

  if (!w) {
    root.innerHTML =
      '<section class="cs-hero"><div class="container">' +
        '<a class="back-link" href="index.html#works"><i class="fas fa-arrow-left"></i> Back to work</a>' +
        '<h1 class="cs-title">Case study not found</h1>' +
        '<p class="cs-lede">That project doesn\'t exist. Head back to explore the full portfolio.</p>' +
      '</div></section>';
    return;
  }

  document.title = w.title + " — Case Study · Saurabh Maurya";
  var a = w.accent;
  var prev = works[(idx - 1 + works.length) % works.length];
  var next = works[(idx + 1) % works.length];

  var metaHtml = w.meta.map(function (m) {
    return '<div class="cs-meta-item"><div class="k">' + m.k + '</div><div class="v">' + m.v + '</div></div>';
  }).join('');

  var outcomesHtml = w.outcomes.map(function (o) {
    return '<div class="outcome-card"><div class="outcome-num" style="color:' + o.color + '">' + o.num + '</div><div class="outcome-lbl">' + o.lbl + '</div></div>';
  }).join('');

  var approachHtml = w.approach.map(function (p) {
    return '<li><i class="fas fa-circle-check"></i><span>' + p + '</span></li>';
  }).join('');

  var stackHtml = w.stack.map(function (s) { return '<span>' + s + '</span>'; }).join('');

  root.innerHTML =
    '<section class="cs-hero"><div class="container">' +
      '<a class="back-link" href="index.html#works"><i class="fas fa-arrow-left"></i> All work</a>' +
      '<div class="cs-cat" style="color:' + a + '">' + w.catLabel + '</div>' +
      '<h1 class="cs-title">' + w.title + '</h1>' +
      '<p class="cs-lede">' + w.lede + '</p>' +
      '<div class="cs-meta">' + metaHtml + '</div>' +
    '</div></section>' +

    '<div class="container">' +
      '<div class="cs-banner" style="background:linear-gradient(135deg,' + a + '22,#eef1f8)">' +
        '<div style="position:absolute;inset:0;transform:scale(1.35);display:flex;align-items:center;justify-content:center">' +
          workThumb(w) +
        '</div>' +
      '</div>' +

      '<div class="cs-body">' +
        '<div class="cs-content">' +
          '<h2>The challenge</h2>' +
          '<p>' + w.challenge + '</p>' +
          '<h2>The approach</h2>' +
          '<ul>' + approachHtml + '</ul>' +
          '<h2>Outcomes</h2>' +
          '<div class="outcomes-grid">' + outcomesHtml + '</div>' +
          '<p>' + w.result + '</p>' +
        '</div>' +

        '<aside class="cs-side">' +
          '<div class="side-card"><h4>Tech &amp; tools</h4><div class="stack-tags">' + stackHtml + '</div></div>' +
          '<div class="side-card side-cta">' +
            '<h4>Like what you see?</h4>' +
            '<p>I take on a limited number of AI, web, and app projects. Let\'s talk about yours.</p>' +
            '<a href="index.html#contact" class="btn btn-primary btn-block"><i class="far fa-calendar-check"></i> Start a project</a>' +
          '</div>' +
        '</aside>' +
      '</div>' +

      '<div class="cs-nav-foot">' +
        '<a class="btn btn-ghost" href="case-study.html?id=' + prev.id + '"><i class="fas fa-arrow-left"></i> ' + prev.title.split(' — ')[0] + '</a>' +
        '<a class="btn btn-ghost" href="case-study.html?id=' + next.id + '">' + next.title.split(' — ')[0] + ' <i class="fas fa-arrow-right"></i></a>' +
      '</div>' +
    '</div>';

  window.scrollTo(0, 0);
})();
