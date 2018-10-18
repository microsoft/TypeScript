//// [exhaustiveSwitchWithWideningLiteralTypes.ts]
// Repro from #12529

class A {
    readonly kind = "A"; // (property) A.kind: "A"
}

class B {
    readonly kind = "B"; // (property) B.kind: "B"
}

function f(value: A | B): number {
    switch(value.kind) {
        case "A": return 0;
        case "B": return 1;
    }
}

//// [exhaustiveSwitchWithWideningLiteralTypes.js]
// Repro from #12529
var A = /** @class */ (function () {
    function A() {
        this.kind = "A"; // (property) A.kind: "A"
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
        this.kind = "B"; // (property) B.kind: "B"
    }
    return B;
}());
function f(value) {
    switch (value.kind) {
        case "A": return 0;
        case "B": return 1;
    }
}
