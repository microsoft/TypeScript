/// <reference path='fourslash.ts'/>
// @allowJs: true

// @Filename: mod.js
//// function foo() { return {a: "hello, world"}; }
//// module.exports = foo();

// @Filename: mod2.js
//// var x = {name: 'test'};
//// (function createExport(obj){
////     module.exports = {
////         "default": x,
////         "sausages": {eggs: 2}
////     };
//// })();

// @Filename: app.js
//// import {a} from "./mod"
//// import def, {sausages} from "./mod2"
//// a./**/

goTo.marker();
verify.completionListContains('toString');

edit.backspace(2);
edit.insert("def.");
verify.completionListContains("name");

edit.insert("name;\nsausages.");
verify.completionListContains("eggs");
edit.insert("eggs;");
verify.noErrors();
