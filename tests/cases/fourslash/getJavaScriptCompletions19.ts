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
verify.completionListContains('substr', undefined, undefined, 'method');

goTo.marker('num');
edit.insert('.');
verify.completionListContains('toFixed', undefined, undefined, 'method');
