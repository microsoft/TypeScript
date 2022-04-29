function f1(x: number): string { return "foo"; }

function f2(x: number): number { return 10; }

function f3(x: number): boolean { return true; }

enum E1 { one }

enum E2 { two }


var t1: [(x: number) => string, (x: number) => number];
var t2: [E1, E2];
var t3: [number, any];
var t4: [E1, E2, number];

// no error
t1 = [f1, f2];
t2 = [E1.one, E2.two];
t3 = [5, undefined];
t4 = [E1.one, E2.two, 20];
var e1 = t1[2];  // {}
var e2 = t2[2];  // {}
var e3 = t3[2];  // any
var e4 = t4[3];  // number