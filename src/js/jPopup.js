{
    'use strict';

    const $html = document.querySelector('html');
    let shouldSetHash;

    function jPopup(params = '') {

        shouldSetHash = (params.hash == false) ? false : true;

        buildPopup(params.content)
            .then(setupEvents)
            .then((shouldSetHash == true) && setHash(true));

    }

    function buildPopup(content) {

        $html.classList.add('jPopupOpen');

        return Promise.resolve(document.body.insertAdjacentHTML('beforeend',
            `<div class="jPopup">
                <button type="button" class="jCloseBtn">
                    <svg height="32px" viewBox="0 0 32 32" width="32px" xml:space="preserve"><path d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"/></svg>
                </button>
                <div class="content">${content}</div>
            </div>`
        ));

    }

    function setHash(on) {

        if (on == true) {

            window.location.hash = '#popup';

        } else {

            window.history.back();

        }

    }

    function onEscPress(event) {

        event.keyCode == 27 && jPopup.prototype.close(true);

    }

    function onHashChange() {

        window.location.hash !== '#popup' && jPopup.prototype.close(false);

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

    window.jPopup = jPopup;

}