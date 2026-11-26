//// [tests/cases/compiler/privateNameJsx.tsx] ////

//// [privateNameJsx.tsx]
class Test {
    #prop = () => <div />;
    render() {
        return <this.#prop />;
    }
}



//// [privateNameJsx.jsx]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _Test_prop;
class Test {
    constructor() {
        _Test_prop.set(this, __setFunctionName(() => <div />, "#prop"));
    }
    render() {
        return <this. />;
    }
}
_Test_prop = new WeakMap();
