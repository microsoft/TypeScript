/// <reference path="fourslash.ts" />

////let count: 'one' | 'two';
////count = `/**/`

verify.completions({ marker: "", exact: ["one", "two"] });
