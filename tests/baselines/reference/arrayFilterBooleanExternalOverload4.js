//// [tests/cases/compiler/arrayFilterBooleanExternalOverload4.ts] ////

//// [arrayFilterBooleanExternalOverload4.ts]
// #56013

interface F2<T extends number,U extends number> {
    (p1:(t:1)=>T,p2:(u:1)=>U):11;
    (p1:(t:1)=>T,p2:(u:U)=>U):19;
    (p1:(t:T)=>T,p2:(u:1)=>U):91;
    (p1:(t:T)=>T,p2:(u:U)=>U):99;
}
type ID = <I>() => (i:I) => I;

declare const id: ID;


const t11 = (0 as any as F2<1,1>)(id(),id());
const t12 = (0 as any as F2<1,2>)(id(),id());
const t21 = (0 as any as F2<2,1>)(id(),id());
const t22 = (0 as any as F2<2,2>)(id(),id());

t11 satisfies 11;
t12 satisfies 19;
t21 satisfies 91;
t22 satisfies 99;



//// [arrayFilterBooleanExternalOverload4.js]
"use strict";
// #56013
const t11 = 0(id(), id());
const t12 = 0(id(), id());
const t21 = 0(id(), id());
const t22 = 0(id(), id());
t11;
t12;
t21;
t22;


//// [arrayFilterBooleanExternalOverload4.d.ts]
interface F2<T extends number, U extends number> {
    (p1: (t: 1) => T, p2: (u: 1) => U): 11;
    (p1: (t: 1) => T, p2: (u: U) => U): 19;
    (p1: (t: T) => T, p2: (u: 1) => U): 91;
    (p1: (t: T) => T, p2: (u: U) => U): 99;
}
type ID = <I>() => (i: I) => I;
declare const id: ID;
declare const t11: 11;
declare const t12: 19;
declare const t21: 91;
declare const t22: 99;
