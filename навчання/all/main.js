const ITEM_COUNT = 25;
const DIAMETER = 1000;
const PROJECTION = DIAMETER / 2;
const ANIM_DUR = 240000;
const STAGE_SELECTOR = '.stage'
const OUTER_SELECTOR = '.vortext'
const INNER_SELECTOR = '.vortextRibbon'

const els = document.querySelectorAll(OUTER_SELECTOR);
const stageEl = document.querySelector(STAGE_SELECTOR);

const getAngle = (adjacentLen, oppositeLen) => {
    const hypotenuse = Math.hypot(adjacentLen, oppositeLen);
    return Math.asin(oppositeLen / hypotenuse) * 180 / Math.PI;
}

const setStyles = () => {
    stageEl.style.width = `${DIAMETER}px`;
    stageEl.style.perspective = `${(DIAMETER / 2) * 1.5}px`;
    for (let i = 0; i < els.length; i++) {
        els[i].querySelector(INNER_SELECTOR).style.transform = `translateZ(-${PROJECTION}px) rotateY(0deg)`;
    }
}

const getLetterMarkup = (letter) => `<div class="letterWrap"><div class="letter"><span>${letter}</span></div></div>`

const render = () => {
    for (let i = 0; i < els.length; i++) {
        const el = els[i].querySelector(INNER_SELECTOR);
        const bounds = el.getBoundingClientRect();
        const str = el.innerText.replace(/ /g, '\u00a0'); // replace spaces with thin spaces
        const strLen = str.split('').length;
        let newHtmlStr = str.split('').map(s => getLetterMarkup(s)).join('');
        el.innerHTML = newHtmlStr;
        let proportionInc = 0;
        let proportion = 0;
        let offset = 0;
        let contentWidth = 0;
        let delta = 0;

        // Get the content width vs the bounds width
        for (let child of el.children) {
            contentWidth += child.children[0].getBoundingClientRect().width;
        }
        delta = bounds.width - contentWidth;

        for (let ii = 0; ii < el.children.length; ii++) {
            const correction = 3.1;
            const paddingMultiplier = 1.75;

            const prevProportion = proportion;
            const childEl = el.children[ii].children[0];
            const childBounds = childEl.getBoundingClientRect();

            const grandChildEl = childEl.children[0];
            const grandChildBounds = grandChildEl.getBoundingClientRect();

            const padding = delta / strLen * paddingMultiplier;
            const boundsWidth = grandChildBounds.width + correction + padding;

            const halfAngle = getAngle(PROJECTION,  boundsWidth / 2)

            proportionInc += halfAngle;
            childEl.style.transform = `rotateY(${(proportionInc - 90)}deg)`;

            grandChildEl.style.transform = `translateZ(${PROJECTION}px)`;
            proportionInc += halfAngle;

        }
    }

}

let iteration = 0;

const animate = () => {
    iteration++
    for (let i = 0; i < els.length; i++) {
        const inner = els[i].querySelector(INNER_SELECTOR);
        const rotate = Number.isInteger(i / 2) ? -360 * iteration : 360 * iteration;
        inner.classList.add('transitionEnabled');
        inner.style.transform = `translateZ(-${PROJECTION}px) rotateY(${rotate}deg)`;
    }
    setTimeout(animate, ANIM_DUR)
}

setStyles();
render();
setTimeout(animate);