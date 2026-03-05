//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock6.ts] ////

//// [classStaticBlock6.ts]
class B {
    static a = 1;
}

class C extends B {
    static {
        let await = 1;
        let arguments = 1;
        let eval = 1;
    }

    static {
        await: if (true) {

        }

        arguments;
        await;
        super();
    }
}

class CC {
    constructor () {
        class C extends B {
            static {
                class CC extends B {
                    constructor () {
                        super();
                    }
                }
                super();
            }
        }
    }
}

async function foo () {
    class C extends B {
        static {
            arguments;
            await;

            async function ff () {
                arguments;
                await;
            }
        }
    }
}

function foo1 () {
    class C extends B {
        static {
            arguments;

            function ff () {
                arguments;
            }
        }
    }
}

class foo2 {
    static {
        this.b  // should error
        let b: typeof this.b;   // ok
        if (1) {
            this.b; // should error
        }
    }

    static b = 1;
}

//// [classStaticBlock6.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
class B {
}
B.a = 1;
class C extends (_b = B) {
}
_a = C;
(() => {
    let await = 1;
    let arguments = 1;
    let eval = 1;
})();
(() => {
    yield ;
    if (true) {
    }
    arguments;
    yield ;
    super();
})();
class CC {
    constructor() {
        var _d, _e;
        class C extends (_e = B) {
        }
        _d = C;
        (() => {
            class CC extends B {
                constructor() {
                    super();
                }
            }
            super();
        })();
    }
}
function foo() {
    return __awaiter(this, void 0, void 0, function* () {
        class C extends B {
        }
        (() => {
            arguments;
            yield ;
            function ff() {
                var arguments_1 = arguments;
                return __awaiter(this, void 0, void 0, function* () {
                    arguments_1;
                    yield ;
                });
            }
        })();
    });
}
function foo1() {
    class C extends B {
    }
    (() => {
        arguments;
        function ff() {
            arguments;
        }
    })();
}
class foo2 {
}
_c = foo2;
(() => {
    _c.b; // should error
    let b; // ok
    if (1) {
        _c.b; // should error
    }
})();
foo2.b = 1;
