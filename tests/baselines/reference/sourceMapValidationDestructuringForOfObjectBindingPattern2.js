//// [sourceMapValidationDestructuringForOfObjectBindingPattern2.ts]
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

let nameA: string, primaryA: string, secondaryA: string, i: number, skillA: string;
let name: string, primary: string, secondary: string, skill: string;

for ({name: nameA } of robots) {
    console.log(nameA);
}
for ({name: nameA } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } of multiRobots) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } of getMultiRobots()) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}
for ({name } of robots) {
    console.log(nameA);
}
for ({name } of getRobots()) {
    console.log(nameA);
}
for ({name } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({ skills: { primary, secondary } } of multiRobots) {
    console.log(primaryA);
}
for ({ skills: { primary, secondary } } of getMultiRobots()) {
    console.log(primaryA);
}
for ({ skills: { primary, secondary } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}


for ({name: nameA, skill: skillA } of robots) {
    console.log(nameA);
}
for ({name: nameA, skill: skillA } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA, skill: skillA } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of multiRobots) {
    console.log(nameA);
}
for ({name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of getMultiRobots()) {
    console.log(nameA);
}
for ({name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}
for ({name, skill } of robots) {
    console.log(nameA);
}
for ({name, skill } of getRobots()) {
    console.log(nameA);
}
for ({name, skill } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({name, skills: { primary, secondary } } of multiRobots) {
    console.log(nameA);
}
for ({name, skills: { primary, secondary } } of getMultiRobots()) {
    console.log(nameA);
}
for ({name, skills: { primary, secondary } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}

//// [sourceMapValidationDestructuringForOfObjectBindingPattern2.js]
var robots = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }];
var multiRobots = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }];
function getRobots() {
    return robots;
}
function getMultiRobots() {
    return multiRobots;
}
var nameA, primaryA, secondaryA, i, skillA;
var name, primary, secondary, skill;
for (var _i = 0, robots_1 = robots; _i < robots_1.length; _i++) {
    nameA = robots_1[_i].name;
    console.log(nameA);
}
for (var _a = 0, _b = getRobots(); _a < _b.length; _a++) {
    nameA = _b[_a].name;
    console.log(nameA);
}
for (var _c = 0, _d = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _c < _d.length; _c++) {
    nameA = _d[_c].name;
    console.log(nameA);
}
for (var _e = 0, multiRobots_1 = multiRobots; _e < multiRobots_1.length; _e++) {
    _15 = multiRobots_1[_e].skills, primaryA = _15.primary, secondaryA = _15.secondary;
    console.log(primaryA);
}
for (var _f = 0, _g = getMultiRobots(); _f < _g.length; _f++) {
    _16 = _g[_f].skills, primaryA = _16.primary, secondaryA = _16.secondary;
    console.log(primaryA);
}
for (var _h = 0, _j = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _h < _j.length; _h++) {
    _17 = _j[_h].skills, primaryA = _17.primary, secondaryA = _17.secondary;
    console.log(primaryA);
}
for (var _k = 0, robots_2 = robots; _k < robots_2.length; _k++) {
    name = robots_2[_k].name;
    console.log(nameA);
}
for (var _l = 0, _m = getRobots(); _l < _m.length; _l++) {
    name = _m[_l].name;
    console.log(nameA);
}
for (var _o = 0, _p = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _o < _p.length; _o++) {
    name = _p[_o].name;
    console.log(nameA);
}
for (var _q = 0, multiRobots_2 = multiRobots; _q < multiRobots_2.length; _q++) {
    _18 = multiRobots_2[_q].skills, primary = _18.primary, secondary = _18.secondary;
    console.log(primaryA);
}
for (var _r = 0, _s = getMultiRobots(); _r < _s.length; _r++) {
    _19 = _s[_r].skills, primary = _19.primary, secondary = _19.secondary;
    console.log(primaryA);
}
for (var _t = 0, _u = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _t < _u.length; _t++) {
    _20 = _u[_t].skills, primary = _20.primary, secondary = _20.secondary;
    console.log(primaryA);
}
for (var _v = 0, robots_3 = robots; _v < robots_3.length; _v++) {
    _21 = robots_3[_v], nameA = _21.name, skillA = _21.skill;
    console.log(nameA);
}
for (var _w = 0, _x = getRobots(); _w < _x.length; _w++) {
    _22 = _x[_w], nameA = _22.name, skillA = _22.skill;
    console.log(nameA);
}
for (var _y = 0, _z = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _y < _z.length; _y++) {
    _23 = _z[_y], nameA = _23.name, skillA = _23.skill;
    console.log(nameA);
}
for (var _0 = 0, multiRobots_3 = multiRobots; _0 < multiRobots_3.length; _0++) {
    _24 = multiRobots_3[_0], nameA = _24.name, _25 = _24.skills, primaryA = _25.primary, secondaryA = _25.secondary;
    console.log(nameA);
}
for (var _1 = 0, _2 = getMultiRobots(); _1 < _2.length; _1++) {
    _26 = _2[_1], nameA = _26.name, _27 = _26.skills, primaryA = _27.primary, secondaryA = _27.secondary;
    console.log(nameA);
}
for (var _3 = 0, _4 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _3 < _4.length; _3++) {
    _28 = _4[_3], nameA = _28.name, _29 = _28.skills, primaryA = _29.primary, secondaryA = _29.secondary;
    console.log(nameA);
}
for (var _5 = 0, robots_4 = robots; _5 < robots_4.length; _5++) {
    _30 = robots_4[_5], name = _30.name, skill = _30.skill;
    console.log(nameA);
}
for (var _6 = 0, _7 = getRobots(); _6 < _7.length; _6++) {
    _31 = _7[_6], name = _31.name, skill = _31.skill;
    console.log(nameA);
}
for (var _8 = 0, _9 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _8 < _9.length; _8++) {
    _32 = _9[_8], name = _32.name, skill = _32.skill;
    console.log(nameA);
}
for (var _10 = 0, multiRobots_4 = multiRobots; _10 < multiRobots_4.length; _10++) {
    _33 = multiRobots_4[_10], name = _33.name, _34 = _33.skills, primary = _34.primary, secondary = _34.secondary;
    console.log(nameA);
}
for (var _11 = 0, _12 = getMultiRobots(); _11 < _12.length; _11++) {
    _35 = _12[_11], name = _35.name, _36 = _35.skills, primary = _36.primary, secondary = _36.secondary;
    console.log(nameA);
}
for (var _13 = 0, _14 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _13 < _14.length; _13++) {
    _37 = _14[_13], name = _37.name, _38 = _37.skills, primary = _38.primary, secondary = _38.secondary;
    console.log(nameA);
}
var _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38;
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPattern2.js.map