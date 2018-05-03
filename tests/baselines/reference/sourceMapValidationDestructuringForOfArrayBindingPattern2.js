//// [sourceMapValidationDestructuringForOfArrayBindingPattern2.ts]
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

for ([, nameA] of robots) {
    console.log(nameA);
}
for ([, nameA] of getRobots()) {
    console.log(nameA);
}
for ([, nameA] of [robotA, robotB]) {
    console.log(nameA);
}
for ([, [primarySkillA, secondarySkillA]] of multiRobots) {
    console.log(primarySkillA);
}
for ([, [primarySkillA, secondarySkillA]] of getMultiRobots()) {
    console.log(primarySkillA);
}
for ([, [primarySkillA, secondarySkillA]] of [multiRobotA, multiRobotB]) {
    console.log(primarySkillA);
}

for ([numberB] of robots) {
    console.log(numberB);
}
for ([numberB] of getRobots()) {
    console.log(numberB);
}
for ([numberB] of [robotA, robotB]) {
    console.log(numberB);
}
for ([nameB] of multiRobots) {
    console.log(nameB);
}
for ([nameB] of getMultiRobots()) {
    console.log(nameB);
}
for ([nameB] of [multiRobotA, multiRobotB]) {
    console.log(nameB);
}

for ([numberA2, nameA2, skillA2] of robots) {
    console.log(nameA2);
}
for ([numberA2, nameA2, skillA2] of getRobots()) {
    console.log(nameA2);
}
for ([numberA2, nameA2, skillA2] of [robotA, robotB]) {
    console.log(nameA2);
}
for ([nameMA, [primarySkillA, secondarySkillA]] of multiRobots) {
    console.log(nameMA);
}
for ([nameMA, [primarySkillA, secondarySkillA]] of getMultiRobots()) {
    console.log(nameMA);
}
for ([nameMA, [primarySkillA, secondarySkillA]] of [multiRobotA, multiRobotB]) {
    console.log(nameMA);
}

for ([numberA3, ...robotAInfo] of robots) {
    console.log(numberA3);
}
for ([numberA3, ...robotAInfo] of getRobots()) {
    console.log(numberA3);
}
for ([numberA3, ...robotAInfo] of [robotA, robotB]) {
    console.log(numberA3);
}
for ([...multiRobotAInfo] of multiRobots) {
    console.log(multiRobotAInfo);
}
for ([...multiRobotAInfo] of getMultiRobots()) {
    console.log(multiRobotAInfo);
}
for ([...multiRobotAInfo] of [multiRobotA, multiRobotB]) {
    console.log(multiRobotAInfo);
}

//// [sourceMapValidationDestructuringForOfArrayBindingPattern2.js]
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
    _15 = robots_1[_i], nameA = _15[1];
    console.log(nameA);
}
for (var _a = 0, _b = getRobots(); _a < _b.length; _a++) {
    _16 = _b[_a], nameA = _16[1];
    console.log(nameA);
}
for (var _c = 0, _d = [robotA, robotB]; _c < _d.length; _c++) {
    _17 = _d[_c], nameA = _17[1];
    console.log(nameA);
}
for (var _e = 0, multiRobots_1 = multiRobots; _e < multiRobots_1.length; _e++) {
    _18 = multiRobots_1[_e], _19 = _18[1], primarySkillA = _19[0], secondarySkillA = _19[1];
    console.log(primarySkillA);
}
for (var _f = 0, _g = getMultiRobots(); _f < _g.length; _f++) {
    _20 = _g[_f], _21 = _20[1], primarySkillA = _21[0], secondarySkillA = _21[1];
    console.log(primarySkillA);
}
for (var _h = 0, _j = [multiRobotA, multiRobotB]; _h < _j.length; _h++) {
    _22 = _j[_h], _23 = _22[1], primarySkillA = _23[0], secondarySkillA = _23[1];
    console.log(primarySkillA);
}
for (var _k = 0, robots_2 = robots; _k < robots_2.length; _k++) {
    numberB = robots_2[_k][0];
    console.log(numberB);
}
for (var _l = 0, _m = getRobots(); _l < _m.length; _l++) {
    numberB = _m[_l][0];
    console.log(numberB);
}
for (var _o = 0, _p = [robotA, robotB]; _o < _p.length; _o++) {
    numberB = _p[_o][0];
    console.log(numberB);
}
for (var _q = 0, multiRobots_2 = multiRobots; _q < multiRobots_2.length; _q++) {
    nameB = multiRobots_2[_q][0];
    console.log(nameB);
}
for (var _r = 0, _s = getMultiRobots(); _r < _s.length; _r++) {
    nameB = _s[_r][0];
    console.log(nameB);
}
for (var _t = 0, _u = [multiRobotA, multiRobotB]; _t < _u.length; _t++) {
    nameB = _u[_t][0];
    console.log(nameB);
}
for (var _v = 0, robots_3 = robots; _v < robots_3.length; _v++) {
    _24 = robots_3[_v], numberA2 = _24[0], nameA2 = _24[1], skillA2 = _24[2];
    console.log(nameA2);
}
for (var _w = 0, _x = getRobots(); _w < _x.length; _w++) {
    _25 = _x[_w], numberA2 = _25[0], nameA2 = _25[1], skillA2 = _25[2];
    console.log(nameA2);
}
for (var _y = 0, _z = [robotA, robotB]; _y < _z.length; _y++) {
    _26 = _z[_y], numberA2 = _26[0], nameA2 = _26[1], skillA2 = _26[2];
    console.log(nameA2);
}
for (var _0 = 0, multiRobots_3 = multiRobots; _0 < multiRobots_3.length; _0++) {
    _27 = multiRobots_3[_0], nameMA = _27[0], _28 = _27[1], primarySkillA = _28[0], secondarySkillA = _28[1];
    console.log(nameMA);
}
for (var _1 = 0, _2 = getMultiRobots(); _1 < _2.length; _1++) {
    _29 = _2[_1], nameMA = _29[0], _30 = _29[1], primarySkillA = _30[0], secondarySkillA = _30[1];
    console.log(nameMA);
}
for (var _3 = 0, _4 = [multiRobotA, multiRobotB]; _3 < _4.length; _3++) {
    _31 = _4[_3], nameMA = _31[0], _32 = _31[1], primarySkillA = _32[0], secondarySkillA = _32[1];
    console.log(nameMA);
}
for (var _5 = 0, robots_4 = robots; _5 < robots_4.length; _5++) {
    _33 = robots_4[_5], numberA3 = _33[0], robotAInfo = _33.slice(1);
    console.log(numberA3);
}
for (var _6 = 0, _7 = getRobots(); _6 < _7.length; _6++) {
    _34 = _7[_6], numberA3 = _34[0], robotAInfo = _34.slice(1);
    console.log(numberA3);
}
for (var _8 = 0, _9 = [robotA, robotB]; _8 < _9.length; _8++) {
    _35 = _9[_8], numberA3 = _35[0], robotAInfo = _35.slice(1);
    console.log(numberA3);
}
for (var _10 = 0, multiRobots_4 = multiRobots; _10 < multiRobots_4.length; _10++) {
    multiRobotAInfo = multiRobots_4[_10].slice(0);
    console.log(multiRobotAInfo);
}
for (var _11 = 0, _12 = getMultiRobots(); _11 < _12.length; _11++) {
    multiRobotAInfo = _12[_11].slice(0);
    console.log(multiRobotAInfo);
}
for (var _13 = 0, _14 = [multiRobotA, multiRobotB]; _13 < _14.length; _13++) {
    multiRobotAInfo = _14[_13].slice(0);
    console.log(multiRobotAInfo);
}
var _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35;
//# sourceMappingURL=sourceMapValidationDestructuringForOfArrayBindingPattern2.js.map