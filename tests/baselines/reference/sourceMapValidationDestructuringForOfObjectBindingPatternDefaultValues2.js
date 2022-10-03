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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59;
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
for (var _60 = 0, _61 = getRobots(); _60 < _61.length; _60++) {
    _b = _61[_60].name, nameA = _b === void 0 ? "noName" : _b;
    console.log(nameA);
}
for (var _62 = 0, _63 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _62 < _63.length; _62++) {
    _c = _63[_62].name, nameA = _c === void 0 ? "noName" : _c;
    console.log(nameA);
}
for (var _64 = 0, multiRobots_1 = multiRobots; _64 < multiRobots_1.length; _64++) {
    _d = multiRobots_1[_64].skills, _e = _d === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _d, _f = _e.primary, primaryA = _f === void 0 ? "primary" : _f, _g = _e.secondary, secondaryA = _g === void 0 ? "secondary" : _g;
    console.log(primaryA);
}
for (var _65 = 0, _66 = getMultiRobots(); _65 < _66.length; _65++) {
    _h = _66[_65].skills, _j = _h === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _h, _k = _j.primary, primaryA = _k === void 0 ? "primary" : _k, _l = _j.secondary, secondaryA = _l === void 0 ? "secondary" : _l;
    console.log(primaryA);
}
for (var _67 = 0, _68 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _67 < _68.length; _67++) {
    _m = _68[_67].skills, _o = _m === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _m, _p = _o.primary, primaryA = _p === void 0 ? "primary" : _p, _q = _o.secondary, secondaryA = _q === void 0 ? "secondary" : _q;
    console.log(primaryA);
}
for (var _69 = 0, robots_2 = robots; _69 < robots_2.length; _69++) {
    _r = robots_2[_69].name, name = _r === void 0 ? "noName" : _r;
    console.log(nameA);
}
for (var _70 = 0, _71 = getRobots(); _70 < _71.length; _70++) {
    _s = _71[_70].name, name = _s === void 0 ? "noName" : _s;
    console.log(nameA);
}
for (var _72 = 0, _73 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _72 < _73.length; _72++) {
    _t = _73[_72].name, name = _t === void 0 ? "noName" : _t;
    console.log(nameA);
}
for (var _74 = 0, multiRobots_2 = multiRobots; _74 < multiRobots_2.length; _74++) {
    _u = multiRobots_2[_74].skills, _v = _u === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _u, _w = _v.primary, primary = _w === void 0 ? "primary" : _w, _x = _v.secondary, secondary = _x === void 0 ? "secondary" : _x;
    console.log(primaryA);
}
for (var _75 = 0, _76 = getMultiRobots(); _75 < _76.length; _75++) {
    _y = _76[_75].skills, _z = _y === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _y, _0 = _z.primary, primary = _0 === void 0 ? "primary" : _0, _1 = _z.secondary, secondary = _1 === void 0 ? "secondary" : _1;
    console.log(primaryA);
}
for (var _77 = 0, _78 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _77 < _78.length; _77++) {
    _2 = _78[_77].skills, _3 = _2 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _2, _4 = _3.primary, primary = _4 === void 0 ? "primary" : _4, _5 = _3.secondary, secondary = _5 === void 0 ? "secondary" : _5;
    console.log(primaryA);
}
for (var _79 = 0, robots_3 = robots; _79 < robots_3.length; _79++) {
    _6 = robots_3[_79], _7 = _6.name, nameA = _7 === void 0 ? "noName" : _7, _8 = _6.skill, skillA = _8 === void 0 ? "noSkill" : _8;
    console.log(nameA);
}
for (var _80 = 0, _81 = getRobots(); _80 < _81.length; _80++) {
    _9 = _81[_80], _10 = _9.name, nameA = _10 === void 0 ? "noName" : _10, _11 = _9.skill, skillA = _11 === void 0 ? "noSkill" : _11;
    console.log(nameA);
}
for (var _82 = 0, _83 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _82 < _83.length; _82++) {
    _12 = _83[_82], _13 = _12.name, nameA = _13 === void 0 ? "noName" : _13, _14 = _12.skill, skillA = _14 === void 0 ? "noSkill" : _14;
    console.log(nameA);
}
for (var _84 = 0, multiRobots_3 = multiRobots; _84 < multiRobots_3.length; _84++) {
    _15 = multiRobots_3[_84], _16 = _15.name, nameA = _16 === void 0 ? "noName" : _16, _17 = _15.skills, _18 = _17 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _17, _19 = _18.primary, primaryA = _19 === void 0 ? "primary" : _19, _20 = _18.secondary, secondaryA = _20 === void 0 ? "secondary" : _20;
    console.log(nameA);
}
for (var _85 = 0, _86 = getMultiRobots(); _85 < _86.length; _85++) {
    _21 = _86[_85], _22 = _21.name, nameA = _22 === void 0 ? "noName" : _22, _23 = _21.skills, _24 = _23 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _23, _25 = _24.primary, primaryA = _25 === void 0 ? "primary" : _25, _26 = _24.secondary, secondaryA = _26 === void 0 ? "secondary" : _26;
    console.log(nameA);
}
for (var _87 = 0, _88 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _87 < _88.length; _87++) {
    _27 = _88[_87], _28 = _27.name, nameA = _28 === void 0 ? "noName" : _28, _29 = _27.skills, _30 = _29 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _29, _31 = _30.primary, primaryA = _31 === void 0 ? "primary" : _31, _32 = _30.secondary, secondaryA = _32 === void 0 ? "secondary" : _32;
    console.log(nameA);
}
for (var _89 = 0, robots_4 = robots; _89 < robots_4.length; _89++) {
    _33 = robots_4[_89], _34 = _33.name, name = _34 === void 0 ? "noName" : _34, _35 = _33.skill, skill = _35 === void 0 ? "noSkill" : _35;
    console.log(nameA);
}
for (var _90 = 0, _91 = getRobots(); _90 < _91.length; _90++) {
    _36 = _91[_90], _37 = _36.name, name = _37 === void 0 ? "noName" : _37, _38 = _36.skill, skill = _38 === void 0 ? "noSkill" : _38;
    console.log(nameA);
}
for (var _92 = 0, _93 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _92 < _93.length; _92++) {
    _39 = _93[_92], _40 = _39.name, name = _40 === void 0 ? "noName" : _40, _41 = _39.skill, skill = _41 === void 0 ? "noSkill" : _41;
    console.log(nameA);
}
for (var _94 = 0, multiRobots_4 = multiRobots; _94 < multiRobots_4.length; _94++) {
    _42 = multiRobots_4[_94], _43 = _42.name, name = _43 === void 0 ? "noName" : _43, _44 = _42.skills, _45 = _44 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _44, _46 = _45.primary, primary = _46 === void 0 ? "primary" : _46, _47 = _45.secondary, secondary = _47 === void 0 ? "secondary" : _47;
    console.log(nameA);
}
for (var _95 = 0, _96 = getMultiRobots(); _95 < _96.length; _95++) {
    _48 = _96[_95], _49 = _48.name, name = _49 === void 0 ? "noName" : _49, _50 = _48.skills, _51 = _50 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _50, _52 = _51.primary, primary = _52 === void 0 ? "primary" : _52, _53 = _51.secondary, secondary = _53 === void 0 ? "secondary" : _53;
    console.log(nameA);
}
for (var _97 = 0, _98 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _97 < _98.length; _97++) {
    _54 = _98[_97], _55 = _54.name, name = _55 === void 0 ? "noName" : _55, _56 = _54.skills, _57 = _56 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _56, _58 = _57.primary, primary = _58 === void 0 ? "primary" : _58, _59 = _57.secondary, secondary = _59 === void 0 ? "secondary" : _59;
    console.log(nameA);
}
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues2.js.map