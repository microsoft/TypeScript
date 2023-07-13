

/// <reference path="fourslash.ts" />

// @Filename: a.ts
//// interface I {
////   aaa: number,
////   bbb: number,
//// }
////
//// interface U {
////   a: number,
////   b: {
////       c: {
////           d: {
////               aaa: number,
////           }
////       }
////
////   },
//// }
//// const num: U = {} as any;
////
//// const l: I = {
////   ...num.b.c.d
////   /*a*/
//// }

// @Filename: b.ts
//// interface pp {
////     aaa: string;
////     bbb: number;
//// }
////
//// const abc: pp = {
////     aaa: "",
////     bbb: 1,
//// }
////
//// const cab: pp = {
////     ...abc
////     /*b*/
//// }

verify.completions({
    marker: "a",
    includes: [{
      name: "bbb",
      sortText: completion.SortText.LocationPriority,
      hasAction: true,
      source: completion.CompletionSource.ObjectLiteralMemberWithComma,
    }],
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    },
});
  
verify.applyCodeActionFromCompletion("a", {
    name: "bbb",
    description: `Add missing comma for object member completion 'bbb'.`,
    source: completion.CompletionSource.ObjectLiteralMemberWithComma,
    newFileContent:
    `interface I {
  aaa: number,
  bbb: number,
}

interface U {
  a: number,
  b: {
      c: {
          d: {
              aaa: number,
          }
      }

  },
}
const num: U = {} as any;

const l: I = {
  ...num.b.c.d,
  
}`,
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    },
});

verify.completions({
  marker: "b",
  includes: [{
    name: "aaa",
    sortText: completion.SortText.MemberDeclaredBySpreadAssignment,
    hasAction: true,
    source: completion.CompletionSource.ObjectLiteralMemberWithComma,
  }],
  preferences: {
    allowIncompleteCompletions: true,
    includeInsertTextCompletions: true,
  },
});

verify.applyCodeActionFromCompletion("b", {
  name: "aaa",
  description: `Add missing comma for object member completion 'aaa'.`,
  source: completion.CompletionSource.ObjectLiteralMemberWithComma,
  newFileContent:
  `interface pp {
    aaa: string;
    bbb: number;
}

const abc: pp = {
    aaa: "",
    bbb: 1,
}

const cab: pp = {
    ...abc,
    
}`,
  preferences: {
    allowIncompleteCompletions: true,
    includeInsertTextCompletions: true,
  },
});