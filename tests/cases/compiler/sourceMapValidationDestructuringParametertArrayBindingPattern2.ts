// @lib: es5
// @sourcemap: true
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
foo1(["roomba", ["vaccum", "mopping"]]);

foo2(robotA);
foo2(["roomba", ["vaccum", "mopping"]]);

foo3(robotA);
foo3(["roomba", ["vaccum", "mopping"]]);

foo4(robotA);
foo4(["roomba", ["vaccum", "mopping"]]);