const navArray = [
  "/profile",
  "/tracking",
  "/possibility",
  "/topology",
  "/tagging"
];
let thisProps = null;
let currentElement = null;
let currentIndex = null;

export function setCurrentTarget(props, current) {
  thisProps = props;
  currentIndex = navArray.indexOf(props.location.pathname);
  currentElement = current;
}

export function changeLinkUp() {
  pushHistory(-1);
}

export function changeLinkDown() {
  pushHistory(1);
}

export function isChevronUpHidden(pathName) {
  return navArray.indexOf(pathName) === 0;
}

export function isChevronDownHidden(pathName) {
  return navArray.indexOf(pathName) === navArray.length - 1;
}

export function scrollDirectDetection(delta) {
  const distanceOfHeight = currentElement.scrollHeight - window.innerHeight;
  if (distanceOfHeight <= 0) {
    if (delta < 0) return pushHistory(-1);
    if (delta > 0) return pushHistory(1);
  } else {
    if (window.scrollY === 0 && delta < 0) return pushHistory(-1);
    if (Math.ceil(window.scrollY) >= distanceOfHeight && delta > 0)
      return pushHistory(1);
  }
}

function pushHistory(diff) {
  if (diff < 0 && currentIndex === 0) return;
  if (diff > 0 && currentIndex === navArray.length - 1) return;
  thisProps.history.push(navArray[currentIndex + diff]);
}
