//// [tests/cases/compiler/arraySpliceParamDescription.ts] ////

//// [arraySpliceParamDescription.ts]
// @target es5

export function isEmptyArr(l: { length: number }) {
    return l.length === 0   
}

var arrA : string[]
arrA = ["a", "b", "c", "d", "e", "f", "g"]

// deleteCount param: undefined | NaN | 0 | -int; no elements removed
var undefSplice1 = arrA.splice(2, undefined) // OK
var charSplice1 = arrA.splice(2, "a") // expect error
var naNSplice1 = arrA.splice(2, NaN) // OK
var zeroSplice1 = arrA.splice(2, 0)  // OK
var negSplice1 = arrA.splice(2, -2) // OK and expect arrA = ["a", "b", "c", "d", "e", "f", "g"]

// deleteCount param omitted; All elements after start param are removed
var omitSplice1 = arrA.splice(2,) // OK expect arrA = ["a", "b"]

// testing the splice arrays are empty
isEmptyArr(undefSplice1) // OK and true
isEmptyArr(charSplice1) // OK and true
isEmptyArr(naNSplice1) // OK and true
isEmptyArr(zeroSplice1) // OK and true
isEmptyArr(negSplice1) // OK and true
isEmptyArr(omitSplice1) // OK and false. length of removed elements is 5

var arrB : string[]
arrB = ["a", "b", "c", "d", "e", "f", "g"]

var undefSplice2 = arrB.splice(2, undefined, "h", "i") // expect error and arrB = ["a", "b", "h", "i", "e", "f", "g"]
var omitSplice2 = arrB.splice(2, , "j", "k") // expect error and arrB = ["a", "b", "j", "k", "e", "f", "g"]
var naNSplice2 = arrB.splice(2, NaN, "l", "m") // OK and arrB = ["a", "b", "l", "m", "e", "f", "g"]
var charSplice2 = arrB.splice(2, "a", "n", "o") // expect error and arrB = ["a", "b", "n", "o", "e", "f", "g"]
var zeroSplice2 = arrB.splice(2, 0, "p", "q") // OK and arrB = ["a", "b", "p", "q", "e", "f", "g"]
var negSplice2 = arrB.splice(2, -2, "r", "s") // OK and arrB = ["a", "b", "r", "s", "e", "f", "g"]

isEmptyArr(undefSplice2) // OK and true
isEmptyArr(omitSplice2) // OK and true
isEmptyArr(naNSplice2) // OK and true
isEmptyArr(charSplice2) // OK and true
isEmptyArr(zeroSplice2) // OK and true
isEmptyArr(negSplice2) // OK and true

//// [arraySpliceParamDescription.js]
"use strict";
// @target es5
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyArr = isEmptyArr;
function isEmptyArr(l) {
    return l.length === 0;
}
var arrA;
arrA = ["a", "b", "c", "d", "e", "f", "g"];
// deleteCount param: undefined | NaN | 0 | -int; no elements removed
var undefSplice1 = arrA.splice(2, undefined); // OK
var charSplice1 = arrA.splice(2, "a"); // expect error
var naNSplice1 = arrA.splice(2, NaN); // OK
var zeroSplice1 = arrA.splice(2, 0); // OK
var negSplice1 = arrA.splice(2, -2); // OK and expect arrA = ["a", "b", "c", "d", "e", "f", "g"]
// deleteCount param omitted; All elements after start param are removed
var omitSplice1 = arrA.splice(2); // OK expect arrA = ["a", "b"]
// testing the splice arrays are empty
isEmptyArr(undefSplice1); // OK and true
isEmptyArr(charSplice1); // OK and true
isEmptyArr(naNSplice1); // OK and true
isEmptyArr(zeroSplice1); // OK and true
isEmptyArr(negSplice1); // OK and true
isEmptyArr(omitSplice1); // OK and false. length of removed elements is 5
var arrB;
arrB = ["a", "b", "c", "d", "e", "f", "g"];
var undefSplice2 = arrB.splice(2, undefined, "h", "i"); // expect error and arrB = ["a", "b", "h", "i", "e", "f", "g"]
var omitSplice2 = arrB.splice(2, "j", "k"); // expect error and arrB = ["a", "b", "j", "k", "e", "f", "g"]
var naNSplice2 = arrB.splice(2, NaN, "l", "m"); // OK and arrB = ["a", "b", "l", "m", "e", "f", "g"]
var charSplice2 = arrB.splice(2, "a", "n", "o"); // expect error and arrB = ["a", "b", "n", "o", "e", "f", "g"]
var zeroSplice2 = arrB.splice(2, 0, "p", "q"); // OK and arrB = ["a", "b", "p", "q", "e", "f", "g"]
var negSplice2 = arrB.splice(2, -2, "r", "s"); // OK and arrB = ["a", "b", "r", "s", "e", "f", "g"]
isEmptyArr(undefSplice2); // OK and true
isEmptyArr(omitSplice2); // OK and true
isEmptyArr(naNSplice2); // OK and true
isEmptyArr(charSplice2); // OK and true
isEmptyArr(zeroSplice2); // OK and true
isEmptyArr(negSplice2); // OK and true
