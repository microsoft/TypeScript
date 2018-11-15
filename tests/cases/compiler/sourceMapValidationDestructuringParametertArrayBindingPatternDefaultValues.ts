// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
var robotA: Robot = [1, "mower", "mowing"];

function foo1([, nameA = "noName"]: Robot = [-1, "name", "skill"]) {
    console.log(nameA);
}

function foo2([numberB = -1]: Robot = [-1, "name", "skill"]) {
    console.log(numberB);
}

function foo3([numberA2 = -1, nameA2 = "name", skillA2 = "skill"]: Robot = [-1, "name", "skill"]) {
    console.log(nameA2);
}

function foo4([numberA3 = -1, ...robotAInfo]: Robot = [-1, "name", "skill"]) {
    console.log(robotAInfo);
}

foo1(robotA);
foo1([2, "trimmer", "trimming"]);

foo2(robotA);
foo2([2, "trimmer", "trimming"]);

foo3(robotA);
foo3([2, "trimmer", "trimming"]);

foo4(robotA);
foo4([2, "trimmer", "trimming"]);