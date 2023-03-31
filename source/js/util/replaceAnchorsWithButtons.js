const replaceAnchorsWithButtons = (selector) => {
  const anchors = document.querySelectorAll(selector);

  const copyAttrs = (anchor, button) => {
    const attributes = [
      ...anchor.attributes
    ].filter((attr) => attr.name !== `href`);

    for (const attr of attributes) {
      button.setAttribute(attr.name, attr.value);
    }
  };

  anchors.forEach((anchor) => {
    const button = document.createElement(`button`);

    copyAttrs(anchor, button);
    button.type = `button`;
    button.innerHTML = anchor.innerHTML;
    anchor.parentElement.replaceChild(button, anchor);
  });
};

export default replaceAnchorsWithButtons;
