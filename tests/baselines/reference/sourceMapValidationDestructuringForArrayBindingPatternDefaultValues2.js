//// [sourceMapValidationDestructuringForArrayBindingPatternDefaultValues2.ts]
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

for ([, nameA = "name"] = robotA, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ([, nameA = "name"] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for ([, nameA = "name"] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(nameA);
}
for ([, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["none", "none"]] = multiRobotA, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for ([, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["none", "none"]] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for ([, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["none", "none"]] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}

for ([numberB = -1] = robotA, i = 0; i < 1; i++) {
    console.log(numberB);
}
for ([numberB = -1] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberB);
}
for ([numberB = -1] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberB);
}
for ([nameB = "name"] = multiRobotA, i = 0; i < 1; i++) {
    console.log(nameB);
}
for ([nameB = "name"] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameB);
}
for ([nameB = "name"] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameB);
}

for ([numberA2 = -1, nameA2 = "name", skillA2 = "skill"] = robotA, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for ([numberA2 = -1, nameA2 = "name", skillA2 = "skill"] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA2);
}
for ([numberA2 = -1, nameA2 = "name", skillA2 = "skill"] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
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
for ([nameMA = "noName",
    [
        primarySkillA = "primary",
        secondarySkillA = "secondary"
    ] = ["none", "none"]
] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameMA);
}
for ([nameMA = "noName",
    [
        primarySkillA = "primary",
        secondarySkillA = "secondary"
    ] = ["none", "none"]
] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameMA);
}

for ([numberA3 = -1, ...robotAInfo] = robotA, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for ([numberA3 = -1, ...robotAInfo] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for ([numberA3 = -1, ...robotAInfo] = <Robot>[2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberA3);
}

//// [sourceMapValidationDestructuringForArrayBindingPatternDefaultValues2.js]
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
for (_a = __read(robotA, 2), _b = _a[1], nameA = _b === void 0 ? "name" : _b, robotA, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_c = getRobot(), _d = __read(_c, 2), _e = _d[1], nameA = _e === void 0 ? "name" : _e, _c, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_f = [2, "trimmer", "trimming"], _g = __read(_f, 2), _h = _g[1], nameA = _h === void 0 ? "name" : _h, _f, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_j = __read(multiRobotA, 2), _k = _j[1], _l = __read(_k === void 0 ? ["none", "none"] : _k, 2), _m = _l[0], primarySkillA = _m === void 0 ? "primary" : _m, _o = _l[1], secondarySkillA = _o === void 0 ? "secondary" : _o, multiRobotA, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_p = getMultiRobot(), _q = __read(_p, 2), _r = _q[1], _s = __read(_r === void 0 ? ["none", "none"] : _r, 2), _t = _s[0], primarySkillA = _t === void 0 ? "primary" : _t, _u = _s[1], secondarySkillA = _u === void 0 ? "secondary" : _u, _p, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_v = ["trimmer", ["trimming", "edging"]], _w = __read(_v, 2), _x = _w[1], _y = __read(_x === void 0 ? ["none", "none"] : _x, 2), _z = _y[0], primarySkillA = _z === void 0 ? "primary" : _z, _0 = _y[1], secondarySkillA = _0 === void 0 ? "secondary" : _0, _v, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_1 = __read(robotA, 1), _2 = _1[0], numberB = _2 === void 0 ? -1 : _2, robotA, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_3 = getRobot(), _4 = __read(_3, 1), _5 = _4[0], numberB = _5 === void 0 ? -1 : _5, _3, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_6 = [2, "trimmer", "trimming"], _7 = __read(_6, 1), _8 = _7[0], numberB = _8 === void 0 ? -1 : _8, _6, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_9 = __read(multiRobotA, 1), _10 = _9[0], nameB = _10 === void 0 ? "name" : _10, multiRobotA, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_11 = getMultiRobot(), _12 = __read(_11, 1), _13 = _12[0], nameB = _13 === void 0 ? "name" : _13, _11, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_14 = ["trimmer", ["trimming", "edging"]], _15 = __read(_14, 1), _16 = _15[0], nameB = _16 === void 0 ? "name" : _16, _14, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_17 = __read(robotA, 3), _18 = _17[0], numberA2 = _18 === void 0 ? -1 : _18, _19 = _17[1], nameA2 = _19 === void 0 ? "name" : _19, _20 = _17[2], skillA2 = _20 === void 0 ? "skill" : _20, robotA, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (_21 = getRobot(), _22 = __read(_21, 3), _23 = _22[0], numberA2 = _23 === void 0 ? -1 : _23, _24 = _22[1], nameA2 = _24 === void 0 ? "name" : _24, _25 = _22[2], skillA2 = _25 === void 0 ? "skill" : _25, _21, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (_26 = [2, "trimmer", "trimming"], _27 = __read(_26, 3), _28 = _27[0], numberA2 = _28 === void 0 ? -1 : _28, _29 = _27[1], nameA2 = _29 === void 0 ? "name" : _29, _30 = _27[2], skillA2 = _30 === void 0 ? "skill" : _30, _26, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _31 = __read(multiRobotA, 2), _32 = _31[0], nameMA_1 = _32 === void 0 ? "noName" : _32, _33 = _31[1], _34 = __read(_33 === void 0 ? ["none", "none"] : _33, 2), _35 = _34[0], primarySkillA_1 = _35 === void 0 ? "primary" : _35, _36 = _34[1], secondarySkillA_1 = _36 === void 0 ? "secondary" : _36, i_1 = 0; i_1 < 1; i_1++) {
    console.log(nameMA_1);
}
for (_37 = getMultiRobot(), _38 = __read(_37, 2), _39 = _38[0], nameMA = _39 === void 0 ? "noName" : _39, _40 = _38[1], _41 = __read(_40 === void 0 ? ["none", "none"] : _40, 2), _42 = _41[0], primarySkillA = _42 === void 0 ? "primary" : _42, _43 = _41[1], secondarySkillA = _43 === void 0 ? "secondary" : _43, _37, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (_44 = ["trimmer", ["trimming", "edging"]], _45 = __read(_44, 2), _46 = _45[0], nameMA = _46 === void 0 ? "noName" : _46, _47 = _45[1], _48 = __read(_47 === void 0 ? ["none", "none"] : _47, 2), _49 = _48[0], primarySkillA = _49 === void 0 ? "primary" : _49, _50 = _48[1], secondarySkillA = _50 === void 0 ? "secondary" : _50, _44, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (_51 = __read(robotA), _52 = _51[0], numberA3 = _52 === void 0 ? -1 : _52, robotAInfo = _51.slice(1), robotA, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (_53 = getRobot(), _54 = __read(_53), _55 = _54[0], numberA3 = _55 === void 0 ? -1 : _55, robotAInfo = _54.slice(1), _53, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (_56 = [2, "trimmer", "trimming"], _57 = __read(_56), _58 = _57[0], numberA3 = _58 === void 0 ? -1 : _58, robotAInfo = _57.slice(1), _56, i = 0; i < 1; i++) {
    console.log(numberA3);
}
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58;
//# sourceMappingURL=sourceMapValidationDestructuringForArrayBindingPatternDefaultValues2.js.map