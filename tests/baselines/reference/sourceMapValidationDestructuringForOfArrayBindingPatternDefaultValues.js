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
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var __values = (this && this.__values) || function (o) { return (i = typeof Symbol === "function" && o[Symbol.iterator] || 0) ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } }; var i, d; };
var __step = (this && this.__step) || function (r) { return !(r.done || (r.done = (r.result = r.iterator.next()).done)); };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
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
try {
    for (var robots_1 = { iterator: __values(robots) }; __step(robots_1);) {
        var _a = __read(robots_1.result.value, 2), _b = _a[1], nameA = _b === void 0 ? "noName" : _b;
        console.log(nameA);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(robots_1); } finally { if (e_1) throw e_1.error; }
}
try {
    for (var iterator_1 = { iterator: __values(getRobots()) }; __step(iterator_1);) {
        var _c = __read(iterator_1.result.value, 2), _d = _c[1], nameA = _d === void 0 ? "noName" : _d;
        console.log(nameA);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try { __close(iterator_1); } finally { if (e_2) throw e_2.error; }
}
for (var _i = 0, _e = [robotA, robotB]; _i < _e.length; _i++) {
    var _f = __read(_e[_i], 2), _g = _f[1], nameA = _g === void 0 ? "noName" : _g;
    console.log(nameA);
}
try {
    for (var multiRobots_1 = { iterator: __values(multiRobots) }; __step(multiRobots_1);) {
        var _h = __read(multiRobots_1.result.value, 2), _j = _h[1], _k = __read(_j === void 0 ? ["skill1", "skill2"] : _j, 2), _l = _k[0], primarySkillA = _l === void 0 ? "primary" : _l, _m = _k[1], secondarySkillA = _m === void 0 ? "secondary" : _m;
        console.log(primarySkillA);
    }
}
catch (e_3_1) { e_3 = { error: e_3_1 }; }
finally {
    try { __close(multiRobots_1); } finally { if (e_3) throw e_3.error; }
}
try {
    for (var iterator_2 = { iterator: __values(getMultiRobots()) }; __step(iterator_2);) {
        var _o = __read(iterator_2.result.value, 2), _p = _o[1], _q = __read(_p === void 0 ? ["skill1", "skill2"] : _p, 2), _r = _q[0], primarySkillA = _r === void 0 ? "primary" : _r, _s = _q[1], secondarySkillA = _s === void 0 ? "secondary" : _s;
        console.log(primarySkillA);
    }
}
catch (e_4_1) { e_4 = { error: e_4_1 }; }
finally {
    try { __close(iterator_2); } finally { if (e_4) throw e_4.error; }
}
for (var _t = 0, _u = [multiRobotA, multiRobotB]; _t < _u.length; _t++) {
    var _v = __read(_u[_t], 2), _w = _v[1], _x = __read(_w === void 0 ? ["skill1", "skill2"] : _w, 2), _y = _x[0], primarySkillA = _y === void 0 ? "primary" : _y, _z = _x[1], secondarySkillA = _z === void 0 ? "secondary" : _z;
    console.log(primarySkillA);
}
try {
    for (var robots_2 = { iterator: __values(robots) }; __step(robots_2);) {
        var _0 = __read(robots_2.result.value, 1), _1 = _0[0], numberB = _1 === void 0 ? -1 : _1;
        console.log(numberB);
    }
}
catch (e_5_1) { e_5 = { error: e_5_1 }; }
finally {
    try { __close(robots_2); } finally { if (e_5) throw e_5.error; }
}
try {
    for (var iterator_3 = { iterator: __values(getRobots()) }; __step(iterator_3);) {
        var _2 = __read(iterator_3.result.value, 1), _3 = _2[0], numberB = _3 === void 0 ? -1 : _3;
        console.log(numberB);
    }
}
catch (e_6_1) { e_6 = { error: e_6_1 }; }
finally {
    try { __close(iterator_3); } finally { if (e_6) throw e_6.error; }
}
for (var _4 = 0, _5 = [robotA, robotB]; _4 < _5.length; _4++) {
    var _6 = __read(_5[_4], 1), _7 = _6[0], numberB = _7 === void 0 ? -1 : _7;
    console.log(numberB);
}
try {
    for (var multiRobots_2 = { iterator: __values(multiRobots) }; __step(multiRobots_2);) {
        var _8 = __read(multiRobots_2.result.value, 1), _9 = _8[0], nameB = _9 === void 0 ? "noName" : _9;
        console.log(nameB);
    }
}
catch (e_7_1) { e_7 = { error: e_7_1 }; }
finally {
    try { __close(multiRobots_2); } finally { if (e_7) throw e_7.error; }
}
try {
    for (var iterator_4 = { iterator: __values(getMultiRobots()) }; __step(iterator_4);) {
        var _10 = __read(iterator_4.result.value, 1), _11 = _10[0], nameB = _11 === void 0 ? "noName" : _11;
        console.log(nameB);
    }
}
catch (e_8_1) { e_8 = { error: e_8_1 }; }
finally {
    try { __close(iterator_4); } finally { if (e_8) throw e_8.error; }
}
for (var _12 = 0, _13 = [multiRobotA, multiRobotB]; _12 < _13.length; _12++) {
    var _14 = __read(_13[_12], 1), _15 = _14[0], nameB = _15 === void 0 ? "noName" : _15;
    console.log(nameB);
}
try {
    for (var robots_3 = { iterator: __values(robots) }; __step(robots_3);) {
        var _16 = __read(robots_3.result.value, 3), _17 = _16[0], numberA2 = _17 === void 0 ? -1 : _17, _18 = _16[1], nameA2 = _18 === void 0 ? "noName" : _18, _19 = _16[2], skillA2 = _19 === void 0 ? "skill" : _19;
        console.log(nameA2);
    }
}
catch (e_9_1) { e_9 = { error: e_9_1 }; }
finally {
    try { __close(robots_3); } finally { if (e_9) throw e_9.error; }
}
try {
    for (var iterator_5 = { iterator: __values(getRobots()) }; __step(iterator_5);) {
        var _20 = __read(iterator_5.result.value, 3), _21 = _20[0], numberA2 = _21 === void 0 ? -1 : _21, _22 = _20[1], nameA2 = _22 === void 0 ? "noName" : _22, _23 = _20[2], skillA2 = _23 === void 0 ? "skill" : _23;
        console.log(nameA2);
    }
}
catch (e_10_1) { e_10 = { error: e_10_1 }; }
finally {
    try { __close(iterator_5); } finally { if (e_10) throw e_10.error; }
}
for (var _24 = 0, _25 = [robotA, robotB]; _24 < _25.length; _24++) {
    var _26 = __read(_25[_24], 3), _27 = _26[0], numberA2 = _27 === void 0 ? -1 : _27, _28 = _26[1], nameA2 = _28 === void 0 ? "noName" : _28, _29 = _26[2], skillA2 = _29 === void 0 ? "skill" : _29;
    console.log(nameA2);
}
try {
    for (var multiRobots_3 = { iterator: __values(multiRobots) }; __step(multiRobots_3);) {
        var _30 = __read(multiRobots_3.result.value, 2), _31 = _30[0], nameMA = _31 === void 0 ? "noName" : _31, _32 = _30[1], _33 = __read(_32 === void 0 ? ["skill1", "skill2"] : _32, 2), _34 = _33[0], primarySkillA = _34 === void 0 ? "primary" : _34, _35 = _33[1], secondarySkillA = _35 === void 0 ? "secondary" : _35;
        console.log(nameMA);
    }
}
catch (e_11_1) { e_11 = { error: e_11_1 }; }
finally {
    try { __close(multiRobots_3); } finally { if (e_11) throw e_11.error; }
}
try {
    for (var iterator_6 = { iterator: __values(getMultiRobots()) }; __step(iterator_6);) {
        var _36 = __read(iterator_6.result.value, 2), _37 = _36[0], nameMA = _37 === void 0 ? "noName" : _37, _38 = _36[1], _39 = __read(_38 === void 0 ? ["skill1", "skill2"] : _38, 2), _40 = _39[0], primarySkillA = _40 === void 0 ? "primary" : _40, _41 = _39[1], secondarySkillA = _41 === void 0 ? "secondary" : _41;
        console.log(nameMA);
    }
}
catch (e_12_1) { e_12 = { error: e_12_1 }; }
finally {
    try { __close(iterator_6); } finally { if (e_12) throw e_12.error; }
}
for (var _42 = 0, _43 = [multiRobotA, multiRobotB]; _42 < _43.length; _42++) {
    var _44 = __read(_43[_42], 2), _45 = _44[0], nameMA = _45 === void 0 ? "noName" : _45, _46 = _44[1], _47 = __read(_46 === void 0 ? ["skill1", "skill2"] : _46, 2), _48 = _47[0], primarySkillA = _48 === void 0 ? "primary" : _48, _49 = _47[1], secondarySkillA = _49 === void 0 ? "secondary" : _49;
    console.log(nameMA);
}
try {
    for (var robots_4 = { iterator: __values(robots) }; __step(robots_4);) {
        var _50 = __read(robots_4.result.value), _51 = _50[0], numberA3 = _51 === void 0 ? -1 : _51, robotAInfo = _50.slice(1);
        console.log(numberA3);
    }
}
catch (e_13_1) { e_13 = { error: e_13_1 }; }
finally {
    try { __close(robots_4); } finally { if (e_13) throw e_13.error; }
}
try {
    for (var iterator_7 = { iterator: __values(getRobots()) }; __step(iterator_7);) {
        var _52 = __read(iterator_7.result.value), _53 = _52[0], numberA3 = _53 === void 0 ? -1 : _53, robotAInfo = _52.slice(1);
        console.log(numberA3);
    }
}
catch (e_14_1) { e_14 = { error: e_14_1 }; }
finally {
    try { __close(iterator_7); } finally { if (e_14) throw e_14.error; }
}
for (var _54 = 0, _55 = [robotA, robotB]; _54 < _55.length; _54++) {
    var _56 = __read(_55[_54]), _57 = _56[0], numberA3 = _57 === void 0 ? -1 : _57, robotAInfo = _56.slice(1);
    console.log(numberA3);
}
var e_1, e_2, e_3, e_4, e_5, e_6, e_7, e_8, e_9, e_10, e_11, e_12, e_13, e_14;
//# sourceMappingURL=sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues.js.map