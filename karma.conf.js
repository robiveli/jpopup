process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function (config) {
	"use strict";

	config.set({
		port: 9876,
		autoWatch: false,
		singleRun: true,
		browsers: ["ChromeHeadless"],
		frameworks: ["mocha", "chai", "sinon"],
		reporters: ["mocha", "coverage"],
		files: ["https://code.jquery.com/jquery-2.2.4.min.js"],
		preprocessors: {
			"**/src/js/*.js": "coverage",
			"src/js/*.js": ["babel"],
			"test/*.js": ["babel"],
		},
		babelPreprocessor: {
			options: {
				presets: ["@babel/preset-env"],
				sourceMap: "inline",
			},
		},
		coverageReporter: {
			type: "html",
			dir: "coverage/",
			subdir: "report",
			reporters: [{ type: "html" }, { type: "text-summary" }],
			includeAllSources: true,
			watermarks: {
				statements: [50, 90],
				functions: [50, 90],
				branches: [50, 90],
				lines: [50, 90],
			},
		},
	});
};
