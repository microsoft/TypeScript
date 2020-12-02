/// <reference path='fourslash.ts' />

//// type A = 'foo' | 'bar' | 'baz';
//// type B<T extends A> = {};
//// type C = B<'foo' | '[|/**/|]'>

const replacementSpan = test.ranges()[0]
verify.completions({ marker: "", exact: [
    { name: "bar", replacementSpan },
    { name: "baz", replacementSpan }
] });
edit.insert("b");
replacementSpan.end++

verify.completions({ exact: [
    { name: "bar", replacementSpan },
    { name: "baz", replacementSpan }
] });
edit.insert("ar");
replacementSpan.end += 2

verify.completions({ exact: [
    { name: "bar", replacementSpan },
    { name: "baz", replacementSpan }
] });
