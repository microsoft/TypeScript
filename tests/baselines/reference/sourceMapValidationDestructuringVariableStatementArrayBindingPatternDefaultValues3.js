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
[, multiSkillB = []] = ["roomba", ["vaccum", "mopping"]];

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
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var robotA = [1, "mower", "mowing"];
var robotB = [2, "trimmer", "trimming"];
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
var nameA, numberB, nameB, skillB;
var robotAInfo;
var multiSkillB, nameMB, primarySkillB, secondarySkillB;
var multiRobotAInfo;
_a = __read(robotA, 2), _b = _a[1], nameA = _b === void 0 ? "helloNoName" : _b;
_c = __read(getRobotB(), 2), _d = _c[1], nameB = _d === void 0 ? "helloNoName" : _d;
_e = [2, "trimmer", "trimming"], _f = _e[1], nameB = _f === void 0 ? "helloNoName" : _f;
_g = __read(multiRobotB, 2), _h = _g[1], multiSkillB = _h === void 0 ? [] : _h;
_j = __read(getMultiRobotB(), 2), _k = _j[1], multiSkillB = _k === void 0 ? [] : _k;
_l = ["roomba", ["vaccum", "mopping"]], _m = _l[1], multiSkillB = _m === void 0 ? [] : _m;
_o = __read(robotB, 1), _p = _o[0], numberB = _p === void 0 ? -1 : _p;
_q = __read(getRobotB(), 1), _r = _q[0], numberB = _r === void 0 ? -1 : _r;
_s = [2, "trimmer", "trimming"][0], numberB = _s === void 0 ? -1 : _s;
_t = __read(multiRobotB, 1), _u = _t[0], nameMB = _u === void 0 ? "helloNoName" : _u;
_v = __read(getMultiRobotB(), 1), _w = _v[0], nameMB = _w === void 0 ? "helloNoName" : _w;
_x = ["trimmer", ["trimming", "edging"]][0], nameMB = _x === void 0 ? "helloNoName" : _x;
_y = __read(robotB, 3), _z = _y[0], numberB = _z === void 0 ? -1 : _z, _0 = _y[1], nameB = _0 === void 0 ? "helloNoName" : _0, _1 = _y[2], skillB = _1 === void 0 ? "noSkill" : _1;
_2 = __read(getRobotB(), 3), _3 = _2[0], numberB = _3 === void 0 ? -1 : _3, _4 = _2[1], nameB = _4 === void 0 ? "helloNoName" : _4, _5 = _2[2], skillB = _5 === void 0 ? "noSkill" : _5;
_6 = [2, "trimmer", "trimming"], _7 = _6[0], numberB = _7 === void 0 ? -1 : _7, _8 = _6[1], nameB = _8 === void 0 ? "helloNoName" : _8, _9 = _6[2], skillB = _9 === void 0 ? "noSkill" : _9;
_10 = __read(multiRobotB, 2), _11 = _10[0], nameMB = _11 === void 0 ? "helloNoName" : _11, _12 = _10[1], _13 = __read(_12 === void 0 ? [] : _12, 2), _14 = _13[0], primarySkillB = _14 === void 0 ? "noSkill" : _14, _15 = _13[1], secondarySkillB = _15 === void 0 ? "noSkill" : _15;
_16 = __read(getMultiRobotB(), 2), _17 = _16[0], nameMB = _17 === void 0 ? "helloNoName" : _17, _18 = _16[1], _19 = __read(_18 === void 0 ? [] : _18, 2), _20 = _19[0], primarySkillB = _20 === void 0 ? "noSkill" : _20, _21 = _19[1], secondarySkillB = _21 === void 0 ? "noSkill" : _21;
_22 = ["trimmer", ["trimming", "edging"]], _23 = _22[0], nameMB = _23 === void 0 ? "helloNoName" : _23, _24 = _22[1], _25 = __read(_24 === void 0 ? [] : _24, 2), _26 = _25[0], primarySkillB = _26 === void 0 ? "noSkill" : _26, _27 = _25[1], secondarySkillB = _27 === void 0 ? "noSkill" : _27;
_28 = __read(robotB), _29 = _28[0], numberB = _29 === void 0 ? -1 : _29, robotAInfo = _28.slice(1);
_30 = __read(getRobotB()), _31 = _30[0], numberB = _31 === void 0 ? -1 : _31, robotAInfo = _30.slice(1);
_32 = __read([2, "trimmer", "trimming"]), _33 = _32[0], numberB = _33 === void 0 ? -1 : _33, robotAInfo = _32.slice(1);
if (nameA == nameB) {
    console.log(skillB);
}
function getRobotB() {
    return robotB;
}
function getMultiRobotB() {
    return multiRobotB;
}
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33;
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues3.js.map