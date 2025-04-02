/// <reference path="fourslash.ts" />

//// interface A {
////     b: string,
////     c?: number,
//// }
//// const b = ""
//// const a: A = {
////     b
////     /**/
//// }

verify.completions({
    marker: "",
    includes: [{
      name: "c",
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
    name: "c",
    description: `Add missing comma for object member completion 'c'.`,
    source: completion.CompletionSource.ObjectLiteralMemberWithComma,
    newFileContent:
    `interface A {
    b: string,
    c?: number,
}
const b = ""
const a: A = {
    b,
    
}`,
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    },
});
