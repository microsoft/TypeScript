/// <reference path="fourslash.ts" />

//// import {
////     a2,
////     a100,
////     a1,
//// } from './foo';
////
//// console.log(a1, a2, a100);

verify.organizeImports(
`import {
    a1,
    a100,
    a2,
} from './foo';

console.log(a1, a2, a100);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "unicode",
    organizeImportsNumericCollation: false,
});

verify.organizeImports(
`import {
    a1,
    a2,
    a100,
} from './foo';

console.log(a1, a2, a100);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "unicode",
    organizeImportsNumericCollation: true,
});
