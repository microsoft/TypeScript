/// <reference path='fourslash.ts' />

// Tests that the spelling fix is returned first.

////class C {
////    foof: number;
////    method() {
////        this.foo = 10;
////    }
////}

verify.codeFixAvailable([
    { description: "Change spelling to 'foof'" },
    { description: "Declare property \'foo\'" },
    { description: "Add index signature for property 'foo'" },
]);
