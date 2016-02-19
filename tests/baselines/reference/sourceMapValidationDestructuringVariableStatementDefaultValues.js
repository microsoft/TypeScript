//// [sourceMapValidationDestructuringVariableStatementDefaultValues.ts]
interface Robot {
    name: string;
    skill: string;
}
declare var console: {
    log(msg: string): void;
}
var hello = "hello";
var robotA: Robot = { name: "mower", skill: "mowing" };
var robotB: Robot = { name: "trimmer", skill: "trimming" };
var { name: nameA = "<NoName>" } = robotA;
var { name: nameB = "<NoName>", skill: skillB = "<skillUnspecified>" } = robotB;
var { name: nameC = "<NoName>", skill: skillC = "<skillUnspecified>" } = { name: "Edger", skill: "cutting edges" };
if (nameA == nameB) {
    console.log(skillB);
}
else {
    console.log(nameC);
}

//// [sourceMapValidationDestructuringVariableStatementDefaultValues.js]
var hello = "hello";
var robotA = { name: "mower", skill: "mowing" };
var robotB = { name: "trimmer", skill: "trimming" };
var _a = robotA.name, nameA = _a === void 0 ? "<NoName>" : _a;
var _b = robotB.name, nameB = _b === void 0 ? "<NoName>" : _b, _c = robotB.skill, skillB = _c === void 0 ? "<skillUnspecified>" : _c;
var _d = { name: "Edger", skill: "cutting edges" }, _e = _d.name, nameC = _e === void 0 ? "<NoName>" : _e, _f = _d.skill, skillC = _f === void 0 ? "<skillUnspecified>" : _f;
if (nameA == nameB) {
    console.log(skillB);
}
else {
    console.log(nameC);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementDefaultValues.js.map