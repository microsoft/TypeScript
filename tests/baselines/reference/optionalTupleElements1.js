//// [optionalTupleElements1.ts]
type T1 = [number, string, boolean];
type T2 = [number, string, boolean?];
type T3 = [number, string?, boolean?];
type T4 = [number?, string?, boolean?];

type L1 = T1["length"];
type L2 = T2["length"];
type L3 = T3["length"];
type L4 = T4["length"];

function f1(t1: T1, t2: T2, t3: T3, t4: T4) {
    t1 = t1;
    t1 = t2;  // Error
    t1 = t3;  // Error
    t1 = t4;  // Error
    t2 = t1;
    t2 = t2;
    t2 = t3;  // Error
    t2 = t4;  // Error
    t3 = t1;
    t3 = t2;
    t3 = t3;
    t3 = t4;  // Error
    t4 = t1;
    t4 = t2;
    t4 = t3;
    t4 = t4;
}

type T5 = [number, string?, boolean];
type L5 = T5["length"];

function f2(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) {
    t1 = t5;  // Error
    t2 = t5;  // Error
    t3 = t5;
    t4 = t5;
    t5 = t5;
    t5 = t1;
    t5 = t2;  // Error
    t5 = t3;  // Error
    t5 = t4;  // Error
    t5 = t5;
}

let t2: T2;
let t3: T3;
let t4: T4;
let t5: T5;

t2 = [42, "hello"];
t3 = [42, "hello"];
t3 = [42,,true]
t3 = [42];
t4 = [42, "hello"];
t4 = [42,,true];
t4 = [,"hello", true];
t4 = [,,true];
t4 = [];
t5 = [42,,true];


//// [optionalTupleElements1.js]
"use strict";
function f1(t1, t2, t3, t4) {
    t1 = t1;
    t1 = t2; // Error
    t1 = t3; // Error
    t1 = t4; // Error
    t2 = t1;
    t2 = t2;
    t2 = t3; // Error
    t2 = t4; // Error
    t3 = t1;
    t3 = t2;
    t3 = t3;
    t3 = t4; // Error
    t4 = t1;
    t4 = t2;
    t4 = t3;
    t4 = t4;
}
function f2(t1, t2, t3, t4, t5) {
    t1 = t5; // Error
    t2 = t5; // Error
    t3 = t5;
    t4 = t5;
    t5 = t5;
    t5 = t1;
    t5 = t2; // Error
    t5 = t3; // Error
    t5 = t4; // Error
    t5 = t5;
}
var t2;
var t3;
var t4;
var t5;
t2 = [42, "hello"];
t3 = [42, "hello"];
t3 = [42, , true];
t3 = [42];
t4 = [42, "hello"];
t4 = [42, , true];
t4 = [, "hello", true];
t4 = [, , true];
t4 = [];
t5 = [42, , true];


//// [optionalTupleElements1.d.ts]
declare type T1 = [number, string, boolean];
declare type T2 = [number, string, boolean?];
declare type T3 = [number, string?, boolean?];
declare type T4 = [number?, string?, boolean?];
declare type L1 = T1["length"];
declare type L2 = T2["length"];
declare type L3 = T3["length"];
declare type L4 = T4["length"];
declare function f1(t1: T1, t2: T2, t3: T3, t4: T4): void;
declare type T5 = [number, string?, boolean];
declare type L5 = T5["length"];
declare function f2(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): void;
declare let t2: T2;
declare let t3: T3;
declare let t4: T4;
declare let t5: T5;
