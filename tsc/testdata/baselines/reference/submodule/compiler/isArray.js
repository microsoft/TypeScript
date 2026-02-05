//// [tests/cases/compiler/isArray.ts] ////

//// [isArray.ts]
var maybeArray: number | number[];


if (Array.isArray(maybeArray)) {
    maybeArray.length; // OK
}
else {
    maybeArray.toFixed(); // OK
}

//// [isArray.js]
"use strict";
var maybeArray;
if (Array.isArray(maybeArray)) {
    maybeArray.length; // OK
}
else {
    maybeArray.toFixed(); // OK
}
