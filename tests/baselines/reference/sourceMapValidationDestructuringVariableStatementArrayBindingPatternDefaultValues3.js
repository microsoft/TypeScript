//// [tests/cases/compiler/sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues3.ts] ////

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues3.ts]
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

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues3.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24;
var robotA = [1, "mower", "mowing"];
var robotB = [2, "trimmer", "trimming"];
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
var nameA, numberB, nameB, skillB;
var robotAInfo;
var multiSkillB, nameMB, primarySkillB, secondarySkillB;
var multiRobotAInfo;
_a = robotA[1], nameA = _a === void 0 ? "helloNoName" : _a;
_b = getRobotB(), _c = _b[1], nameB = _c === void 0 ? "helloNoName" : _c;
_d = [2, "trimmer", "trimming"], _e = _d[1], nameB = _e === void 0 ? "helloNoName" : _e;
_f = multiRobotB[1], multiSkillB = _f === void 0 ? [] : _f;
_g = getMultiRobotB(), _h = _g[1], multiSkillB = _h === void 0 ? [] : _h;
_j = ["roomba", ["vacuum", "mopping"]], _k = _j[1], multiSkillB = _k === void 0 ? [] : _k;
_l = robotB[0], numberB = _l === void 0 ? -1 : _l;
_m = getRobotB()[0], numberB = _m === void 0 ? -1 : _m;
_o = [2, "trimmer", "trimming"][0], numberB = _o === void 0 ? -1 : _o;
_p = multiRobotB[0], nameMB = _p === void 0 ? "helloNoName" : _p;
_q = getMultiRobotB()[0], nameMB = _q === void 0 ? "helloNoName" : _q;
_r = ["trimmer", ["trimming", "edging"]][0], nameMB = _r === void 0 ? "helloNoName" : _r;
_s = robotB[0], numberB = _s === void 0 ? -1 : _s, _t = robotB[1], nameB = _t === void 0 ? "helloNoName" : _t, _u = robotB[2], skillB = _u === void 0 ? "noSkill" : _u;
_v = getRobotB(), _w = _v[0], numberB = _w === void 0 ? -1 : _w, _x = _v[1], nameB = _x === void 0 ? "helloNoName" : _x, _y = _v[2], skillB = _y === void 0 ? "noSkill" : _y;
_z = [2, "trimmer", "trimming"], _0 = _z[0], numberB = _0 === void 0 ? -1 : _0, _1 = _z[1], nameB = _1 === void 0 ? "helloNoName" : _1, _2 = _z[2], skillB = _2 === void 0 ? "noSkill" : _2;
_3 = multiRobotB[0], nameMB = _3 === void 0 ? "helloNoName" : _3, _4 = multiRobotB[1], _5 = _4 === void 0 ? [] : _4, _6 = _5[0], primarySkillB = _6 === void 0 ? "noSkill" : _6, _7 = _5[1], secondarySkillB = _7 === void 0 ? "noSkill" : _7;
_8 = getMultiRobotB(), _9 = _8[0], nameMB = _9 === void 0 ? "helloNoName" : _9, _10 = _8[1], _11 = _10 === void 0 ? [] : _10, _12 = _11[0], primarySkillB = _12 === void 0 ? "noSkill" : _12, _13 = _11[1], secondarySkillB = _13 === void 0 ? "noSkill" : _13;
_14 = ["trimmer", ["trimming", "edging"]], _15 = _14[0], nameMB = _15 === void 0 ? "helloNoName" : _15, _16 = _14[1], _17 = _16 === void 0 ? [] : _16, _18 = _17[0], primarySkillB = _18 === void 0 ? "noSkill" : _18, _19 = _17[1], secondarySkillB = _19 === void 0 ? "noSkill" : _19;
_20 = robotB[0], numberB = _20 === void 0 ? -1 : _20, robotAInfo = robotB.slice(1);
_21 = getRobotB(), _22 = _21[0], numberB = _22 === void 0 ? -1 : _22, robotAInfo = _21.slice(1);
_23 = [2, "trimmer", "trimming"], _24 = _23[0], numberB = _24 === void 0 ? -1 : _24, robotAInfo = _23.slice(1);
if (nameA == nameB) {
    console.log(skillB);
}
function getRobotB() {
    return robotB;
}
function getMultiRobotB() {
    return multiRobotB;
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues3.js.map