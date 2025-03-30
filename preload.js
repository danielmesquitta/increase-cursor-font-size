setTimeout(() => {
  var css = `
      .inlineDiffViewZone,
      .inlineDiffViewZone *,
      .pane-body,
      .pane-body * {
          font-size: 14px !important;
      }
  `;

  var existingStyle = Array.from(document.head.querySelectorAll("style")).find(
    (style) => style.textContent === css
  );

  if (existingStyle) {
    existingStyle.textContent = css;
  } else {
    var style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }
}, 1000);
