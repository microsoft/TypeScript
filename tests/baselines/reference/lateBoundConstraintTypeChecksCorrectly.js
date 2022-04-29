//// [lateBoundConstraintTypeChecksCorrectly.ts]
declare const fooProp: unique symbol;
declare const barProp: unique symbol;

type BothProps = typeof fooProp | typeof barProp;

export interface Foo<T> {
  [fooProp]: T;
  [barProp]: string;
}

function f<T extends Foo<number>>(x: T) {
    const abc = x[fooProp]; // expected: 'T[typeof fooProp]'

    /**
     * Expected: no error
     */
    const def: T[typeof fooProp] = x[fooProp];
    const def2: T[typeof barProp] = x[barProp];
}


//// [lateBoundConstraintTypeChecksCorrectly.js]
"use strict";
exports.__esModule = true;
function f(x) {
    var abc = x[fooProp]; // expected: 'T[typeof fooProp]'
    /**
     * Expected: no error
     */
    var def = x[fooProp];
    var def2 = x[barProp];
}
