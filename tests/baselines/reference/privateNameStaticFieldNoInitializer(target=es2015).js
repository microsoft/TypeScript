//// [privateNameStaticFieldNoInitializer.ts]
const C = class {
    static #x;
}

class C2 {
    static #x;
}


//// [privateNameStaticFieldNoInitializer.js]
var __setFunctionName = (this && this.__setFunctionName) || function (f, name) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: name });
};
var _a, _C_x, _b, _C2_x;
const C = (_a = class {
    },
    __setFunctionName(_a, "C"),
    _C_x = { value: void 0 },
    _a);
class C2 {
}
_b = C2;
_C2_x = { value: void 0 };
