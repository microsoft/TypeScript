//// [tests/cases/compiler/concatClassAndString.ts] ////

//// [concatClassAndString.ts]
// Shouldn't compile (the long form f = f + ""; doesn't):
class f { }

f += '';


//// [concatClassAndString.js]
"use strict";
// Shouldn't compile (the long form f = f + ""; doesn't):
class f {
}
f += '';
