/// <reference path="fourslash.ts" />
////interface T {
////     aaa?: string;
////     foo(): void;
//// }
//// const obj: T = {
////     foo() {
//        
////     }
////     /**/
//// }

verify.completions({
    marker: "",
    includes: [{
      name: "aaa",
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
    name: "aaa",
    description: `Add missing comma for object member completion 'aaa'.`,
    source: completion.CompletionSource.ObjectLiteralMemberWithComma,
    newFileContent:
    `interface T {
     aaa?: string;
     foo(): void;
 }
 const obj: T = {
     foo() {
     },
     
 }`,
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    },
  });
