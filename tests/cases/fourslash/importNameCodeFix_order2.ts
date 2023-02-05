/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const _aB: number;
////export const _Ab: number;
////export const aB: number;
////export const Ab: number;

// @Filename: /b.ts
////[|import {
////    _aB,
////    _Ab,
////    Ab,
////} from "./a";
////aB;|]

// @Filename: /c.ts
////[|import {
////    _aB,
////    _Ab,
////    Ab,
////} from "./a";
////aB;|]

// the import in 'b.ts' isn't sorted per ordinal comparison, so the import is added to the end of the list
goTo.file("/b.ts");
verify.importFixAtPosition([
`import {
    _aB,
    _Ab,
    Ab,
    aB,
} from "./a";
aB;`,
], undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "ordinal"
});

// the import in 'c.ts' *is* sorted per natural collation, so the import is added before `Ab`
goTo.file("/c.ts");
verify.importFixAtPosition([
`import {
    _aB,
    _Ab,
    aB,
    Ab,
} from "./a";
aB;`,
], undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "unicode"
});
