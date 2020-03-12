/// <reference path="fourslash.ts" />

// @module: es6

// @Filename: /console.d.ts
////interface Console {}
////declare var console: Console;
////declare module "console" {
////  export = console;
////}

// @Filename: /react-native.d.ts
//// import 'console';
////declare global {
////  interface Console {}
////  var console: Console;
////}

// @Filename: /a.ts
////conso/**/

verify.completions({
  exact: completion.globalsPlus([{
    hasAction: undefined, // asserts that it does *not* have an action
    name: "console"
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true
  }
});
