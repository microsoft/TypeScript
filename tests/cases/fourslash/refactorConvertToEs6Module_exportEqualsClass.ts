/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////const b = require("./b");
////module.exports = class C {
////	m() {
////		b.x;
////	}
////};

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`import { x } from "./b";
export default class C {
	m() {
		x;
	}
};`,
});
