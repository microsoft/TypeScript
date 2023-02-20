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
    includes: [
        {
            name: "secondary",
            sortText: completion.SortText.OptionalMember,
            hasAction: true,
        }],
    preferences: {
        allowIncompleteCompletions: true,
        includeInsertTextCompletions: true,
      },
});

verify.applyCodeActionFromCompletion("", {
    name: "secondary",
    description: `Includes imports of types referenced by 'secondary'`,
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
