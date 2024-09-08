//// [tests/cases/compiler/sourceMapValidationDestructuringForOfArrayBindingPattern2.ts] ////

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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
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
    _a = robots_1[_i], nameA = _a[1];
    console.log(nameA);
}
for (var _x = 0, _y = getRobots(); _x < _y.length; _x++) {
    _b = _y[_x], nameA = _b[1];
    console.log(nameA);
}
for (var _z = 0, _0 = [robotA, robotB]; _z < _0.length; _z++) {
    _c = _0[_z], nameA = _c[1];
    console.log(nameA);
}
for (var _1 = 0, multiRobots_1 = multiRobots; _1 < multiRobots_1.length; _1++) {
    _d = multiRobots_1[_1], _e = _d[1], primarySkillA = _e[0], secondarySkillA = _e[1];
    console.log(primarySkillA);
}
for (var _2 = 0, _3 = getMultiRobots(); _2 < _3.length; _2++) {
    _f = _3[_2], _g = _f[1], primarySkillA = _g[0], secondarySkillA = _g[1];
    console.log(primarySkillA);
}
for (var _4 = 0, _5 = [multiRobotA, multiRobotB]; _4 < _5.length; _4++) {
    _h = _5[_4], _j = _h[1], primarySkillA = _j[0], secondarySkillA = _j[1];
    console.log(primarySkillA);
}
for (var _6 = 0, robots_2 = robots; _6 < robots_2.length; _6++) {
    numberB = robots_2[_6][0];
    console.log(numberB);
}
for (var _7 = 0, _8 = getRobots(); _7 < _8.length; _7++) {
    numberB = _8[_7][0];
    console.log(numberB);
}
for (var _9 = 0, _10 = [robotA, robotB]; _9 < _10.length; _9++) {
    numberB = _10[_9][0];
    console.log(numberB);
}
for (var _11 = 0, multiRobots_2 = multiRobots; _11 < multiRobots_2.length; _11++) {
    nameB = multiRobots_2[_11][0];
    console.log(nameB);
}
for (var _12 = 0, _13 = getMultiRobots(); _12 < _13.length; _12++) {
    nameB = _13[_12][0];
    console.log(nameB);
}
for (var _14 = 0, _15 = [multiRobotA, multiRobotB]; _14 < _15.length; _14++) {
    nameB = _15[_14][0];
    console.log(nameB);
}
for (var _16 = 0, robots_3 = robots; _16 < robots_3.length; _16++) {
    _k = robots_3[_16], numberA2 = _k[0], nameA2 = _k[1], skillA2 = _k[2];
    console.log(nameA2);
}
for (var _17 = 0, _18 = getRobots(); _17 < _18.length; _17++) {
    _l = _18[_17], numberA2 = _l[0], nameA2 = _l[1], skillA2 = _l[2];
    console.log(nameA2);
}
for (var _19 = 0, _20 = [robotA, robotB]; _19 < _20.length; _19++) {
    _m = _20[_19], numberA2 = _m[0], nameA2 = _m[1], skillA2 = _m[2];
    console.log(nameA2);
}
for (var _21 = 0, multiRobots_3 = multiRobots; _21 < multiRobots_3.length; _21++) {
    _o = multiRobots_3[_21], nameMA = _o[0], _p = _o[1], primarySkillA = _p[0], secondarySkillA = _p[1];
    console.log(nameMA);
}
for (var _22 = 0, _23 = getMultiRobots(); _22 < _23.length; _22++) {
    _q = _23[_22], nameMA = _q[0], _r = _q[1], primarySkillA = _r[0], secondarySkillA = _r[1];
    console.log(nameMA);
}
for (var _24 = 0, _25 = [multiRobotA, multiRobotB]; _24 < _25.length; _24++) {
    _s = _25[_24], nameMA = _s[0], _t = _s[1], primarySkillA = _t[0], secondarySkillA = _t[1];
    console.log(nameMA);
}
for (var _26 = 0, robots_4 = robots; _26 < robots_4.length; _26++) {
    _u = robots_4[_26], numberA3 = _u[0], robotAInfo = _u.slice(1);
    console.log(numberA3);
}
for (var _27 = 0, _28 = getRobots(); _27 < _28.length; _27++) {
    _v = _28[_27], numberA3 = _v[0], robotAInfo = _v.slice(1);
    console.log(numberA3);
}
for (var _29 = 0, _30 = [robotA, robotB]; _29 < _30.length; _29++) {
    _w = _30[_29], numberA3 = _w[0], robotAInfo = _w.slice(1);
    console.log(numberA3);
}
for (var _31 = 0, multiRobots_4 = multiRobots; _31 < multiRobots_4.length; _31++) {
    multiRobotAInfo = multiRobots_4[_31].slice(0);
    console.log(multiRobotAInfo);
}
for (var _32 = 0, _33 = getMultiRobots(); _32 < _33.length; _32++) {
    multiRobotAInfo = _33[_32].slice(0);
    console.log(multiRobotAInfo);
}
for (var _34 = 0, _35 = [multiRobotA, multiRobotB]; _34 < _35.length; _34++) {
    multiRobotAInfo = _35[_34].slice(0);
    console.log(multiRobotAInfo);
}
//# sourceMappingURL=sourceMapValidationDestructuringForOfArrayBindingPattern2.js.map