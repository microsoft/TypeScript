//// [sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues2.ts]
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
type MultiSkilledRobot = [string, [string, string]];

let robotA: Robot = [1, "mower", "mowing"];
let robotB: Robot = [2, "trimmer", "trimming"];
let robots = [robotA, robotB];
function getRobots() {
    return robots;
}

let multiRobotA: MultiSkilledRobot = ["mower", ["mowing", ""]];
let multiRobotB: MultiSkilledRobot = ["trimmer", ["trimming", "edging"]];
let multiRobots = [multiRobotA, multiRobotB];
function getMultiRobots() {
    return multiRobots;
}

let nameA: string, primarySkillA: string, secondarySkillA: string;
let numberB: number, nameB: string;
let numberA2: number, nameA2: string, skillA2: string, nameMA: string;
let numberA3: number, robotAInfo: (number | string)[], multiRobotAInfo: (string | [string, string])[];

for ([, nameA = "noName"] of robots) {
    console.log(nameA);
}
for ([, nameA = "noName"] of getRobots()) {
    console.log(nameA);
}
for ([, nameA = "noName"] of [robotA, robotB]) {
    console.log(nameA);
}
for ([, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of multiRobots) {
    console.log(primarySkillA);
}
for ([, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of getMultiRobots()) {
    console.log(primarySkillA);
}
for ([, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of [multiRobotA, multiRobotB]) {
    console.log(primarySkillA);
}

for ([numberB = -1] of robots) {
    console.log(numberB);
}
for ([numberB = -1] of getRobots()) {
    console.log(numberB);
}
for ([numberB = -1] of [robotA, robotB]) {
    console.log(numberB);
}
for ([nameB = "noName"] of multiRobots) {
    console.log(nameB);
}
for ([nameB = "noName"] of getMultiRobots()) {
    console.log(nameB);
}
for ([nameB = "noName"] of [multiRobotA, multiRobotB]) {
    console.log(nameB);
}

for ([numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of robots) {
    console.log(nameA2);
}
for ([numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of getRobots()) {
    console.log(nameA2);
}
for ([numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of [robotA, robotB]) {
    console.log(nameA2);
}
for ([nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of multiRobots) {
    console.log(nameMA);
}
for ([nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of getMultiRobots()) {
    console.log(nameMA);
}
for ([nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of [multiRobotA, multiRobotB]) {
    console.log(nameMA);
}

for ([numberA3 = -1, ...robotAInfo] of robots) {
    console.log(numberA3);
}
for ([numberA3 = -1, ...robotAInfo] of getRobots()) {
    console.log(numberA3);
}
for ([numberA3 = -1, ...robotAInfo] of [robotA, robotB]) {
    console.log(numberA3);
}

//// [sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues2.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38;
var robotA = [1, "mower", "mowing"];
var robotB = [2, "trimmer", "trimming"];
var robots = [robotA, robotB];
function getRobots() {
    return robots;
}
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
var multiRobots = [multiRobotA, multiRobotB];
function getMultiRobots() {
    return multiRobots;
}
var nameA, primarySkillA, secondarySkillA;
var numberB, nameB;
var numberA2, nameA2, skillA2, nameMA;
var numberA3, robotAInfo, multiRobotAInfo;
for (var _i = 0, robots_1 = robots; _i < robots_1.length; _i++) {
    _a = robots_1[_i], _b = _a[1], nameA = _b === void 0 ? "noName" : _b;
    console.log(nameA);
}
for (var _39 = 0, _40 = getRobots(); _39 < _40.length; _39++) {
    _c = _40[_39], _d = _c[1], nameA = _d === void 0 ? "noName" : _d;
    console.log(nameA);
}
for (var _41 = 0, _42 = [robotA, robotB]; _41 < _42.length; _41++) {
    _e = _42[_41], _f = _e[1], nameA = _f === void 0 ? "noName" : _f;
    console.log(nameA);
}
for (var _43 = 0, multiRobots_1 = multiRobots; _43 < multiRobots_1.length; _43++) {
    _g = multiRobots_1[_43], _h = _g[1], _j = _h === void 0 ? ["skill1", "skill2"] : _h, _k = _j[0], primarySkillA = _k === void 0 ? "primary" : _k, _l = _j[1], secondarySkillA = _l === void 0 ? "secondary" : _l;
    console.log(primarySkillA);
}
for (var _44 = 0, _45 = getMultiRobots(); _44 < _45.length; _44++) {
    _m = _45[_44], _o = _m[1], _p = _o === void 0 ? ["skill1", "skill2"] : _o, _q = _p[0], primarySkillA = _q === void 0 ? "primary" : _q, _r = _p[1], secondarySkillA = _r === void 0 ? "secondary" : _r;
    console.log(primarySkillA);
}
for (var _46 = 0, _47 = [multiRobotA, multiRobotB]; _46 < _47.length; _46++) {
    _s = _47[_46], _t = _s[1], _u = _t === void 0 ? ["skill1", "skill2"] : _t, _v = _u[0], primarySkillA = _v === void 0 ? "primary" : _v, _w = _u[1], secondarySkillA = _w === void 0 ? "secondary" : _w;
    console.log(primarySkillA);
}
for (var _48 = 0, robots_2 = robots; _48 < robots_2.length; _48++) {
    _x = robots_2[_48][0], numberB = _x === void 0 ? -1 : _x;
    console.log(numberB);
}
for (var _49 = 0, _50 = getRobots(); _49 < _50.length; _49++) {
    _y = _50[_49][0], numberB = _y === void 0 ? -1 : _y;
    console.log(numberB);
}
for (var _51 = 0, _52 = [robotA, robotB]; _51 < _52.length; _51++) {
    _z = _52[_51][0], numberB = _z === void 0 ? -1 : _z;
    console.log(numberB);
}
for (var _53 = 0, multiRobots_2 = multiRobots; _53 < multiRobots_2.length; _53++) {
    _0 = multiRobots_2[_53][0], nameB = _0 === void 0 ? "noName" : _0;
    console.log(nameB);
}
for (var _54 = 0, _55 = getMultiRobots(); _54 < _55.length; _54++) {
    _1 = _55[_54][0], nameB = _1 === void 0 ? "noName" : _1;
    console.log(nameB);
}
for (var _56 = 0, _57 = [multiRobotA, multiRobotB]; _56 < _57.length; _56++) {
    _2 = _57[_56][0], nameB = _2 === void 0 ? "noName" : _2;
    console.log(nameB);
}
for (var _58 = 0, robots_3 = robots; _58 < robots_3.length; _58++) {
    _3 = robots_3[_58], _4 = _3[0], numberA2 = _4 === void 0 ? -1 : _4, _5 = _3[1], nameA2 = _5 === void 0 ? "noName" : _5, _6 = _3[2], skillA2 = _6 === void 0 ? "skill" : _6;
    console.log(nameA2);
}
for (var _59 = 0, _60 = getRobots(); _59 < _60.length; _59++) {
    _7 = _60[_59], _8 = _7[0], numberA2 = _8 === void 0 ? -1 : _8, _9 = _7[1], nameA2 = _9 === void 0 ? "noName" : _9, _10 = _7[2], skillA2 = _10 === void 0 ? "skill" : _10;
    console.log(nameA2);
}
for (var _61 = 0, _62 = [robotA, robotB]; _61 < _62.length; _61++) {
    _11 = _62[_61], _12 = _11[0], numberA2 = _12 === void 0 ? -1 : _12, _13 = _11[1], nameA2 = _13 === void 0 ? "noName" : _13, _14 = _11[2], skillA2 = _14 === void 0 ? "skill" : _14;
    console.log(nameA2);
}
for (var _63 = 0, multiRobots_3 = multiRobots; _63 < multiRobots_3.length; _63++) {
    _15 = multiRobots_3[_63], _16 = _15[0], nameMA = _16 === void 0 ? "noName" : _16, _17 = _15[1], _18 = _17 === void 0 ? ["skill1", "skill2"] : _17, _19 = _18[0], primarySkillA = _19 === void 0 ? "primary" : _19, _20 = _18[1], secondarySkillA = _20 === void 0 ? "secondary" : _20;
    console.log(nameMA);
}
for (var _64 = 0, _65 = getMultiRobots(); _64 < _65.length; _64++) {
    _21 = _65[_64], _22 = _21[0], nameMA = _22 === void 0 ? "noName" : _22, _23 = _21[1], _24 = _23 === void 0 ? ["skill1", "skill2"] : _23, _25 = _24[0], primarySkillA = _25 === void 0 ? "primary" : _25, _26 = _24[1], secondarySkillA = _26 === void 0 ? "secondary" : _26;
    console.log(nameMA);
}
for (var _66 = 0, _67 = [multiRobotA, multiRobotB]; _66 < _67.length; _66++) {
    _27 = _67[_66], _28 = _27[0], nameMA = _28 === void 0 ? "noName" : _28, _29 = _27[1], _30 = _29 === void 0 ? ["skill1", "skill2"] : _29, _31 = _30[0], primarySkillA = _31 === void 0 ? "primary" : _31, _32 = _30[1], secondarySkillA = _32 === void 0 ? "secondary" : _32;
    console.log(nameMA);
}
for (var _68 = 0, robots_4 = robots; _68 < robots_4.length; _68++) {
    _33 = robots_4[_68], _34 = _33[0], numberA3 = _34 === void 0 ? -1 : _34, robotAInfo = _33.slice(1);
    console.log(numberA3);
}
for (var _69 = 0, _70 = getRobots(); _69 < _70.length; _69++) {
    _35 = _70[_69], _36 = _35[0], numberA3 = _36 === void 0 ? -1 : _36, robotAInfo = _35.slice(1);
    console.log(numberA3);
}
for (var _71 = 0, _72 = [robotA, robotB]; _71 < _72.length; _71++) {
    _37 = _72[_71], _38 = _37[0], numberA3 = _38 === void 0 ? -1 : _38, robotAInfo = _37.slice(1);
    console.log(numberA3);
}
//# sourceMappingURL=sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues2.js.map