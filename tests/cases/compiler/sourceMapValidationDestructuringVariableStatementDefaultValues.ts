// @lib: es5
// @sourcemap: true
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