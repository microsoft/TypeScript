//// [sourceMapValidationDestructuringForArrayBindingPattern2.ts]
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

let nameA: string, primarySkillA: string, secondarySkillA: string;
let numberB: number, nameB: string;
let numberA2: number, nameA2: string, skillA2: string, nameMA: string;
let numberA3: number, robotAInfo: (number | string)[], multiRobotAInfo: (string | [string, string])[];
let i: number;

for ([, nameA] = robotA, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ([, nameA] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for ([, nameA] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(nameA);
}
for ([, [primarySkillA, secondarySkillA]] = multiRobotA, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for ([, [primarySkillA, secondarySkillA]] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for ([, [primarySkillA, secondarySkillA]] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}

for ([numberB] = robotA, i = 0; i < 1; i++) {
    console.log(numberB);
}
for ([numberB] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberB);
}
for ([numberB] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberB);
}
for ([nameB] = multiRobotA, i = 0; i < 1; i++) {
    console.log(nameB);
}
for ([nameB] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameB);
}
for ([nameB] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameB);
}

for ([numberA2, nameA2, skillA2] = robotA, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for ([numberA2, nameA2, skillA2] = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA2);
}
for ([numberA2, nameA2, skillA2] = [2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(nameA2);
}
for ([nameMA, [primarySkillA, secondarySkillA]] = multiRobotA, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for ([nameMA, [primarySkillA, secondarySkillA]] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(nameMA);
}
for ([nameMA, [primarySkillA, secondarySkillA]] = ["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(nameMA);
}

for ([numberA3, ...robotAInfo] = robotA, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for ([numberA3, ...robotAInfo] = getRobot(), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for ([numberA3, ...robotAInfo] = <Robot>[2, "trimmer", "trimming"], i = 0; i < 1; i++) {
    console.log(numberA3);
}
for ([...multiRobotAInfo] = multiRobotA, i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for ([...multiRobotAInfo] = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for ([...multiRobotAInfo] = <MultiSkilledRobot>["trimmer", ["trimming", "edging"]], i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}

//// [sourceMapValidationDestructuringForArrayBindingPattern2.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
var robotA = [1, "mower", "mowing"];
function getRobot() {
    return robotA;
}
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
function getMultiRobot() {
    return multiRobotA;
}
var nameA, primarySkillA, secondarySkillA;
var numberB, nameB;
var numberA2, nameA2, skillA2, nameMA;
var numberA3, robotAInfo, multiRobotAInfo;
var i;
for (nameA = robotA[1], robotA, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_a = getRobot(), nameA = _a[1], _a, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_b = [2, "trimmer", "trimming"], nameA = _b[1], _b, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_c = multiRobotA[1], primarySkillA = _c[0], secondarySkillA = _c[1], multiRobotA, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_d = getMultiRobot(), _e = _d[1], primarySkillA = _e[0], secondarySkillA = _e[1], _d, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (_f = ["trimmer", ["trimming", "edging"]], _g = _f[1], primarySkillA = _g[0], secondarySkillA = _g[1], _f, i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (numberB = robotA[0], robotA, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_h = getRobot(), numberB = _h[0], _h, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (_j = [2, "trimmer", "trimming"], numberB = _j[0], _j, i = 0; i < 1; i++) {
    console.log(numberB);
}
for (nameB = multiRobotA[0], multiRobotA, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_k = getMultiRobot(), nameB = _k[0], _k, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (_l = ["trimmer", ["trimming", "edging"]], nameB = _l[0], _l, i = 0; i < 1; i++) {
    console.log(nameB);
}
for (numberA2 = robotA[0], nameA2 = robotA[1], skillA2 = robotA[2], robotA, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (_m = getRobot(), numberA2 = _m[0], nameA2 = _m[1], skillA2 = _m[2], _m, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (_o = [2, "trimmer", "trimming"], numberA2 = _o[0], nameA2 = _o[1], skillA2 = _o[2], _o, i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (nameMA = multiRobotA[0], _p = multiRobotA[1], primarySkillA = _p[0], secondarySkillA = _p[1], multiRobotA, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (_q = getMultiRobot(), nameMA = _q[0], _r = _q[1], primarySkillA = _r[0], secondarySkillA = _r[1], _q, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (_s = ["trimmer", ["trimming", "edging"]], nameMA = _s[0], _t = _s[1], primarySkillA = _t[0], secondarySkillA = _t[1], _s, i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (numberA3 = robotA[0], robotAInfo = robotA.slice(1), robotA, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (_u = getRobot(), numberA3 = _u[0], robotAInfo = _u.slice(1), _u, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (_v = [2, "trimmer", "trimming"], numberA3 = _v[0], robotAInfo = _v.slice(1), _v, i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (multiRobotAInfo = multiRobotA.slice(0), multiRobotA, i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (_w = getMultiRobot(), multiRobotAInfo = _w.slice(0), _w, i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (_x = ["trimmer", ["trimming", "edging"]], multiRobotAInfo = _x.slice(0), _x, i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
//# sourceMappingURL=sourceMapValidationDestructuringForArrayBindingPattern2.js.map