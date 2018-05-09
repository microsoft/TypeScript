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
for (_f = robotA[1], nameA = _f === void 0 ? "name" : _f, robotA, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_g = getRobot(), _h = _g[1], nameA = _h === void 0 ? "name" : _h, _g, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_j = [2, "trimmer", "trimming"], _k = _j[1], nameA = _k === void 0 ? "name" : _k, _j, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_l = multiRobotA[1], _m = _l === void 0 ? ["none", "none"] : _l, _o = _m[0], primarySkillA = _o === void 0 ? "primary" : _o, _p = _m[1], secondarySkillA = _p === void 0 ? "secondary" : _p, multiRobotA, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_q = getMultiRobot(), _r = _q[1], _s = _r === void 0 ? ["none", "none"] : _r, _t = _s[0], primarySkillA = _t === void 0 ? "primary" : _t, _u = _s[1], secondarySkillA = _u === void 0 ? "secondary" : _u, _q, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_v = ["trimmer", ["trimming", "edging"]], _w = _v[1], _x = _w === void 0 ? ["none", "none"] : _w, _y = _x[0], primarySkillA = _y === void 0 ? "primary" : _y, _z = _x[1], secondarySkillA = _z === void 0 ? "secondary" : _z, _v, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_0 = robotA[0], numberB = _0 === void 0 ? -1 : _0, robotA, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_1 = getRobot(), _2 = _1[0], numberB = _2 === void 0 ? -1 : _2, _1, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_3 = [2, "trimmer", "trimming"], _4 = _3[0], numberB = _4 === void 0 ? -1 : _4, _3, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_5 = multiRobotA[0], nameB = _5 === void 0 ? "name" : _5, multiRobotA, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_6 = getMultiRobot(), _7 = _6[0], nameB = _7 === void 0 ? "name" : _7, _6, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_8 = ["trimmer", ["trimming", "edging"]], _9 = _8[0], nameB = _9 === void 0 ? "name" : _9, _8, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_10 = robotA[0], numberA2 = _10 === void 0 ? -1 : _10, _11 = robotA[1], nameA2 = _11 === void 0 ? "name" : _11, _12 = robotA[2], skillA2 = _12 === void 0 ? "skill" : _12, robotA, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (_13 = getRobot(), _14 = _13[0], numberA2 = _14 === void 0 ? -1 : _14, _15 = _13[1], nameA2 = _15 === void 0 ? "name" : _15, _16 = _13[2], skillA2 = _16 === void 0 ? "skill" : _16, _13, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (_17 = [2, "trimmer", "trimming"], _18 = _17[0], numberA2 = _18 === void 0 ? -1 : _18, _19 = _17[1], nameA2 = _19 === void 0 ? "name" : _19, _20 = _17[2], skillA2 = _20 === void 0 ? "skill" : _20, _17, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _a = multiRobotA[0], nameMA_1 = _a === void 0 ? "noName" : _a, _b = multiRobotA[1], _c = _b === void 0 ? ["none", "none"] : _b, _d = _c[0], primarySkillA_1 = _d === void 0 ? "primary" : _d, _e = _c[1], secondarySkillA_1 = _e === void 0 ? "secondary" : _e, i_1 = 0; i_1 < 1; i_1++) {
    console.log(nameMA_1);
}
for (_21 = getMultiRobot(), _22 = _21[0], nameMA = _22 === void 0 ? "noName" : _22, _23 = _21[1], _24 = _23 === void 0 ? ["none", "none"] : _23, _25 = _24[0], primarySkillA = _25 === void 0 ? "primary" : _25, _26 = _24[1], secondarySkillA = _26 === void 0 ? "secondary" : _26, _21, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (_27 = ["trimmer", ["trimming", "edging"]], _28 = _27[0], nameMA = _28 === void 0 ? "noName" : _28, _29 = _27[1], _30 = _29 === void 0 ? ["none", "none"] : _29, _31 = _30[0], primarySkillA = _31 === void 0 ? "primary" : _31, _32 = _30[1], secondarySkillA = _32 === void 0 ? "secondary" : _32, _27, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (_33 = robotA[0], numberA3 = _33 === void 0 ? -1 : _33, robotAInfo = robotA.slice(1), robotA, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (_34 = getRobot(), _35 = _34[0], numberA3 = _35 === void 0 ? -1 : _35, robotAInfo = _34.slice(1), _34, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (_36 = [2, "trimmer", "trimming"], _37 = _36[0], numberA3 = _37 === void 0 ? -1 : _37, robotAInfo = _36.slice(1), _36, i = 0; i < 1; i++) {
    console.log(numberA3);
}
var _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37;
//# sourceMappingURL=sourceMapValidationDestructuringForArrayBindingPatternDefaultValues2.js.map