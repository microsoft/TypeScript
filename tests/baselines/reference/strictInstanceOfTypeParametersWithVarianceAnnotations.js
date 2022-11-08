//// [strictInstanceOfTypeParametersWithVarianceAnnotations.ts]
class UnconstrainedIn<in T> {
    read: (value: T) => void;
}

declare const x1: unknown;

if (x1 instanceof UnconstrainedIn) {
    x1.read(1);
    x1.read("foo");
}

class ConstrainedIn<in T extends number> {
    read: (value: T) => void;
}

declare const y1: unknown;

if (y1 instanceof ConstrainedIn) {
    y1.read(1);
    y1.read("foo");
}

class UnconstrainedOut<out T> {
    value: T;
}

declare const x2: unknown;

if (x2 instanceof UnconstrainedOut) {
    x2.value.toUpperCase();
    x2.value++;
    x2.value();

    if (typeof x2.value === "string") {
        x2.value.toUpperCase();
    }
    if (typeof x2.value === "number") {
        x2.value++;
    }
}

class ConstrainedOut<out T extends number> {
    value: T;
}

declare const y2: unknown;

if (y2 instanceof ConstrainedOut) {
    y2.value++;
}

class UnconstrainedInOut<in out T> {
    value: T;
    read: (value: T) => void;
}

declare const x3: unknown;

if (x3 instanceof UnconstrainedInOut) {
    x3.value.toUpperCase();
    x3.value++;
    x3.value();

    if (typeof x3.value === "string") {
        x3.value.toUpperCase();
    }
    if (typeof x3.value === "number") {
        x3.value++;
    }

    x3.read(1);
    x3.read("foo");
}

class ConstrainedInOut<in out T extends number> {
    value: T;
    read: (value: T) => void;
}

declare const y3: unknown;

if (y3 instanceof ConstrainedInOut) {
    y3.value++;

    y3.read(1);
    y3.read("foo");
}


//// [strictInstanceOfTypeParametersWithVarianceAnnotations.js]
var UnconstrainedIn = /** @class */ (function () {
    function UnconstrainedIn() {
    }
    return UnconstrainedIn;
}());
if (x1 instanceof UnconstrainedIn) {
    x1.read(1);
    x1.read("foo");
}
var ConstrainedIn = /** @class */ (function () {
    function ConstrainedIn() {
    }
    return ConstrainedIn;
}());
if (y1 instanceof ConstrainedIn) {
    y1.read(1);
    y1.read("foo");
}
var UnconstrainedOut = /** @class */ (function () {
    function UnconstrainedOut() {
    }
    return UnconstrainedOut;
}());
if (x2 instanceof UnconstrainedOut) {
    x2.value.toUpperCase();
    x2.value++;
    x2.value();
    if (typeof x2.value === "string") {
        x2.value.toUpperCase();
    }
    if (typeof x2.value === "number") {
        x2.value++;
    }
}
var ConstrainedOut = /** @class */ (function () {
    function ConstrainedOut() {
    }
    return ConstrainedOut;
}());
if (y2 instanceof ConstrainedOut) {
    y2.value++;
}
var UnconstrainedInOut = /** @class */ (function () {
    function UnconstrainedInOut() {
    }
    return UnconstrainedInOut;
}());
if (x3 instanceof UnconstrainedInOut) {
    x3.value.toUpperCase();
    x3.value++;
    x3.value();
    if (typeof x3.value === "string") {
        x3.value.toUpperCase();
    }
    if (typeof x3.value === "number") {
        x3.value++;
    }
    x3.read(1);
    x3.read("foo");
}
var ConstrainedInOut = /** @class */ (function () {
    function ConstrainedInOut() {
    }
    return ConstrainedInOut;
}());
if (y3 instanceof ConstrainedInOut) {
    y3.value++;
    y3.read(1);
    y3.read("foo");
}
