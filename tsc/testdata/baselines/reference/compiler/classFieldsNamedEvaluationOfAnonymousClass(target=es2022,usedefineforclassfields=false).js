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
var _a;
const A = class {
    #p = 1;
};
const B = class {
    #m() { }
};
const C = class {
    get #a() { return 1; }
};
const D = class {
    static #m() { }
};
const E = class {
    #a_accessor_storage = 1;
    get a() { return this.#a_accessor_storage; }
    set a(value) { this.#a_accessor_storage = value; }
};
const F = class {
    constructor() {
        this[_a] = 1;
    }
    static { _a = k; }
};
const G = (class {
    #p = 1;
});
const o = { H: class {
        #p = 1;
    }, [k]: class {
        #p = 1;
    } };
let I;
I ??= class {
    #p = 1;
};
I ||= class {
    #p = 1;
};
I &&= class {
    #p = 1;
};
I = class {
    #p = 1;
};
function f(J = class {
    #p = 1;
}) { }
const { K = class {
    #p = 1;
} } = {};
let L;
({ L = class {
        #p = 1;
    } } = {});
[L = class {
        #p = 1;
    }] = [];
class M {
    static { this.s = class {
        static { __setFunctionName(this, "s"); }
        #p = 1;
    }; }
}
// No member is emitted outside the class body, so the class keeps its name without help.
const P = class {
    m() { }
};
