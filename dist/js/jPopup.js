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

'use strict';

{
    var jPopup = function jPopup() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


        shouldSetHash = params.hash == false ? false : true;

        buildPopup(params.content).then(setupEvents).then(shouldSetHash == true && setHash(true));
    };

    var buildPopup = function buildPopup(content) {

        $html.classList.add('jPopupOpen');

        return Promise.resolve(document.body.insertAdjacentHTML('beforeend', '<div class="jPopup">\n                <button type="button" class="jCloseBtn">\n                    <svg height="32px" viewBox="0 0 32 32" width="32px" xml:space="preserve"><path d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"/></svg>\n                </button>\n                <div class="content">' + content + '</div>\n            </div>'));
    };

    var setHash = function setHash(on) {

        if (on == true) {

            window.location.hash = '#popup';
        } else {

            window.history.back();
        }
    };

    var onEscPress = function onEscPress(event) {

        event.keyCode == 27 && jPopup.prototype.close(true);
    };

    var onHashChange = function onHashChange() {

        window.location.hash !== '#popup' && jPopup.prototype.close(false);
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
    var shouldSetHash = void 0;

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

    window.jPopup = jPopup;
}

return jPopup;

}));
