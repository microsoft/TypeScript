//// [sourceMapValidationDestructuringParametertArrayBindingPattern.ts]
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
var robotA: Robot = [1, "mower", "mowing"];

function foo1([, nameA]: Robot) {
    console.log(nameA);
}

function foo2([numberB]: Robot) {
    console.log(numberB);
}

function foo3([numberA2, nameA2, skillA2]: Robot) {
    console.log(nameA2);
}

function foo4([numberA3, ...robotAInfo]: Robot) {
    console.log(robotAInfo);
}

foo1(robotA);
foo1([2, "trimmer", "trimming"]);

foo2(robotA);
foo2([2, "trimmer", "trimming"]);

foo3(robotA);
foo3([2, "trimmer", "trimming"]);

foo4(robotA);
foo4([2, "trimmer", "trimming"]);

//// [sourceMapValidationDestructuringParametertArrayBindingPattern.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var robotA = [1, "mower", "mowing"];
function foo1(_a) {
    var _b = __read(_a, 2), nameA = _b[1];
    console.log(nameA);
}
function foo2(_a) {
    var _b = __read(_a, 1), numberB = _b[0];
    console.log(numberB);
}
function foo3(_a) {
    var _b = __read(_a, 3), numberA2 = _b[0], nameA2 = _b[1], skillA2 = _b[2];
    console.log(nameA2);
}
function foo4(_a) {
    var _b = __read(_a), numberA3 = _b[0], robotAInfo = _b.slice(1);
    console.log(robotAInfo);
}
foo1(robotA);
foo1([2, "trimmer", "trimming"]);
foo2(robotA);
foo2([2, "trimmer", "trimming"]);
foo3(robotA);
foo3([2, "trimmer", "trimming"]);
foo4(robotA);
foo4([2, "trimmer", "trimming"]);
//# sourceMappingURL=sourceMapValidationDestructuringParametertArrayBindingPattern.js.map