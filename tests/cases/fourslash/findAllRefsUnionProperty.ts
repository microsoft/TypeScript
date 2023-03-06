/// <reference path='fourslash.ts'/>

////type T =
////    | { /*t0*/type: "a", /*p0*/prop: number }
////    | { /*t1*/type: "b", /*p1*/prop: string };
////const tt: T = {
////    /*t2*/type: "a",
////    /*p2*/prop: 0,
////};
////declare const t: T;
////if (t./*t3*/type === "a") {
////    t./*t4*/type;
////} else {
////    t./*t5*/type;
////}

verify.baselineFindAllReferences('t0', 't1', 't3', 't4', 't5', 't2', 'p0', 'p1', 'p2')
