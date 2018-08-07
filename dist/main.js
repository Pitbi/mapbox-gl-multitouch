'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiTouch = function () {
  function MultiTouch() {
    _classCallCheck(this, MultiTouch);

    this.state = {
      panStart: { x: 0, y: 0 },
      scale: 1
    };
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }

  _createClass(MultiTouch, [{
    key: 'touchStart',
    value: function touchStart(event) {
      if (event.touches.length !== 2) return;
      event.stopImmediatePropagation();
      event.preventDefault();

      var x = 0;
      var y = 0;

      [].forEach.call(event.touches, function (touch) {
        x += touch.screenX;
        y += touch.screenY;
      });

      this.state.panStart.x = x / event.touches.length;
      this.state.panStart.y = y / event.touches.length;
    }
  }, {
    key: 'touchMove',
    value: function touchMove(event) {
      if (event.touches.length !== 2) return;
      if (this.state.scale === event.scale) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }

      this.state.scale = event.scale;

      var x = 0;
      var y = 0;

      [].forEach.call(event.touches, function (touch) {
        x += touch.screenX;
        y += touch.screenY;
      });

      var movex = x / event.touches.length - this.state.panStart.x;
      var movey = y / event.touches.length - this.state.panStart.y;

      this.state.panStart.x = x / event.touches.length;
      this.state.panStart.y = y / event.touches.length;
      this.map.panBy([movex / -1, movey / -1], { animate: false });
    }
  }, {
    key: 'onAdd',
    value: function onAdd(map) {
      this.map = map;
      this.map.getContainer().addEventListener('touchstart', this.touchStart, false);
      this.map.getContainer().addEventListener('touchmove', this.touchMove, false);
      if ('ontouchstart' in document.documentElement) map.dragPan.disable();
    }
  }, {
    key: 'onRemove',
    value: function onRemove() {
      this.map.getContainer().removeEventListener('touchstart', this.touchStart);
      this.map.getContainer().removeEventListener('touchmove', this.touchMove);
      this.map = undefined;
    }
  }]);

  return MultiTouch;
}();

exports.default = MultiTouch;