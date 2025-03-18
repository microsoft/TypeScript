//// [tests/cases/compiler/concatClassAndString.ts] ////

//// [concatClassAndString.ts]
// Shouldn't compile (the long form f = f + ""; doesn't):
class f { }

f += '';


//// [concatClassAndString.js]
class f {
}
f += '';
