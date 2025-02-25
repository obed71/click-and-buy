const welcomeEl = document.querySelector('.welcome-txt');
const sectionImagesEl = document.querySelector('section.images');

setInterval(() => {
  const computedTransform = window.getComputedStyle(sectionImagesEl).transform;

  if (computedTransform === 'none') return;

  const transformValue = formatTransformValue(computedTransform);
  const translateX = Number(transformValue[4]);

  sectionImagesEl.style.transform = `translateX(${
    translateX === 0 ? -100 : 0
  }%)`;
}, 60e3);

function formatTransformValue(value) {
  return value.replace(/[^0-9-.,]/g, '').split(',');
}
