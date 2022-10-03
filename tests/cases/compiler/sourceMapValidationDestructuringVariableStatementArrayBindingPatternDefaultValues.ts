// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: string): void;
}
type Robot = [number, string, string];
var robotA: Robot = [1, "mower", "mowing"];
var robotB: Robot = [2, "trimmer", "trimming"];

let [, nameA = "noName"] = robotA;
let [numberB = -1] = robotB;
let [numberA2 = -1, nameA2 = "noName", skillA2 = "noSkill"] = robotA;

let [numberC2 = -1] = [3, "edging", "Trimming edges"];
let [numberC = -1, nameC = "noName", skillC = "noSkill"] = [3, "edging", "Trimming edges"];

let [numberA3 = -1, ...robotAInfo] = robotA;

if (nameA == nameA2) {
    console.log(skillA2);
}