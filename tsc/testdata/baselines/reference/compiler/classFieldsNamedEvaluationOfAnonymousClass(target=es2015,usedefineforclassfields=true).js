//// [tests/cases/compiler/classFieldsNamedEvaluationOfAnonymousClass.ts] ////

//// [classFieldsNamedEvaluationOfAnonymousClass.ts]
// An anonymous class gets its name from the position it is defined in (NamedEvaluation). When lowering its
// members leaves expressions to evaluate outside the class body, the class is emitted through a temp
// (`(_a = class { ... }, ..., _a)`) and must get its name explicitly instead of the temp's.

declare const k: "k";

const A = class { #p = 1; };
const B = class { #m() {} };
const C = class { get #a() { return 1; } };
const D = class { static #m() {} };
const E = class { accessor a = 1; };
const F = class { [k] = 1; };
const G = (class { #p = 1; }) as any;

const o = { H: class { #p = 1; }, [k]: class { #p = 1; } };

let I: any;
I ??= class { #p = 1; };
I ||= class { #p = 1; };
I &&= class { #p = 1; };
I = class { #p = 1; };

function f(J = class { #p = 1; }) {}
const { K = class { #p = 1; } } = {} as any;
let L: any;
({ L = class { #p = 1; } } = {} as any);
[L = class { #p = 1; }] = [] as any[];

class M {
    static s = class { #p = 1; };
}


// No member is emitted outside the class body, so the class keeps its name without help.
const P = class { m() {} };


//// [classFieldsNamedEvaluationOfAnonymousClass.js]
"use strict";
// An anonymous class gets its name from the position it is defined in (NamedEvaluation). When lowering its
// members leaves expressions to evaluate outside the class body, the class is emitted through a temp
// (`(_a = class { ... }, ..., _a)`) and must get its name explicitly instead of the temp's.
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __propKey = (this && this.__propKey) || function (x) {
    return typeof x === "symbol" ? x : "".concat(x);
};
var _a, _A_p, _B_instances, _b, _B_m, _C_instances, _c, _C_a_get, _d, _D_m, _e, _E_a_accessor_storage, _f, _g, _h, _G_p, _j, _H_p, _k, _l, _p, _m, _I_p, _o, _I_p_1, _q, _I_p_2, _r, _I_p_3, _s, _K_p, _t, _L_p, _u, _L_p_1, _v, _s_p;
const A = (_a = class {
        constructor() {
            _A_p.set(this, 1);
        }
    },
    _A_p = new WeakMap(),
    __setFunctionName(_a, "A"),
    _a);
const B = (_b = class {
        constructor() {
            _B_instances.add(this);
        }
    },
    _B_instances = new WeakSet(),
    _B_m = function _B_m() { },
    __setFunctionName(_b, "B"),
    _b);
const C = (_c = class {
        constructor() {
            _C_instances.add(this);
        }
    },
    _C_instances = new WeakSet(),
    _C_a_get = function _C_a_get() { return 1; },
    __setFunctionName(_c, "C"),
    _c);
const D = (_d = class {
    },
    _D_m = function _D_m() { },
    __setFunctionName(_d, "D"),
    _d);
const E = (_e = class {
        constructor() {
            _E_a_accessor_storage.set(this, 1);
        }
        get a() { return __classPrivateFieldGet(this, _E_a_accessor_storage, "f"); }
        set a(value) { __classPrivateFieldSet(this, _E_a_accessor_storage, value, "f"); }
    },
    _E_a_accessor_storage = new WeakMap(),
    __setFunctionName(_e, "E"),
    _e);
const F = (_f = class {
        constructor() {
            Object.defineProperty(this, _g, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 1
            });
        }
    },
    _g = k,
    __setFunctionName(_f, "F"),
    _f);
const G = (_h = class {
        constructor() {
            _G_p.set(this, 1);
        }
    },
    _G_p = new WeakMap(),
    __setFunctionName(_h, "G"),
    _h);
const o = { H: (_j = class {
            constructor() {
                _H_p.set(this, 1);
            }
        },
        _H_p = new WeakMap(),
        __setFunctionName(_j, "H"),
        _j), [_k = __propKey(k)]: (_l = class {
            constructor() {
                _p.set(this, 1);
            }
        },
        _p = new WeakMap(),
        __setFunctionName(_l, _k),
        _l) };
let I;
I !== null && I !== void 0 ? I : (I = (_m = class {
        constructor() {
            _I_p.set(this, 1);
        }
    },
    _I_p = new WeakMap(),
    __setFunctionName(_m, "I"),
    _m));
I || (I = (_o = class {
        constructor() {
            _I_p_1.set(this, 1);
        }
    },
    _I_p_1 = new WeakMap(),
    __setFunctionName(_o, "I"),
    _o));
I && (I = (_q = class {
        constructor() {
            _I_p_2.set(this, 1);
        }
    },
    _I_p_2 = new WeakMap(),
    __setFunctionName(_q, "I"),
    _q));
I = (_r = class {
        constructor() {
            _I_p_3.set(this, 1);
        }
    },
    _I_p_3 = new WeakMap(),
    __setFunctionName(_r, "I"),
    _r);
function f(J) { var _w, _J_p; if (J === void 0) { J = (_w = class {
        constructor() {
            _J_p.set(this, 1);
        }
    },
    _J_p = new WeakMap(),
    __setFunctionName(_w, "J"),
    _w); } }
const { K = (_s = class {
        constructor() {
            _K_p.set(this, 1);
        }
    },
    _K_p = new WeakMap(),
    __setFunctionName(_s, "K"),
    _s) } = {};
let L;
({ L = (_t = class {
            constructor() {
                _L_p.set(this, 1);
            }
        },
        _L_p = new WeakMap(),
        __setFunctionName(_t, "L"),
        _t) } = {});
[L = (_u = class {
            constructor() {
                _L_p_1.set(this, 1);
            }
        },
        _L_p_1 = new WeakMap(),
        __setFunctionName(_u, "L"),
        _u)] = [];
class M {
}
Object.defineProperty(M, "s", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (_v = class {
            constructor() {
                _s_p.set(this, 1);
            }
        },
        _s_p = new WeakMap(),
        __setFunctionName(_v, "s"),
        _v)
});
// No member is emitted outside the class body, so the class keeps its name without help.
const P = class {
    m() { }
};
