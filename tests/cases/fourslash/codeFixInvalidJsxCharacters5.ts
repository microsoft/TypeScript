/// <reference path='fourslash.ts' />

// @jsx: react
// @filename: main.tsx

//// let x5 = <div>}{"foo"}</div>;

verify.codeFix({
    description: "Wrap invalid character in an expression container",
    newFileContent:
`let x5 = <div>{'}'}{"foo"}</div>;`,
    index: 0,
});
verify.codeFix({
    description: "Convert invalid character to its html entity code",
    newFileContent:
`let x5 = <div>&rbrace;{"foo"}</div>;`,
    index: 1,
});
