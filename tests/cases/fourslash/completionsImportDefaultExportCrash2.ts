/// <reference path="fourslash.ts" />

// @module: node18
// @allowJs: true

// @Filename: /node_modules/dom7/index.d.ts
//// export interface Dom7Array {
////   length: number;
////   prop(propName: string): any;
//// }
////
//// export interface Dom7 {
////   (): Dom7Array;
////   fn: any;
//// }
////
//// declare const Dom7: Dom7;
////
//// export {
////   Dom7 as $,
//// };

// @Filename: /dom7.js
//// import * as methods from 'dom7';
//// Object.keys(methods).forEach((methodName) => {
////   if (methodName === '$') return;
////   methods.$.fn[methodName] = methods[methodName];
//// });
////
//// export default methods.$;

// @Filename: /swipe-back.js
//// /*1*/

verify.completions({
  marker: "1",
  includes: [{
    name: "$",
    hasAction: true,
    source: 'dom7',
    sortText: completion.SortText.AutoImportSuggestions,
  }, {
    name: "Dom7",
    hasAction: true,
    source: './dom7',
    sortText: completion.SortText.AutoImportSuggestions,
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
  }
});
