///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: myJavascript.js
//// define('myMod', function() {
//// 	let x = { n: 3, s: 'foo', b: true };
//// 	return /*2*/x;
//// });
//// 
//// define('m2', ['myMod'], function(/*3*/mm) {
//// 	mm/*1*/
//// });

goTo.marker('1');
edit.insert('.');
verify.completionListContains("n", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("s", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("b", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
