'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var state = {
  mapbox: null,
  panStart: { x: 0, y: 0 },
  scale: 1
};

var touchStart = function touchStart(event) {
  if (event.touches.length !== 2) return;
  event.stopImmediatePropagation();
  event.preventDefault();

  var x = 0;
  var y = 0;

  [].forEach.call(event.touches, function (touch) {
    x += touch.screenX;
    y += touch.screenY;
  });

  state.panStart.x = x / event.touches.length;
  state.panStart.y = y / event.touches.length;
};

var touchMove = function touchMove(event) {
  if (event.touches.length !== 2) return;
  if (state.scale === event.scale) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  state.scale = event.scale;

  var x = 0;
  var y = 0;

  [].forEach.call(event.touches, function (touch) {
    x += touch.screenX;
    y += touch.screenY;
  });

  var movex = x / event.touches.length - state.panStart.x;
  var movey = y / event.touches.length - state.panStart.y;

  state.panStart.x = x / event.touches.length;
  state.panStart.y = y / event.touches.length;
  state.mapbox.panBy([movex / -1, movey / -1], { animate: false });
};

exports.default = function (mapbox) {
  state.mapbox = mapbox;
  state.mapbox.getContainer().addEventListener('touchstart', touchStart, false);
  state.mapbox.getContainer().addEventListener('touchmove', touchMove, false);
  if ('ontouchstart' in document.documentElement) state.mapbox.dragPan.disable();
};