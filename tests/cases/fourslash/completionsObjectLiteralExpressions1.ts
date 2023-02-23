/// <reference path="fourslash.ts" />
//// interface ColorPalette {
////     primary?: string;
////     secondary?: string;
//// }

//// let colors: ColorPalette = {
////     primary: "red"
////     /**/
//// };

verify.completions({
  marker: "",
  includes: [{
    name: "secondary",
    sortText: completion.SortText.OptionalMember,
    hasAction: true,
    source: completion.CompletionSource.ObjectLiteralExpression,
  }],
  preferences: {
    allowIncompleteCompletions: true,
    includeInsertTextCompletions: true,
  },
});

verify.applyCodeActionFromCompletion("", {
  name: "secondary",
  description: `Add missing comma for an object member completion 'secondary'.`,
  source: completion.CompletionSource.ObjectLiteralExpression,
  newFileContent:
  `interface ColorPalette {
    primary?: string;
    secondary?: string;
}
let colors: ColorPalette = {
    primary: "red",
    
};`,
  preferences: {
    allowIncompleteCompletions: true,
    includeInsertTextCompletions: true,
  },
});
