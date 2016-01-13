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
    _f = multiRobots_1[_e].skills, primaryA = _f.primary, secondaryA = _f.secondary;
    console.log(primaryA);
}
for (var _g = 0, _h = getMultiRobots(); _g < _h.length; _g++) {
    _j = _h[_g].skills, primaryA = _j.primary, secondaryA = _j.secondary;
    console.log(primaryA);
}
for (var _k = 0, _l = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _k < _l.length; _k++) {
    _m = _l[_k].skills, primaryA = _m.primary, secondaryA = _m.secondary;
    console.log(primaryA);
}
for (var _o = 0, robots_2 = robots; _o < robots_2.length; _o++) {
    name = robots_2[_o].name;
    console.log(nameA);
}
for (var _p = 0, _q = getRobots(); _p < _q.length; _p++) {
    name = _q[_p].name;
    console.log(nameA);
}
for (var _r = 0, _s = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _r < _s.length; _r++) {
    name = _s[_r].name;
    console.log(nameA);
}
for (var _t = 0, multiRobots_2 = multiRobots; _t < multiRobots_2.length; _t++) {
    _u = multiRobots_2[_t].skills, primary = _u.primary, secondary = _u.secondary;
    console.log(primaryA);
}
for (var _v = 0, _w = getMultiRobots(); _v < _w.length; _v++) {
    _x = _w[_v].skills, primary = _x.primary, secondary = _x.secondary;
    console.log(primaryA);
}
for (var _y = 0, _z = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _y < _z.length; _y++) {
    _0 = _z[_y].skills, primary = _0.primary, secondary = _0.secondary;
    console.log(primaryA);
}
for (var _1 = 0, robots_3 = robots; _1 < robots_3.length; _1++) {
    _2 = robots_3[_1], nameA = _2.name, skillA = _2.skill;
    console.log(nameA);
}
for (var _3 = 0, _4 = getRobots(); _3 < _4.length; _3++) {
    _5 = _4[_3], nameA = _5.name, skillA = _5.skill;
    console.log(nameA);
}
for (var _6 = 0, _7 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _6 < _7.length; _6++) {
    _8 = _7[_6], nameA = _8.name, skillA = _8.skill;
    console.log(nameA);
}
for (var _9 = 0, multiRobots_3 = multiRobots; _9 < multiRobots_3.length; _9++) {
    _10 = multiRobots_3[_9], nameA = _10.name, _11 = _10.skills, primaryA = _11.primary, secondaryA = _11.secondary;
    console.log(nameA);
}
for (var _12 = 0, _13 = getMultiRobots(); _12 < _13.length; _12++) {
    _14 = _13[_12], nameA = _14.name, _15 = _14.skills, primaryA = _15.primary, secondaryA = _15.secondary;
    console.log(nameA);
}
for (var _16 = 0, _17 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _16 < _17.length; _16++) {
    _18 = _17[_16], nameA = _18.name, _19 = _18.skills, primaryA = _19.primary, secondaryA = _19.secondary;
    console.log(nameA);
}
for (var _20 = 0, robots_4 = robots; _20 < robots_4.length; _20++) {
    _21 = robots_4[_20], name = _21.name, skill = _21.skill;
    console.log(nameA);
}
for (var _22 = 0, _23 = getRobots(); _22 < _23.length; _22++) {
    _24 = _23[_22], name = _24.name, skill = _24.skill;
    console.log(nameA);
}
for (var _25 = 0, _26 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _25 < _26.length; _25++) {
    _27 = _26[_25], name = _27.name, skill = _27.skill;
    console.log(nameA);
}
for (var _28 = 0, multiRobots_4 = multiRobots; _28 < multiRobots_4.length; _28++) {
    _29 = multiRobots_4[_28], name = _29.name, _30 = _29.skills, primary = _30.primary, secondary = _30.secondary;
    console.log(nameA);
}
for (var _31 = 0, _32 = getMultiRobots(); _31 < _32.length; _31++) {
    _33 = _32[_31], name = _33.name, _34 = _33.skills, primary = _34.primary, secondary = _34.secondary;
    console.log(nameA);
}
for (var _35 = 0, _36 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _35 < _36.length; _35++) {
    _37 = _36[_35], name = _37.name, _38 = _37.skills, primary = _38.primary, secondary = _38.secondary;
    console.log(nameA);
}
var _f, _j, _m, _u, _x, _0, _2, _5, _8, _10, _11, _14, _15, _18, _19, _21, _24, _27, _29, _30, _33, _34, _37, _38;
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPattern2.js.map