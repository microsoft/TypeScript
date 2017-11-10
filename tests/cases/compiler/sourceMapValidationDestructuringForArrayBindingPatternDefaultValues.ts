// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
type MultiSkilledRobot = [string, string[]];

let robotA: Robot = [1, "mower", "mowing"];
function getRobot() {
    return robotA;
}

let multiRobotA: MultiSkilledRobot = ["mower", ["mowing", ""]];
let multiRobotB: MultiSkilledRobot = ["trimmer", ["trimming", "edging"]];
function getMultiRobot() {
    return multiRobotA;
}

for (let [, nameA ="name"] = robotA, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let [, nameA = "name"] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let [, nameA = "name"] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let [, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["none", "none"]] = multiRobotA, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (let [, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["none", "none"]] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (let [, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["none", "none"]] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}

for (let [numberB = -1] = robotA, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (let [numberB = -1] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberB);
}
for (let [numberB = -1] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberB);
}
for (let [nameB = "name"] = multiRobotA, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (let [nameB = "name"] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameB);
}
for (let [nameB = "name"] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameB);
}

for (let [numberA2 = -1, nameA2 = "name", skillA2 = "skill"] = robotA, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (let [numberA2 = -1, nameA2 = "name", skillA2 = "skill"] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (let [numberA2 = -1, nameA2 = "name", skillA2 = "skill"] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (let
    [nameMA = "noName",
        [
            primarySkillA = "primary",
            secondarySkillA = "secondary"
        ] = ["none", "none"]
    ] = multiRobotA, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (let [nameMA = "noName",
    [
        primarySkillA = "primary",
        secondarySkillA = "secondary"
    ] = ["none", "none"]
]  = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (let [nameMA = "noName",
    [
        primarySkillA = "primary",
        secondarySkillA = "secondary"
    ] = ["none", "none"]
]  = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameMA);
}

for (let [numberA3 = -1, ...robotAInfo] = robotA, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (let [numberA3 = -1, ...robotAInfo] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (let [numberA3 = -1, ...robotAInfo] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberA3);
}