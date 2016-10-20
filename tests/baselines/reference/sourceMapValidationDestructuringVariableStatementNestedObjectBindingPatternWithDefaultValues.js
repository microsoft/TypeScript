//// [sourceMapValidationDestructuringVariableStatementNestedObjectBindingPatternWithDefaultValues.ts]
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
var robotB: Robot = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } };

var {
    skills: {
        primary: primaryA = "noSkill",
        secondary: secondaryA = "noSkill"
    } = { primary: "noSkill", secondary: "noSkill" }
} = robotA;
var {
    name: nameB = "noNameSpecified",
    skills: {
        primary: primaryB = "noSkill",
        secondary: secondaryB = "noSkill"
    } = { primary: "noSkill", secondary: "noSkill" }
} = robotB;
var {
    name: nameC = "noNameSpecified",
    skills: {
        primary: primaryB = "noSkill",
        secondary: secondaryB = "noSkill"
    } = { primary: "noSkill", secondary: "noSkill" }
} = <Robot>{ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } };

if (nameB == nameB) {
    console.log(nameC);
}
else {
    console.log(nameC);
}

//// [sourceMapValidationDestructuringVariableStatementNestedObjectBindingPatternWithDefaultValues.js]
var robotA = { name: "mower", skills: { primary: "mowing", secondary: "none" } };
var robotB = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } };
var _a = robotA.skills, _b = _a === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _a, _c = _b.primary, primaryA = _c === void 0 ? "noSkill" : _c, _d = _b.secondary, secondaryA = _d === void 0 ? "noSkill" : _d;
var _e = robotB.name, nameB = _e === void 0 ? "noNameSpecified" : _e, _f = robotB.skills, _g = _f === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _f, _h = _g.primary, primaryB = _h === void 0 ? "noSkill" : _h, _j = _g.secondary, secondaryB = _j === void 0 ? "noSkill" : _j;
var _k = { name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } }, _l = _k.name, nameC = _l === void 0 ? "noNameSpecified" : _l, _m = _k.skills, _o = _m === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _m, _p = _o.primary, primaryB = _p === void 0 ? "noSkill" : _p, _q = _o.secondary, secondaryB = _q === void 0 ? "noSkill" : _q;
if (nameB == nameB) {
    console.log(nameC);
}
else {
    console.log(nameC);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementNestedObjectBindingPatternWithDefaultValues.js.map