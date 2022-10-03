//// [partiallyDiscriminantedUnions.ts]
// Repro from #10586

interface A1 {
    type: 'a';
    subtype: 1;
}

interface A2 {
    type: 'a';
    subtype: 2;
    foo: number;
}

interface B {
    type: 'b';
}

type AB = A1 | A2 | B;

const ab: AB = <AB>{};

if (ab.type === 'a') {
    if (ab.subtype === 2) {
        ab.foo;
    }
}

// Repro from #11185

class Square { kind: "square"; }
class Circle { kind: "circle"; }

type Shape = Circle | Square;
type Shapes = Shape | Array<Shape>;

function isShape(s : Shapes): s is Shape {
    return !Array.isArray(s);
}

function fail(s: Shapes) {
    if (isShape(s)) {
        if (s.kind === "circle") {
            let c: Circle = s;
        }
    }
}

//// [partiallyDiscriminantedUnions.js]
// Repro from #10586
var ab = {};
if (ab.type === 'a') {
    if (ab.subtype === 2) {
        ab.foo;
    }
}
// Repro from #11185
var Square = /** @class */ (function () {
    function Square() {
    }
    return Square;
}());
var Circle = /** @class */ (function () {
    function Circle() {
    }
    return Circle;
}());
function isShape(s) {
    return !Array.isArray(s);
}
function fail(s) {
    if (isShape(s)) {
        if (s.kind === "circle") {
            var c = s;
        }
    }
}
