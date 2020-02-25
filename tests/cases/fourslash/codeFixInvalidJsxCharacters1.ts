/// <reference path='fourslash.ts' />

// @jsx: react
// @filename: main.tsx

//// let x1 = <div>}</div>;

verify.codeFix({
    description: "Wrap invalid character in an expression container",
    newFileContent:
`let x1 = <div>{'}'}</div>;`,
    index: 0,
});
verify.codeFix({
    description: "Convert invalid character to its html entity code",
    newFileContent:
`let x1 = <div>&rbrace;</div>;`,
    index: 1,
});
