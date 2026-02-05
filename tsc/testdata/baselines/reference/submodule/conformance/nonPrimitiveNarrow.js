//// [tests/cases/conformance/types/nonPrimitive/nonPrimitiveNarrow.ts] ////

//// [nonPrimitiveNarrow.ts]
class Narrow {
    narrowed!: boolean
}

declare var a: object;

if (a instanceof Narrow) {
    a.narrowed; // ok
    a = 123; // error
}

if (typeof a === 'number') {
    a.toFixed(); // error, never
}

declare var b: object | null;

if (typeof b === 'object') {
   b.toString(); // ok, object | null
} else {
   b.toString(); // error, never
}


//// [nonPrimitiveNarrow.js]
"use strict";
class Narrow {
    narrowed;
}
if (a instanceof Narrow) {
    a.narrowed; // ok
    a = 123; // error
}
if (typeof a === 'number') {
    a.toFixed(); // error, never
}
if (typeof b === 'object') {
    b.toString(); // ok, object | null
}
else {
    b.toString(); // error, never
}
