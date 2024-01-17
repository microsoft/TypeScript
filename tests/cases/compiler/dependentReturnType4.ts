// @strict: true
// @noEmit: true
// @target: ES2022
// @exactOptionalPropertyTypes: true

// Test narrowing through `hasOwnProperty` calls
declare const rand: { a?: never };
type Missing = typeof rand.a;
declare function takesString(x: string): void;
function hasOwnP<T extends string | Missing>(obj: { a?: T }): T extends string ? 1 : T extends undefined ? 2 : 1 | 2 {
    if (obj.hasOwnProperty("a")) {
        takesString(obj.a);
        return 1;
    }
    return 2;
}

function foo<T extends string | undefined>(opts: { x?: T }):
    T extends undefined ? 0 : T extends string ? 1 : 0 | 1 {
    if (opts.x === undefined) {
        return 0;
    }
    return 1;
}

function bar<T extends string | Missing>(x?: T ):
    T extends Missing ? 0 : T extends string ? 1 : 0 | 1 {
    if (x === undefined) {
        return 0;
    }
    return 1;
}