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
foo1(["roomba", ["vaccum", "mopping"]]);

foo2(robotA);
foo2(["roomba", ["vaccum", "mopping"]]);

foo3(robotA);
foo3(["roomba", ["vaccum", "mopping"]]);

//// [sourceMapValidationDestructuringParametertArrayBindingPatternDefaultValues2.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var robotA = ["trimmer", ["trimming", "edging"]];
function foo1(_a) {
    var _b = __read(_a === void 0 ? ["name", ["skill1", "skill2"]] : _a, 2), _c = _b[1], skillA = _c === void 0 ? ["noSkill", "noSkill"] : _c;
    console.log(skillA);
}
function foo2(_a) {
    var _b = __read(_a === void 0 ? ["name", ["skill1", "skill2"]] : _a, 1), _c = _b[0], nameMB = _c === void 0 ? "noName" : _c;
    console.log(nameMB);
}
function foo3(_a) {
    var _b = __read(_a, 2), _c = _b[0], nameMA = _c === void 0 ? "noName" : _c, _d = _b[1], _e = __read(_d === void 0 ? ["noSkill", "noSkill"] : _d, 2), _f = _e[0], primarySkillA = _f === void 0 ? "primary" : _f, _g = _e[1], secondarySkillA = _g === void 0 ? "secondary" : _g;
    console.log(nameMA);
}
foo1(robotA);
foo1(["roomba", ["vaccum", "mopping"]]);
foo2(robotA);
foo2(["roomba", ["vaccum", "mopping"]]);
foo3(robotA);
foo3(["roomba", ["vaccum", "mopping"]]);
//# sourceMappingURL=sourceMapValidationDestructuringParametertArrayBindingPatternDefaultValues2.js.map