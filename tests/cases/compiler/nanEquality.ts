declare const x: number;

if (x === NaN) {}
if (NaN === x) {}

if (x == NaN) {}
if (NaN == x) {}

if (x !== NaN) {}
if (NaN !== x) {}

if (x != NaN) {}
if (NaN != x) {}

if (x === ((NaN))) {}
if (((NaN)) === x) {}

if (x !== ((NaN))) {}
if (((NaN)) !== x) {}

if (NaN === NaN) {}
if (NaN !== NaN) {}

if (NaN == NaN) {}
if (NaN != NaN) {}

// ...
declare let y: any;
if (NaN === y[0][1]) {}

function t1(value: number, NaN: number) {
    return value === NaN; // ok
}

function t2(value: number, NaN: number) {
    return NaN == value; // ok
}

function t3(NaN: number) {
    return NaN === NaN; // ok
}
