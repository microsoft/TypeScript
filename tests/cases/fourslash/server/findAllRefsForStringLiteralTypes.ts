/// <reference path='../fourslash.ts'/>

// @Filename: /a.ts
////type Options = "[|{| "isInString": true |}option 1|]" | "option 2";
////let myOption: Options = "[|{| "isInString": true |}option 1|]";

const [r0, r1] = test.ranges();
goTo.eachRange(() => {
    verify.getReferencesForServerTest([
        { fileName: "/a.ts", isDefinition: false, isWriteAccess: false, textSpan: toSpan(r0) },
        { fileName: "/a.ts", isDefinition: false, isWriteAccess: false, textSpan: toSpan(r1) },
    ]);
});

function toSpan(r: FourSlashInterface.Range) {
    return { start: r.pos, length: r.end - r.pos };
}
