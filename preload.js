setTimeout(() => {
  var css = `
      .context-pill.context-pill-default,
      .inlineDiffViewZone,
      .inlineDiffViewZone *,
      .pane-body {
          font-size: 14px !important; 
      }

      .picker-menu-item-content,
      .monaco-icon-label-container {
          margin-left: 5px;
      }

      .show-file-icons {
          margin-right: 5px;
      }

      .input-box-button,
      .composer-bar-button,
      .composer-button-area>button,
      .composer-button-area>div,
      .ya-solid-dropdown-menu,
      .premium-pill.premium-pill-default,
      .codicon.codicon-add + span,
      .picker-menu-section-header,
      .show-file-icons,
      .fade-in-fast > div > div > span,
      .picker-menu-item-title,
      .monaco-highlighted-label,
      .ya-solid-dropdown-menu input,
      .monaco-scrollable-element,
      .codicon.codicon-chevron-right ~ div,
      .ya-solid-dropdown-menu div {
          font-size: 14px !important; 
      }

    
      .cursor-button.cursor-button-secondary.cursor-button-secondary-clickable,
      .cursor-button.cursor-button-secondary.cursor-button-not-clickable,
      div:has(>.aislash-editor-input),
      .cursor-button.cursor-button-primary.cursor-button-primary-clickable, 
          font-size: 15px !important; 
      }

    
      .premium-pill.premium-pill-default,
      .context-pill {
          height: 1.5em;
      }

    
      span {
          line-height: 1.5em;
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
}, 3000);

function adjustCodeBlockLineHeight() {
  const viewLinesElements = document.querySelectorAll(
    ".view-lines.monaco-mouse-cursor-text"
  );

  let topValue = 6;

  for (let i = 1; i < viewLinesElements.length; i++) {
    const viewLines = viewLinesElements[i];
    const childDivs = viewLines.querySelectorAll("div");

    topValue = 6;

    childDivs.forEach((div, index) => {
      div.style.top = `${topValue}px`;

      topValue += 26;
    });

    let parent = viewLines;
    for (let j = 0; j < 6; j++) {
      if (!parent) break;
      parent = parent.parentElement;
    }

    const isMarkdownHeader =
      parent &&
      parent.previousElementSibling &&
      parent.previousElementSibling.classList.contains(
        "markdown-code-block-header"
      );

    if (isMarkdownHeader) {
      let fourthParent = viewLines;
      for (let k = 0; k < 4; k++) {
        if (!fourthParent) break;
        fourthParent = fourthParent.parentElement;
      }

      if (fourthParent) {
        fourthParent.style.height = `${topValue + 15}px`;
      }
    } else {
      let fifthParent = viewLines;
      for (let k = 0; k < 5; k++) {
        if (!fifthParent) break;
        fifthParent = fifthParent.parentElement;
      }

      if (fifthParent) {
        fifthParent.style.height = `${topValue + 15}px`;
      }

      if (parent && parent.previousElementSibling) {
        const headerSpans = parent.previousElementSibling.children[0]?.children;
        if (headerSpans && headerSpans[1]) {
          headerSpans[1].style.fontSize = "18px";
        }
      }
    }
  }
}
setInterval(adjustCodeBlockLineHeight, 1000);
