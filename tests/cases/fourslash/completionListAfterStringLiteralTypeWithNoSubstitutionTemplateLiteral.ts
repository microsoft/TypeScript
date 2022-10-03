/// <reference path="fourslash.ts" />

////let count: 'one' | 'two';
////count = `[|/**/|]`

const replacementSpan = test.ranges()[0]
verify.completions({ marker: "", exact: [
    { name: "one", replacementSpan },
    { name: "two", replacementSpan }
] });
