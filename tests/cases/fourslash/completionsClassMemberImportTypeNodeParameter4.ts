/// <reference path="fourslash.ts" />

// @module: node18

// @FileName: /other/cls.d.ts
//// export declare class Cls {
////   method(
////     param: import("./doesntexist.js").Foo,
////   ): import("./doesntexist.js").Foo;
//// }

// @FileName: /index.d.ts
//// import { Cls } from "./other/cls.js";
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
