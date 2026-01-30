//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementArrayBindingPattern2.ts] ////

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
let [, skillA] = multiRobotA;
let [nameMB] = multiRobotB;
let [nameMA, [primarySkillA, secondarySkillA]] = multiRobotA;
let [nameMC] = ["roomba", ["vacuum", "mopping"]];
let [nameMC2, [primarySkillC, secondarySkillC]] = ["roomba", ["vacuum", "mopping"]];
let [...multiRobotAInfo] = multiRobotA;
if (nameMB == nameMA) {
    console.log(skillA[0] + skillA[1]);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPattern2.js.map