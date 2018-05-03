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
    _10 = robots_1[_i], _11 = _10[1], nameA = _11 === void 0 ? "noName" : _11;
    console.log(nameA);
}
for (var _a = 0, _b = getRobots(); _a < _b.length; _a++) {
    _12 = _b[_a], _13 = _12[1], nameA = _13 === void 0 ? "noName" : _13;
    console.log(nameA);
}
for (var _c = 0, _d = [robotA, robotB]; _c < _d.length; _c++) {
    _14 = _d[_c], _15 = _14[1], nameA = _15 === void 0 ? "noName" : _15;
    console.log(nameA);
}
for (var _e = 0, multiRobots_1 = multiRobots; _e < multiRobots_1.length; _e++) {
    _16 = multiRobots_1[_e], _17 = _16[1], _18 = _17 === void 0 ? ["skill1", "skill2"] : _17, _19 = _18[0], primarySkillA = _19 === void 0 ? "primary" : _19, _20 = _18[1], secondarySkillA = _20 === void 0 ? "secondary" : _20;
    console.log(primarySkillA);
}
for (var _f = 0, _g = getMultiRobots(); _f < _g.length; _f++) {
    _21 = _g[_f], _22 = _21[1], _23 = _22 === void 0 ? ["skill1", "skill2"] : _22, _24 = _23[0], primarySkillA = _24 === void 0 ? "primary" : _24, _25 = _23[1], secondarySkillA = _25 === void 0 ? "secondary" : _25;
    console.log(primarySkillA);
}
for (var _h = 0, _j = [multiRobotA, multiRobotB]; _h < _j.length; _h++) {
    _26 = _j[_h], _27 = _26[1], _28 = _27 === void 0 ? ["skill1", "skill2"] : _27, _29 = _28[0], primarySkillA = _29 === void 0 ? "primary" : _29, _30 = _28[1], secondarySkillA = _30 === void 0 ? "secondary" : _30;
    console.log(primarySkillA);
}
for (var _k = 0, robots_2 = robots; _k < robots_2.length; _k++) {
    _31 = robots_2[_k][0], numberB = _31 === void 0 ? -1 : _31;
    console.log(numberB);
}
for (var _l = 0, _m = getRobots(); _l < _m.length; _l++) {
    _32 = _m[_l][0], numberB = _32 === void 0 ? -1 : _32;
    console.log(numberB);
}
for (var _o = 0, _p = [robotA, robotB]; _o < _p.length; _o++) {
    _33 = _p[_o][0], numberB = _33 === void 0 ? -1 : _33;
    console.log(numberB);
}
for (var _q = 0, multiRobots_2 = multiRobots; _q < multiRobots_2.length; _q++) {
    _34 = multiRobots_2[_q][0], nameB = _34 === void 0 ? "noName" : _34;
    console.log(nameB);
}
for (var _r = 0, _s = getMultiRobots(); _r < _s.length; _r++) {
    _35 = _s[_r][0], nameB = _35 === void 0 ? "noName" : _35;
    console.log(nameB);
}
for (var _t = 0, _u = [multiRobotA, multiRobotB]; _t < _u.length; _t++) {
    _36 = _u[_t][0], nameB = _36 === void 0 ? "noName" : _36;
    console.log(nameB);
}
for (var _v = 0, robots_3 = robots; _v < robots_3.length; _v++) {
    _37 = robots_3[_v], _38 = _37[0], numberA2 = _38 === void 0 ? -1 : _38, _39 = _37[1], nameA2 = _39 === void 0 ? "noName" : _39, _40 = _37[2], skillA2 = _40 === void 0 ? "skill" : _40;
    console.log(nameA2);
}
for (var _w = 0, _x = getRobots(); _w < _x.length; _w++) {
    _41 = _x[_w], _42 = _41[0], numberA2 = _42 === void 0 ? -1 : _42, _43 = _41[1], nameA2 = _43 === void 0 ? "noName" : _43, _44 = _41[2], skillA2 = _44 === void 0 ? "skill" : _44;
    console.log(nameA2);
}
for (var _y = 0, _z = [robotA, robotB]; _y < _z.length; _y++) {
    _45 = _z[_y], _46 = _45[0], numberA2 = _46 === void 0 ? -1 : _46, _47 = _45[1], nameA2 = _47 === void 0 ? "noName" : _47, _48 = _45[2], skillA2 = _48 === void 0 ? "skill" : _48;
    console.log(nameA2);
}
for (var _0 = 0, multiRobots_3 = multiRobots; _0 < multiRobots_3.length; _0++) {
    _49 = multiRobots_3[_0], _50 = _49[0], nameMA = _50 === void 0 ? "noName" : _50, _51 = _49[1], _52 = _51 === void 0 ? ["skill1", "skill2"] : _51, _53 = _52[0], primarySkillA = _53 === void 0 ? "primary" : _53, _54 = _52[1], secondarySkillA = _54 === void 0 ? "secondary" : _54;
    console.log(nameMA);
}
for (var _1 = 0, _2 = getMultiRobots(); _1 < _2.length; _1++) {
    _55 = _2[_1], _56 = _55[0], nameMA = _56 === void 0 ? "noName" : _56, _57 = _55[1], _58 = _57 === void 0 ? ["skill1", "skill2"] : _57, _59 = _58[0], primarySkillA = _59 === void 0 ? "primary" : _59, _60 = _58[1], secondarySkillA = _60 === void 0 ? "secondary" : _60;
    console.log(nameMA);
}
for (var _3 = 0, _4 = [multiRobotA, multiRobotB]; _3 < _4.length; _3++) {
    _61 = _4[_3], _62 = _61[0], nameMA = _62 === void 0 ? "noName" : _62, _63 = _61[1], _64 = _63 === void 0 ? ["skill1", "skill2"] : _63, _65 = _64[0], primarySkillA = _65 === void 0 ? "primary" : _65, _66 = _64[1], secondarySkillA = _66 === void 0 ? "secondary" : _66;
    console.log(nameMA);
}
for (var _5 = 0, robots_4 = robots; _5 < robots_4.length; _5++) {
    _67 = robots_4[_5], _68 = _67[0], numberA3 = _68 === void 0 ? -1 : _68, robotAInfo = _67.slice(1);
    console.log(numberA3);
}
for (var _6 = 0, _7 = getRobots(); _6 < _7.length; _6++) {
    _69 = _7[_6], _70 = _69[0], numberA3 = _70 === void 0 ? -1 : _70, robotAInfo = _69.slice(1);
    console.log(numberA3);
}
for (var _8 = 0, _9 = [robotA, robotB]; _8 < _9.length; _8++) {
    _71 = _9[_8], _72 = _71[0], numberA3 = _72 === void 0 ? -1 : _72, robotAInfo = _71.slice(1);
    console.log(numberA3);
}
var _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72;
//# sourceMappingURL=sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues2.js.map