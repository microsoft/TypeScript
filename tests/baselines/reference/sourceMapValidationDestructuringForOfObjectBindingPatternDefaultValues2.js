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
    _a = robots_1[_i].name, nameA = _a === void 0 ? "noName" : _a;
    console.log(nameA);
}
for (var _b = 0, _c = getRobots(); _b < _c.length; _b++) {
    _d = _c[_b].name, nameA = _d === void 0 ? "noName" : _d;
    console.log(nameA);
}
for (var _e = 0, _f = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _e < _f.length; _e++) {
    _g = _f[_e].name, nameA = _g === void 0 ? "noName" : _g;
    console.log(nameA);
}
for (var _h = 0, multiRobots_1 = multiRobots; _h < multiRobots_1.length; _h++) {
    _j = multiRobots_1[_h].skills, _k = _j === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _j, _l = _k.primary, primaryA = _l === void 0 ? "primary" : _l, _m = _k.secondary, secondaryA = _m === void 0 ? "secondary" : _m;
    console.log(primaryA);
}
for (var _o = 0, _p = getMultiRobots(); _o < _p.length; _o++) {
    _q = _p[_o].skills, _r = _q === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _q, _s = _r.primary, primaryA = _s === void 0 ? "primary" : _s, _t = _r.secondary, secondaryA = _t === void 0 ? "secondary" : _t;
    console.log(primaryA);
}
for (var _u = 0, _v = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _u < _v.length; _u++) {
    _w = _v[_u].skills, _x = _w === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _w, _y = _x.primary, primaryA = _y === void 0 ? "primary" : _y, _z = _x.secondary, secondaryA = _z === void 0 ? "secondary" : _z;
    console.log(primaryA);
}
for (var _0 = 0, robots_2 = robots; _0 < robots_2.length; _0++) {
    _1 = robots_2[_0].name, name = _1 === void 0 ? "noName" : _1;
    console.log(nameA);
}
for (var _2 = 0, _3 = getRobots(); _2 < _3.length; _2++) {
    _4 = _3[_2].name, name = _4 === void 0 ? "noName" : _4;
    console.log(nameA);
}
for (var _5 = 0, _6 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _5 < _6.length; _5++) {
    _7 = _6[_5].name, name = _7 === void 0 ? "noName" : _7;
    console.log(nameA);
}
for (var _8 = 0, multiRobots_2 = multiRobots; _8 < multiRobots_2.length; _8++) {
    _9 = multiRobots_2[_8].skills, _10 = _9 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _9, _11 = _10.primary, primary = _11 === void 0 ? "primary" : _11, _12 = _10.secondary, secondary = _12 === void 0 ? "secondary" : _12;
    console.log(primaryA);
}
for (var _13 = 0, _14 = getMultiRobots(); _13 < _14.length; _13++) {
    _15 = _14[_13].skills, _16 = _15 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _15, _17 = _16.primary, primary = _17 === void 0 ? "primary" : _17, _18 = _16.secondary, secondary = _18 === void 0 ? "secondary" : _18;
    console.log(primaryA);
}
for (var _19 = 0, _20 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _19 < _20.length; _19++) {
    _21 = _20[_19].skills, _22 = _21 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _21, _23 = _22.primary, primary = _23 === void 0 ? "primary" : _23, _24 = _22.secondary, secondary = _24 === void 0 ? "secondary" : _24;
    console.log(primaryA);
}
for (var _25 = 0, robots_3 = robots; _25 < robots_3.length; _25++) {
    _26 = robots_3[_25], _27 = _26.name, nameA = _27 === void 0 ? "noName" : _27, _28 = _26.skill, skillA = _28 === void 0 ? "noSkill" : _28;
    console.log(nameA);
}
for (var _29 = 0, _30 = getRobots(); _29 < _30.length; _29++) {
    _31 = _30[_29], _32 = _31.name, nameA = _32 === void 0 ? "noName" : _32, _33 = _31.skill, skillA = _33 === void 0 ? "noSkill" : _33;
    console.log(nameA);
}
for (var _34 = 0, _35 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _34 < _35.length; _34++) {
    _36 = _35[_34], _37 = _36.name, nameA = _37 === void 0 ? "noName" : _37, _38 = _36.skill, skillA = _38 === void 0 ? "noSkill" : _38;
    console.log(nameA);
}
for (var _39 = 0, multiRobots_3 = multiRobots; _39 < multiRobots_3.length; _39++) {
    _40 = multiRobots_3[_39], _41 = _40.name, nameA = _41 === void 0 ? "noName" : _41, _42 = _40.skills, _43 = _42 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _42, _44 = _43.primary, primaryA = _44 === void 0 ? "primary" : _44, _45 = _43.secondary, secondaryA = _45 === void 0 ? "secondary" : _45;
    console.log(nameA);
}
for (var _46 = 0, _47 = getMultiRobots(); _46 < _47.length; _46++) {
    _48 = _47[_46], _49 = _48.name, nameA = _49 === void 0 ? "noName" : _49, _50 = _48.skills, _51 = _50 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _50, _52 = _51.primary, primaryA = _52 === void 0 ? "primary" : _52, _53 = _51.secondary, secondaryA = _53 === void 0 ? "secondary" : _53;
    console.log(nameA);
}
for (var _54 = 0, _55 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _54 < _55.length; _54++) {
    _56 = _55[_54], _57 = _56.name, nameA = _57 === void 0 ? "noName" : _57, _58 = _56.skills, _59 = _58 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _58, _60 = _59.primary, primaryA = _60 === void 0 ? "primary" : _60, _61 = _59.secondary, secondaryA = _61 === void 0 ? "secondary" : _61;
    console.log(nameA);
}
for (var _62 = 0, robots_4 = robots; _62 < robots_4.length; _62++) {
    _63 = robots_4[_62], _64 = _63.name, name = _64 === void 0 ? "noName" : _64, _65 = _63.skill, skill = _65 === void 0 ? "noSkill" : _65;
    console.log(nameA);
}
for (var _66 = 0, _67 = getRobots(); _66 < _67.length; _66++) {
    _68 = _67[_66], _69 = _68.name, name = _69 === void 0 ? "noName" : _69, _70 = _68.skill, skill = _70 === void 0 ? "noSkill" : _70;
    console.log(nameA);
}
for (var _71 = 0, _72 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _71 < _72.length; _71++) {
    _73 = _72[_71], _74 = _73.name, name = _74 === void 0 ? "noName" : _74, _75 = _73.skill, skill = _75 === void 0 ? "noSkill" : _75;
    console.log(nameA);
}
for (var _76 = 0, multiRobots_4 = multiRobots; _76 < multiRobots_4.length; _76++) {
    _77 = multiRobots_4[_76], _78 = _77.name, name = _78 === void 0 ? "noName" : _78, _79 = _77.skills, _80 = _79 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _79, _81 = _80.primary, primary = _81 === void 0 ? "primary" : _81, _82 = _80.secondary, secondary = _82 === void 0 ? "secondary" : _82;
    console.log(nameA);
}
for (var _83 = 0, _84 = getMultiRobots(); _83 < _84.length; _83++) {
    _85 = _84[_83], _86 = _85.name, name = _86 === void 0 ? "noName" : _86, _87 = _85.skills, _88 = _87 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _87, _89 = _88.primary, primary = _89 === void 0 ? "primary" : _89, _90 = _88.secondary, secondary = _90 === void 0 ? "secondary" : _90;
    console.log(nameA);
}
for (var _91 = 0, _92 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _91 < _92.length; _91++) {
    _93 = _92[_91], _94 = _93.name, name = _94 === void 0 ? "noName" : _94, _95 = _93.skills, _96 = _95 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _95, _97 = _96.primary, primary = _97 === void 0 ? "primary" : _97, _98 = _96.secondary, secondary = _98 === void 0 ? "secondary" : _98;
    console.log(nameA);
}
var _a, _d, _g, _j, _k, _l, _m, _q, _r, _s, _t, _w, _x, _y, _z, _1, _4, _7, _9, _10, _11, _12, _15, _16, _17, _18, _21, _22, _23, _24, _26, _27, _28, _31, _32, _33, _36, _37, _38, _40, _41, _42, _43, _44, _45, _48, _49, _50, _51, _52, _53, _56, _57, _58, _59, _60, _61, _63, _64, _65, _68, _69, _70, _73, _74, _75, _77, _78, _79, _80, _81, _82, _85, _86, _87, _88, _89, _90, _93, _94, _95, _96, _97, _98;
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues2.js.map