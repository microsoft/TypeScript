// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
var robotA: Robot = [1, "mower", "mowing"];

function foo1([, nameA]: Robot) {
    console.log(nameA);
}

function foo2([numberB]: Robot) {
    console.log(numberB);
}

function foo3([numberA2, nameA2, skillA2]: Robot) {
    console.log(nameA2);
}

function foo4([numberA3, ...robotAInfo]: Robot) {
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