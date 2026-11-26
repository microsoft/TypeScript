//// [tests/cases/compiler/getAndSetAsMemberNames.ts] ////

//// [getAndSetAsMemberNames.ts]
class C1 {
    set: boolean;
    get = 1;
}
class C2 {
    set;
}
class C3 {
    set (x) {
        return x + 1;
    }
}
class C4 {
    get: boolean = true;
}
class C5 {
    public set: () => boolean = function () { return true; };
    get (): boolean { return true; }
    set t(x) { }
}


//// [getAndSetAsMemberNames.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class C1 {
    constructor() {
        this.get = 1;
    }
}
class C2 {
}
class C3 {
    set(x) {
        return x + 1;
    }
}
class C4 {
    constructor() {
        this.get = true;
    }
}
class C5 {
    constructor() {
        this.set = __setFunctionName(function () { return true; }, "set");
    }
    get() { return true; }
    set t(x) { }
}
