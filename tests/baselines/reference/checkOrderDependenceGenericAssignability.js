//// [checkOrderDependenceGenericAssignability.ts]
// Repro from #44572 with interface types

interface Parent1<A> {
    child: Child1<A>;
    parent: Parent1<A>;
}

interface Child1<A, B = unknown> extends Parent1<A> {
    readonly a: A;
    readonly b: B;
}

function fn1<A>(inp: Child1<A>) {
    const a: Child1<unknown> = inp;
}

declare let pu1: Parent1<unknown>;
declare let ps1: Parent1<string>;

pu1 = ps1;  // Ok
ps1 = pu1;  // Error expected

// Repro from #44572 with aliased object types

type Parent2<A> = {
    child: Child2<A>;
    parent: Parent2<A>;
}

type Child2<A, B = unknown> = {
    child: Child2<A>;
    parent: Parent2<A>;
    readonly a: A;
    readonly b: B;
}

function fn2<A>(inp: Child2<A>) {
    const a: Child2<unknown> = inp;
}

declare let pu2: Parent2<unknown>;
declare let ps2: Parent2<string>;

pu2 = ps2;  // Ok
ps2 = pu2;  // Error expected

// Simpler repro for same issue

interface Parent3<A> {
    child: Child3<A[]>;
    parent: Parent3<A>;
}

interface Child3<A> extends Parent3<A> {
    readonly a: A;
}

declare let cu3: Child3<unknown>;
declare let cs3: Child3<string>;

cu3 = cs3;  // Ok
cs3 = cu3;  // Error expected

declare let pu3: Parent3<unknown>;
declare let ps3: Parent3<string>;

pu3 = ps3;  // Ok
ps3 = pu3;  // Error expected


//// [checkOrderDependenceGenericAssignability.js]
"use strict";
// Repro from #44572 with interface types
function fn1(inp) {
    var a = inp;
}
pu1 = ps1; // Ok
ps1 = pu1; // Error expected
function fn2(inp) {
    var a = inp;
}
pu2 = ps2; // Ok
ps2 = pu2; // Error expected
cu3 = cs3; // Ok
cs3 = cu3; // Error expected
pu3 = ps3; // Ok
ps3 = pu3; // Error expected
