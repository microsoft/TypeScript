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
function foo2(_a) {
    var _b = _a === void 0 ? [-1, "name", "skill"] : _a, _c = _b[0], numberB = _c === void 0 ? -1 : _c;
    console.log(numberB);
}
function foo3(_a) {
    var _b = _a === void 0 ? [-1, "name", "skill"] : _a, _c = _b[0], numberA2 = _c === void 0 ? -1 : _c, _d = _b[1], nameA2 = _d === void 0 ? "name" : _d, _e = _b[2], skillA2 = _e === void 0 ? "skill" : _e;
    console.log(nameA2);
}
function foo4(_a) {
    var _b = _a === void 0 ? [-1, "name", "skill"] : _a, _c = _b[0], numberA3 = _c === void 0 ? -1 : _c, robotAInfo = _b.slice(1);
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