//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues.ts] ////

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues.ts]
declare var console: {
    log(msg: string): void;
}
type Robot = [number, string, string];
var robotA: Robot = [1, "mower", "mowing"];
var robotB: Robot = [2, "trimmer", "trimming"];

let [, nameA = "noName"] = robotA;
let [numberB = -1] = robotB;
let [numberA2 = -1, nameA2 = "noName", skillA2 = "noSkill"] = robotA;

let [numberC2 = -1] = [3, "edging", "Trimming edges"];
let [numberC = -1, nameC = "noName", skillC = "noSkill"] = [3, "edging", "Trimming edges"];

let [numberA3 = -1, ...robotAInfo] = robotA;

if (nameA == nameA2) {
    console.log(skillA2);
}

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues.js]
var robotA = [1, "mower", "mowing"];
var robotB = [2, "trimmer", "trimming"];
var _a = robotA[1], nameA = _a === void 0 ? "noName" : _a;
var _b = robotB[0], numberB = _b === void 0 ? -1 : _b;
var _c = robotA[0], numberA2 = _c === void 0 ? -1 : _c, _d = robotA[1], nameA2 = _d === void 0 ? "noName" : _d, _e = robotA[2], skillA2 = _e === void 0 ? "noSkill" : _e;
var _f = [3, "edging", "Trimming edges"][0], numberC2 = _f === void 0 ? -1 : _f;
var _g = [3, "edging", "Trimming edges"], _h = _g[0], numberC = _h === void 0 ? -1 : _h, _j = _g[1], nameC = _j === void 0 ? "noName" : _j, _k = _g[2], skillC = _k === void 0 ? "noSkill" : _k;
var _l = robotA[0], numberA3 = _l === void 0 ? -1 : _l, robotAInfo = robotA.slice(1);
if (nameA == nameA2) {
    console.log(skillA2);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues.js.map