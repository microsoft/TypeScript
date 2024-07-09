/// <reference path='fourslash.ts' />

// @jsx: react
// @filename: main.tsx

//// let foo = <div>></div>;

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Wrap_invalid_character_in_an_expression_container.message,
    newFileContent: `let foo = <div>{">"}</div>;`,
    preferences: { quotePreference: "double" }
});
