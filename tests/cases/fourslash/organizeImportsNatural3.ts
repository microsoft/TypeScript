/// <reference path="fourslash.ts" />

//// import {
////     B,
////     À,
////     A,
//// } from './foo';
////
//// console.log(A, À, B);

verify.organizeImports(
`import {
    À,
    A,
    B,
} from './foo';

console.log(A, À, B);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "natural",
    organizeImportsAccentCollation: false,
});

verify.organizeImports(
`import {
    A,
    À,
    B,
} from './foo';

console.log(A, À, B);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "natural",
    organizeImportsAccentCollation: true,
});
