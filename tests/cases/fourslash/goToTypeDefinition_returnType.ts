/// <reference path='fourslash.ts' />

////interface /*I*/I { x: number; }
////
////function f0(): I { return { x: 0 }; }
////
////type T = /*T*/(i: I) => I;
////const f1: T = i => ({ x: i.x + 1 });
////
////const f2 = (i: I): I => ({ x: i.x + 1 });
////
/////*f0*/f0();
/////*f1*/f1();
/////*f2*/f2();

verify.goToType({
    f0: "I",
    f1: "T",
    f2: "I",
});
