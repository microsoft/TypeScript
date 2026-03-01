/// <reference path="fourslash.ts" />
// @Filename: a.ts
////interface T {
////     aaa: number;
////     bbb?: number;
////     ccc?: number;
//// }
//// const obj: T = {
////     aaa: 1 * (2 + 3)
////     c/*a*/
//// }

// @Filename: b.ts
////interface T {
////     aaa?: string;
////     foo(): void;
//// }
//// const obj: T = {
////     foo() {
//
////     }
////     aa/*b*/
//// }

// @Filename: c.ts
//// interface ColorPalette {
////   primary?: string;
////   secondary?: string;
//// }
//// interface I {
////  color: ColorPalette;
//// }
//// const a: I = {
////   color: {primary: "red" sec/**/}
//// }

verify.completions({
    marker: "a",
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
  
verify.applyCodeActionFromCompletion("a", {
    name: "bbb",
    description: `Add missing comma for object member completion 'bbb'.`,
    source: completion.CompletionSource.ObjectLiteralMemberWithComma,
    newFileContent:
    `interface T {
     aaa: number;
     bbb?: number;
     ccc?: number;
 }
 const obj: T = {
     aaa: 1 * (2 + 3),
     c
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
      sortText: completion.SortText.OptionalMember,
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
    `interface T {
     aaa?: string;
     foo(): void;
 }
 const obj: T = {
     foo() {
     },
     aa
 }`,
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    },
});

verify.completions({
    marker: "",
    includes: [{
      name: "secondary",
      sortText: completion.SortText.OptionalMember,
      hasAction: true,
      source: completion.CompletionSource.ObjectLiteralMemberWithComma,
     }],
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    }
});
  
verify.applyCodeActionFromCompletion("", {
    name: "secondary",
    description: `Add missing comma for object member completion 'secondary'.`,
    source: completion.CompletionSource.ObjectLiteralMemberWithComma,
    newFileContent:
  `interface ColorPalette {
  primary?: string;
  secondary?: string;
}
interface I {
 color: ColorPalette;
}
const a: I = {
  color: {primary: "red", sec}
}`,
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    },
});
  