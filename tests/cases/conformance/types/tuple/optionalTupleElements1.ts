// @strict: true
// @declaration: true

type T1 = [number, string, boolean];
type T2 = [number, string, boolean?];
type T3 = [number, string?, boolean?];
type T4 = [number?, string?, boolean?];

type L1 = T1["length"];
type L2 = T2["length"];
type L3 = T3["length"];
type L4 = T4["length"];

type T5 = [number, string?, boolean];  // Error

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

let t2: T2;
let t3: T3;
let t4: T4;

t2 = [42, "hello"];
t3 = [42, "hello"];
t3 = [42,,true]
t3 = [42];
t4 = [42, "hello"];
t4 = [42,,true];
t4 = [,"hello", true];
t4 = [,,true];
t4 = [];
