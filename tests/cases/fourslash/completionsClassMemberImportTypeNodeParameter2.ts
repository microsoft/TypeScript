/// <reference path="fourslash.ts" />

// @module: node18

// @FileName: /index.d.ts
//// export declare class Cls {
////   method(
////     param: import("./doesntexist.js").Foo,
////   ): import("./doesntexist.js").Foo;
//// }
////
//// export declare class Derived extends Cls {
////   /*1*/
//// }

verify.completions({
  marker: "1",
  includes: [
    {
      name: "method",
      insertText: `method(param: import("./doesntexist.js").Foo);`,
      filterText: "method",
      hasAction: undefined,
    },
  ],
  preferences: {
    includeCompletionsWithClassMemberSnippets: true,
    includeCompletionsWithInsertText: true,
  },
  isNewIdentifierLocation: true,
});
