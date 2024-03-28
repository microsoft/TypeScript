/// <reference path="fourslash.ts" />
//// interface TTTT {
////     aaa: string,
////     bbb?: number
//// }
//// const uuu: TTTT = {
////     get aaa() {
////         return ""
////     }
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
    `interface TTTT {
    aaa: string,
    bbb?: number
}
const uuu: TTTT = {
    get aaa() {
        return ""
    },
    
}`,
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    },
  });
  