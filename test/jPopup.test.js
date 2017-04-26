describe('jPopup', function() {

    var sandbox;

    var dummyPopup,
        dummyContent,
        initSpy,
        buildPopupSpy,
        setupEventsSpy,
        closeSpy;

    before(function() {

        // set test environment 
        sandbox = sinon.sandbox.create();

        dummyContent = '<h1>Title</h1>'

        initSpy = sandbox.spy(jPopup.prototype, 'init');
        buildPopupSpy = sandbox.spy(jPopup.prototype, 'buildPopup');
        setupEventsSpy = sandbox.spy(jPopup.prototype, 'setupEvents');
        closeSpy = sandbox.spy(jPopup.prototype, 'close');

        dummyPopup = new jPopup({

            contentHtml: dummyContent

        });

    });

    after(function() {

        // reset test environment 
        sandbox.restore();

    });

    describe('init', function() {

        it('should add \'.jPopupOpen\' class to html', function() {

            expect($('html').hasClass('jPopupOpen')).equal(true);

        });

        it('should init buildPopup() method', function() {

            expect(initSpy.calledOnce).equal(true);

        });

    });

    describe('buildPopup', function() {

        it('should append popup html template into body', function() {

            expect($('body').find('.jPopup').length).equal(1);

        });

        it('should init setupEvents() method', function() {

            expect(setupEventsSpy.calledOnce).equal(true);

        });

    });

    describe('setupEvents', function() {

        before(function() {

            closeSpy.reset();
            $('.jCloseBtn').click();

        });

        it('should init close() method by clicking on \'.jCloseBtn\' button', function() {

            expect(closeSpy.calledOnce).equal(true);

        });

    });

    describe.skip('close', function() {

        var clock,
            animationEnd;

        before(function() {

            clock = sandbox.useFakeTimers();
            animationEnd = 250;

            dummyPopup.close();

        });

        it('should add \'.jPopupClosed\' class to html', function() {

            expect($('html').hasClass('jPopupClosed')).equal(true);

        });

        it('should remove \'.jPopup\' element when animation is finished', function() {

            clock.tick(animationEnd);

            expect($('body').find('.jPopup').length).equal(0);

        });

        it('should remove \'.jPopupClosed\' and \'.jPopupOpen\' classes from html when animation is finished', function() {

            expect($('html').hasClass('jPopupClosed')).equal(false);
            expect($('html').hasClass('jPopupOpen')).equal(false);

        });

    });

});
