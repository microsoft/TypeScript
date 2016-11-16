//// [sourceMapValidationDestructuringForArrayBindingPattern.ts]
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

for (let [, nameA] = robotA, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let [, nameA] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let [, nameA] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let [, [primarySkillA, secondarySkillA]] = multiRobotA, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (let [, [primarySkillA, secondarySkillA]] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (let [, [primarySkillA, secondarySkillA]] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}

for (let [numberB] = robotA, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (let [numberB] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberB);
}
for (let [numberB] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberB);
}
for (let [nameB] = multiRobotA, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (let [nameB] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameB);
}
for (let [nameB] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameB);
}

for (let [numberA2, nameA2, skillA2] = robotA, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (let [numberA2, nameA2, skillA2] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (let [numberA2, nameA2, skillA2] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] = multiRobotA, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (let [nameMA, [primarySkillA, secondarySkillA]] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameMA);
}

for (let [numberA3, ...robotAInfo] = robotA, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (let [numberA3, ...robotAInfo] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (let [numberA3, ...robotAInfo] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (let [...multiRobotAInfo] = multiRobotA, i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (let [...multiRobotAInfo] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (let [...multiRobotAInfo] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}

//// [sourceMapValidationDestructuringForArrayBindingPattern.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
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
for (var _a = __read(robotA, 2), nameA = _a[1], i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _b = __read(getRobot(), 2), nameA = _b[1], i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _c = [2, "trimmer", "trimming"], nameA = _c[1], i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _d = __read(multiRobotA, 2), _e = __read(_d[1], 2), primarySkillA = _e[0], secondarySkillA = _e[1], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var _f = __read(getMultiRobot(), 2), _g = __read(_f[1], 2), primarySkillA = _g[0], secondarySkillA = _g[1], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var _h = ["trimmer", ["trimming", "edging"]], _j = __read(_h[1], 2), primarySkillA = _j[0], secondarySkillA = _j[1], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var _k = __read(robotA, 1), numberB = _k[0], i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var _l = __read(getRobot(), 1), numberB = _l[0], i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var numberB = [2, "trimmer", "trimming"][0], i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var _m = __read(multiRobotA, 1), nameB = _m[0], i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var _o = __read(getMultiRobot(), 1), nameB = _o[0], i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var nameB = ["trimmer", ["trimming", "edging"]][0], i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var _p = __read(robotA, 3), numberA2 = _p[0], nameA2 = _p[1], skillA2 = _p[2], i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _q = __read(getRobot(), 3), numberA2 = _q[0], nameA2 = _q[1], skillA2 = _q[2], i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _r = [2, "trimmer", "trimming"], numberA2 = _r[0], nameA2 = _r[1], skillA2 = _r[2], i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _s = __read(multiRobotA, 2), nameMA = _s[0], _t = __read(_s[1], 2), primarySkillA = _t[0], secondarySkillA = _t[1], i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var _u = __read(getMultiRobot(), 2), nameMA = _u[0], _v = __read(_u[1], 2), primarySkillA = _v[0], secondarySkillA = _v[1], i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var _w = ["trimmer", ["trimming", "edging"]], nameMA = _w[0], _x = __read(_w[1], 2), primarySkillA = _x[0], secondarySkillA = _x[1], i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var _y = __read(robotA), numberA3 = _y[0], robotAInfo = _y.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (var _z = __read(getRobot()), numberA3 = _z[0], robotAInfo = _z.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (var _0 = [2, "trimmer", "trimming"], numberA3 = _0[0], robotAInfo = _0.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (var _1 = __read(multiRobotA), multiRobotAInfo = _1.slice(0), i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (var _2 = __read(getMultiRobot()), multiRobotAInfo = _2.slice(0), i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (var multiRobotAInfo = ["trimmer", ["trimming", "edging"]].slice(0), i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
//# sourceMappingURL=sourceMapValidationDestructuringForArrayBindingPattern.js.map