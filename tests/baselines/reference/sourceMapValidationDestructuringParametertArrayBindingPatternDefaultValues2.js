//// [sourceMapValidationDestructuringParametertArrayBindingPatternDefaultValues2.ts]
declare var console: {
    log(msg: any): void;
}
type Robot = [string, string[]];
var robotA: Robot = ["trimmer", ["trimming", "edging"]];

function foo1([, skillA = ["noSkill", "noSkill"]]: Robot= ["name", ["skill1", "skill2"]]) {
    console.log(skillA);
}

function foo2([nameMB = "noName"]: Robot = ["name", ["skill1", "skill2"]]) {
    console.log(nameMB);
}

function foo3([nameMA = "noName", [
    primarySkillA = "primary",
    secondarySkillA = "secondary"
] = ["noSkill", "noSkill"]]: Robot) {
    console.log(nameMA);
}

foo1(robotA);
foo1(["roomba", ["vacuum", "mopping"]]);

foo2(robotA);
foo2(["roomba", ["vacuum", "mopping"]]);

foo3(robotA);
foo3(["roomba", ["vacuum", "mopping"]]);

//// [sourceMapValidationDestructuringParametertArrayBindingPatternDefaultValues2.js]
var robotA = ["trimmer", ["trimming", "edging"]];
function foo1(_a) {
    var _b = _a === void 0 ? ["name", ["skill1", "skill2"]] : _a, _c = _b[1], skillA = _c === void 0 ? ["noSkill", "noSkill"] : _c;
    console.log(skillA);
}
function foo2(_d) {
    var _e = (_d === void 0 ? ["name", ["skill1", "skill2"]] : _d)[0], nameMB = _e === void 0 ? "noName" : _e;
    console.log(nameMB);
}
function foo3(_f) {
    var _g = _f[0], nameMA = _g === void 0 ? "noName" : _g, _h = _f[1], _j = _h === void 0 ? ["noSkill", "noSkill"] : _h, _k = _j[0], primarySkillA = _k === void 0 ? "primary" : _k, _l = _j[1], secondarySkillA = _l === void 0 ? "secondary" : _l;
    console.log(nameMA);
}
foo1(robotA);
foo1(["roomba", ["vacuum", "mopping"]]);
foo2(robotA);
foo2(["roomba", ["vacuum", "mopping"]]);
foo3(robotA);
foo3(["roomba", ["vacuum", "mopping"]]);
//# sourceMappingURL=sourceMapValidationDestructuringParametertArrayBindingPatternDefaultValues2.js.map