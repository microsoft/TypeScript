//// [tests/cases/compiler/sourceMapValidationDestructuringForOfArrayBindingPattern.ts] ////

//// [sourceMapValidationDestructuringForOfArrayBindingPattern.ts]
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

for (let [, nameA] of robots) {
    console.log(nameA);
}
for (let [, nameA] of getRobots()) {
    console.log(nameA);
}
for (let [, nameA] of [robotA, robotB]) {
    console.log(nameA);
}
for (let [, [primarySkillA, secondarySkillA]] of multiRobots) {
    console.log(primarySkillA);
}
for (let [, [primarySkillA, secondarySkillA]] of getMultiRobots()) {
    console.log(primarySkillA);
}
for (let [, [primarySkillA, secondarySkillA]] of [multiRobotA, multiRobotB]) {
    console.log(primarySkillA);
}

for (let [numberB] of robots) {
    console.log(numberB);
}
for (let [numberB] of getRobots()) {
    console.log(numberB);
}
for (let [numberB] of [robotA, robotB]) {
    console.log(numberB);
}
for (let [nameB] of multiRobots) {
    console.log(nameB);
}
for (let [nameB] of getMultiRobots()) {
    console.log(nameB);
}
for (let [nameB] of [multiRobotA, multiRobotB]) {
    console.log(nameB);
}

for (let [numberA2, nameA2, skillA2] of robots) {
    console.log(nameA2);
}
for (let [numberA2, nameA2, skillA2] of getRobots()) {
    console.log(nameA2);
}
for (let [numberA2, nameA2, skillA2] of [robotA, robotB]) {
    console.log(nameA2);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] of multiRobots) {
    console.log(nameMA);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] of getMultiRobots()) {
    console.log(nameMA);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] of [multiRobotA, multiRobotB]) {
    console.log(nameMA);
}

for (let [numberA3, ...robotAInfo] of robots) {
    console.log(numberA3);
}
for (let [numberA3, ...robotAInfo] of getRobots()) {
    console.log(numberA3);
}
for (let [numberA3, ...robotAInfo] of [robotA, robotB]) {
    console.log(numberA3);
}
for (let [...multiRobotAInfo] of multiRobots) {
    console.log(multiRobotAInfo);
}
for (let [...multiRobotAInfo] of getMultiRobots()) {
    console.log(multiRobotAInfo);
}
for (let [...multiRobotAInfo] of [multiRobotA, multiRobotB]) {
    console.log(multiRobotAInfo);
}

//// [sourceMapValidationDestructuringForOfArrayBindingPattern.js]
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
for (var _i = 0, robots_1 = robots; _i < robots_1.length; _i++) {
    var _a = robots_1[_i], nameA = _a[1];
    console.log(nameA);
}
for (var _b = 0, _c = getRobots(); _b < _c.length; _b++) {
    var _d = _c[_b], nameA = _d[1];
    console.log(nameA);
}
for (var _e = 0, _f = [robotA, robotB]; _e < _f.length; _e++) {
    var _g = _f[_e], nameA = _g[1];
    console.log(nameA);
}
for (var _h = 0, multiRobots_1 = multiRobots; _h < multiRobots_1.length; _h++) {
    var _j = multiRobots_1[_h], _k = _j[1], primarySkillA = _k[0], secondarySkillA = _k[1];
    console.log(primarySkillA);
}
for (var _l = 0, _m = getMultiRobots(); _l < _m.length; _l++) {
    var _o = _m[_l], _p = _o[1], primarySkillA = _p[0], secondarySkillA = _p[1];
    console.log(primarySkillA);
}
for (var _q = 0, _r = [multiRobotA, multiRobotB]; _q < _r.length; _q++) {
    var _s = _r[_q], _t = _s[1], primarySkillA = _t[0], secondarySkillA = _t[1];
    console.log(primarySkillA);
}
for (var _u = 0, robots_2 = robots; _u < robots_2.length; _u++) {
    var numberB = robots_2[_u][0];
    console.log(numberB);
}
for (var _v = 0, _w = getRobots(); _v < _w.length; _v++) {
    var numberB = _w[_v][0];
    console.log(numberB);
}
for (var _x = 0, _y = [robotA, robotB]; _x < _y.length; _x++) {
    var numberB = _y[_x][0];
    console.log(numberB);
}
for (var _z = 0, multiRobots_2 = multiRobots; _z < multiRobots_2.length; _z++) {
    var nameB = multiRobots_2[_z][0];
    console.log(nameB);
}
for (var _0 = 0, _1 = getMultiRobots(); _0 < _1.length; _0++) {
    var nameB = _1[_0][0];
    console.log(nameB);
}
for (var _2 = 0, _3 = [multiRobotA, multiRobotB]; _2 < _3.length; _2++) {
    var nameB = _3[_2][0];
    console.log(nameB);
}
for (var _4 = 0, robots_3 = robots; _4 < robots_3.length; _4++) {
    var _5 = robots_3[_4], numberA2 = _5[0], nameA2 = _5[1], skillA2 = _5[2];
    console.log(nameA2);
}
for (var _6 = 0, _7 = getRobots(); _6 < _7.length; _6++) {
    var _8 = _7[_6], numberA2 = _8[0], nameA2 = _8[1], skillA2 = _8[2];
    console.log(nameA2);
}
for (var _9 = 0, _10 = [robotA, robotB]; _9 < _10.length; _9++) {
    var _11 = _10[_9], numberA2 = _11[0], nameA2 = _11[1], skillA2 = _11[2];
    console.log(nameA2);
}
for (var _12 = 0, multiRobots_3 = multiRobots; _12 < multiRobots_3.length; _12++) {
    var _13 = multiRobots_3[_12], nameMA = _13[0], _14 = _13[1], primarySkillA = _14[0], secondarySkillA = _14[1];
    console.log(nameMA);
}
for (var _15 = 0, _16 = getMultiRobots(); _15 < _16.length; _15++) {
    var _17 = _16[_15], nameMA = _17[0], _18 = _17[1], primarySkillA = _18[0], secondarySkillA = _18[1];
    console.log(nameMA);
}
for (var _19 = 0, _20 = [multiRobotA, multiRobotB]; _19 < _20.length; _19++) {
    var _21 = _20[_19], nameMA = _21[0], _22 = _21[1], primarySkillA = _22[0], secondarySkillA = _22[1];
    console.log(nameMA);
}
for (var _23 = 0, robots_4 = robots; _23 < robots_4.length; _23++) {
    var _24 = robots_4[_23], numberA3 = _24[0], robotAInfo = _24.slice(1);
    console.log(numberA3);
}
for (var _25 = 0, _26 = getRobots(); _25 < _26.length; _25++) {
    var _27 = _26[_25], numberA3 = _27[0], robotAInfo = _27.slice(1);
    console.log(numberA3);
}
for (var _28 = 0, _29 = [robotA, robotB]; _28 < _29.length; _28++) {
    var _30 = _29[_28], numberA3 = _30[0], robotAInfo = _30.slice(1);
    console.log(numberA3);
}
for (var _31 = 0, multiRobots_4 = multiRobots; _31 < multiRobots_4.length; _31++) {
    var multiRobotAInfo = multiRobots_4[_31].slice(0);
    console.log(multiRobotAInfo);
}
for (var _32 = 0, _33 = getMultiRobots(); _32 < _33.length; _32++) {
    var multiRobotAInfo = _33[_32].slice(0);
    console.log(multiRobotAInfo);
}
for (var _34 = 0, _35 = [multiRobotA, multiRobotB]; _34 < _35.length; _34++) {
    var multiRobotAInfo = _35[_34].slice(0);
    console.log(multiRobotAInfo);
}
//# sourceMappingURL=sourceMapValidationDestructuringForOfArrayBindingPattern.js.map