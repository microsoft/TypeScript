//// [partialApplicationCapture.ts]
let x = 1;
const add = (a: number, b: number) => a + b;
const add1 = add(x, ?);

x = 2;

add1(2) === 3;

let mutAdd = (a: number, b: number) => a + b;
const mutAdd2 = mutAdd(2, ?);

mutAdd2(5) === 7;

mutAdd = (a: number, b: number) => a - b;

mutAdd2(7) === 9;
mutAdd(2, 7) === -5;


//// [partialApplicationCapture.js]
var _origFuncArg_1, _add_1, _mutAdd_1;
var x = 1;
var add = function (a, b) { return a + b; };
var add1 = (_add_1 = add, _origFuncArg_1 = x, function add(_origFuncArg1) { return _add_1(_origFuncArg_1, _origFuncArg1); });
x = 2;
add1(2) === 3;
var mutAdd = function (a, b) { return a + b; };
var mutAdd2 = (_mutAdd_1 = mutAdd, function mutAdd(_origFuncArg1) { return _mutAdd_1(2, _origFuncArg1); });
mutAdd2(5) === 7;
mutAdd = function (a, b) { return a - b; };
mutAdd2(7) === 9;
mutAdd(2, 7) === -5;
