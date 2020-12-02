/// <reference path='fourslash.ts'/>

// @allowJs: true

// @Filename: a.js
//// import foo from 'unfound';
//// export {
////   foo,
//// };

// @Filename: b.js
//// export {
////    /**/foo
//// } from './a';

goTo.marker();
verify.baselineRename("", { });
