//// [sourceMapValidationDestructuringParametertArrayBindingPatternDefaultValues.ts]
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
var robotA: Robot = [1, "mower", "mowing"];

function foo1([, nameA = "noName"]: Robot = [-1, "name", "skill"]) {
    console.log(nameA);
}

function foo2([numberB = -1]: Robot = [-1, "name", "skill"]) {
    console.log(numberB);
}

function foo3([numberA2 = -1, nameA2 = "name", skillA2 = "skill"]: Robot = [-1, "name", "skill"]) {
    console.log(nameA2);
}

function foo4([numberA3 = -1, ...robotAInfo]: Robot = [-1, "name", "skill"]) {
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

//// [sourceMapValidationDestructuringParametertArrayBindingPatternDefaultValues.js]
var robotA = [1, "mower", "mowing"];
function foo1(_a) {
    var _b = _a === void 0 ? [-1, "name", "skill"] : _a, _c = _b[1], nameA = _c === void 0 ? "noName" : _c;
    console.log(nameA);
}
function foo2(_d) {
    var _e = (_d === void 0 ? [-1, "name", "skill"] : _d)[0], numberB = _e === void 0 ? -1 : _e;
    console.log(numberB);
}
function foo3(_f) {
    var _g = _f === void 0 ? [-1, "name", "skill"] : _f, _h = _g[0], numberA2 = _h === void 0 ? -1 : _h, _j = _g[1], nameA2 = _j === void 0 ? "name" : _j, _k = _g[2], skillA2 = _k === void 0 ? "skill" : _k;
    console.log(nameA2);
}
function foo4(_l) {
    var _m = _l === void 0 ? [-1, "name", "skill"] : _l, _o = _m[0], numberA3 = _o === void 0 ? -1 : _o, robotAInfo = _m.slice(1);
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
//# sourceMappingURL=sourceMapValidationDestructuringParametertArrayBindingPatternDefaultValues.js.map