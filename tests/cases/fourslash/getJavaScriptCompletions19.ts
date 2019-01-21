/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file.js
//// function fn() {
//// 	if (foo) {
//// 		return 0;
//// 	} else {
//// 		return '0';
//// 	}
//// }
//// let x = fn();
//// if(typeof x === 'string') {
//// 	x/*str*/
//// } else {
//// 	x/*num*/
//// }

goTo.marker('str');
edit.insert('.');
verify.completions({ includes: { name: "substr", kind: "method", kindModifiers: "declare" } });

goTo.marker('num');
edit.insert('.');
verify.completions({ includes: { name: "toFixed", kind: "method", kindModifiers: "declare" } });
