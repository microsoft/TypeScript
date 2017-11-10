//// [typeGuardsNestedAssignments.ts]
class Foo {
    x: string;
}

declare function getFooOrNull(): Foo | null;
declare function getStringOrNumberOrNull(): string | number | null;

function f1() {
    let foo: Foo | null;
    if ((foo = getFooOrNull()) !== null) {
        foo;  // Foo
    }
}

function f2() {
    let foo1: Foo | null;
    let foo2: Foo | null;
    if ((foo1 = getFooOrNull(), foo2 = foo1) !== null) {
        foo1;  // Foo | null
        foo2;  // Foo
    }
}

function f3() {
    let obj: Object | null;
    if ((obj = getFooOrNull()) instanceof Foo) {
        obj;
    }
}

function f4() {
    let x: string | number | null;
    if (typeof (x = getStringOrNumberOrNull()) === "number") {
        x;
    }
}

// Repro from #8851

const re = /./g
let match: RegExpExecArray | null

while ((match = re.exec("xxx")) != null) {
    const length = match[1].length + match[2].length
}

//// [typeGuardsNestedAssignments.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
function f1() {
    var foo;
    if ((foo = getFooOrNull()) !== null) {
        foo; // Foo
    }
}
function f2() {
    var foo1;
    var foo2;
    if ((foo1 = getFooOrNull(), foo2 = foo1) !== null) {
        foo1; // Foo | null
        foo2; // Foo
    }
}
function f3() {
    var obj;
    if ((obj = getFooOrNull()) instanceof Foo) {
        obj;
    }
}
function f4() {
    var x;
    if (typeof (x = getStringOrNumberOrNull()) === "number") {
        x;
    }
}
// Repro from #8851
var re = /./g;
var match;
while ((match = re.exec("xxx")) != null) {
    var length_1 = match[1].length + match[2].length;
}
