/// <reference path="fourslash.ts" />

// @Filename: /mod.ts
//// export const foo = 0;
//// export type Foo = number;

// @Filename: /index0.ts
//// [|import f/*0*/|]

// @Filename: /index1.ts
//// [|import { f/*1*/}|]

// @Filename: /index2.ts
//// [|import * as f/*2*/|]

// @Filename: /index3.ts
//// [|import f/*3*/ from|]

// @Filename: /index4.ts
//// [|import f/*4*/ =|]

// @Filename: /index5.ts
//// [|import f/*5*/ from "";|]

([[0, true], [1, true], [2, false], [3, true], [4, true], [5, true]] as const).forEach(([marker, typeKeywordValid]) => {
  verify.completions({
    isNewIdentifierLocation: true,
    marker: "" + marker,
    exact: [{
      name: "foo",
      source: "./mod",
      insertText: `import { foo$1 } from "./mod";`,
      isSnippet: true,
      replacementSpan: test.ranges()[marker],
      sourceDisplay: "./mod",
    },
    {
      name: "Foo",
      source: "./mod",
      insertText: `import { Foo$1 } from "./mod";`,
      isSnippet: true,
      replacementSpan: test.ranges()[marker],
      sourceDisplay: "./mod",
    },
    ...typeKeywordValid ? [{
      name: "type",
      sortText: completion.SortText.GlobalsOrKeywords,
    }] : []],
    preferences: {
      includeCompletionsForImportStatements: true,
      includeInsertTextCompletions: true,
      includeCompletionsWithSnippetText: true,
    }
  });
});

// @Filename: /index6.ts
//// import f/*6*/ from "nope";

// @Filename: /index7.ts
//// import { f/*7*/, bar }

// @Filename: /index8.ts
//// import foo, { f/*8*/ }

// @Filename: /index9.ts
//// import g/*9*/

// @Filename: /index10.ts
//// import f/*10*/ from "./mod";

// @Filename: /index11.ts
//// import oo/*11*/

// @Filename: /index12.ts
//// import {
////   /*12*/
//// }

[6, 7, 8, 9, 10, 11, 12].forEach(marker => {
  verify.completions({
    isNewIdentifierLocation: true,
    marker: "" + marker,
    exact: [{ name: "type", sortText: completion.SortText.GlobalsOrKeywords }],
    preferences: {
      includeCompletionsForImportStatements: true,
      includeInsertTextCompletions: true,
    }
  });
});

// @Filename: /index13.ts
//// import {} /*13*/

// @Filename: /index14.ts
//// import {} f/*14*/

// @Filename: /index15.ts
//// import * as foo /*15*/

// @Filename: /index16.ts
//// import * as foo f/*16*/

[13, 14, 15, 16].forEach(marker => {
  verify.completions({
    marker: "" + marker,
    exact: {
      name: "from",
      sortText: completion.SortText.GlobalsOrKeywords,
    },
    preferences: {
      includeCompletionsForImportStatements: true,
      includeInsertTextCompletions: true,
    }
  });
});
