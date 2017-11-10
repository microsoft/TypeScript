// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
type MultiSkilledRobot = [string, [string, string]];

let robotA: Robot = [1, "mower", "mowing"];
let robotB: Robot = [2, "trimmer", "trimming"];
let robots = [robotA, robotB];
function getRobots() {
    return robots;
}

let multiRobotA: MultiSkilledRobot = ["mower", ["mowing", ""]];
let multiRobotB: MultiSkilledRobot = ["trimmer", ["trimming", "edging"]];
let multiRobots = [multiRobotA, multiRobotB];
function getMultiRobots() {
    return multiRobots;
}

for (let [, nameA = "noName"] of robots) {
    console.log(nameA);
}
for (let [, nameA = "noName"] of getRobots()) {
    console.log(nameA);
}
for (let [, nameA = "noName"] of [robotA, robotB]) {
    console.log(nameA);
}
for (let [, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of multiRobots) {
    console.log(primarySkillA);
}
for (let [, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of getMultiRobots()) {
    console.log(primarySkillA);
}
for (let [, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of [multiRobotA, multiRobotB]) {
    console.log(primarySkillA);
}

for (let [numberB = -1] of robots) {
    console.log(numberB);
}
for (let [numberB = -1] of getRobots()) {
    console.log(numberB);
}
for (let [numberB = -1] of [robotA, robotB]) {
    console.log(numberB);
}
for (let [nameB = "noName"] of multiRobots) {
    console.log(nameB);
}
for (let [nameB = "noName"] of getMultiRobots()) {
    console.log(nameB);
}
for (let [nameB = "noName"] of [multiRobotA, multiRobotB]) {
    console.log(nameB);
}

for (let [numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of robots) {
    console.log(nameA2);
}
for (let [numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of getRobots()) {
    console.log(nameA2);
}
for (let [numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of [robotA, robotB]) {
    console.log(nameA2);
}
for (let [nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of multiRobots) {
    console.log(nameMA);
}
for (let [nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of getMultiRobots()) {
    console.log(nameMA);
}
for (let [nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of [multiRobotA, multiRobotB]) {
    console.log(nameMA);
}

for (let [numberA3 = -1, ...robotAInfo] of robots) {
    console.log(numberA3);
}
for (let [numberA3 = -1, ...robotAInfo] of getRobots()) {
    console.log(numberA3);
}
for (let [numberA3 = -1, ...robotAInfo] of [robotA, robotB]) {
    console.log(numberA3);
}