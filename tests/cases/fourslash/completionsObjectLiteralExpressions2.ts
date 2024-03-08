/// <reference path="fourslash.ts" />
//// interface ColorPalette {
////   primary?: string;
////   secondary?: string;
//// }

//// interface I {
////  color: ColorPalette;
//// }

//// const a: I = {
////   color: {primary: "red" /**/}
//// }

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
  color: {primary: "red", }
}`,
  preferences: {
    allowIncompleteCompletions: true,
    includeInsertTextCompletions: true,
  },
});
