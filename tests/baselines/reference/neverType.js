//// [neverType.ts]
function error(message: string): never {
    throw new Error(message);
}

function errorVoid(message: string) {
    throw new Error(message);
}

function fail() {
    return error("Something failed");
}

function failOrThrow(shouldFail: boolean) {
    if (shouldFail) {
        return fail();
    }
    throw new Error();
}

function infiniteLoop1() {
    while (true) {
    }
}

function infiniteLoop2(): never {
    while (true) {
    }
}

function move1(direction: "up" | "down") {
    switch (direction) {
        case "up":
            return 1;
        case "down":
            return -1; 
    }
    return error("Should never get here");
}

function move2(direction: "up" | "down") {
    return direction === "up" ? 1 :
        direction === "down" ? -1 :
        error("Should never get here");
}

function check<T>(x: T | undefined) {
    return x || error("Undefined value");
}

class C {
    void1() {
        throw new Error();
    }
    void2() {
        while (true) {}
    }
    never1(): never {
        throw new Error();
    }
    never2(): never {
        while (true) {}
    }
}

function f1(x: string | number) {
    if (typeof x === "boolean") {
        x;  // never
    }
}

function f2(x: string | number) {
    while (true) {
        if (typeof x === "boolean") {
            return x;  // never
        }
    }
}

function test(cb: () => string) {
    let s = cb();
    return s;
}

let errorCallback = () => error("Error callback");

test(() => "hello");
test(() => fail());
test(() => { throw new Error(); })
test(errorCallback);


//// [neverType.js]
function error(message) {
    throw new Error(message);
}
function errorVoid(message) {
    throw new Error(message);
}
function fail() {
    return error("Something failed");
}
function failOrThrow(shouldFail) {
    if (shouldFail) {
        return fail();
    }
    throw new Error();
}
function infiniteLoop1() {
    while (true) {
    }
}
function infiniteLoop2() {
    while (true) {
    }
}
function move1(direction) {
    switch (direction) {
        case "up":
            return 1;
        case "down":
            return -1;
    }
    return error("Should never get here");
}
function move2(direction) {
    return direction === "up" ? 1 :
        direction === "down" ? -1 :
            error("Should never get here");
}
function check(x) {
    return x || error("Undefined value");
}
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.void1 = function () {
        throw new Error();
    };
    C.prototype.void2 = function () {
        while (true) { }
    };
    C.prototype.never1 = function () {
        throw new Error();
    };
    C.prototype.never2 = function () {
        while (true) { }
    };
    return C;
}());
function f1(x) {
    if (typeof x === "boolean") {
        x; // never
    }
}
function f2(x) {
    while (true) {
        if (typeof x === "boolean") {
            return x; // never
        }
    }
}
function test(cb) {
    var s = cb();
    return s;
}
var errorCallback = function () { return error("Error callback"); };
test(function () { return "hello"; });
test(function () { return fail(); });
test(function () { throw new Error(); });
test(errorCallback);


//// [neverType.d.ts]
declare function error(message: string): never;
declare function errorVoid(message: string): void;
declare function fail(): never;
declare function failOrThrow(shouldFail: boolean): never;
declare function infiniteLoop1(): void;
declare function infiniteLoop2(): never;
declare function move1(direction: "up" | "down"): 1 | -1;
declare function move2(direction: "up" | "down"): 1 | -1;
declare function check<T>(x: T | undefined): T;
declare class C {
    void1(): void;
    void2(): void;
    never1(): never;
    never2(): never;
}
declare function f1(x: string | number): void;
declare function f2(x: string | number): never;
declare function test(cb: () => string): string;
declare let errorCallback: () => never;
