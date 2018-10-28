{
    'use strict';

    const $html = document.querySelector('html');
    let shouldSetHash;
    let hashtagValue;

    function jPopup(params = '') {

        shouldSetHash = (params.shouldSetHash == false) ? false : true;

        if (shouldSetHash == true) {
            hashtagValue = typeof params.hashtagValue !== 'undefined' ? params.hashtagValue : '#popup';
        }

        buildPopup(params.content)
            .then(setupEvents)
            .then((shouldSetHash == true) && setHash(true));

    }

    function buildPopup(content) {

        $html.classList.add('jPopupOpen');

        return Promise.resolve(document.body.insertAdjacentHTML('beforeend',
            `<div class="jPopup">
                <button type="button" class="jCloseBtn">
                    <div class="graphicIcon"></div>
                </button>
                <div class="content">${content}</div>
            </div>`
        ));

    }

    function setHash(on) {

        if (on == true) {

            window.location.hash = hashtagValue;

        } else {

            window.history.back();

        }

    }

    function onEscPress(event) {

        event.keyCode == 27 && jPopup.prototype.close(true);

    }

    function onHashChange() {

        window.location.hash !== hashtagValue && jPopup.prototype.close(false);

    }

    function setupEvents() {

        document.getElementsByClassName('jCloseBtn')[0].addEventListener('click', () => {
            jPopup.prototype.close(true);
        });

        window.addEventListener('keydown', onEscPress);
        (shouldSetHash == true) && window.addEventListener('hashchange', onHashChange);

    }

    jPopup.prototype = {

        close(popupEvent) {

            $html.classList.add('jPopupClosed');

            if (shouldSetHash == true) {

                popupEvent && setHash(false);
                window.removeEventListener('hashchange', onHashChange);

            }

            window.removeEventListener('keydown', onEscPress);

            document.getElementsByClassName('jPopup')[0].addEventListener('animationend', function(e) {

                e.target.parentNode.removeChild(this);

                $html.classList.remove('jPopupClosed');
                $html.classList.remove('jPopupOpen');

            });

        },

        open(params) {

            jPopup(params);

        }

    };

}