/// <reference path='fourslash.ts' />

////var o1 = {
////    "__proto__": 10
////};
////var o2 = {
////    __proto__: 10
////};
////o1./*1*/
////o2./*2*/

verify.completions({ marker: "1", exact: { name: "__proto__", text: '(property) "__proto__": number' } });
edit.insert("__proto__ = 10;");

verify.quickInfoAt("1", '(property) "__proto__": number');

verify.completions({ marker: "2", exact: { name: "__proto__", text: "(property) __proto__: number" } });
edit.insert("__proto__ = 10;");

verify.quickInfoAt("2", "(property) __proto__: number");
