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
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
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
for (var _a = __read(robotA, 2), _b = _a[1], nameA = _b === void 0 ? "name" : _b, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _c = __read(getRobot(), 2), _d = _c[1], nameA = _d === void 0 ? "name" : _d, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _e = [2, "trimmer", "trimming"], _f = _e[1], nameA = _f === void 0 ? "name" : _f, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _g = __read(multiRobotA, 2), _h = _g[1], _j = __read(_h === void 0 ? ["none", "none"] : _h, 2), _k = _j[0], primarySkillA = _k === void 0 ? "primary" : _k, _l = _j[1], secondarySkillA = _l === void 0 ? "secondary" : _l, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var _m = __read(getMultiRobot(), 2), _o = _m[1], _p = __read(_o === void 0 ? ["none", "none"] : _o, 2), _q = _p[0], primarySkillA = _q === void 0 ? "primary" : _q, _r = _p[1], secondarySkillA = _r === void 0 ? "secondary" : _r, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var _s = ["trimmer", ["trimming", "edging"]], _t = _s[1], _u = __read(_t === void 0 ? ["none", "none"] : _t, 2), _v = _u[0], primarySkillA = _v === void 0 ? "primary" : _v, _w = _u[1], secondarySkillA = _w === void 0 ? "secondary" : _w, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var _x = __read(robotA, 1), _y = _x[0], numberB = _y === void 0 ? -1 : _y, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var _z = __read(getRobot(), 1), _0 = _z[0], numberB = _0 === void 0 ? -1 : _0, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var _1 = [2, "trimmer", "trimming"][0], numberB = _1 === void 0 ? -1 : _1, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var _2 = __read(multiRobotA, 1), _3 = _2[0], nameB = _3 === void 0 ? "name" : _3, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var _4 = __read(getMultiRobot(), 1), _5 = _4[0], nameB = _5 === void 0 ? "name" : _5, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var _6 = ["trimmer", ["trimming", "edging"]][0], nameB = _6 === void 0 ? "name" : _6, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var _7 = __read(robotA, 3), _8 = _7[0], numberA2 = _8 === void 0 ? -1 : _8, _9 = _7[1], nameA2 = _9 === void 0 ? "name" : _9, _10 = _7[2], skillA2 = _10 === void 0 ? "skill" : _10, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _11 = __read(getRobot(), 3), _12 = _11[0], numberA2 = _12 === void 0 ? -1 : _12, _13 = _11[1], nameA2 = _13 === void 0 ? "name" : _13, _14 = _11[2], skillA2 = _14 === void 0 ? "skill" : _14, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _15 = [2, "trimmer", "trimming"], _16 = _15[0], numberA2 = _16 === void 0 ? -1 : _16, _17 = _15[1], nameA2 = _17 === void 0 ? "name" : _17, _18 = _15[2], skillA2 = _18 === void 0 ? "skill" : _18, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _19 = __read(multiRobotA, 2), _20 = _19[0], nameMA = _20 === void 0 ? "noName" : _20, _21 = _19[1], _22 = __read(_21 === void 0 ? ["none", "none"] : _21, 2), _23 = _22[0], primarySkillA = _23 === void 0 ? "primary" : _23, _24 = _22[1], secondarySkillA = _24 === void 0 ? "secondary" : _24, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var _25 = __read(getMultiRobot(), 2), _26 = _25[0], nameMA = _26 === void 0 ? "noName" : _26, _27 = _25[1], _28 = __read(_27 === void 0 ? ["none", "none"] : _27, 2), _29 = _28[0], primarySkillA = _29 === void 0 ? "primary" : _29, _30 = _28[1], secondarySkillA = _30 === void 0 ? "secondary" : _30, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var _31 = ["trimmer", ["trimming", "edging"]], _32 = _31[0], nameMA = _32 === void 0 ? "noName" : _32, _33 = _31[1], _34 = __read(_33 === void 0 ? ["none", "none"] : _33, 2), _35 = _34[0], primarySkillA = _35 === void 0 ? "primary" : _35, _36 = _34[1], secondarySkillA = _36 === void 0 ? "secondary" : _36, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var _37 = __read(robotA), _38 = _37[0], numberA3 = _38 === void 0 ? -1 : _38, robotAInfo = _37.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (var _39 = __read(getRobot()), _40 = _39[0], numberA3 = _40 === void 0 ? -1 : _40, robotAInfo = _39.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (var _41 = [2, "trimmer", "trimming"], _42 = _41[0], numberA3 = _42 === void 0 ? -1 : _42, robotAInfo = _41.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
//# sourceMappingURL=sourceMapValidationDestructuringForArrayBindingPatternDefaultValues.js.map