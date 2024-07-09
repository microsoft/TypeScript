/// <reference path='fourslash.ts' />

////interface /*I*/I { x: number; }
////interface /*J*/J { y: number; }
////
////function f0(): I { return { x: 0 }; }
////
////type T = /*T*/(i: I) => I;
////const f1: T = i => ({ x: i.x + 1 });
////
////const f2 = (i: I): I => ({ x: i.x + 1 });
////
////const f3 = (i: I) => (/*f3Def*/{ x: i.x + 1 });
////
////const f4 = (i: I) => i;
////
////const f5 = /*f5Def*/(i: I): I | J => ({ x: i.x + 1 });
////
////const f6 = (i: I, j: J, b: boolean) => b ? i : j;
////
////const /*f7Def*/f7 = (i: I) => {};
////
////function f8(i: I): I;
////function f8(j: J): J;
////function /*f8Def*/f8(ij: any): any { return ij; }
////
/////*f0*/f0();
/////*f1*/f1();
/////*f2*/f2();
/////*f3*/f3();
/////*f4*/f4();
/////*f5*/f5();
/////*f6*/f6();
/////*f7*/f7();
/////*f8*/f8();

verify.baselineGoToType(
    "f0",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8"
);
