// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: any): void;
}
type Robot = [string, string[]];
var robotA: Robot = ["trimmer", ["trimming", "edging"]];

function foo1([, skillA = ["noSkill", "noSkill"]]: Robot= ["name", ["skill1", "skill2"]]) {
    console.log(skillA);
}

function foo2([nameMB = "noName"]: Robot = ["name", ["skill1", "skill2"]]) {
    console.log(nameMB);
}

function foo3([nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["noSkill", "noSkill"]]: Robot) {
    console.log(nameMA);
}

foo1(robotA);
foo1(["roomba", ["vacuum", "mopping"]]);

foo2(robotA);
foo2(["roomba", ["vacuum", "mopping"]]);

foo3(robotA);
foo3(["roomba", ["vacuum", "mopping"]]);