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

let [nameMC] = ["roomba", ["vacuum", "mopping"]];
let [nameMC2, [primarySkillC, secondarySkillC]] = ["roomba", ["vacuum", "mopping"]];

let [...multiRobotAInfo] = multiRobotA;

if (nameMB == nameMA) {
    console.log(skillA[0] + skillA[1]);
}

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern2.js]
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
var skillA = multiRobotA[1];
var nameMB = multiRobotB[0];
var nameMA = multiRobotA[0], _a = multiRobotA[1], primarySkillA = _a[0], secondarySkillA = _a[1];
var nameMC = ["roomba", ["vacuum", "mopping"]][0];
var _b = ["roomba", ["vacuum", "mopping"]], nameMC2 = _b[0], _c = _b[1], primarySkillC = _c[0], secondarySkillC = _c[1];
var multiRobotAInfo = multiRobotA.slice(0);
if (nameMB == nameMA) {
    console.log(skillA[0] + skillA[1]);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPattern2.js.map