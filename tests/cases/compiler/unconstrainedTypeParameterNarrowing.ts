// @strict: true
function f1<T>(x: T) {
    if (typeof x === "object" && x) {
        g(x);
    }
}

function f2<T extends unknown>(x: T) {
    if (typeof x === "object" && x) {
        g(x);
    }
}

function g(x: object) {}