//// [tests/cases/compiler/sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues.ts] ////

//// [sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues.ts]
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

for (let [, nameA = "noName"] of robots) {
    console.log(nameA);
}
for (let [, nameA = "noName"] of getRobots()) {
    console.log(nameA);
}
for (let [, nameA = "noName"] of [robotA, robotB]) {
    console.log(nameA);
}
for (let [, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of multiRobots) {
    console.log(primarySkillA);
}
for (let [, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of getMultiRobots()) {
    console.log(primarySkillA);
}
for (let [, [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of [multiRobotA, multiRobotB]) {
    console.log(primarySkillA);
}

for (let [numberB = -1] of robots) {
    console.log(numberB);
}
for (let [numberB = -1] of getRobots()) {
    console.log(numberB);
}
for (let [numberB = -1] of [robotA, robotB]) {
    console.log(numberB);
}
for (let [nameB = "noName"] of multiRobots) {
    console.log(nameB);
}
for (let [nameB = "noName"] of getMultiRobots()) {
    console.log(nameB);
}
for (let [nameB = "noName"] of [multiRobotA, multiRobotB]) {
    console.log(nameB);
}

for (let [numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of robots) {
    console.log(nameA2);
}
for (let [numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of getRobots()) {
    console.log(nameA2);
}
for (let [numberA2 = -1, nameA2 = "noName", skillA2 = "skill"] of [robotA, robotB]) {
    console.log(nameA2);
}
for (let [nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of multiRobots) {
    console.log(nameMA);
}
for (let [nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of getMultiRobots()) {
    console.log(nameMA);
}
for (let [nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["skill1", "skill2"]] of [multiRobotA, multiRobotB]) {
    console.log(nameMA);
}

for (let [numberA3 = -1, ...robotAInfo] of robots) {
    console.log(numberA3);
}
for (let [numberA3 = -1, ...robotAInfo] of getRobots()) {
    console.log(numberA3);
}
for (let [numberA3 = -1, ...robotAInfo] of [robotA, robotB]) {
    console.log(numberA3);
}

//// [sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues.js]
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
    var _a = robots_1[_i], _b = _a[1], nameA = _b === void 0 ? "noName" : _b;
    console.log(nameA);
}
for (var _c = 0, _d = getRobots(); _c < _d.length; _c++) {
    var _e = _d[_c], _f = _e[1], nameA = _f === void 0 ? "noName" : _f;
    console.log(nameA);
}
for (var _g = 0, _h = [robotA, robotB]; _g < _h.length; _g++) {
    var _j = _h[_g], _k = _j[1], nameA = _k === void 0 ? "noName" : _k;
    console.log(nameA);
}
for (var _l = 0, multiRobots_1 = multiRobots; _l < multiRobots_1.length; _l++) {
    var _m = multiRobots_1[_l], _o = _m[1], _p = _o === void 0 ? ["skill1", "skill2"] : _o, _q = _p[0], primarySkillA = _q === void 0 ? "primary" : _q, _r = _p[1], secondarySkillA = _r === void 0 ? "secondary" : _r;
    console.log(primarySkillA);
}
for (var _s = 0, _t = getMultiRobots(); _s < _t.length; _s++) {
    var _u = _t[_s], _v = _u[1], _w = _v === void 0 ? ["skill1", "skill2"] : _v, _x = _w[0], primarySkillA = _x === void 0 ? "primary" : _x, _y = _w[1], secondarySkillA = _y === void 0 ? "secondary" : _y;
    console.log(primarySkillA);
}
for (var _z = 0, _0 = [multiRobotA, multiRobotB]; _z < _0.length; _z++) {
    var _1 = _0[_z], _2 = _1[1], _3 = _2 === void 0 ? ["skill1", "skill2"] : _2, _4 = _3[0], primarySkillA = _4 === void 0 ? "primary" : _4, _5 = _3[1], secondarySkillA = _5 === void 0 ? "secondary" : _5;
    console.log(primarySkillA);
}
for (var _6 = 0, robots_2 = robots; _6 < robots_2.length; _6++) {
    var _7 = robots_2[_6][0], numberB = _7 === void 0 ? -1 : _7;
    console.log(numberB);
}
for (var _8 = 0, _9 = getRobots(); _8 < _9.length; _8++) {
    var _10 = _9[_8][0], numberB = _10 === void 0 ? -1 : _10;
    console.log(numberB);
}
for (var _11 = 0, _12 = [robotA, robotB]; _11 < _12.length; _11++) {
    var _13 = _12[_11][0], numberB = _13 === void 0 ? -1 : _13;
    console.log(numberB);
}
for (var _14 = 0, multiRobots_2 = multiRobots; _14 < multiRobots_2.length; _14++) {
    var _15 = multiRobots_2[_14][0], nameB = _15 === void 0 ? "noName" : _15;
    console.log(nameB);
}
for (var _16 = 0, _17 = getMultiRobots(); _16 < _17.length; _16++) {
    var _18 = _17[_16][0], nameB = _18 === void 0 ? "noName" : _18;
    console.log(nameB);
}
for (var _19 = 0, _20 = [multiRobotA, multiRobotB]; _19 < _20.length; _19++) {
    var _21 = _20[_19][0], nameB = _21 === void 0 ? "noName" : _21;
    console.log(nameB);
}
for (var _22 = 0, robots_3 = robots; _22 < robots_3.length; _22++) {
    var _23 = robots_3[_22], _24 = _23[0], numberA2 = _24 === void 0 ? -1 : _24, _25 = _23[1], nameA2 = _25 === void 0 ? "noName" : _25, _26 = _23[2], skillA2 = _26 === void 0 ? "skill" : _26;
    console.log(nameA2);
}
for (var _27 = 0, _28 = getRobots(); _27 < _28.length; _27++) {
    var _29 = _28[_27], _30 = _29[0], numberA2 = _30 === void 0 ? -1 : _30, _31 = _29[1], nameA2 = _31 === void 0 ? "noName" : _31, _32 = _29[2], skillA2 = _32 === void 0 ? "skill" : _32;
    console.log(nameA2);
}
for (var _33 = 0, _34 = [robotA, robotB]; _33 < _34.length; _33++) {
    var _35 = _34[_33], _36 = _35[0], numberA2 = _36 === void 0 ? -1 : _36, _37 = _35[1], nameA2 = _37 === void 0 ? "noName" : _37, _38 = _35[2], skillA2 = _38 === void 0 ? "skill" : _38;
    console.log(nameA2);
}
for (var _39 = 0, multiRobots_3 = multiRobots; _39 < multiRobots_3.length; _39++) {
    var _40 = multiRobots_3[_39], _41 = _40[0], nameMA = _41 === void 0 ? "noName" : _41, _42 = _40[1], _43 = _42 === void 0 ? ["skill1", "skill2"] : _42, _44 = _43[0], primarySkillA = _44 === void 0 ? "primary" : _44, _45 = _43[1], secondarySkillA = _45 === void 0 ? "secondary" : _45;
    console.log(nameMA);
}
for (var _46 = 0, _47 = getMultiRobots(); _46 < _47.length; _46++) {
    var _48 = _47[_46], _49 = _48[0], nameMA = _49 === void 0 ? "noName" : _49, _50 = _48[1], _51 = _50 === void 0 ? ["skill1", "skill2"] : _50, _52 = _51[0], primarySkillA = _52 === void 0 ? "primary" : _52, _53 = _51[1], secondarySkillA = _53 === void 0 ? "secondary" : _53;
    console.log(nameMA);
}
for (var _54 = 0, _55 = [multiRobotA, multiRobotB]; _54 < _55.length; _54++) {
    var _56 = _55[_54], _57 = _56[0], nameMA = _57 === void 0 ? "noName" : _57, _58 = _56[1], _59 = _58 === void 0 ? ["skill1", "skill2"] : _58, _60 = _59[0], primarySkillA = _60 === void 0 ? "primary" : _60, _61 = _59[1], secondarySkillA = _61 === void 0 ? "secondary" : _61;
    console.log(nameMA);
}
for (var _62 = 0, robots_4 = robots; _62 < robots_4.length; _62++) {
    var _63 = robots_4[_62], _64 = _63[0], numberA3 = _64 === void 0 ? -1 : _64, robotAInfo = _63.slice(1);
    console.log(numberA3);
}
for (var _65 = 0, _66 = getRobots(); _65 < _66.length; _65++) {
    var _67 = _66[_65], _68 = _67[0], numberA3 = _68 === void 0 ? -1 : _68, robotAInfo = _67.slice(1);
    console.log(numberA3);
}
for (var _69 = 0, _70 = [robotA, robotB]; _69 < _70.length; _69++) {
    var _71 = _70[_69], _72 = _71[0], numberA3 = _72 === void 0 ? -1 : _72, robotAInfo = _71.slice(1);
    console.log(numberA3);
}
//# sourceMappingURL=sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues.js.map