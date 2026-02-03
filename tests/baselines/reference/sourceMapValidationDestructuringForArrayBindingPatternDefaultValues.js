//// [tests/cases/compiler/sourceMapValidationDestructuringForArrayBindingPatternDefaultValues.ts] ////

//// [sourceMapValidationDestructuringForArrayBindingPatternDefaultValues.ts]
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

//// [sourceMapValidationDestructuringForArrayBindingPatternDefaultValues.js]
var robotA = [1, "mower", "mowing"];
function getRobot() {
    return robotA;
}
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
function getMultiRobot() {
    return multiRobotA;
}
for (var _a = robotA[1], nameA = _a === void 0 ? "name" : _a, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _b = getRobot(), _c = _b[1], nameA = _c === void 0 ? "name" : _c, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _d = [2, "trimmer", "trimming"], _e = _d[1], nameA = _e === void 0 ? "name" : _e, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _f = multiRobotA[1], _g = _f === void 0 ? ["none", "none"] : _f, _h = _g[0], primarySkillA = _h === void 0 ? "primary" : _h, _j = _g[1], secondarySkillA = _j === void 0 ? "secondary" : _j, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var _k = getMultiRobot(), _l = _k[1], _m = _l === void 0 ? ["none", "none"] : _l, _o = _m[0], primarySkillA = _o === void 0 ? "primary" : _o, _p = _m[1], secondarySkillA = _p === void 0 ? "secondary" : _p, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var _q = ["trimmer", ["trimming", "edging"]], _r = _q[1], _s = _r === void 0 ? ["none", "none"] : _r, _t = _s[0], primarySkillA = _t === void 0 ? "primary" : _t, _u = _s[1], secondarySkillA = _u === void 0 ? "secondary" : _u, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var _v = robotA[0], numberB = _v === void 0 ? -1 : _v, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var _w = getRobot()[0], numberB = _w === void 0 ? -1 : _w, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var _x = [2, "trimmer", "trimming"][0], numberB = _x === void 0 ? -1 : _x, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var _y = multiRobotA[0], nameB = _y === void 0 ? "name" : _y, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var _z = getMultiRobot()[0], nameB = _z === void 0 ? "name" : _z, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var _0 = ["trimmer", ["trimming", "edging"]][0], nameB = _0 === void 0 ? "name" : _0, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var _1 = robotA[0], numberA2 = _1 === void 0 ? -1 : _1, _2 = robotA[1], nameA2 = _2 === void 0 ? "name" : _2, _3 = robotA[2], skillA2 = _3 === void 0 ? "skill" : _3, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _4 = getRobot(), _5 = _4[0], numberA2 = _5 === void 0 ? -1 : _5, _6 = _4[1], nameA2 = _6 === void 0 ? "name" : _6, _7 = _4[2], skillA2 = _7 === void 0 ? "skill" : _7, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _8 = [2, "trimmer", "trimming"], _9 = _8[0], numberA2 = _9 === void 0 ? -1 : _9, _10 = _8[1], nameA2 = _10 === void 0 ? "name" : _10, _11 = _8[2], skillA2 = _11 === void 0 ? "skill" : _11, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _12 = multiRobotA[0], nameMA = _12 === void 0 ? "noName" : _12, _13 = multiRobotA[1], _14 = _13 === void 0 ? ["none", "none"] : _13, _15 = _14[0], primarySkillA = _15 === void 0 ? "primary" : _15, _16 = _14[1], secondarySkillA = _16 === void 0 ? "secondary" : _16, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var _17 = getMultiRobot(), _18 = _17[0], nameMA = _18 === void 0 ? "noName" : _18, _19 = _17[1], _20 = _19 === void 0 ? ["none", "none"] : _19, _21 = _20[0], primarySkillA = _21 === void 0 ? "primary" : _21, _22 = _20[1], secondarySkillA = _22 === void 0 ? "secondary" : _22, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var _23 = ["trimmer", ["trimming", "edging"]], _24 = _23[0], nameMA = _24 === void 0 ? "noName" : _24, _25 = _23[1], _26 = _25 === void 0 ? ["none", "none"] : _25, _27 = _26[0], primarySkillA = _27 === void 0 ? "primary" : _27, _28 = _26[1], secondarySkillA = _28 === void 0 ? "secondary" : _28, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var _29 = robotA[0], numberA3 = _29 === void 0 ? -1 : _29, robotAInfo = robotA.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (var _30 = getRobot(), _31 = _30[0], numberA3 = _31 === void 0 ? -1 : _31, robotAInfo = _30.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (var _32 = [2, "trimmer", "trimming"], _33 = _32[0], numberA3 = _33 === void 0 ? -1 : _33, robotAInfo = _32.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
//# sourceMappingURL=sourceMapValidationDestructuringForArrayBindingPatternDefaultValues.js.map