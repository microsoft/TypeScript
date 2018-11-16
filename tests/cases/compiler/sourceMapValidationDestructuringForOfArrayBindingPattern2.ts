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

let nameA: string, primarySkillA: string, secondarySkillA: string;
let numberB: number, nameB: string;
let numberA2: number, nameA2: string, skillA2: string, nameMA: string;
let numberA3: number, robotAInfo: (number | string)[], multiRobotAInfo: (string | [string, string])[];

for ([, nameA] of robots) {
    console.log(nameA);
}
for ([, nameA] of getRobots()) {
    console.log(nameA);
}
for ([, nameA] of [robotA, robotB]) {
    console.log(nameA);
}
for ([, [primarySkillA, secondarySkillA]] of multiRobots) {
    console.log(primarySkillA);
}
for ([, [primarySkillA, secondarySkillA]] of getMultiRobots()) {
    console.log(primarySkillA);
}
for ([, [primarySkillA, secondarySkillA]] of [multiRobotA, multiRobotB]) {
    console.log(primarySkillA);
}

for ([numberB] of robots) {
    console.log(numberB);
}
for ([numberB] of getRobots()) {
    console.log(numberB);
}
for ([numberB] of [robotA, robotB]) {
    console.log(numberB);
}
for ([nameB] of multiRobots) {
    console.log(nameB);
}
for ([nameB] of getMultiRobots()) {
    console.log(nameB);
}
for ([nameB] of [multiRobotA, multiRobotB]) {
    console.log(nameB);
}

for ([numberA2, nameA2, skillA2] of robots) {
    console.log(nameA2);
}
for ([numberA2, nameA2, skillA2] of getRobots()) {
    console.log(nameA2);
}
for ([numberA2, nameA2, skillA2] of [robotA, robotB]) {
    console.log(nameA2);
}
for ([nameMA, [primarySkillA, secondarySkillA]] of multiRobots) {
    console.log(nameMA);
}
for ([nameMA, [primarySkillA, secondarySkillA]] of getMultiRobots()) {
    console.log(nameMA);
}
for ([nameMA, [primarySkillA, secondarySkillA]] of [multiRobotA, multiRobotB]) {
    console.log(nameMA);
}

for ([numberA3, ...robotAInfo] of robots) {
    console.log(numberA3);
}
for ([numberA3, ...robotAInfo] of getRobots()) {
    console.log(numberA3);
}
for ([numberA3, ...robotAInfo] of [robotA, robotB]) {
    console.log(numberA3);
}
for ([...multiRobotAInfo] of multiRobots) {
    console.log(multiRobotAInfo);
}
for ([...multiRobotAInfo] of getMultiRobots()) {
    console.log(multiRobotAInfo);
}
for ([...multiRobotAInfo] of [multiRobotA, multiRobotB]) {
    console.log(multiRobotAInfo);
}