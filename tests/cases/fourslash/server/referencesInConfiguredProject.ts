/// <reference path="../fourslash.ts"/>

// Global class reference.

// @Filename: /referencesForGlobals_1.ts
////class [|globalClass|] {
////    public f() { }
////}

// @Filename: /referencesForGlobals_2.ts
////var c = [|globalClass|]();

// @Filename: /tsconfig.json
////{ "files": ["referencesForGlobals_1.ts", "referencesForGlobals_2.ts"] }

const [r0, r1] = test.ranges();
goTo.rangeStart(r1);
verify.getReferencesForServerTest([
    { fileName: "/referencesForGlobals_1.ts", isDefinition: true, isWriteAccess: true, textSpan: toSpan(r0) },
    { fileName: "/referencesForGlobals_2.ts", isDefinition: false, isWriteAccess: false, textSpan: toSpan(r1) },
]);

function toSpan(r: FourSlashInterface.Range) {
    return { start: r.pos, length: r.end - r.pos };
}
