{

    const $html = document.querySelector('html');

    /**
     * @param {Object}
	*/
    function jPopup(params = {}) {
        this.options = Object.assign({
            transition: 'fade'
        }, params);

        this._init();
    }

    jPopup.prototype = {

        _init() {
            this._render(this.options.content)
                ._setupEvents();
        },

        _render() {
            document.body.insertAdjacentHTML('beforeend',
                `<div class="jPopup jPopup--${this.options.transition}"><button type="button" class="jPopup-closeBtn"></button><div class="jPopup-content">${this.options.content}</div></div>`
            );

            this.$el = $html.querySelector('.jPopup');
            this.$closeBtn = $html.querySelector('.jPopup-closeBtn');

            return this;
        },

        _setupEvents() {
            this.$closeBtn.addEventListener('click', () => this.close());
            window.addEventListener('keydown', (e) => this._onEscPress(e));
        },

        /**
         * @param {Object}
        */
        _onEscPress(event) {

            if (event.keyCode == 27) {
                this.close();
            }
        },

        close() {
            $html.classList.remove('jPopup--isOpen');

            if (this.options.onClose && typeof this.options.onClose == 'function') {
                this.options.onClose(this.$el);
            }
        },

        open() {

            if (this.options.onOpen && typeof this.options.onOpen == 'function') {
                this.options.onOpen(this.$el);
            }

            $html.classList.add('jPopup--isOpen');
        },

        /**
         * @param {String}
        */
        setContent(content) {
            this.options.content = content;

            this.$el.querySelector('.jPopup-content').innerHTML = this.options.content;
        },

        /**
         * @return {String}
        */
        getContent() {
            return this.options.content;
        },

        destroy() {
            window.removeEventListener('keydown', this._onEscPress);
            this.$closeBtn.removeEventListener('click', this.close);
            this.$el.parentNode.removeChild(this.$el);
        }
    };
}
