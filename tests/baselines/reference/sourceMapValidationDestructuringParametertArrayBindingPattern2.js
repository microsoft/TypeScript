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
function foo1(_a) {
    var skillA = _a[1];
    console.log(skillA);
}
function foo2(_a) {
    var nameMB = _a[0];
    console.log(nameMB);
}
function foo3(_a) {
    var nameMA = _a[0], _b = _a[1], primarySkillA = _b[0], secondarySkillA = _b[1];
    console.log(nameMA);
}
function foo4(_a) {
    var multiRobotAInfo = _a.slice(0);
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