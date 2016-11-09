//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern2.ts]
declare var console: {
    log(msg: string): void;
}
type MultiSkilledRobot = [string, [string, string]];
var multiRobotA: MultiSkilledRobot = ["mower", ["mowing", ""]];
var multiRobotB: MultiSkilledRobot = ["trimmer", ["trimming", "edging"]];

let [, skillA] = multiRobotA;
let [nameMB] = multiRobotB;
let [nameMA, [primarySkillA, secondarySkillA]] = multiRobotA;

let [nameMC] = ["roomba", ["vaccum", "mopping"]];
let [nameMC2, [primarySkillC, secondarySkillC]] = ["roomba", ["vaccum", "mopping"]];

let [...multiRobotAInfo] = multiRobotA;

if (nameMB == nameMA) {
    console.log(skillA[0] + skillA[1]);
}

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern2.js]
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
var _a = __read(multiRobotA, 2), skillA = _a[1];
var _b = __read(multiRobotB, 1), nameMB = _b[0];
var _c = __read(multiRobotA, 2), nameMA = _c[0], _d = __read(_c[1], 2), primarySkillA = _d[0], secondarySkillA = _d[1];
var nameMC = ["roomba", ["vaccum", "mopping"]][0];
var _e = ["roomba", ["vaccum", "mopping"]], nameMC2 = _e[0], _f = __read(_e[1], 2), primarySkillC = _f[0], secondarySkillC = _f[1];
var _g = __read(multiRobotA), multiRobotAInfo = _g.slice(0);
if (nameMB == nameMA) {
    console.log(skillA[0] + skillA[1]);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPattern2.js.map