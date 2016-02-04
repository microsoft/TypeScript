///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js

//// /**
////  * @param {string} p1 parameter 1
////  * @param {string?} p2 parameter 2
////  * @param {string} [p3] parameter 3
////  * @param {string} [p4="test"] parameter 4
////  */
//// function f1(p1, p2, p3, p4) {
//// }
//// f1(''/*1*/, ''/*2*/, ''/*3*/, ''/*4*/)


for(const m of ['1', '2', '3', '4']) {
	goTo.marker(m);
	verify.currentParameterHelpArgumentDocCommentIs('parameter ' + m);
}
