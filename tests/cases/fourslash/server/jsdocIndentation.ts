/// <reference path="../fourslash.ts"/>

// @Filename: a.js
//// /**
////  *            @param {string} foo Documentation
////  *            None of these lines will be indented
////  */
//// function test(foo) {
////     fo/*1*/o
//// }

verify.completions(
  {
    marker: "1",
    includes: {
      name: "foo",
      text: "(parameter) foo: string",
      documentation: "Documentation\nNone of these lines will be indented",
      tags: [
        {
          name: "param",
          text: "foo Documentation\nNone of these lines will be indented",
        }
      ],
    }
  },
);

// @Filename: b.js
//// /**
////  *            @param {string} foo Documentation
////  * This indentation
////  *    will be lost
////  *       because it appears
////  *    before the `@param` tag
////  */
//// function test(foo) {
////     fo/*2*/o
//// }

verify.completions(
  {
    marker: "2",
    includes: {
      name: "foo",
      text: "(parameter) foo: string",
      documentation: "Documentation\nThis indentation\nwill be lost\nbecause it appears\nbefore the `@param` tag",
      tags: [
        {
          name: "param",
          text: "foo Documentation\nThis indentation\nwill be lost\nbecause it appears\nbefore the `@param` tag",
        }
      ],
    }
  },
);
