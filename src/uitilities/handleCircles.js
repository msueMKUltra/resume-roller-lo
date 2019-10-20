let targetIndex = null;
let locations = [];
let circlesData = [];
let middlePoints = [];

export function getCirclesLocation() {
  return { targetIndex: targetIndex, locations: locations };
}

export function setCirclesLocation(index) {
  targetIndex = index;
  locations = circlesData
    .filter(circle => !circle.isMiddle)
    .map(circle => {
      return { x: circle.x, y: circle.y };
    });
}

export function setCirclesData(selectedIndex, taggingList) {
  const circles = [];
  const points =
    selectedIndex === null
      ? []
      : taggingList.find((item, index) => {
          if (index === selectedIndex) return item;
        }).points;
  points.forEach((point, index) => {
    circles.push({ ...point, uuid: getUuidv4(), isMiddle: false });
    const i = index + 1 === points.length ? 0 : index + 1;
    const x = (point.x + points[i].x) / 2;
    const y = (point.y + points[i].y) / 2;
    circles.push({ x: x, y: y, uuid: getUuidv4(), isMiddle: true });
  });
  circlesData = circles;
}

export function setMiddlePoints(uuid) {
  const draggingPoint = circlesData.find(d => d.uuid === uuid);
  const index = circlesData.indexOf(draggingPoint);
  const frontIndex = index === 0 ? circlesData.length - 1 : index - 1;
  const backIndex = index === circlesData.length - 1 ? 0 : index + 1;
  middlePoints = [
    {
      x: (circlesData[frontIndex].x + circlesData[index].x) / 2,
      y: (circlesData[frontIndex].y + circlesData[index].y) / 2
    },
    {
      x: (circlesData[backIndex].x + circlesData[index].x) / 2,
      y: (circlesData[backIndex].y + circlesData[index].y) / 2
    }
  ];
}

export function cleanMiddlePoints() {
  middlePoints.length = 0;
}

export function addMiddlePoints(uuid) {
  const draggingPoint = circlesData.find(d => d.uuid === uuid);
  const index = circlesData.indexOf(draggingPoint);
  circlesData.splice(index + 1, 0, {
    ...middlePoints[1],
    uuid: getUuidv4(),
    isMiddle: true
  });
  circlesData.splice(index, 0, {
    ...middlePoints[0],
    uuid: getUuidv4(),
    isMiddle: true
  });
}

export function setAdjacentPoints(uuid) {
  const draggingPoint = circlesData.find(d => d.uuid === uuid);
  const index = circlesData.indexOf(draggingPoint);
  const frontIndex = index === 0 ? circlesData.length - 1 : index - 1;
  const beforeFrontIndex =
    frontIndex === 0 ? circlesData.length - 1 : frontIndex - 1;
  const backIndex = index === circlesData.length - 1 ? 0 : index + 1;
  const afterBackIndex =
    backIndex === circlesData.length - 1 ? 0 : backIndex + 1;
  circlesData[frontIndex].x =
    (circlesData[beforeFrontIndex].x + circlesData[index].x) / 2;
  circlesData[frontIndex].y =
    (circlesData[beforeFrontIndex].y + circlesData[index].y) / 2;
  circlesData[backIndex].x =
    (circlesData[afterBackIndex].x + circlesData[index].x) / 2;
  circlesData[backIndex].y =
    (circlesData[afterBackIndex].y + circlesData[index].y) / 2;
}

export function getCirclesData() {
  return circlesData;
}

export function getMiddlePoints() {
  return middlePoints;
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function getUuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
