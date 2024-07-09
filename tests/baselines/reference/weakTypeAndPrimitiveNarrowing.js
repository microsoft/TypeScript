//// [tests/cases/compiler/weakTypeAndPrimitiveNarrowing.ts] ////

//// [weakTypeAndPrimitiveNarrowing.ts]
type LiteralsAndWeakTypes = 
  | 'A'
  | 'B'
  | { optional?: true }
  | { toLowerCase?(): string }
  | { toUpperCase?(): string, otherOptionalProp?: number };

const g = (arg: LiteralsAndWeakTypes) => {
    if (arg === 'A') {
      arg;
    } else {
      arg;
    }
}

type PrimitivesAndWeakTypes =
  | string
  | number
  | { optional?: true }
  | { toLowerCase?(): string }
  | { toUpperCase?(): string, otherOptionalProp?: number };

const h = (arg: PrimitivesAndWeakTypes) => {
    if (arg === 'A') {
      arg;
    } else {
      arg;
    }
}


//// [weakTypeAndPrimitiveNarrowing.js]
"use strict";
var g = function (arg) {
    if (arg === 'A') {
        arg;
    }
    else {
        arg;
    }
};
var h = function (arg) {
    if (arg === 'A') {
        arg;
    }
    else {
        arg;
    }
};
