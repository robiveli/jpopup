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
  var jPopup = function jPopup() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    shouldSetHash = params.shouldSetHash == false ? false : true;

    if (shouldSetHash == true) {
      hashtagValue = typeof params.hashtagValue !== 'undefined' ? params.hashtagValue : '#popup';
    }

    buildPopup(params.content).then(setupEvents).then(shouldSetHash == true && setHash(true));
  };

  var buildPopup = function buildPopup(content) {
    $html.classList.add('jPopupOpen');
    return Promise.resolve(document.body.insertAdjacentHTML('beforeend', "<div class=\"jPopup\">\n                <button type=\"button\" class=\"jCloseBtn\">\n                    <div class=\"graphicIcon\"></div>\n                </button>\n                <div class=\"content\">".concat(content, "</div>\n            </div>")));
  };

  var setHash = function setHash(on) {
    if (on == true) {
      window.location.hash = hashtagValue;
    } else {
      window.history.back();
    }
  };

  var onEscPress = function onEscPress(event) {
    event.keyCode == 27 && jPopup.prototype.close(true);
  };

  var onHashChange = function onHashChange() {
    window.location.hash !== hashtagValue && jPopup.prototype.close(false);
  };

  var setupEvents = function setupEvents() {
    document.getElementsByClassName('jCloseBtn')[0].addEventListener('click', function () {
      jPopup.prototype.close(true);
    });
    window.addEventListener('keydown', onEscPress);
    shouldSetHash == true && window.addEventListener('hashchange', onHashChange);
  };

  'use strict';

  var $html = document.querySelector('html');
  var shouldSetHash;
  var hashtagValue;
  jPopup.prototype = {
    close: function close(popupEvent) {
      $html.classList.add('jPopupClosed');

      if (shouldSetHash == true) {
        popupEvent && setHash(false);
        window.removeEventListener('hashchange', onHashChange);
      }

      window.removeEventListener('keydown', onEscPress);
      document.getElementsByClassName('jPopup')[0].addEventListener('animationend', function (e) {
        e.target.parentNode.removeChild(this);
        $html.classList.remove('jPopupClosed');
        $html.classList.remove('jPopupOpen');
      });
    },
    open: function open(params) {
      jPopup(params);
    }
  };
}

return jPopup;

}));
