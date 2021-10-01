//// [privateNameStaticFieldNoInitializer.ts]
const C = class {
    static #x;
}

class C2 {
    static #x;
}

//// [privateNameStaticFieldNoInitializer.js]
var _a, _C_x, _b, _C2_x;
const C = (_a = class {
    },
    _C_x = { value: void 0 },
    _a);
class C2 {
}
_b = C2;
_C2_x = { value: void 0 };
