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
var robotA = [1, "mower", "mowing"];
function getRobot() {
    return robotA;
}
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
function getMultiRobot() {
    return multiRobotA;
}
for (var nameA = robotA[1], i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _a = getRobot(), nameA = _a[1], i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _b = [2, "trimmer", "trimming"], nameA = _b[1], i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _c = multiRobotA[1], primarySkillA = _c[0], secondarySkillA = _c[1], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var _d = getMultiRobot(), _e = _d[1], primarySkillA = _e[0], secondarySkillA = _e[1], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var _f = ["trimmer", ["trimming", "edging"]], _g = _f[1], primarySkillA = _g[0], secondarySkillA = _g[1], i = 0; i < 1; i++) {
    console.log(primarySkillA);
}
for (var numberB = robotA[0], i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var numberB = getRobot()[0], i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var numberB = [2, "trimmer", "trimming"][0], i = 0; i < 1; i++) {
    console.log(numberB);
}
for (var nameB = multiRobotA[0], i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var nameB = getMultiRobot()[0], i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var nameB = ["trimmer", ["trimming", "edging"]][0], i = 0; i < 1; i++) {
    console.log(nameB);
}
for (var numberA2 = robotA[0], nameA2 = robotA[1], skillA2 = robotA[2], i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _h = getRobot(), numberA2 = _h[0], nameA2 = _h[1], skillA2 = _h[2], i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var _j = [2, "trimmer", "trimming"], numberA2 = _j[0], nameA2 = _j[1], skillA2 = _j[2], i = 0; i < 1; i++) {
    console.log(nameA2);
}
for (var nameMA = multiRobotA[0], _k = multiRobotA[1], primarySkillA = _k[0], secondarySkillA = _k[1], i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var _l = getMultiRobot(), nameMA = _l[0], _m = _l[1], primarySkillA = _m[0], secondarySkillA = _m[1], i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var _o = ["trimmer", ["trimming", "edging"]], nameMA = _o[0], _p = _o[1], primarySkillA = _p[0], secondarySkillA = _p[1], i = 0; i < 1; i++) {
    console.log(nameMA);
}
for (var numberA3 = robotA[0], robotAInfo = robotA.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (var _q = getRobot(), numberA3 = _q[0], robotAInfo = _q.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (var _r = [2, "trimmer", "trimming"], numberA3 = _r[0], robotAInfo = _r.slice(1), i = 0; i < 1; i++) {
    console.log(numberA3);
}
for (var multiRobotAInfo = multiRobotA.slice(0), i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (var multiRobotAInfo = getMultiRobot().slice(0), i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
for (var multiRobotAInfo = ["trimmer", ["trimming", "edging"]].slice(0), i = 0; i < 1; i++) {
    console.log(multiRobotAInfo);
}
//# sourceMappingURL=sourceMapValidationDestructuringForArrayBindingPattern.js.map