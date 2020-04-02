/// <reference path='fourslash.ts' />

// @jsx: react
// @filename: main.tsx

////let a = <div>>{"foo"}</div>;
////let b = <div>>{"foo"}</div>;
////let c = <div>>{"foo"}</div>;

verify.codeFixAll({
    fixId: "fixInvalidJsxCharacters_htmlEntity",
    fixAllDescription: ts.Diagnostics.Convert_all_invalid_characters_to_HTML_entity_code.message,
    newFileContent:
`let a = <div>&gt;{"foo"}</div>;
let b = <div>&gt;{"foo"}</div>;
let c = <div>&gt;{"foo"}</div>;`
});
