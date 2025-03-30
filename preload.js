function increaseFontSize() {
  var css = `
      .inlineDiffViewZone,
      .inlineDiffViewZone *,
      .pane-body,
      .pane-body * {
          font-size: 14px !important;
      }

      .explorer-folders-view,
      .explorer-folders-view * {
          font-size: 13px !important;
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
}
setTimeout(() => increaseFontSize(), 1000);

function moveTitleBarControlsToLeft() {
  // change style
  const style = Object.freeze({
    // button background color
    backgroundColor: "#33373e",
    // button text color
    color: "#c0c0c0",
    // button size
    size: "32px",
    // border radius
    radius: "999px",
    fontSize: 10,
    fontWeight: "700",
    gap: "6px",
  });

  window.addEventListener("DOMContentLoaded", () => {
    let timer = setInterval(() => {
      const controls = document.querySelector(
        ".titlebar-container .titlebar-right .window-controls-container"
      );
      const leftTitlebar = document.querySelector(
        ".titlebar-container .titlebar-left"
      );
      // not loaded
      if (!controls || !leftTitlebar) {
        return;
      }

      // put close button in first position
      controls.parentNode.removeChild(controls);
      const closeControl = controls.lastChild;
      controls.removeChild(closeControl);
      controls.prepend(closeControl);

      controls.style.width = "auto";
      controls.style.gap = controls.style.marginLeft = style.gap;
      controls.childNodes.forEach((child) => {
        child.style.borderRadius = style.radius;
        child.style.width = child.style.height = style.size;
        child.style.color = style.color;
        child.style.margin = "auto";
        child.style.cursor = "pointer";
        child.style.fontWeight = style.fontWeight;
        child.style.fontSize = `${style.fontSize}px`;
        child.addEventListener(
          "mouseleave",
          () => (child.style.backgroundColor = "")
        );
        child.addEventListener(
          "mouseenter",
          () => (child.style.backgroundColor = style.backgroundColor)
        );
      });
      leftTitlebar.appendChild(controls);
      clearInterval(timer);
    }, 100);
  });
}
moveTitleBarControlsToLeft();
