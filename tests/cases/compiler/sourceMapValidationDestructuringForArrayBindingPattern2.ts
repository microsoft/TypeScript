// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
type MultiSkilledRobot = [string, [string, string]];

let robotA: Robot = [1, "mower", "mowing"];
function getRobot() {
    return robotA;
}

let multiRobotA: MultiSkilledRobot = ["mower", ["mowing", ""]];
let multiRobotB: MultiSkilledRobot = ["trimmer", ["trimming", "edging"]];
function getMultiRobot() {
    return multiRobotA;
}

let nameA: string, primarySkillA: string, secondarySkillA: string;
let numberB: number, nameB: string;
let numberA2: number, nameA2: string, skillA2: string, nameMA: string;
let numberA3: number, robotAInfo: (number | string)[], multiRobotAInfo: (string | [string, string])[];
let i: number;

for ([, nameA] = robotA, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ([, nameA] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for ([, nameA] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(nameA);
}
for ([, [primarySkillA, secondarySkillA]] = multiRobotA, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for ([, [primarySkillA, secondarySkillA]] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for ([, [primarySkillA, secondarySkillA]] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}

for ([numberB] = robotA, i = 0; i < 1; i++) {
    console.log(numberB);
}
for ([numberB] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberB);
}
for ([numberB] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberB);
}
for ([nameB] = multiRobotA, i = 0; i < 1; i++) {
    console.log(nameB);
}
for ([nameB] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameB);
}
for ([nameB] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameB);
}

for ([numberA2, nameA2, skillA2] = robotA, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for ([numberA2, nameA2, skillA2] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA2);
}
for ([numberA2, nameA2, skillA2] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(nameA2);
}
for ([nameMA, [primarySkillA, secondarySkillA]] = multiRobotA, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for ([nameMA, [primarySkillA, secondarySkillA]] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameMA);
}
for ([nameMA, [primarySkillA, secondarySkillA]] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameMA);
}

for ([numberA3, ...robotAInfo] = robotA, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for ([numberA3, ...robotAInfo] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for ([numberA3, ...robotAInfo] = <Robot>[2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberA3);
}
for ([...multiRobotAInfo] = multiRobotA, i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for ([...multiRobotAInfo] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for ([...multiRobotAInfo] = <MultiSkilledRobot>["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}