//// [partialApplication.ts]
const mul = (a: number, b: number) => a * b;

const left = mul(?, 2);
const right = mul(2, ?);
const both = mul(?, ?);

left(3);
right(4);
both(5, 6);

left.length === 1;
left.name === 'left';

const mulSubtract = (a:number, b:number, c:number) => mul(a, b) - c;

const middle = mulSubtract(5, ?, 1);
const sides = mulSubtract(?, 10, ?);

middle(2);
sides(4, 3);


//// [partialApplication.js]
"use strict";
var _mul_1, _mul_2, _mul_3, _mulSubtract_1, _mulSubtract_2;
const mul = (a, b) => a * b;
const left = (_mul_1 = mul, function (_origFuncArg) { return _mul_1(_origFuncArg, 2); });
const right = (_mul_2 = mul, function (_origFuncArg1) { return _mul_2(2, _origFuncArg1); });
const both = (_mul_3 = mul, function (_origFuncArg, _origFuncArg1) { return _mul_3(_origFuncArg, _origFuncArg1); });
left(3);
right(4);
both(5, 6);
left.length === 1;
left.name === 'left';
const mulSubtract = (a, b, c) => mul(a, b) - c;
const middle = (_mulSubtract_1 = mulSubtract, function (_origFuncArg1) { return _mulSubtract_1(5, _origFuncArg1, 1); });
const sides = (_mulSubtract_2 = mulSubtract, function (_origFuncArg, _origFuncArg2) { return _mulSubtract_2(_origFuncArg, 10, _origFuncArg2); });
middle(2);
sides(4, 3);
