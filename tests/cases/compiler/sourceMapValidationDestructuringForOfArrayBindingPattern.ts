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

for (let [, nameA] of robots) {
    console.log(nameA);
}
for (let [, nameA] of getRobots()) {
    console.log(nameA);
}
for (let [, nameA] of [robotA, robotB]) {
    console.log(nameA);
}
for (let [, [primarySkillA, secondarySkillA]] of multiRobots) {
    console.log(primarySkillA);
}
for (let [, [primarySkillA, secondarySkillA]] of getMultiRobots()) {
    console.log(primarySkillA);
}
for (let [, [primarySkillA, secondarySkillA]] of [multiRobotA, multiRobotB]) {
    console.log(primarySkillA);
}

for (let [numberB] of robots) {
    console.log(numberB);
}
for (let [numberB] of getRobots()) {
    console.log(numberB);
}
for (let [numberB] of [robotA, robotB]) {
    console.log(numberB);
}
for (let [nameB] of multiRobots) {
    console.log(nameB);
}
for (let [nameB] of getMultiRobots()) {
    console.log(nameB);
}
for (let [nameB] of [multiRobotA, multiRobotB]) {
    console.log(nameB);
}

for (let [numberA2, nameA2, skillA2] of robots) {
    console.log(nameA2);
}
for (let [numberA2, nameA2, skillA2] of getRobots()) {
    console.log(nameA2);
}
for (let [numberA2, nameA2, skillA2] of [robotA, robotB]) {
    console.log(nameA2);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] of multiRobots) {
    console.log(nameMA);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] of getMultiRobots()) {
    console.log(nameMA);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] of [multiRobotA, multiRobotB]) {
    console.log(nameMA);
}

for (let [numberA3, ...robotAInfo] of robots) {
    console.log(numberA3);
}
for (let [numberA3, ...robotAInfo] of getRobots()) {
    console.log(numberA3);
}
for (let [numberA3, ...robotAInfo] of [robotA, robotB]) {
    console.log(numberA3);
}
for (let [...multiRobotAInfo] of multiRobots) {
    console.log(multiRobotAInfo);
}
for (let [...multiRobotAInfo] of getMultiRobots()) {
    console.log(multiRobotAInfo);
}
for (let [...multiRobotAInfo] of [multiRobotA, multiRobotB]) {
    console.log(multiRobotAInfo);
}