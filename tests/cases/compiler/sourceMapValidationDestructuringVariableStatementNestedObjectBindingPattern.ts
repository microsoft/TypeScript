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
var robotB: Robot = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } };

var { skills: { primary: primaryA, secondary: secondaryA } } = robotA;
var { name: nameB, skills: { primary: primaryB, secondary: secondaryB } } = robotB;
var { name: nameC, skills: { primary: primaryB, secondary: secondaryB } } = { name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } };

if (nameB == nameB) {
    console.log(nameC);
}
else {
    console.log(nameC);
}