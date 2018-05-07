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