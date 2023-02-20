/// <reference path="fourslash.ts" />
// @allowJs: true
// @Filename: jsDocTypedef1.js
//// /**
////  * @typedef {Object} Opts
////  * @property {string} x
////  * @property {string=} y
////  * @property {string} [z]
////  * @property {string} [w="hi"]
////  * 
////  * @param {Opts} opts
////  */
//// function foo(/*1*/opts) {
////     opts.x;
//// }

//// foo({x: 'abc'});

//// /**
////  * @typedef {object} Opts1
////  * @property {string} x
////  * @property {string=} y
////  * @property {string} [z]
////  * @property {string} [w="hi"]
////  * 
////  * @param {Opts1} opts
////  */
//// function foo1(/*2*/opts1) {
////     opts1.x;
//// }
//// foo1({x: 'abc'});

verify.baselineQuickInfo();
