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

let [nameMC = "noName" ] = ["roomba", ["vaccum", "mopping"]];
let [nameMC2 = "noName", [primarySkillC = "noSkill", secondarySkillC = "noSkill"] = ["noSkill", "noSkill"]] = ["roomba", ["vaccum", "mopping"]];

if (nameMB == nameMA) {
    console.log(skillA[0] + skillA[1]);
}

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues2.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
var _a = __read(multiRobotA, 2), _b = _a[1], skillA = _b === void 0 ? ["noSkill", "noSkill"] : _b;
var _c = __read(multiRobotB, 1), _d = _c[0], nameMB = _d === void 0 ? "noName" : _d;
var _e = __read(multiRobotA, 2), _f = _e[0], nameMA = _f === void 0 ? "noName" : _f, _g = _e[1], _h = __read(_g === void 0 ? ["noSkill", "noSkill"] : _g, 2), _j = _h[0], primarySkillA = _j === void 0 ? "noSkill" : _j, _k = _h[1], secondarySkillA = _k === void 0 ? "noSkill" : _k;
var _l = ["roomba", ["vaccum", "mopping"]][0], nameMC = _l === void 0 ? "noName" : _l;
var _m = ["roomba", ["vaccum", "mopping"]], _o = _m[0], nameMC2 = _o === void 0 ? "noName" : _o, _p = _m[1], _q = __read(_p === void 0 ? ["noSkill", "noSkill"] : _p, 2), _r = _q[0], primarySkillC = _r === void 0 ? "noSkill" : _r, _s = _q[1], secondarySkillC = _s === void 0 ? "noSkill" : _s;
if (nameMB == nameMA) {
    console.log(skillA[0] + skillA[1]);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues2.js.map