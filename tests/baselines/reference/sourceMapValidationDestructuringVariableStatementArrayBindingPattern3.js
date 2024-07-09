//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementArrayBindingPattern3.ts] ////

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern3.ts]
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
[, multiSkillB] = ["roomba", ["vacuum", "mopping"]];

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

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern3.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
var robotA = [1, "mower", "mowing"];
var robotB = [2, "trimmer", "trimming"];
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
var nameA, numberB, nameB, skillB;
var robotAInfo;
var multiSkillB, nameMB, primarySkillB, secondarySkillB;
var multiRobotAInfo;
nameA = robotA[1];
_a = getRobotB(), nameB = _a[1];
_b = [2, "trimmer", "trimming"], nameB = _b[1];
multiSkillB = multiRobotB[1];
_c = getMultiRobotB(), multiSkillB = _c[1];
_d = ["roomba", ["vacuum", "mopping"]], multiSkillB = _d[1];
numberB = robotB[0];
numberB = getRobotB()[0];
numberB = [2, "trimmer", "trimming"][0];
nameMB = multiRobotB[0];
nameMB = getMultiRobotB()[0];
nameMB = ["trimmer", ["trimming", "edging"]][0];
numberB = robotB[0], nameB = robotB[1], skillB = robotB[2];
_e = getRobotB(), numberB = _e[0], nameB = _e[1], skillB = _e[2];
_f = [2, "trimmer", "trimming"], numberB = _f[0], nameB = _f[1], skillB = _f[2];
nameMB = multiRobotB[0], _g = multiRobotB[1], primarySkillB = _g[0], secondarySkillB = _g[1];
_h = getMultiRobotB(), nameMB = _h[0], _j = _h[1], primarySkillB = _j[0], secondarySkillB = _j[1];
_k = ["trimmer", ["trimming", "edging"]], nameMB = _k[0], _l = _k[1], primarySkillB = _l[0], secondarySkillB = _l[1];
numberB = robotB[0], robotAInfo = robotB.slice(1);
_m = getRobotB(), numberB = _m[0], robotAInfo = _m.slice(1);
_o = [2, "trimmer", "trimming"], numberB = _o[0], robotAInfo = _o.slice(1);
multiRobotAInfo = multiRobotA.slice(0);
multiRobotAInfo = getMultiRobotB().slice(0);
multiRobotAInfo = ["trimmer", ["trimming", "edging"]].slice(0);
if (nameA == nameB) {
    console.log(skillB);
}
function getRobotB() {
    return robotB;
}
function getMultiRobotB() {
    return multiRobotB;
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPattern3.js.map