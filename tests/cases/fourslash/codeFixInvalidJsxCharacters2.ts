/// <reference path='fourslash.ts' />

// @jsx: react
// @filename: main.tsx

//// let foo = <div>></div>;

verify.codeFix({
    description: ts.Diagnostics.Wrap_invalid_character_in_an_expression_container.message,
    newFileContent: `let foo = <div>{">"}</div>;`,
    index: 0,
});

verify.codeFix({
    description: ts.Diagnostics.Convert_invalid_character_to_its_html_entity_code.message,
    newFileContent: `let foo = <div>&gt;</div>;`,
    index: 1,
});
