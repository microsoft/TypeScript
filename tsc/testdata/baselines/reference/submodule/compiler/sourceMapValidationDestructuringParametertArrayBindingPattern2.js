//// [tests/cases/compiler/sourceMapValidationDestructuringParametertArrayBindingPattern2.ts] ////

//// [sourceMapValidationDestructuringParametertArrayBindingPattern2.ts]
declare var console: {
    log(msg: any): void;
}
type Robot = [string, [string, string]];
var robotA: Robot = ["trimmer", ["trimming", "edging"]];

function foo1([, skillA]: Robot) {
    console.log(skillA);
}

function foo2([nameMB]: Robot) {
    console.log(nameMB);
}

function foo3([nameMA, [primarySkillA, secondarySkillA]]: Robot) {
    console.log(nameMA);
}

function foo4([...multiRobotAInfo]: Robot) {
    console.log(multiRobotAInfo);
}

foo1(robotA);
foo1(["roomba", ["vacuum", "mopping"]]);

foo2(robotA);
foo2(["roomba", ["vacuum", "mopping"]]);

foo3(robotA);
foo3(["roomba", ["vacuum", "mopping"]]);

foo4(robotA);
foo4(["roomba", ["vacuum", "mopping"]]);

//// [sourceMapValidationDestructuringParametertArrayBindingPattern2.js]
var robotA = ["trimmer", ["trimming", "edging"]];
function foo1([, skillA]) {
    console.log(skillA);
}
function foo2([nameMB]) {
    console.log(nameMB);
}
function foo3([nameMA, [primarySkillA, secondarySkillA]]) {
    console.log(nameMA);
}
function foo4([...multiRobotAInfo]) {
    console.log(multiRobotAInfo);
}
foo1(robotA);
foo1(["roomba", ["vacuum", "mopping"]]);
foo2(robotA);
foo2(["roomba", ["vacuum", "mopping"]]);
foo3(robotA);
foo3(["roomba", ["vacuum", "mopping"]]);
foo4(robotA);
foo4(["roomba", ["vacuum", "mopping"]]);
//# sourceMappingURL=sourceMapValidationDestructuringParametertArrayBindingPattern2.js.map