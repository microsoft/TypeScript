/// <reference path='fourslash.ts'/>

//// class C extends D {
////     [|prop0|]: string;  // r0
////     [|prop1|]: number;  // r1
//// }
////
//// class D extends C {
////     [|prop0|]: string;  // r2
//// }
////
//// var d: D;
//// d.[|prop0|];  // r3
//// d.[|prop1|];  // r4

function verifyReferences(query: FourSlashInterface.Range, references: FourSlashInterface.Range[]) {
    goTo.position(query.start);
    for (const ref of references) {
        verify.referencesAtPositionContains(ref);
    }
}

const ranges = test.ranges();
verify.assertHasRanges(ranges);
const [r0, r1, r2, r3, r4] = ranges;
verifyReferences(r0, [r0]);
verifyReferences(r1, [r1]);
verifyReferences(r2, [r2, r3]);
verifyReferences(r3, [r2, r3]);
verifyReferences(r4, []);
