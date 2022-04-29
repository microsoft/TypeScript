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

verify.completions({ marker: "", includes: "toString" });

edit.backspace(2);
edit.insert("def.");
verify.completions({ includes: "name" });

edit.insert("name;\nsausages.");
verify.completions({ includes: "eggs" });
edit.insert("eggs;");
verify.noErrors();
