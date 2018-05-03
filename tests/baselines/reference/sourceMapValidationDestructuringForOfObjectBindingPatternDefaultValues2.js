//// [sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues2.ts]
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

for ({name: nameA = "noName" } of robots) {
    console.log(nameA);
}
for ({name: nameA = "noName" } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA = "noName" } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({ skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of multiRobots) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of getMultiRobots()) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of
    <MultiRobot[]>[{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
        { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}

for ({ name = "noName" } of robots) {
    console.log(nameA);
}
for ({ name = "noName" } of getRobots()) {
    console.log(nameA);
}
for ({ name = "noName" } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of multiRobots) {
    console.log(primaryA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of getMultiRobots()) {
    console.log(primaryA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}


for ({name: nameA = "noName", skill: skillA = "noSkill" } of robots) {
    console.log(nameA);
}
for ({name: nameA = "noName", skill: skillA = "noSkill"  } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA = "noName", skill: skillA = "noSkill"  } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of multiRobots) {
    console.log(nameA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of getMultiRobots()) {
    console.log(nameA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of <MultiRobot[]>[{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}

for ({ name = "noName", skill  = "noSkill" } of robots) {
    console.log(nameA);
}
for ({ name = "noName", skill = "noSkill"  } of getRobots()) {
    console.log(nameA);
}
for ({ name = "noName", skill  = "noSkill" } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of multiRobots) {
    console.log(nameA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of getMultiRobots()) {
    console.log(nameA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}

//// [sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues2.js]
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
    _15 = robots_1[_i].name, nameA = _15 === void 0 ? "noName" : _15;
    console.log(nameA);
}
for (var _a = 0, _b = getRobots(); _a < _b.length; _a++) {
    _16 = _b[_a].name, nameA = _16 === void 0 ? "noName" : _16;
    console.log(nameA);
}
for (var _c = 0, _d = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _c < _d.length; _c++) {
    _17 = _d[_c].name, nameA = _17 === void 0 ? "noName" : _17;
    console.log(nameA);
}
for (var _e = 0, multiRobots_1 = multiRobots; _e < multiRobots_1.length; _e++) {
    _18 = multiRobots_1[_e].skills, _19 = _18 === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _18, _20 = _19.primary, primaryA = _20 === void 0 ? "primary" : _20, _21 = _19.secondary, secondaryA = _21 === void 0 ? "secondary" : _21;
    console.log(primaryA);
}
for (var _f = 0, _g = getMultiRobots(); _f < _g.length; _f++) {
    _22 = _g[_f].skills, _23 = _22 === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _22, _24 = _23.primary, primaryA = _24 === void 0 ? "primary" : _24, _25 = _23.secondary, secondaryA = _25 === void 0 ? "secondary" : _25;
    console.log(primaryA);
}
for (var _h = 0, _j = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _h < _j.length; _h++) {
    _26 = _j[_h].skills, _27 = _26 === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _26, _28 = _27.primary, primaryA = _28 === void 0 ? "primary" : _28, _29 = _27.secondary, secondaryA = _29 === void 0 ? "secondary" : _29;
    console.log(primaryA);
}
for (var _k = 0, robots_2 = robots; _k < robots_2.length; _k++) {
    _30 = robots_2[_k].name, name = _30 === void 0 ? "noName" : _30;
    console.log(nameA);
}
for (var _l = 0, _m = getRobots(); _l < _m.length; _l++) {
    _31 = _m[_l].name, name = _31 === void 0 ? "noName" : _31;
    console.log(nameA);
}
for (var _o = 0, _p = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _o < _p.length; _o++) {
    _32 = _p[_o].name, name = _32 === void 0 ? "noName" : _32;
    console.log(nameA);
}
for (var _q = 0, multiRobots_2 = multiRobots; _q < multiRobots_2.length; _q++) {
    _33 = multiRobots_2[_q].skills, _34 = _33 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _33, _35 = _34.primary, primary = _35 === void 0 ? "primary" : _35, _36 = _34.secondary, secondary = _36 === void 0 ? "secondary" : _36;
    console.log(primaryA);
}
for (var _r = 0, _s = getMultiRobots(); _r < _s.length; _r++) {
    _37 = _s[_r].skills, _38 = _37 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _37, _39 = _38.primary, primary = _39 === void 0 ? "primary" : _39, _40 = _38.secondary, secondary = _40 === void 0 ? "secondary" : _40;
    console.log(primaryA);
}
for (var _t = 0, _u = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _t < _u.length; _t++) {
    _41 = _u[_t].skills, _42 = _41 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _41, _43 = _42.primary, primary = _43 === void 0 ? "primary" : _43, _44 = _42.secondary, secondary = _44 === void 0 ? "secondary" : _44;
    console.log(primaryA);
}
for (var _v = 0, robots_3 = robots; _v < robots_3.length; _v++) {
    _45 = robots_3[_v], _46 = _45.name, nameA = _46 === void 0 ? "noName" : _46, _47 = _45.skill, skillA = _47 === void 0 ? "noSkill" : _47;
    console.log(nameA);
}
for (var _w = 0, _x = getRobots(); _w < _x.length; _w++) {
    _48 = _x[_w], _49 = _48.name, nameA = _49 === void 0 ? "noName" : _49, _50 = _48.skill, skillA = _50 === void 0 ? "noSkill" : _50;
    console.log(nameA);
}
for (var _y = 0, _z = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _y < _z.length; _y++) {
    _51 = _z[_y], _52 = _51.name, nameA = _52 === void 0 ? "noName" : _52, _53 = _51.skill, skillA = _53 === void 0 ? "noSkill" : _53;
    console.log(nameA);
}
for (var _0 = 0, multiRobots_3 = multiRobots; _0 < multiRobots_3.length; _0++) {
    _54 = multiRobots_3[_0], _55 = _54.name, nameA = _55 === void 0 ? "noName" : _55, _56 = _54.skills, _57 = _56 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _56, _58 = _57.primary, primaryA = _58 === void 0 ? "primary" : _58, _59 = _57.secondary, secondaryA = _59 === void 0 ? "secondary" : _59;
    console.log(nameA);
}
for (var _1 = 0, _2 = getMultiRobots(); _1 < _2.length; _1++) {
    _60 = _2[_1], _61 = _60.name, nameA = _61 === void 0 ? "noName" : _61, _62 = _60.skills, _63 = _62 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _62, _64 = _63.primary, primaryA = _64 === void 0 ? "primary" : _64, _65 = _63.secondary, secondaryA = _65 === void 0 ? "secondary" : _65;
    console.log(nameA);
}
for (var _3 = 0, _4 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _3 < _4.length; _3++) {
    _66 = _4[_3], _67 = _66.name, nameA = _67 === void 0 ? "noName" : _67, _68 = _66.skills, _69 = _68 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _68, _70 = _69.primary, primaryA = _70 === void 0 ? "primary" : _70, _71 = _69.secondary, secondaryA = _71 === void 0 ? "secondary" : _71;
    console.log(nameA);
}
for (var _5 = 0, robots_4 = robots; _5 < robots_4.length; _5++) {
    _72 = robots_4[_5], _73 = _72.name, name = _73 === void 0 ? "noName" : _73, _74 = _72.skill, skill = _74 === void 0 ? "noSkill" : _74;
    console.log(nameA);
}
for (var _6 = 0, _7 = getRobots(); _6 < _7.length; _6++) {
    _75 = _7[_6], _76 = _75.name, name = _76 === void 0 ? "noName" : _76, _77 = _75.skill, skill = _77 === void 0 ? "noSkill" : _77;
    console.log(nameA);
}
for (var _8 = 0, _9 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _8 < _9.length; _8++) {
    _78 = _9[_8], _79 = _78.name, name = _79 === void 0 ? "noName" : _79, _80 = _78.skill, skill = _80 === void 0 ? "noSkill" : _80;
    console.log(nameA);
}
for (var _10 = 0, multiRobots_4 = multiRobots; _10 < multiRobots_4.length; _10++) {
    _81 = multiRobots_4[_10], _82 = _81.name, name = _82 === void 0 ? "noName" : _82, _83 = _81.skills, _84 = _83 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _83, _85 = _84.primary, primary = _85 === void 0 ? "primary" : _85, _86 = _84.secondary, secondary = _86 === void 0 ? "secondary" : _86;
    console.log(nameA);
}
for (var _11 = 0, _12 = getMultiRobots(); _11 < _12.length; _11++) {
    _87 = _12[_11], _88 = _87.name, name = _88 === void 0 ? "noName" : _88, _89 = _87.skills, _90 = _89 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _89, _91 = _90.primary, primary = _91 === void 0 ? "primary" : _91, _92 = _90.secondary, secondary = _92 === void 0 ? "secondary" : _92;
    console.log(nameA);
}
for (var _13 = 0, _14 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _13 < _14.length; _13++) {
    _93 = _14[_13], _94 = _93.name, name = _94 === void 0 ? "noName" : _94, _95 = _93.skills, _96 = _95 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _95, _97 = _96.primary, primary = _97 === void 0 ? "primary" : _97, _98 = _96.secondary, secondary = _98 === void 0 ? "secondary" : _98;
    console.log(nameA);
}
var _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98;
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues2.js.map