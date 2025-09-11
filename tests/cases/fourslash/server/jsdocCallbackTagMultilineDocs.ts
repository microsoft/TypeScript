/// <reference path="../fourslash.ts"/>

// @Filename: a.js
//// /**
////  * @callback MyHandler Documentation
////  * with multiple lines
////  *     and indentation
////  * 	and some more indentation
////  * @param {string} x Documentation
////  * with multiple lines
////  *     and indentation
////  * 	and some more indentation
////  */
//// /** @type {MyHa/*1*/ndler} */
//// var foo;
//// foo(/*2*/);


verify.completions(
  {
    marker: "1",
    includes: {
      name: "MyHandler",
      text: "type MyHandler = (x: string) => any",
      documentation: "Documentation\nwith multiple lines\n    and indentation\n	and some more indentation",
      tags: [],
    }
  },
);
