// Preview item after hovering over photo for 1.25 seconds, on OfferUp.com

// Run in browser console or wrapper, during or any time after query.
const PreviewListing = (() => {
  const itemWindow = document.createElement('div');
  const bufferLayer = document.createElement('div');
  const itemContent = document.createElement('iframe');
  const urlDisplay = document.createElement('p');

  urlDisplay.style.margin = '0px';
  urlDisplay.style.padding = '0px';
  urlDisplay.style.fontSize = '20px';
  urlDisplay.style.fontWeight = '600';

  itemWindow.style.width = '95%';
  itemWindow.style.height = '800px';
  itemWindow.style.top = '40px';
  itemWindow.style.left = '2.5%';
  itemWindow.style.position = 'fixed';
  itemWindow.style.backgroundColor = '#ececec';

  bufferLayer.style.width = '100%';
  bufferLayer.style.height = '1200px';
  bufferLayer.style.position = 'fixed';
  bufferLayer.style.top = '0';
  bufferLayer.style.left = '0';
  bufferLayer.style.backgroundColor = '#0f94a8';

  itemContent.style.width = '100%';
  itemContent.style.height = '800px';

  let appended = 0;
  appendLayers = () => {
    if (!appended) {
      document.body.appendChild(bufferLayer);
      document.body.appendChild(itemWindow);
      itemWindow.appendChild(urlDisplay);
      itemWindow.appendChild(itemContent);
    }
    appended = 1;
  };

  openItemWindow = () => {
    bufferLayer.style.opacity = 0.5;
    itemWindow.style.opacity = 1;
    itemWindow.style.zIndex = 100;
    bufferLayer.style.zIndex = 50;
  };

  closeItemWindow = () => {
    itemWindow.style.opacity = 0;
    bufferLayer.style.opacity = 0;
    itemWindow.style.zIndex = -100;
    bufferLayer.style.zIndex = -50;
    itemContent.setAttribute('src', '');
  };

  setPreviews = itemPic => {
    itemPic = document.querySelectorAll('.vertical-middle');
    for (let i in itemPic) {
      let linger = 0;

      // Cancel itemContent window if mouse leaves before loading
      itemPic[i].onmouseleave = () => linger = 0;
      itemPic[i].onmouseenter = () => {
        linger = 1;
        setTimeout(() => {
          if (linger) {
            itemContent.src = itemPic[i].parentNode.href;
            urlDisplay.innerHTML = `<a href=${itemContent.src} target='_blank'>${itemContent.src}</a>`;
            appendLayers();

            const urlHref = urlDisplay.querySelector('a');
            const hrefColor = '#0f94a8';
            urlHref.style.color = hrefColor;
            urlHref.style.textDecoration = 'none';

            urlHref.onmouseover = () => urlHref.style.color = '#01505C';
            urlHref.onmouseleave = () => urlHref.style.color = hrefColor;

            openItemWindow();
          }
        }, 1250);
      };
    }
  };
  setPreviews();

  let last_known_scroll_position = 0;
  let scrolling = 0;
  function doSomething(scroll_pos) {}
  window.addEventListener('scroll', e => {
    last_known_scroll_position = window.scrollY;

    if (!scrolling) {
      window.requestAnimationFrame(() => {
        doSomething(last_known_scroll_position);
        scrolling = 0;
      });
      scrolling = 1;
      setPreviews();
    }
  });

  bufferLayer.onclick = () => closeItemWindow();

})();
