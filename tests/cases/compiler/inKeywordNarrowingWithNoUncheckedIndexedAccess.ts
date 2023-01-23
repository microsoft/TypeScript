// @strict: true
// @noEmit: true
// @noUncheckedIndexedAccess: true

declare function invariant(condition: boolean): asserts condition;

function f1(obj: Record<string, string>) {
    invariant("test" in obj);
    return obj.test;  // string
}

function f2(obj: Record<string, string>) {
    if ("test" in obj) {
        return obj.test;  // string
    }
    return "default";
}

function f3(obj: Record<string, string>) {
    obj.test;  // string | undefined
    if ("test" in obj) {
        obj.test;  // string
    }
    else {
        obj.test;  // undefined
    }
}

function f4(obj: Record<string, string>) {
    obj.test;  // string | undefined
    if (obj.hasOwnProperty("test")) {
        obj.test;  // string
    }
    else {
        obj.test;  // undefined
    }
}
