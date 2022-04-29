/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file.js
//// /**
////  * This is a very cool function that is very nice.
////  * @returns something
////  * @param p anotherthing
////  */
//// function a1(p) {
//// 	try {
//// 		throw new Error('x');
//// 	} catch (x) { x--; }
//// 	return 23;
//// }
//// 
//// x - /**/a1()

verify.quickInfoAt("", "function a1(p: any): number",
                   "This is a very cool function that is very nice.");
