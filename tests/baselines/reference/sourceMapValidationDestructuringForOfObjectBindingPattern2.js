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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
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
for (var _0 = 0, _1 = getRobots(); _0 < _1.length; _0++) {
    nameA = _1[_0].name;
    console.log(nameA);
}
for (var _2 = 0, _3 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _2 < _3.length; _2++) {
    nameA = _3[_2].name;
    console.log(nameA);
}
for (var _4 = 0, multiRobots_1 = multiRobots; _4 < multiRobots_1.length; _4++) {
    _a = multiRobots_1[_4].skills, primaryA = _a.primary, secondaryA = _a.secondary;
    console.log(primaryA);
}
for (var _5 = 0, _6 = getMultiRobots(); _5 < _6.length; _5++) {
    _b = _6[_5].skills, primaryA = _b.primary, secondaryA = _b.secondary;
    console.log(primaryA);
}
for (var _7 = 0, _8 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _7 < _8.length; _7++) {
    _c = _8[_7].skills, primaryA = _c.primary, secondaryA = _c.secondary;
    console.log(primaryA);
}
for (var _9 = 0, robots_2 = robots; _9 < robots_2.length; _9++) {
    name = robots_2[_9].name;
    console.log(nameA);
}
for (var _10 = 0, _11 = getRobots(); _10 < _11.length; _10++) {
    name = _11[_10].name;
    console.log(nameA);
}
for (var _12 = 0, _13 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _12 < _13.length; _12++) {
    name = _13[_12].name;
    console.log(nameA);
}
for (var _14 = 0, multiRobots_2 = multiRobots; _14 < multiRobots_2.length; _14++) {
    _d = multiRobots_2[_14].skills, primary = _d.primary, secondary = _d.secondary;
    console.log(primaryA);
}
for (var _15 = 0, _16 = getMultiRobots(); _15 < _16.length; _15++) {
    _e = _16[_15].skills, primary = _e.primary, secondary = _e.secondary;
    console.log(primaryA);
}
for (var _17 = 0, _18 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _17 < _18.length; _17++) {
    _f = _18[_17].skills, primary = _f.primary, secondary = _f.secondary;
    console.log(primaryA);
}
for (var _19 = 0, robots_3 = robots; _19 < robots_3.length; _19++) {
    _g = robots_3[_19], nameA = _g.name, skillA = _g.skill;
    console.log(nameA);
}
for (var _20 = 0, _21 = getRobots(); _20 < _21.length; _20++) {
    _h = _21[_20], nameA = _h.name, skillA = _h.skill;
    console.log(nameA);
}
for (var _22 = 0, _23 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _22 < _23.length; _22++) {
    _j = _23[_22], nameA = _j.name, skillA = _j.skill;
    console.log(nameA);
}
for (var _24 = 0, multiRobots_3 = multiRobots; _24 < multiRobots_3.length; _24++) {
    _k = multiRobots_3[_24], nameA = _k.name, _l = _k.skills, primaryA = _l.primary, secondaryA = _l.secondary;
    console.log(nameA);
}
for (var _25 = 0, _26 = getMultiRobots(); _25 < _26.length; _25++) {
    _m = _26[_25], nameA = _m.name, _o = _m.skills, primaryA = _o.primary, secondaryA = _o.secondary;
    console.log(nameA);
}
for (var _27 = 0, _28 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _27 < _28.length; _27++) {
    _p = _28[_27], nameA = _p.name, _q = _p.skills, primaryA = _q.primary, secondaryA = _q.secondary;
    console.log(nameA);
}
for (var _29 = 0, robots_4 = robots; _29 < robots_4.length; _29++) {
    _r = robots_4[_29], name = _r.name, skill = _r.skill;
    console.log(nameA);
}
for (var _30 = 0, _31 = getRobots(); _30 < _31.length; _30++) {
    _s = _31[_30], name = _s.name, skill = _s.skill;
    console.log(nameA);
}
for (var _32 = 0, _33 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _32 < _33.length; _32++) {
    _t = _33[_32], name = _t.name, skill = _t.skill;
    console.log(nameA);
}
for (var _34 = 0, multiRobots_4 = multiRobots; _34 < multiRobots_4.length; _34++) {
    _u = multiRobots_4[_34], name = _u.name, _v = _u.skills, primary = _v.primary, secondary = _v.secondary;
    console.log(nameA);
}
for (var _35 = 0, _36 = getMultiRobots(); _35 < _36.length; _35++) {
    _w = _36[_35], name = _w.name, _x = _w.skills, primary = _x.primary, secondary = _x.secondary;
    console.log(nameA);
}
for (var _37 = 0, _38 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _37 < _38.length; _37++) {
    _y = _38[_37], name = _y.name, _z = _y.skills, primary = _z.primary, secondary = _z.secondary;
    console.log(nameA);
}
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPattern2.js.map