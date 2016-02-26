/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    [|doStuff|](): void;   // r0
////    [|propName|]: string;  // r1
//// }
////
//// var v: interface1;
//// v.[|doStuff|]();  // r2
//// v.[|propName|];   // r3

function verifyReferences(query: FourSlashInterface.Range, references: FourSlashInterface.Range[]) {
    goTo.position(query.start);
    for (const ref of references) {
        verify.referencesAtPositionContains(ref);
    }
}

const ranges = test.ranges();
verify.assertHasRanges(ranges);
const [r0, r1, r2, r3] = ranges;
verifyReferences(r0, [r0, r2]);
verifyReferences(r1, [r1, r3]);
verifyReferences(r2, [r0, r2]);
verifyReferences(r3, [r1, r3]);