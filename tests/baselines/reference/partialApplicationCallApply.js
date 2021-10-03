//// [partialApplicationCallApply.ts]
const addC = (a, b) => a + b;

const addOne = addC~(1, ?);

[1, 2, 3].map(addOne).forEach(console.log);
// prints:
// 2 0 2,3,4
// 3 1 2,3,4
// 4 2 2,3,4

[1, 2, 3].map(addOne).forEach(console.log~(?));
// prints:
// 2
// 3
// 4

const f = (a, b, c) => [a, b, c];

const fI = f~(?, 1, ?);

const g = f~(?, 1, ?).apply~(null, ?);

console.log(g([4, 5, 6]));
// prints:
// 4,1,5

function whoAmI() {
    console.log(`I'm ${this.name}`);
}

const w = whoAmI.call~(?);
w({ name: "Alice" }); // prints: I'm Alice
w({ name: "Bob" }); // prints: I'm Bob

var m = 5 & ~(1 | 4);
var a = ~(1 | 4);
var b = ~(1);


//// [partialApplicationCallApply.js]
var _addC_1, _receiver_1, _log_1, _f_1, _receiver_2, _apply_1, _this, _f_2, _receiver_3, _call_1;
var addC = function (a, b) { return a + b; };
var addOne = (_addC_1 = addC, function addC(_origFuncArg1) { return _addC_1(1, _origFuncArg1); });
[1, 2, 3].map(addOne).forEach(console.log);
// prints:
// 2 0 2,3,4
// 3 1 2,3,4
// 4 2 2,3,4
[1, 2, 3].map(addOne).forEach((_receiver_1 = console, _log_1 = _receiver_1.log, function log(data) { return _log_1.call(_receiver_1, data); }));
// prints:
// 2
// 3
// 4
var f = function (a, b, c) { return [a, b, c]; };
var fI = (_f_1 = f, function f(_origFuncArg, _origFuncArg2) { return _f_1(_origFuncArg, 1, _origFuncArg2); });
var g = (_receiver_2 = (_f_2 = f, function f(_origFuncArg, _origFuncArg2) { return _f_2(_origFuncArg, 1, _origFuncArg2); }), _apply_1 = _receiver_2.apply, _this = null, function apply(thisArg) { return _apply_1.call(_receiver_2, _this, thisArg); });
console.log(g([4, 5, 6]));
// prints:
// 4,1,5
function whoAmI() {
    console.log("I'm " + this.name);
}
var w = (_receiver_3 = whoAmI, _call_1 = _receiver_3.call, function call(_this) { return _call_1.call(_receiver_3, _this); });
w({ name: "Alice" }); // prints: I'm Alice
w({ name: "Bob" }); // prints: I'm Bob
var m = 5 & ~(1 | 4);
var a = ~(1 | 4);
var b = ~(1);
