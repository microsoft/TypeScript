//// [sourceMapValidationDestructuringParameterNestedObjectBindingPatternDefaultValues.ts]
declare var console: {
    log(msg: string): void;
}
interface Robot {
    name: string;
    skills: {
        primary?: string;
        secondary?: string;
    };
}
var robotA: Robot = { name: "mower", skills: { primary: "mowing", secondary: "none" } };

function foo1(
    {
        skills: {
            primary: primaryA = "primary",
            secondary: secondaryA = "secondary"
        } = { primary: "SomeSkill", secondary: "someSkill" }
    }: Robot = robotA) {
    console.log(primaryA);
}
function foo2(
    {
        name: nameC = "name",
        skills: {
            primary: primaryB = "primary",
            secondary: secondaryB = "secondary"
        } = { primary: "SomeSkill", secondary: "someSkill" }
    }: Robot = robotA) {
    console.log(secondaryB);
}
function foo3({ skills = { primary: "SomeSkill", secondary: "someSkill" }  }: Robot = robotA) {
    console.log(skills.primary);
}

foo1(robotA);
foo1({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });

foo2(robotA);
foo2({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });

foo3(robotA);
foo3({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });


//// [sourceMapValidationDestructuringParameterNestedObjectBindingPatternDefaultValues.js]
var robotA = { name: "mower", skills: { primary: "mowing", secondary: "none" } };
function foo1(_a) {
    var _b = (_a === void 0 ? robotA : _a).skills, _c = _b === void 0 ? { primary: "SomeSkill", secondary: "someSkill" } : _b, _d = _c.primary, primaryA = _d === void 0 ? "primary" : _d, _e = _c.secondary, secondaryA = _e === void 0 ? "secondary" : _e;
    console.log(primaryA);
}
function foo2(_f) {
    var _g = _f === void 0 ? robotA : _f, _h = _g.name, nameC = _h === void 0 ? "name" : _h, _j = _g.skills, _k = _j === void 0 ? { primary: "SomeSkill", secondary: "someSkill" } : _j, _l = _k.primary, primaryB = _l === void 0 ? "primary" : _l, _m = _k.secondary, secondaryB = _m === void 0 ? "secondary" : _m;
    console.log(secondaryB);
}
function foo3(_o) {
    var _p = (_o === void 0 ? robotA : _o).skills, skills = _p === void 0 ? { primary: "SomeSkill", secondary: "someSkill" } : _p;
    console.log(skills.primary);
}
foo1(robotA);
foo1({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });
foo2(robotA);
foo2({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });
foo3(robotA);
foo3({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });
//# sourceMappingURL=sourceMapValidationDestructuringParameterNestedObjectBindingPatternDefaultValues.js.map