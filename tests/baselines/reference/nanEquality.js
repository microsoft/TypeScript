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
