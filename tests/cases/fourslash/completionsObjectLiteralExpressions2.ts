/// <reference path="fourslash.ts" />
//// interface ColorPalette {
////     primary?: string;
////     secondary?: string;
//// }

//// interface I {
////     color: ColorPalette;
////  }
 
//// const a: I = {
////   color: {primary: "red", /**/}
//// }

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
` interface ColorPalette {
       primary?: string;
       secondary?: string;
   }
  
   interface I {
       color: ColorPalette;
    }
   
   const a: I = {
     color: {primary: "red", /**/}
   }`,
  preferences: {
    allowIncompleteCompletions: true,
    includeInsertTextCompletions: true,
  },
});
