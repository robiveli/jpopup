describe('jPopup', function() {

    var dummyPopup,
        dummyContent;

    before(function() {

        dummyContent = '<h1>Title</h1>'

        dummyPopup = new jPopup({ // open() method invoked

            content: dummyContent

        });

    });

    describe('open()', function() {

        it('should open new popup with passed content', function() {

            expect($('html').hasClass('jPopupOpen')).equal(true);
            expect($('.jPopup').length).equal(1);
            expect($('.jPopup .content').html()).equal(dummyContent);

        });

        it('should append new hastag in current url', function() {

            expect(window.location.hash).equal('#popup');

        });

    });

    describe('close()', function() {

        it('should remove popup from DOM', function() {

            var animationTime = 350;

            dummyPopup.close();

            return setTimeout(() => {

                expect($('body').find('.jPopup').length).equal(0);
				expect(window.location.hash).equal('');
				expect($('html').hasClass('jPopupOpen')).equal(false);
				expect($('html').hasClass('jPopupClosed')).equal(false);

            }, animationTime);

        });

    });

});