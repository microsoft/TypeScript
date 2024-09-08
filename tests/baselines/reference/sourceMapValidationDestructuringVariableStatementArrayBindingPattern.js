//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementArrayBindingPattern.ts] ////

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern.ts]
declare var console: {
    log(msg: string): void;
}
type Robot = [number, string, string];
var robotA: Robot = [1, "mower", "mowing"];
var robotB: Robot = [2, "trimmer", "trimming"];


let [, nameA] = robotA;
let [numberB] = robotB;
let [numberA2, nameA2, skillA2] = robotA;

let [numberC2] = [3, "edging", "Trimming edges"];
let [numberC, nameC, skillC] = [3, "edging", "Trimming edges"];

let [numberA3, ...robotAInfo] = robotA;

if (nameA == nameA2) {
    console.log(skillA2);
}

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern.js]
var robotA = [1, "mower", "mowing"];
var robotB = [2, "trimmer", "trimming"];
var nameA = robotA[1];
var numberB = robotB[0];
var numberA2 = robotA[0], nameA2 = robotA[1], skillA2 = robotA[2];
var numberC2 = [3, "edging", "Trimming edges"][0];
var _a = [3, "edging", "Trimming edges"], numberC = _a[0], nameC = _a[1], skillC = _a[2];
var numberA3 = robotA[0], robotAInfo = robotA.slice(1);
if (nameA == nameA2) {
    console.log(skillA2);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPattern.js.map