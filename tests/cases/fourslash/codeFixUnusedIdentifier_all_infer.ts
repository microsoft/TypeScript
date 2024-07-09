/// <reference path='fourslash.ts' />

////type Length<T> = T extends ArrayLike<infer U> ? number : never;
////type Indexer<T> = T extends ArrayLike<infer U> ? number : never;
////function f(p) {} // Ignored

verify.codeFixAll({
    fixId: "unusedIdentifier_infer",
    fixAllDescription: "Replace all unused 'infer' with 'unknown'",
    newFileContent:
`type Length<T> = T extends ArrayLike<unknown> ? number : never;
type Indexer<T> = T extends ArrayLike<unknown> ? number : never;
function f(p) {} // Ignored`,
});
