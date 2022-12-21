///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js

//// var someObject = {
////     /**
////      * @param {string} param1 Some string param.
////      * @param {number} parm2  Some number param.
////      */
////     someMethod: function(param1, param2) {
////         console.log(param1/*1*/);
////         return false;
////     },
////     /**
////      * @param {number} p1  Some number param.
////      */
////     otherMethod(p1) {
////         p1/*2*/
////     }
////
//// };

goTo.marker('1');
edit.insert('.');
verify.completions({ includes: { name: "substring", kind: "method", kindModifiers: "declare" } });
edit.backspace();

goTo.marker('2');
edit.insert('.');
verify.completions({ includes: { name: "toFixed", kind: "method", kindModifiers: "declare" } });
edit.backspace();
