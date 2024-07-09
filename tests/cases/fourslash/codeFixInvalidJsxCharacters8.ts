/// <reference path='fourslash.ts' />

// @jsx: react
// @filename: main.tsx

////let a = <div>>{"foo"}</div>;
////let b = <div>>{"foo"}</div>;
////let c = <div>>{"foo"}</div>;

verify.codeFixAll({
    fixId: "fixInvalidJsxCharacters_expression",
    fixAllDescription: ts.Diagnostics.Wrap_all_invalid_characters_in_an_expression_container.message,
    newFileContent:
`let a = <div>{">"}{"foo"}</div>;
let b = <div>{">"}{"foo"}</div>;
let c = <div>{">"}{"foo"}</div>;`
});
