/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file.js
//// /**
////  * This is a very cool function that is very nice.
////  * @returns something
////  */
//// function a1() {
//// 	try {
//// 		throw new Error('x');
//// 	} catch (x) { x--; }
//// 	return 23;
//// }
//// 
//// x - /**/a1()

goTo.marker();
verify.quickInfoExists();