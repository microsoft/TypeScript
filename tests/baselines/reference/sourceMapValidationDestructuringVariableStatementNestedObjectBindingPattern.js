//// [sourceMapValidationDestructuringVariableStatementNestedObjectBindingPattern.ts]
declare var console: {
    log(msg: string): void;
}
interface Robot {
    name: string;
    skills: {
        primary: string;
        secondary: string;
    };
}
var robotA: Robot = { name: "mower", skills: { primary: "mowing", secondary: "none" } };
var robotB: Robot = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } };

var { skills: { primary: primaryA, secondary: secondaryA } } = robotA;
var { name: nameB, skills: { primary: primaryB, secondary: secondaryB } } = robotB;
var { name: nameC, skills: { primary: primaryB, secondary: secondaryB } } = { name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } };

if (nameB == nameB) {
    console.log(nameC);
}
else {
    console.log(nameC);
}

//// [sourceMapValidationDestructuringVariableStatementNestedObjectBindingPattern.js]
var robotA = { name: "mower", skills: { primary: "mowing", secondary: "none" } };
var robotB = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } };
var _a = robotA.skills, primaryA = _a.primary, secondaryA = _a.secondary;
var nameB = robotB.name, _b = robotB.skills, primaryB = _b.primary, secondaryB = _b.secondary;
var _c = { name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } }, nameC = _c.name, _d = _c.skills, primaryB = _d.primary, secondaryB = _d.secondary;
if (nameB == nameB) {
    console.log(nameC);
}
else {
    console.log(nameC);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementNestedObjectBindingPattern.js.map