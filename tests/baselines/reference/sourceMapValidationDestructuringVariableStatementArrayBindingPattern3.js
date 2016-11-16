//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern3.ts]
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
type MultiSkilledRobot = [string, [string, string]];

var robotA: Robot = [1, "mower", "mowing"];
var robotB: Robot = [2, "trimmer", "trimming"];
var multiRobotA: MultiSkilledRobot = ["mower", ["mowing", ""]];
var multiRobotB: MultiSkilledRobot = ["trimmer", ["trimming", "edging"]];

let nameA: string, numberB: number, nameB: string, skillB: string;
let robotAInfo: (number | string)[];

let multiSkillB: [string, string], nameMB: string, primarySkillB: string, secondarySkillB: string;
let multiRobotAInfo: (string | [string, string])[];

[, nameA] = robotA;
[, nameB] = getRobotB();
[, nameB] = [2, "trimmer", "trimming"];
[, multiSkillB] = multiRobotB;
[, multiSkillB] = getMultiRobotB();
[, multiSkillB] = ["roomba", ["vaccum", "mopping"]];

[numberB] = robotB;
[numberB] = getRobotB();
[numberB] = [2, "trimmer", "trimming"];
[nameMB] = multiRobotB;
[nameMB] = getMultiRobotB();
[nameMB] = ["trimmer", ["trimming", "edging"]];

[numberB, nameB, skillB] = robotB;
[numberB, nameB, skillB] = getRobotB();
[numberB, nameB, skillB] = [2, "trimmer", "trimming"];
[nameMB, [primarySkillB, secondarySkillB]] = multiRobotB;
[nameMB, [primarySkillB, secondarySkillB]] = getMultiRobotB();
[nameMB, [primarySkillB, secondarySkillB]] = ["trimmer", ["trimming", "edging"]];

[numberB, ...robotAInfo] = robotB;
[numberB, ...robotAInfo] = getRobotB();
[numberB, ...robotAInfo] = <Robot>[2, "trimmer", "trimming"];
[...multiRobotAInfo] = multiRobotA;
[...multiRobotAInfo] = getMultiRobotB();
[...multiRobotAInfo] = ["trimmer", ["trimming", "edging"]];

if (nameA == nameB) {
    console.log(skillB);
}

function getRobotB() {
    return robotB;
}

function getMultiRobotB() {
    return multiRobotB;
}

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern3.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var robotA = [1, "mower", "mowing"];
var robotB = [2, "trimmer", "trimming"];
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
var nameA, numberB, nameB, skillB;
var robotAInfo;
var multiSkillB, nameMB, primarySkillB, secondarySkillB;
var multiRobotAInfo;
_a = __read(robotA, 2), nameA = _a[1];
_b = __read(getRobotB(), 2), nameB = _b[1];
_c = [2, "trimmer", "trimming"], nameB = _c[1];
_d = __read(multiRobotB, 2), multiSkillB = _d[1];
_e = __read(getMultiRobotB(), 2), multiSkillB = _e[1];
_f = ["roomba", ["vaccum", "mopping"]], multiSkillB = _f[1];
_g = __read(robotB, 1), numberB = _g[0];
_h = __read(getRobotB(), 1), numberB = _h[0];
numberB = [2, "trimmer", "trimming"][0];
_j = __read(multiRobotB, 1), nameMB = _j[0];
_k = __read(getMultiRobotB(), 1), nameMB = _k[0];
nameMB = ["trimmer", ["trimming", "edging"]][0];
_l = __read(robotB, 3), numberB = _l[0], nameB = _l[1], skillB = _l[2];
_m = __read(getRobotB(), 3), numberB = _m[0], nameB = _m[1], skillB = _m[2];
_o = [2, "trimmer", "trimming"], numberB = _o[0], nameB = _o[1], skillB = _o[2];
_p = __read(multiRobotB, 2), nameMB = _p[0], _q = __read(_p[1], 2), primarySkillB = _q[0], secondarySkillB = _q[1];
_r = __read(getMultiRobotB(), 2), nameMB = _r[0], _s = __read(_r[1], 2), primarySkillB = _s[0], secondarySkillB = _s[1];
_t = ["trimmer", ["trimming", "edging"]], nameMB = _t[0], _u = __read(_t[1], 2), primarySkillB = _u[0], secondarySkillB = _u[1];
_v = __read(robotB), numberB = _v[0], robotAInfo = _v.slice(1);
_w = __read(getRobotB()), numberB = _w[0], robotAInfo = _w.slice(1);
_x = __read([2, "trimmer", "trimming"]), numberB = _x[0], robotAInfo = _x.slice(1);
_y = __read(multiRobotA), multiRobotAInfo = _y.slice(0);
_z = __read(getMultiRobotB()), multiRobotAInfo = _z.slice(0);
multiRobotAInfo = ["trimmer", ["trimming", "edging"]].slice(0);
if (nameA == nameB) {
    console.log(skillB);
}
function getRobotB() {
    return robotB;
}
function getMultiRobotB() {
    return multiRobotB;
}
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPattern3.js.map