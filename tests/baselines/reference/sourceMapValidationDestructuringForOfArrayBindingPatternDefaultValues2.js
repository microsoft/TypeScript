//// [tests/cases/compiler/sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues2.ts] ////

//// [sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues2.ts]
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

for ([, nameA = "noName"] of robots) {
    console.log(nameA);
}
for ([, nameA = "noName"] of getRobots()) {
    console.log(nameA);
}
for ([, nameA = "noName"] of [robotA, robotB]) {
    console.log(nameA);
}
for ([, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of multiRobots) {
    console.log(primarySkillA);
}
for ([, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of getMultiRobots()) {
    console.log(primarySkillA);
}
for ([, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of [multiRobotA, multiRobotB]) {
    console.log(primarySkillA);
}

for ([numberB = -1] of robots) {
    console.log(numberB);
}
for ([numberB = -1] of getRobots()) {
    console.log(numberB);
}
for ([numberB = -1] of [robotA, robotB]) {
    console.log(numberB);
}
for ([nameB = "noName"] of multiRobots) {
    console.log(nameB);
}
for ([nameB = "noName"] of getMultiRobots()) {
    console.log(nameB);
}
for ([nameB = "noName"] of [multiRobotA, multiRobotB]) {
    console.log(nameB);
}

for ([numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of robots) {
    console.log(nameA2);
}
for ([numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of getRobots()) {
    console.log(nameA2);
}
for ([numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of [robotA, robotB]) {
    console.log(nameA2);
}
for ([nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of multiRobots) {
    console.log(nameMA);
}
for ([nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of getMultiRobots()) {
    console.log(nameMA);
}
for ([nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of [multiRobotA, multiRobotB]) {
    console.log(nameMA);
}

for ([numberA3 = -1, ...robotAInfo] of robots) {
    console.log(numberA3);
}
for ([numberA3 = -1, ...robotAInfo] of getRobots()) {
    console.log(numberA3);
}
for ([numberA3 = -1, ...robotAInfo] of [robotA, robotB]) {
    console.log(numberA3);
}

//// [sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues2.js]
let robotA = [1, "mower", "mowing"];
let robotB = [2, "trimmer", "trimming"];
let robots = [robotA, robotB];
function getRobots() {
    return robots;
}
let multiRobotA = ["mower", ["mowing", ""]];
let multiRobotB = ["trimmer", ["trimming", "edging"]];
let multiRobots = [multiRobotA, multiRobotB];
function getMultiRobots() {
    return multiRobots;
}
let nameA, primarySkillA, secondarySkillA;
let numberB, nameB;
let numberA2, nameA2, skillA2, nameMA;
let numberA3, robotAInfo, multiRobotAInfo;
for ([, nameA = "noName"] of robots) {
    console.log(nameA);
}
for ([, nameA = "noName"] of getRobots()) {
    console.log(nameA);
}
for ([, nameA = "noName"] of [robotA, robotB]) {
    console.log(nameA);
}
for ([, [
        primarySkillA = "primary",
        secondarySkillA = "secondary"
    ] = ["skill1", "skill2"]] of multiRobots) {
    console.log(primarySkillA);
}
for ([, [
        primarySkillA = "primary",
        secondarySkillA = "secondary"
    ] = ["skill1", "skill2"]] of getMultiRobots()) {
    console.log(primarySkillA);
}
for ([, [
        primarySkillA = "primary",
        secondarySkillA = "secondary"
    ] = ["skill1", "skill2"]] of [multiRobotA, multiRobotB]) {
    console.log(primarySkillA);
}
for ([numberB = -1] of robots) {
    console.log(numberB);
}
for ([numberB = -1] of getRobots()) {
    console.log(numberB);
}
for ([numberB = -1] of [robotA, robotB]) {
    console.log(numberB);
}
for ([nameB = "noName"] of multiRobots) {
    console.log(nameB);
}
for ([nameB = "noName"] of getMultiRobots()) {
    console.log(nameB);
}
for ([nameB = "noName"] of [multiRobotA, multiRobotB]) {
    console.log(nameB);
}
for ([numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of robots) {
    console.log(nameA2);
}
for ([numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of getRobots()) {
    console.log(nameA2);
}
for ([numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of [robotA, robotB]) {
    console.log(nameA2);
}
for ([nameMA = "noName", [
        primarySkillA = "primary",
        secondarySkillA = "secondary"
    ] = ["skill1", "skill2"]] of multiRobots) {
    console.log(nameMA);
}
for ([nameMA = "noName", [
        primarySkillA = "primary",
        secondarySkillA = "secondary"
    ] = ["skill1", "skill2"]] of getMultiRobots()) {
    console.log(nameMA);
}
for ([nameMA = "noName", [
        primarySkillA = "primary",
        secondarySkillA = "secondary"
    ] = ["skill1", "skill2"]] of [multiRobotA, multiRobotB]) {
    console.log(nameMA);
}
for ([numberA3 = -1, ...robotAInfo] of robots) {
    console.log(numberA3);
}
for ([numberA3 = -1, ...robotAInfo] of getRobots()) {
    console.log(numberA3);
}
for ([numberA3 = -1, ...robotAInfo] of [robotA, robotB]) {
    console.log(numberA3);
}
//# sourceMappingURL=sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues2.js.map