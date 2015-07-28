///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: myJavascript.js
//// define('myMod', function() {
//// 	let x = { n: 3, s: 'foo', b: true };
//// 	return x;
//// });
//// 
//// require(['myMod'], function(mm) {
//// 	mm/**/
//// });

goTo.marker();
edit.insert('.');
verify.completionListContains("n", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("s", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("b", /*displayText:*/ undefined, /*documentation*/ undefined, "property");

