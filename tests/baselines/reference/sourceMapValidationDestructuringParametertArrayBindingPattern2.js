//// [sourceMapValidationDestructuringParametertArrayBindingPattern2.ts]
declare var console: {
    log(msg: any): void;
}
type Robot = [string, [string, string]];
var robotA: Robot = ["trimmer", ["trimming", "edging"]];

function foo1([, skillA]: Robot) {
    console.log(skillA);
}

function foo2([nameMB]: Robot) {
    console.log(nameMB);
}

function foo3([nameMA, [primarySkillA, secondarySkillA]]: Robot) {
    console.log(nameMA);
}

function foo4([...multiRobotAInfo]: Robot) {
    console.log(multiRobotAInfo);
}

foo1(robotA);
foo1(["roomba", ["vaccum", "mopping"]]);

foo2(robotA);
foo2(["roomba", ["vaccum", "mopping"]]);

foo3(robotA);
foo3(["roomba", ["vaccum", "mopping"]]);

foo4(robotA);
foo4(["roomba", ["vaccum", "mopping"]]);

//// [sourceMapValidationDestructuringParametertArrayBindingPattern2.js]
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
    var _b = __read(_a, 2), skillA = _b[1];
    console.log(skillA);
}
function foo2(_a) {
    var _b = __read(_a, 1), nameMB = _b[0];
    console.log(nameMB);
}
function foo3(_a) {
    var _b = __read(_a, 2), nameMA = _b[0], _c = __read(_b[1], 2), primarySkillA = _c[0], secondarySkillA = _c[1];
    console.log(nameMA);
}
function foo4(_a) {
    var _b = __read(_a), multiRobotAInfo = _b.slice(0);
    console.log(multiRobotAInfo);
}
foo1(robotA);
foo1(["roomba", ["vaccum", "mopping"]]);
foo2(robotA);
foo2(["roomba", ["vaccum", "mopping"]]);
foo3(robotA);
foo3(["roomba", ["vaccum", "mopping"]]);
foo4(robotA);
foo4(["roomba", ["vaccum", "mopping"]]);
//# sourceMappingURL=sourceMapValidationDestructuringParametertArrayBindingPattern2.js.map