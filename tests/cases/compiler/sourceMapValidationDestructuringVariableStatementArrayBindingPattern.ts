// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: string): void;
}
type Robot = [number, string, string];
var robotA: Robot = [1, "mower", "mowing"];
var robotB: Robot = [2, "trimmer", "trimming"];


let [, nameA] = robotA;
let [numberB] = robotB;
let [numberA2, nameA2, skillA2] = robotA;

let [numberC2] = [3, "edging", "Trimming edges"];
let [numberC, nameC, skillC] = [3, "edging", "Trimming edges"];

let [numberA3, ...robotAInfo] = robotA;

if (nameA == nameA2) {
    console.log(skillA2);
}