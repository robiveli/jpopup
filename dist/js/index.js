(function (root, factory) {
  if (root === undefined && window !== undefined) root = window;
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (root['jPopup'] = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['jPopup'] = factory();
  }
}(this, function () {

"use strict";

{
  /**
   * @param {Object}
  */
  var jPopup = function jPopup() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.options = Object.assign({
      transition: 'fade'
    }, params);
    this._init();
  };
  var $html;
  jPopup.prototype = {
    _init: function _init() {
      this._render(this.options.content)._setupEvents();
    },
    _render: function _render() {
      $html = document.querySelector('html');
      document.body.insertAdjacentHTML('beforeend', "<div class=\"jPopup jPopup--".concat(this.options.transition, "\"><button type=\"button\" class=\"jPopup-closeBtn\"></button><div class=\"jPopup-content\">").concat(this.options.content, "</div></div>"));
      this.$el = $html.querySelector('.jPopup');
      this.$closeBtn = $html.querySelector('.jPopup-closeBtn');
      return this;
    },
    _setupEvents: function _setupEvents() {
      var _this = this;
      this.$closeBtn.addEventListener('click', function () {
        return _this.close();
      });
      window.addEventListener('keydown', function (e) {
        return _this._onEscPress(e);
      });
    },
    /**
     * @param {Object}
    */
    _onEscPress: function _onEscPress(event) {
      if (event.keyCode == 27) {
        this.close();
      }
    },
    close: function close() {
      $html.classList.remove('jPopup--isOpen');
      if (this.options.onClose && typeof this.options.onClose == 'function') {
        this.options.onClose(this.$el);
      }
    },
    open: function open() {
      if (this.options.onOpen && typeof this.options.onOpen == 'function') {
        this.options.onOpen(this.$el);
      }
      $html.classList.add('jPopup--isOpen');
    },
    /**
     * @param {String}
    */
    setContent: function setContent(content) {
      this.options.content = content;
      this.$el.querySelector('.jPopup-content').innerHTML = this.options.content;
    },
    /**
     * @return {String}
    */
    getContent: function getContent() {
      return this.options.content;
    },
    destroy: function destroy() {
      window.removeEventListener('keydown', this._onEscPress);
      this.$el.parentNode.removeChild(this.$el);
    }
  };
}

return jPopup;

}));
