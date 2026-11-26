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
var _A_p, _a, _B_instances, _B_m, _b, _C_instances, _C_a_get, _c, _d, _D_m, _E_a_accessor_storage, _e, _f, _g, _p, _h, _H_p, _j, _p_1, _k, _I_p, _l, _I_p_1, _m, _I_p_2, _o, _I_p_3, _q, _K_p, _r, _p_2, _s, _L_p, _t, _p_3, _u;
const A = (_a = class {
        constructor() {
            _A_p.set(this, 1);
        }
    },
    _A_p = new WeakMap(),
    _a);
const B = (_b = class {
        constructor() {
            _B_instances.add(this);
        }
    },
    _B_instances = new WeakSet(),
    _B_m = function _B_m() { },
    _b);
const C = (_c = class {
        constructor() {
            _C_instances.add(this);
        }
    },
    _C_instances = new WeakSet(),
    _C_a_get = function _C_a_get() { return 1; },
    _c);
const D = (_d = class {
    },
    _D_m = function _D_m() { },
    _d);
const E = (_e = class {
        constructor() {
            _E_a_accessor_storage.set(this, 1);
        }
        get a() { return __classPrivateFieldGet(this, _E_a_accessor_storage, "f"); }
        set a(value) { __classPrivateFieldSet(this, _E_a_accessor_storage, value, "f"); }
    },
    _E_a_accessor_storage = new WeakMap(),
    _e);
const F = (_g = class {
        constructor() {
            this[_f] = 1;
        }
    },
    _f = k,
    _g);
const G = (_h = class {
        constructor() {
            _p.set(this, 1);
        }
    },
    _p = new WeakMap(),
    _h);
const o = { H: (_j = class {
            constructor() {
                _H_p.set(this, 1);
            }
        },
        _H_p = new WeakMap(),
        _j), [k]: (_k = class {
            constructor() {
                _p_1.set(this, 1);
            }
        },
        _p_1 = new WeakMap(),
        _k) };
let I;
I !== null && I !== void 0 ? I : (I = (_l = class {
        constructor() {
            _I_p.set(this, 1);
        }
    },
    _I_p = new WeakMap(),
    _l));
I || (I = (_m = class {
        constructor() {
            _I_p_1.set(this, 1);
        }
    },
    _I_p_1 = new WeakMap(),
    _m));
I && (I = (_o = class {
        constructor() {
            _I_p_2.set(this, 1);
        }
    },
    _I_p_2 = new WeakMap(),
    _o));
I = (_q = class {
        constructor() {
            _I_p_3.set(this, 1);
        }
    },
    _I_p_3 = new WeakMap(),
    _q);
function f(J) { var _p_4, _v; if (J === void 0) { J = (_v = class {
        constructor() {
            _p_4.set(this, 1);
        }
    },
    _p_4 = new WeakMap(),
    _v); } }
const { K = (_r = class {
        constructor() {
            _K_p.set(this, 1);
        }
    },
    _K_p = new WeakMap(),
    _r) } = {};
let L;
({ L = (_s = class {
            constructor() {
                _p_2.set(this, 1);
            }
        },
        _p_2 = new WeakMap(),
        _s) } = {});
[L = (_t = class {
            constructor() {
                _L_p.set(this, 1);
            }
        },
        _L_p = new WeakMap(),
        _t)] = [];
class M {
}
M.s = (_u = class {
        constructor() {
            _p_3.set(this, 1);
        }
    },
    _p_3 = new WeakMap(),
    _u);
// No member is emitted outside the class body, so the class keeps its name without help.
const P = class {
    m() { }
};
