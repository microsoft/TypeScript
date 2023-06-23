

/// <reference path="fourslash.ts" />

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
////     /**/
//// }

verify.completions({
    marker: "",
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
  
verify.applyCodeActionFromCompletion("", {
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
