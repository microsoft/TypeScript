/// <reference path='fourslash.ts' />

// Github issue #41925

//@Filename: file.tsx
//// function foo() {
//// const bar = "Oh no";
//// 
//// return (
//// <div>"{bar}"</div>
//// )
//// }

format.document();

verify.currentFileContentIs(
`function foo() {
    const bar = "Oh no";

    return (
        <div>"{bar}"</div>
    )
}`);