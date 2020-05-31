describe('jPopup', function () {

    var dummyPopup,
        dummyContent;

    before(function () {

        dummyContent = '<h1>Title</h1>';

        dummyPopup = new jPopup({
            content: dummyContent
        });
    });

    describe('open()', function () {

        it('should open new popup with passed content', function () {

            dummyPopup.open();

            expect($('html').hasClass('jPopup--isOpen')).equal(true);
            expect($('.jPopup').length).equal(1);
            expect($('.jPopup-content').html()).equal(dummyContent);
        });
    });

    describe('close()', function () {

        it('should remove popup element from DOM', function () {

            dummyPopup.close();

            expect($('html').hasClass('jPopup--isOpen')).equal(false);
        });
    });
});
