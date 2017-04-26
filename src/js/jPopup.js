{ 
    'use strict';

    var $html;

    let jPopup = function(content = '') {

        this.content = content.contentHtml;
        $html = document.querySelector('html');

        this.init();

    };

    function removeClass(element, cssClass) {

        var reg = new RegExp('(^| )' + cssClass + '($| )','g');

        element.className = element.className.replace(reg,' ');

    }

    jPopup.prototype = {

        init() {

            $html.className += ' jPopupOpen';

            this.buildPopup();

        },

        buildPopup() {

            document.body.insertAdjacentHTML('beforeend',
                '<div class="jPopup">\
                    <button type="button" class="jCloseBtn">\
                        <svg height="32px" viewBox="0 0 32 32" width="32px" xml:space="preserve"><path d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"/></svg>\
                    </button>\
                    <div class="content">' + this.content + '</div>\
                </div>'
            );

            this.setupEvents();

        },

        setupEvents() {

            document.getElementsByClassName('jCloseBtn')[0].addEventListener('click', this.close.bind(this));

        },

        close() {

            $html.className += ' jPopupClosed';

            document.getElementsByClassName('jPopup')[0].addEventListener('animationend', function(e) {

                e.target.parentNode.removeChild(this);

                removeClass($html, 'jPopupOpen jPopupClosed');

            });

        }

    };

    window.jPopup = jPopup;
    window.jPopup.close = jPopup.prototype.close;

}
