/// <reference path='fourslash.ts' />

// Github issue #55293

//@Filename: file.tsx
//// function foo() {
//// const a = <ns: foobar   x : test1   x :test2="string"  x:test3={true?1:0}  />;
////
//// return a;
//// }

format.document();

verify.currentFileContentIs(
`function foo() {
    const a = <ns:foobar x:test1 x:test2="string" x:test3={true ? 1 : 0} />;

    return a;
}`);
