//// [tests/cases/compiler/strictInstanceOfTypeParameters.ts] ////

//// [strictInstanceOfTypeParameters.ts]
class Unconstrained<T> {
    value: T;
    read: (value: T) => void;
}

declare const x: unknown;

if (x instanceof Unconstrained) {
    x.value.toUpperCase();
    x.value++;
    x.value();

    if (typeof x.value === "string") {
        x.value.toUpperCase();
    }
    if (typeof x.value === "number") {
        x.value++;
    }

    x.read(1);
    x.read("foo");
}

class Constrained<T extends number> {
    value: T;
    read: (value: T) => void;
}

declare const y: unknown;

if (y instanceof Constrained) {
    y.value++;

    y.read(1);
    y.read("foo");
}


//// [strictInstanceOfTypeParameters.js]
var Unconstrained = /** @class */ (function () {
    function Unconstrained() {
    }
    return Unconstrained;
}());
if (x instanceof Unconstrained) {
    x.value.toUpperCase();
    x.value++;
    x.value();
    if (typeof x.value === "string") {
        x.value.toUpperCase();
    }
    if (typeof x.value === "number") {
        x.value++;
    }
    x.read(1);
    x.read("foo");
}
var Constrained = /** @class */ (function () {
    function Constrained() {
    }
    return Constrained;
}());
if (y instanceof Constrained) {
    y.value++;
    y.read(1);
    y.read("foo");
}
