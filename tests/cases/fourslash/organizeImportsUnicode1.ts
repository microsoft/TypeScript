/// <reference path="fourslash.ts" />

//// import {
////     Ab,
////     _aB,
////     aB,
////     _Ab,
//// } from './foo';
////
//// console.log(_aB, _Ab, aB, Ab);

verify.organizeImports(
`import {
    Ab,
    _Ab,
    _aB,
    aB,
} from './foo';

console.log(_aB, _Ab, aB, Ab);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "ordinal",
});

verify.organizeImports(
`import {
    _aB,
    _Ab,
    aB,
    Ab,
} from './foo';

console.log(_aB, _Ab, aB, Ab);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "unicode",
});
