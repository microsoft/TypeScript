/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////     [|doStuff|]() { }     // r0
////     [|propName|]: string; // r1
//// }
//// interface interface1 extends interface1 {
////     [|doStuff|](): void;   // r2
////     [|propName|]: string;  // r3
//// }
//// class class2 extends class1 implements interface1 {
////     [|doStuff|]() { }      // r4
////     [|propName|]: string;  // r5
//// }
//// 
//// var v: class2;
//// v.[|propName|];   // r6
//// v.[|doStuff|]();  // r7

function verifyReferences(query: FourSlashInterface.Range, references: FourSlashInterface.Range[]) {
    goTo.position(query.start);
    for (const ref of references) {
        verify.referencesAtPositionContains(ref);
    }
}

const ranges = test.ranges();
verify.assertHasRanges(ranges);
const [r0, r1, r2, r3, r4, r5, r6, r7] = ranges;
verifyReferences(r0, [r0]);
verifyReferences(r1, [r1, r5, r6]);
verifyReferences(r2, [r2, r4, r7]);
verifyReferences(r3, [r3, r5, r6]);
verifyReferences(r4, [r2, r4, r7]);
verifyReferences(r5, [r1, r3, r5, r6]);
verifyReferences(r6, [r1, r3, r5, r6]);
verifyReferences(r7, [r2, r4, r7]);