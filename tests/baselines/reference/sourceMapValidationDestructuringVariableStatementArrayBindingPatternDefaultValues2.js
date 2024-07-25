//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues2.ts] ////

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues2.ts]
declare var console: {
    log(msg: string): void;
}
type MultiSkilledRobot = [string, string[]];
var multiRobotA: MultiSkilledRobot = ["mower", ["mowing", ""]];
var multiRobotB: MultiSkilledRobot = ["trimmer", ["trimming", "edging"]];

let [, skillA = ["noSkill", "noSkill"]] = multiRobotA;
let [nameMB = "noName" ] = multiRobotB;
let [nameMA = "noName", [primarySkillA = "noSkill", secondarySkillA = "noSkill"] = ["noSkill", "noSkill"]] = multiRobotA;

let [nameMC = "noName" ] = ["roomba", ["vacuum", "mopping"]];
let [nameMC2 = "noName", [primarySkillC = "noSkill", secondarySkillC = "noSkill"] = ["noSkill", "noSkill"]] = ["roomba", ["vacuum", "mopping"]];

if (nameMB == nameMA) {
    console.log(skillA[0] + skillA[1]);
}

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues2.js]
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
var _a = multiRobotA[1], skillA = _a === void 0 ? ["noSkill", "noSkill"] : _a;
var _b = multiRobotB[0], nameMB = _b === void 0 ? "noName" : _b;
var _c = multiRobotA[0], nameMA = _c === void 0 ? "noName" : _c, _d = multiRobotA[1], _e = _d === void 0 ? ["noSkill", "noSkill"] : _d, _f = _e[0], primarySkillA = _f === void 0 ? "noSkill" : _f, _g = _e[1], secondarySkillA = _g === void 0 ? "noSkill" : _g;
var _h = ["roomba", ["vacuum", "mopping"]][0], nameMC = _h === void 0 ? "noName" : _h;
var _j = ["roomba", ["vacuum", "mopping"]], _k = _j[0], nameMC2 = _k === void 0 ? "noName" : _k, _l = _j[1], _m = _l === void 0 ? ["noSkill", "noSkill"] : _l, _o = _m[0], primarySkillC = _o === void 0 ? "noSkill" : _o, _p = _m[1], secondarySkillC = _p === void 0 ? "noSkill" : _p;
if (nameMB == nameMA) {
    console.log(skillA[0] + skillA[1]);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues2.js.map