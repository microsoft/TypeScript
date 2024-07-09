// @lib: es5
// @sourcemap: true
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
