// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
type MultiSkilledRobot = [string, [string, string]];

var robotA: Robot = [1, "mower", "mowing"];
var robotB: Robot = [2, "trimmer", "trimming"];
var multiRobotA: MultiSkilledRobot = ["mower", ["mowing", ""]];
var multiRobotB: MultiSkilledRobot = ["trimmer", ["trimming", "edging"]];

let nameA: string, numberB: number, nameB: string, skillB: string;
let robotAInfo: (number | string)[];

let multiSkillB: [string, string], nameMB: string, primarySkillB: string, secondarySkillB: string;
let multiRobotAInfo: (string | [string, string])[];

[, nameA] = robotA;
[, nameB] = getRobotB();
[, nameB] = [2, "trimmer", "trimming"];
[, multiSkillB] = multiRobotB;
[, multiSkillB] = getMultiRobotB();
[, multiSkillB] = ["roomba", ["vaccum", "mopping"]];

[numberB] = robotB;
[numberB] = getRobotB();
[numberB] = [2, "trimmer", "trimming"];
[nameMB] = multiRobotB;
[nameMB] = getMultiRobotB();
[nameMB] = ["trimmer", ["trimming", "edging"]];

[numberB, nameB, skillB] = robotB;
[numberB, nameB, skillB] = getRobotB();
[numberB, nameB, skillB] = [2, "trimmer", "trimming"];
[nameMB, [primarySkillB, secondarySkillB]] = multiRobotB;
[nameMB, [primarySkillB, secondarySkillB]] = getMultiRobotB();
[nameMB, [primarySkillB, secondarySkillB]] = ["trimmer", ["trimming", "edging"]];

[numberB, ...robotAInfo] = robotB;
[numberB, ...robotAInfo] = getRobotB();
[numberB, ...robotAInfo] = <Robot>[2, "trimmer", "trimming"];
[...multiRobotAInfo] = multiRobotA;
[...multiRobotAInfo] = getMultiRobotB();
[...multiRobotAInfo] = ["trimmer", ["trimming", "edging"]];

if (nameA == nameB) {
    console.log(skillB);
}

function getRobotB() {
    return robotB;
}

function getMultiRobotB() {
    return multiRobotB;
}