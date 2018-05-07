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

for (let [, nameA] = robotA, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let [, nameA] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let [, nameA] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let [, [primarySkillA, secondarySkillA]] = multiRobotA, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (let [, [primarySkillA, secondarySkillA]] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (let [, [primarySkillA, secondarySkillA]] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}

for (let [numberB] = robotA, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (let [numberB] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberB);
}
for (let [numberB] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberB);
}
for (let [nameB] = multiRobotA, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (let [nameB] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameB);
}
for (let [nameB] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameB);
}

for (let [numberA2, nameA2, skillA2] = robotA, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (let [numberA2, nameA2, skillA2] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (let [numberA2, nameA2, skillA2] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] = multiRobotA, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameMA);
}

for (let [numberA3, ...robotAInfo] = robotA, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (let [numberA3, ...robotAInfo] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (let [numberA3, ...robotAInfo] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (let [...multiRobotAInfo] = multiRobotA, i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (let [...multiRobotAInfo] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (let [...multiRobotAInfo] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}