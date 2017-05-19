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
function foo2(_a) {
    var _b = _a === void 0 ? robotA : _a, _c = _b.name, nameC = _c === void 0 ? "name" : _c, _d = _b.skills, _e = _d === void 0 ? { primary: "SomeSkill", secondary: "someSkill" } : _d, _f = _e.primary, primaryB = _f === void 0 ? "primary" : _f, _g = _e.secondary, secondaryB = _g === void 0 ? "secondary" : _g;
    console.log(secondaryB);
}
function foo3(_a) {
    var _b = (_a === void 0 ? robotA : _a).skills, skills = _b === void 0 ? { primary: "SomeSkill", secondary: "someSkill" } : _b;
    console.log(skills.primary);
}
foo1(robotA);
foo1({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });
foo2(robotA);
foo2({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });
foo3(robotA);
foo3({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });
//# sourceMappingURL=sourceMapValidationDestructuringParameterNestedObjectBindingPatternDefaultValues.js.map