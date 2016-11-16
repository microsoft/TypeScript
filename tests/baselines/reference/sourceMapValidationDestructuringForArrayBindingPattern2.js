//// [sourceMapValidationDestructuringForArrayBindingPattern2.ts]
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

//// [sourceMapValidationDestructuringForArrayBindingPattern2.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var robotA = [1, "mower", "mowing"];
function getRobot() {
    return robotA;
}
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
function getMultiRobot() {
    return multiRobotA;
}
var nameA, primarySkillA, secondarySkillA;
var numberB, nameB;
var numberA2, nameA2, skillA2, nameMA;
var numberA3, robotAInfo, multiRobotAInfo;
var i;
for (_a = __read(robotA, 2), nameA = _a[1], robotA, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_b = getRobot(), _c = __read(_b, 2), nameA = _c[1], _b, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_d = [2, "trimmer", "trimming"], _e = __read(_d, 2), nameA = _e[1], _d, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_f = __read(multiRobotA, 2), _g = __read(_f[1], 2), primarySkillA = _g[0], secondarySkillA = _g[1], multiRobotA, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_h = getMultiRobot(), _j = __read(_h, 2), _k = __read(_j[1], 2), primarySkillA = _k[0], secondarySkillA = _k[1], _h, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_l = ["trimmer", ["trimming", "edging"]], _m = __read(_l, 2), _o = __read(_m[1], 2), primarySkillA = _o[0], secondarySkillA = _o[1], _l, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_p = __read(robotA, 1), numberB = _p[0], robotA, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_q = getRobot(), _r = __read(_q, 1), numberB = _r[0], _q, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_s = [2, "trimmer", "trimming"], _t = __read(_s, 1), numberB = _t[0], _s, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_u = __read(multiRobotA, 1), nameB = _u[0], multiRobotA, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_v = getMultiRobot(), _w = __read(_v, 1), nameB = _w[0], _v, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_x = ["trimmer", ["trimming", "edging"]], _y = __read(_x, 1), nameB = _y[0], _x, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_z = __read(robotA, 3), numberA2 = _z[0], nameA2 = _z[1], skillA2 = _z[2], robotA, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (_0 = getRobot(), _1 = __read(_0, 3), numberA2 = _1[0], nameA2 = _1[1], skillA2 = _1[2], _0, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (_2 = [2, "trimmer", "trimming"], _3 = __read(_2, 3), numberA2 = _3[0], nameA2 = _3[1], skillA2 = _3[2], _2, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (_4 = __read(multiRobotA, 2), nameMA = _4[0], _5 = __read(_4[1], 2), primarySkillA = _5[0], secondarySkillA = _5[1], multiRobotA, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (_6 = getMultiRobot(), _7 = __read(_6, 2), nameMA = _7[0], _8 = __read(_7[1], 2), primarySkillA = _8[0], secondarySkillA = _8[1], _6, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (_9 = ["trimmer", ["trimming", "edging"]], _10 = __read(_9, 2), nameMA = _10[0], _11 = __read(_10[1], 2), primarySkillA = _11[0], secondarySkillA = _11[1], _9, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (_12 = __read(robotA), numberA3 = _12[0], robotAInfo = _12.slice(1), robotA, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (_13 = getRobot(), _14 = __read(_13), numberA3 = _14[0], robotAInfo = _14.slice(1), _13, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (_15 = [2, "trimmer", "trimming"], _16 = __read(_15), numberA3 = _16[0], robotAInfo = _16.slice(1), _15, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (_17 = __read(multiRobotA), multiRobotAInfo = _17.slice(0), multiRobotA, i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (_18 = getMultiRobot(), _19 = __read(_18), multiRobotAInfo = _19.slice(0), _18, i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (_20 = ["trimmer", ["trimming", "edging"]], _21 = __read(_20), multiRobotAInfo = _21.slice(0), _20, i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21;
//# sourceMappingURL=sourceMapValidationDestructuringForArrayBindingPattern2.js.map