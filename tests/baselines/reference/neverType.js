//// [neverType.ts]

function error(message: string) {
    throw new Error(message);
}

function fail() {
    return error("Something failed");
}

function infiniteLoop() {
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

function failOrThrow(shouldFail: boolean) {
    if (shouldFail) {
        return fail();
    }
    throw new Error();
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
function fail() {
    return error("Something failed");
}
function infiniteLoop() {
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
function failOrThrow(shouldFail) {
    if (shouldFail) {
        return fail();
    }
    throw new Error();
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
declare function fail(): never;
declare function infiniteLoop(): never;
declare function move1(direction: "up" | "down"): number;
declare function move2(direction: "up" | "down"): number;
declare function check<T>(x: T | undefined): T;
declare function f1(x: string | number): void;
declare function f2(x: string | number): never;
declare function failOrThrow(shouldFail: boolean): never;
declare function test(cb: () => string): string;
declare let errorCallback: () => never;
