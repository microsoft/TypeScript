//// [tests/cases/compiler/reverseMappedTypeLimitedConstraintWithIntersection1.ts] ////

//// [reverseMappedTypeLimitedConstraintWithIntersection1.ts]
type XNumber_ = { x: number }

declare function foo_<T extends XNumber_>(props: {[K in keyof T & keyof XNumber_]: T[K]}): T;

foo_({x: 1, y: 'foo'});

// -----------------------------------------------------------------------------------------

const checkType_ = <T>() => <U extends T>(value: { [K in keyof U & keyof T]: U[K] }) => value;

const checked_ = checkType_<{x: number, y: string}>()({
  x: 1 as number,
  y: "y",
  z: "z",
});


//// [reverseMappedTypeLimitedConstraintWithIntersection1.js]
"use strict";
foo_({ x: 1, y: 'foo' });
// -----------------------------------------------------------------------------------------
var checkType_ = function () { return function (value) { return value; }; };
var checked_ = checkType_()({
    x: 1,
    y: "y",
    z: "z",
});
