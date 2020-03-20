//// [sourceMapValidationDestructuringParameterNestedObjectBindingPattern.ts]
declare var console: {
    log(msg: string): void;
}
interface Robot {
    name: string;
    skills: {
        primary: string;
        secondary: string;
    };
}
var robotA: Robot = { name: "mower", skills: { primary: "mowing", secondary: "none" } };

function foo1({ skills: { primary: primaryA, secondary: secondaryA } }: Robot) {
    console.log(primaryA);
}
function foo2({ name: nameC, skills: { primary: primaryB, secondary: secondaryB } }: Robot) {
    console.log(secondaryB);
}
function foo3({ skills }: Robot) {
    console.log(skills.primary);
}

foo1(robotA);
foo1({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });

foo2(robotA);
foo2({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });

foo3(robotA);
foo3({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });


//// [sourceMapValidationDestructuringParameterNestedObjectBindingPattern.js]
var robotA = { name: "mower", skills: { primary: "mowing", secondary: "none" } };
function foo1(_a) {
    var _b = _a.skills, primaryA = _b.primary, secondaryA = _b.secondary;
    console.log(primaryA);
}
function foo2(_c) {
    var nameC = _c.name, _d = _c.skills, primaryB = _d.primary, secondaryB = _d.secondary;
    console.log(secondaryB);
}
function foo3(_e) {
    var skills = _e.skills;
    console.log(skills.primary);
}
foo1(robotA);
foo1({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });
foo2(robotA);
foo2({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });
foo3(robotA);
foo3({ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } });
//# sourceMappingURL=sourceMapValidationDestructuringParameterNestedObjectBindingPattern.js.map