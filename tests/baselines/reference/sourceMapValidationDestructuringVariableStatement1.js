//// [sourceMapValidationDestructuringVariableStatement1.ts]
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
var a: string, { name: nameA } = robotA;
var b: string, { name: nameB, skill: skillB } = robotB;
var c: string, { name: nameC, skill: skillC } = { name: "Edger", skill: "cutting edges" };

var { name: nameA } = robotA, a = hello;
var { name: nameB, skill: skillB } = robotB, b = " hello";
var { name: nameC, skill: skillC } = { name: "Edger", skill: "cutting edges" }, c = hello;

var a = hello, { name: nameA } = robotA, a1= "hello";
var b = hello, { name: nameB, skill: skillB } = robotB, b1 = "hello";
var c = hello, { name: nameC, skill: skillC } = { name: "Edger", skill: "cutting edges" }, c1 = hello;
if (nameA == nameB) {
    console.log(skillB);
}
else {
    console.log(nameC);
}

//// [sourceMapValidationDestructuringVariableStatement1.js]
var hello = "hello";
var robotA = { name: "mower", skill: "mowing" };
var robotB = { name: "trimmer", skill: "trimming" };
var a, nameA = robotA.name;
var b, nameB = robotB.name, skillB = robotB.skill;
var c, _a = { name: "Edger", skill: "cutting edges" }, nameC = _a.name, skillC = _a.skill;
var nameA = robotA.name, a = hello;
var nameB = robotB.name, skillB = robotB.skill, b = " hello";
var _b = { name: "Edger", skill: "cutting edges" }, nameC = _b.name, skillC = _b.skill, c = hello;
var a = hello, nameA = robotA.name, a1 = "hello";
var b = hello, nameB = robotB.name, skillB = robotB.skill, b1 = "hello";
var c = hello, _c = { name: "Edger", skill: "cutting edges" }, nameC = _c.name, skillC = _c.skill, c1 = hello;
if (nameA == nameB) {
    console.log(skillB);
}
else {
    console.log(nameC);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatement1.js.map