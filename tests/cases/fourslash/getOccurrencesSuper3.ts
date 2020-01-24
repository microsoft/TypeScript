/// <reference path='fourslash.ts' />

////let x = {
////    a() {
////        return [|s/**/uper|].b();
////    },
////    b() {
////        return [|super|].a();
////    },
////    c: function () {
////        return [|super|].a();
////    }
////    d: () => [|super|].b();
////}

function checkRange(r: FourSlashInterface.Range, expectedOccurrences: FourSlashInterface.Range[]): void {
    goTo.rangeStart(r);
    if (expectedOccurrences.length) {
        for (const expected of expectedOccurrences) {
            verify.occurrencesAtPositionContains(expected);
        }
    }
    else {
        verify.occurrencesAtPositionCount(0);
    }
}

let [r0, r1, r2, r3] = test.ranges();

checkRange(r0, [r0, r1]);
checkRange(r1, [r0, r1]);
checkRange(r0, [r0, r1]);
checkRange(r2, []);
checkRange(r3, []);