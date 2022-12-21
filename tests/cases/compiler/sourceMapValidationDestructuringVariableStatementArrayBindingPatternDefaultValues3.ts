// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
type MultiSkilledRobot = [string, string[]];

var robotA: Robot = [1, "mower", "mowing"];
var robotB: Robot = [2, "trimmer", "trimming"];
var multiRobotA: MultiSkilledRobot = ["mower", ["mowing", ""]];
var multiRobotB: MultiSkilledRobot = ["trimmer", ["trimming", "edging"]];

let nameA: string, numberB: number, nameB: string, skillB: string;
let robotAInfo: (number | string)[];

let multiSkillB: string[], nameMB: string, primarySkillB: string, secondarySkillB: string;
let multiRobotAInfo: (string | string[])[];

[, nameA = "helloNoName"] = robotA;
[, nameB = "helloNoName"] = getRobotB();
[, nameB = "helloNoName"] = [2, "trimmer", "trimming"];
[, multiSkillB = []] = multiRobotB;
[, multiSkillB = []] = getMultiRobotB();
[, multiSkillB = []] = ["roomba", ["vacuum", "mopping"]];

[numberB = -1] = robotB;
[numberB = -1] = getRobotB();
[numberB = -1] = [2, "trimmer", "trimming"];
[nameMB = "helloNoName"] = multiRobotB;
[nameMB = "helloNoName"] = getMultiRobotB();
[nameMB = "helloNoName"] = ["trimmer", ["trimming", "edging"]];

[numberB = -1, nameB = "helloNoName", skillB = "noSkill"] = robotB;
[numberB = -1, nameB = "helloNoName", skillB = "noSkill"] = getRobotB();
[numberB = -1, nameB = "helloNoName", skillB = "noSkill"] = [2, "trimmer", "trimming"];
[nameMB = "helloNoName", [primarySkillB = "noSkill", secondarySkillB = "noSkill"] = []] = multiRobotB;
[nameMB = "helloNoName", [primarySkillB = "noSkill", secondarySkillB = "noSkill"] = []] = getMultiRobotB();
[nameMB = "helloNoName", [primarySkillB = "noSkill", secondarySkillB = "noSkill"] = []] =
    ["trimmer", ["trimming", "edging"]];

[numberB = -1, ...robotAInfo] = robotB;
[numberB = -1, ...robotAInfo] = getRobotB();
[numberB = -1, ...robotAInfo] = <Robot>[2, "trimmer", "trimming"];

if (nameA == nameB) {
    console.log(skillB);
}

function getRobotB() {
    return robotB;
}

function getMultiRobotB() {
    return multiRobotB;
}