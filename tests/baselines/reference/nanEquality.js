//// [nanEquality.ts]
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


//// [nanEquality.js]
if (x === NaN) { }
if (NaN === x) { }
if (x == NaN) { }
if (NaN == x) { }
if (x !== NaN) { }
if (NaN !== x) { }
if (x != NaN) { }
if (NaN != x) { }
if (x === ((NaN))) { }
if (((NaN)) === x) { }
if (x !== ((NaN))) { }
if (((NaN)) !== x) { }
if (NaN === NaN) { }
if (NaN !== NaN) { }
if (NaN == NaN) { }
if (NaN != NaN) { }
if (NaN === y[0][1]) { }
