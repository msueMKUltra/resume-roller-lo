const mouse = {
  x: null,
  y: null
};

export function getMouseCoordinate() {
  if (mouse.x === null && mouse.y === null) return null;
  return mouse;
}

export function setMouseCoordinate(x, y) {
  mouse.x = x;
  mouse.y = y;
}

export function cleanMouseCoordinate() {
  mouse.x = null;
  mouse.y = null;
}
