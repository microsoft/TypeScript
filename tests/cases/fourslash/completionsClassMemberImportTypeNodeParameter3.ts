/// <reference path="fourslash.ts" />

// @module: node18

// @FileName: /other/foo.d.ts
//// export declare type Bar = { baz: string };

// @FileName: /other/cls.d.ts
//// export declare class Cls {
////   method(
////     param: import("./foo.js").Bar,
////   ): import("./foo.js").Bar;
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
      insertText: `method(param: import("./other/foo.js").Bar): import("./other/foo.js").Bar;`,
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
