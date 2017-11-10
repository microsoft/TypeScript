// @lib: es5
// @sourcemap: true
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
