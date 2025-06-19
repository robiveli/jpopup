describe("jPopup", () => {
	const openClass = "jPopup--isOpen";

	var dummyPopup, dummyContent;

	before(() => {
		dummyContent = "<h1>Title</h1>";
		dummyPopup = new jPopup({
			content: dummyContent,
		});
	});

	describe("open()", () => {
		it("should open new popup with passed content", () => {
			dummyPopup.open();

			expect(
				document.querySelector("html").classList.contains(openClass)
			).equal(true);
			expect(document.querySelectorAll(".jPopup").length).equal(1);
			expect(document.querySelector(".jPopup-content").innerHTML).equal(
				dummyContent
			);
		});
	});

	describe("close()", () => {
		it("should remove popup element from DOM", () => {
			dummyPopup.close();

			expect(
				document.querySelector("html").classList.contains(openClass)
			).equal(false);
		});
	});
});
