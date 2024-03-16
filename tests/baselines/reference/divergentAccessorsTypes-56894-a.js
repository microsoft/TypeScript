//// [tests/cases/compiler/-da/divergentAccessorsTypes-56894-a.ts] ////

//// [divergentAccessorsTypes-56894-a.ts]
declare const id:<T>()=>T

function f2(x: {f:((a:1|2)=>1|2)} | {f:((a:2|3)=>2|3)} ){
    const r = x.f(id())
//                ^ const id: <2>() => 2,
//        ^ const r: 1 | 2 | 3
}

function f3(f: ((a:1|2)=>1|2) | ((a:2|3)=>2|3) ){
    const r = f(id())
//              ^ const id: <2>() => 2,
//        ^ const r: 1 | 2 | 3
}


function f4(x: {set d(a:1|2); get r():1|2} | {set d(a:2|3); get r():2|3} ){
//           ^ (parameter) x: { d: 1 | 2; readonly r: 1 | 2; } | { d: 2 | 3; readonly r: 2 | 3; }
    x.d = id();
//        ^ const id: <1 | 2 | 3>() => 1 | 2 | 3      (5.3.2)
//        ^ const id: <2>() => 2      (expecting, if a setter was treated as a function)
    x.r;
//    ^    (property) r: 1 | 2 | 3
}

//// [divergentAccessorsTypes-56894-a.js]
"use strict";
function f2(x) {
    const r = x.f(id());
    //                ^ const id: <2>() => 2,
    //        ^ const r: 1 | 2 | 3
}
function f3(f) {
    const r = f(id());
    //              ^ const id: <2>() => 2,
    //        ^ const r: 1 | 2 | 3
}
function f4(x) {
    //           ^ (parameter) x: { d: 1 | 2; readonly r: 1 | 2; } | { d: 2 | 3; readonly r: 2 | 3; }
    x.d = id();
    //        ^ const id: <1 | 2 | 3>() => 1 | 2 | 3      (5.3.2)
    //        ^ const id: <2>() => 2      (expecting, if a setter was treated as a function)
    x.r;
    //    ^    (property) r: 1 | 2 | 3
}


//// [divergentAccessorsTypes-56894-a.d.ts]
declare const id: <T>() => T;
declare function f2(x: {
    f: ((a: 1 | 2) => 1 | 2);
} | {
    f: ((a: 2 | 3) => 2 | 3);
}): void;
declare function f3(f: ((a: 1 | 2) => 1 | 2) | ((a: 2 | 3) => 2 | 3)): void;
declare function f4(x: {
    set d(a: 1 | 2);
    get r(): 1 | 2;
} | {
    set d(a: 2 | 3);
    get r(): 2 | 3;
}): void;
