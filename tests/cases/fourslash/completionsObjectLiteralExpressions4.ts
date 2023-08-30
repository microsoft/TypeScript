/// <reference path="fourslash.ts" />
////interface T {
////     aaa: number;
////     bbb?: number;
//// }
//// const obj: T = {
////     aaa: 1 * (2 + 3)
////     /**/
//// }

verify.completions({
    marker: "",
    includes: [{
      name: "bbb",
      sortText: completion.SortText.OptionalMember,
      hasAction: true,
      source: completion.CompletionSource.ObjectLiteralMemberWithComma,
    }],
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    },
});
  
verify.applyCodeActionFromCompletion("", {
    name: "bbb",
    description: `Add missing comma for object member completion 'bbb'.`,
    source: completion.CompletionSource.ObjectLiteralMemberWithComma,
    newFileContent:
    `interface T {
     aaa: number;
     bbb?: number;
 }
 const obj: T = {
     aaa: 1 * (2 + 3),
     
 }`,
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    },
});
