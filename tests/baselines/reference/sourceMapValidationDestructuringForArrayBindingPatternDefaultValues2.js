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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28;
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
for (_a = robotA[1], nameA = _a === void 0 ? "name" : _a, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_b = getRobot(), _c = _b[1], nameA = _c === void 0 ? "name" : _c, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_d = [2, "trimmer", "trimming"], _e = _d[1], nameA = _e === void 0 ? "name" : _e, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_f = multiRobotA[1], _g = _f === void 0 ? ["none", "none"] : _f, _h = _g[0], primarySkillA = _h === void 0 ? "primary" : _h, _j = _g[1], secondarySkillA = _j === void 0 ? "secondary" : _j, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_k = getMultiRobot(), _l = _k[1], _m = _l === void 0 ? ["none", "none"] : _l, _o = _m[0], primarySkillA = _o === void 0 ? "primary" : _o, _p = _m[1], secondarySkillA = _p === void 0 ? "secondary" : _p, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_q = ["trimmer", ["trimming", "edging"]], _r = _q[1], _s = _r === void 0 ? ["none", "none"] : _r, _t = _s[0], primarySkillA = _t === void 0 ? "primary" : _t, _u = _s[1], secondarySkillA = _u === void 0 ? "secondary" : _u, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_v = robotA[0], numberB = _v === void 0 ? -1 : _v, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_w = getRobot()[0], numberB = _w === void 0 ? -1 : _w, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_x = [2, "trimmer", "trimming"][0], numberB = _x === void 0 ? -1 : _x, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_y = multiRobotA[0], nameB = _y === void 0 ? "name" : _y, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_z = getMultiRobot()[0], nameB = _z === void 0 ? "name" : _z, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_0 = ["trimmer", ["trimming", "edging"]][0], nameB = _0 === void 0 ? "name" : _0, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_1 = robotA[0], numberA2 = _1 === void 0 ? -1 : _1, _2 = robotA[1], nameA2 = _2 === void 0 ? "name" : _2, _3 = robotA[2], skillA2 = _3 === void 0 ? "skill" : _3, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (_4 = getRobot(), _5 = _4[0], numberA2 = _5 === void 0 ? -1 : _5, _6 = _4[1], nameA2 = _6 === void 0 ? "name" : _6, _7 = _4[2], skillA2 = _7 === void 0 ? "skill" : _7, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (_8 = [2, "trimmer", "trimming"], _9 = _8[0], numberA2 = _9 === void 0 ? -1 : _9, _10 = _8[1], nameA2 = _10 === void 0 ? "name" : _10, _11 = _8[2], skillA2 = _11 === void 0 ? "skill" : _11, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _29 = multiRobotA[0], nameMA_1 = _29 === void 0 ? "noName" : _29, _30 = multiRobotA[1], _31 = _30 === void 0 ? ["none", "none"] : _30, _32 = _31[0], primarySkillA_1 = _32 === void 0 ? "primary" : _32, _33 = _31[1], secondarySkillA_1 = _33 === void 0 ? "secondary" : _33, i_1 = 0; i_1 < 1; i_1++) {
    console.log(nameMA_1);
}
for (_12 = getMultiRobot(), _13 = _12[0], nameMA = _13 === void 0 ? "noName" : _13, _14 = _12[1], _15 = _14 === void 0 ? ["none", "none"] : _14, _16 = _15[0], primarySkillA = _16 === void 0 ? "primary" : _16, _17 = _15[1], secondarySkillA = _17 === void 0 ? "secondary" : _17, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (_18 = ["trimmer", ["trimming", "edging"]], _19 = _18[0], nameMA = _19 === void 0 ? "noName" : _19, _20 = _18[1], _21 = _20 === void 0 ? ["none", "none"] : _20, _22 = _21[0], primarySkillA = _22 === void 0 ? "primary" : _22, _23 = _21[1], secondarySkillA = _23 === void 0 ? "secondary" : _23, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (_24 = robotA[0], numberA3 = _24 === void 0 ? -1 : _24, robotAInfo = robotA.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (_25 = getRobot(), _26 = _25[0], numberA3 = _26 === void 0 ? -1 : _26, robotAInfo = _25.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (_27 = [2, "trimmer", "trimming"], _28 = _27[0], numberA3 = _28 === void 0 ? -1 : _28, robotAInfo = _27.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
//# sourceMappingURL=sourceMapValidationDestructuringForArrayBindingPatternDefaultValues2.js.map