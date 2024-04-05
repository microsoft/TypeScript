//// [tests/cases/compiler/sourceMapValidationDestructuringForOfObjectBindingPattern.ts] ////

//// [sourceMapValidationDestructuringForOfObjectBindingPattern.ts]
declare var console: {
    log(msg: any): void;
}
interface Robot {
    name: string;
    skill: string;
}

interface MultiRobot {
    name: string;
    skills: {
        primary: string;
        secondary: string;
    };
}

let robots: Robot[] = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }];
let multiRobots: MultiRobot[] = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }];

function getRobots() {
    return robots;
}

function getMultiRobots() {
    return multiRobots;
}

for (let {name: nameA } of robots) {
    console.log(nameA);
}
for (let {name: nameA } of getRobots()) {
    console.log(nameA);
}
for (let {name: nameA } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for (let { skills: { primary: primaryA, secondary: secondaryA } } of multiRobots) {
    console.log(primaryA);
}
for (let { skills: { primary: primaryA, secondary: secondaryA } } of getMultiRobots()) {
    console.log(primaryA);
}
for (let { skills: { primary: primaryA, secondary: secondaryA } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}

for (let {name: nameA, skill: skillA } of robots) {
    console.log(nameA);
}
for (let {name: nameA, skill: skillA } of getRobots()) {
    console.log(nameA);
}
for (let {name: nameA, skill: skillA } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for (let {name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of multiRobots) {
    console.log(nameA);
}
for (let {name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of getMultiRobots()) {
    console.log(nameA);
}
for (let {name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}

//// [sourceMapValidationDestructuringForOfObjectBindingPattern.js]
var robots = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }];
var multiRobots = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }];
function getRobots() {
    return robots;
}
function getMultiRobots() {
    return multiRobots;
}
for (var _i = 0, robots_1 = robots; _i < robots_1.length; _i++) {
    var nameA = robots_1[_i].name;
    console.log(nameA);
}
for (var _a = 0, _b = getRobots(); _a < _b.length; _a++) {
    var nameA = _b[_a].name;
    console.log(nameA);
}
for (var _c = 0, _d = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _c < _d.length; _c++) {
    var nameA = _d[_c].name;
    console.log(nameA);
}
for (var _e = 0, multiRobots_1 = multiRobots; _e < multiRobots_1.length; _e++) {
    var _f = multiRobots_1[_e].skills, primaryA = _f.primary, secondaryA = _f.secondary;
    console.log(primaryA);
}
for (var _g = 0, _h = getMultiRobots(); _g < _h.length; _g++) {
    var _j = _h[_g].skills, primaryA = _j.primary, secondaryA = _j.secondary;
    console.log(primaryA);
}
for (var _k = 0, _l = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _k < _l.length; _k++) {
    var _m = _l[_k].skills, primaryA = _m.primary, secondaryA = _m.secondary;
    console.log(primaryA);
}
for (var _o = 0, robots_2 = robots; _o < robots_2.length; _o++) {
    var _p = robots_2[_o], nameA = _p.name, skillA = _p.skill;
    console.log(nameA);
}
for (var _q = 0, _r = getRobots(); _q < _r.length; _q++) {
    var _s = _r[_q], nameA = _s.name, skillA = _s.skill;
    console.log(nameA);
}
for (var _t = 0, _u = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _t < _u.length; _t++) {
    var _v = _u[_t], nameA = _v.name, skillA = _v.skill;
    console.log(nameA);
}
for (var _w = 0, multiRobots_2 = multiRobots; _w < multiRobots_2.length; _w++) {
    var _x = multiRobots_2[_w], nameA = _x.name, _y = _x.skills, primaryA = _y.primary, secondaryA = _y.secondary;
    console.log(nameA);
}
for (var _z = 0, _0 = getMultiRobots(); _z < _0.length; _z++) {
    var _1 = _0[_z], nameA = _1.name, _2 = _1.skills, primaryA = _2.primary, secondaryA = _2.secondary;
    console.log(nameA);
}
for (var _3 = 0, _4 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _3 < _4.length; _3++) {
    var _5 = _4[_3], nameA = _5.name, _6 = _5.skills, primaryA = _6.primary, secondaryA = _6.secondary;
    console.log(nameA);
}
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPattern.js.map