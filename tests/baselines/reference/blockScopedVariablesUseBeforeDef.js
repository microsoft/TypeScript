//// [tests/cases/compiler/blockScopedVariablesUseBeforeDef.ts] ////

//// [blockScopedVariablesUseBeforeDef.ts]
function foo0() {
    let a = x;
    let x;
}

function foo1() {
    let a = () => x;
    let x;
}

function foo2() {
    let a = function () { return x; }
    let x;
}

function foo3() {
    class X {
        m() { return x;}
    }
    let x;
}

function foo4() {
    let y = class {
        m() { return x; }
    };
    let x;
}

function foo5() {
    let x = () => y;
    let y = () => x;
}

function foo6() {
    function f() {
        return x;
    }
    let x;
}

function foo7() {
    class A {
        a = x;
    }
    let x;
}

function foo8() {
    let y = class {
        a = x;
    }
    let x;
}

function foo9() {
    let y = class {
        static a = x;
    }
    let x;
}

function foo10() {
    class A {
        static a = x;
    }
    let x;
}

function foo11() {
    function f () {
        let y = class {
            static a = x;
        }
    }
    let x;
}

function foo12() {
    function f () {
        let y = class {
            a;
            constructor() {
                this.a = x;
            }
        }
    }
    let x;
}

function foo13() {
    let a = {
        get a() { return x } 
    }
    let x
}

function foo14() {
    let a = {
        a: x 
    }
    let x
}

function foo15() {
    // https://github.com/microsoft/TypeScript/issues/42678
    const [
        a,
        b,
    ] = ((): [number, number] => {
        (() => console.log(a))();  // should error
        console.log(a);            // should error
        const b = () => a;         // should be ok
        return [
            0,
            0,
        ];
    })();    
}

function foo16() {
    let [a] = (() => a)();
}

function foo17() {
    const promise = (async () => {
        promise
        foo
        await null
        promise
        foo
    })()

    const foo = 1;
}

// #30907
function wrapI1() {
    const iter = (function* foo() {
        iter;
        yield 1;
    })();
}

function wrapI2() {
    const iter = (async function* foo() {
        iter;
        yield 1;
    })();
}

function foo18() {
    let a = (() => Enum.Yes)();
    enum Enum {
        No = 0,
        Yes = 1,
    }
}


//// [blockScopedVariablesUseBeforeDef.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
function foo0() {
    let a = x;
    let x;
}
function foo1() {
    let a = () => x;
    let x;
}
function foo2() {
    let a = function () { return x; };
    let x;
}
function foo3() {
    class X {
        m() { return x; }
    }
    let x;
}
function foo4() {
    let y = class {
        m() { return x; }
    };
    let x;
}
function foo5() {
    let x = () => y;
    let y = () => x;
}
function foo6() {
    function f() {
        return x;
    }
    let x;
}
function foo7() {
    class A {
        constructor() {
            this.a = x;
        }
    }
    let x;
}
function foo8() {
    let y = class {
        constructor() {
            this.a = x;
        }
    };
    let x;
}
function foo9() {
    var _a;
    let y = (_a = class {
        },
        __setFunctionName(_a, "y"),
        _a.a = x,
        _a);
    let x;
}
function foo10() {
    class A {
    }
    A.a = x;
    let x;
}
function foo11() {
    function f() {
        var _a;
        let y = (_a = class {
            },
            __setFunctionName(_a, "y"),
            _a.a = x,
            _a);
    }
    let x;
}
function foo12() {
    function f() {
        let y = class {
            constructor() {
                this.a = x;
            }
        };
    }
    let x;
}
function foo13() {
    let a = {
        get a() { return x; }
    };
    let x;
}
function foo14() {
    let a = {
        a: x
    };
    let x;
}
function foo15() {
    // https://github.com/microsoft/TypeScript/issues/42678
    const [a, b,] = (() => {
        (() => console.log(a))(); // should error
        console.log(a); // should error
        const b = () => a; // should be ok
        return [
            0,
            0,
        ];
    })();
}
function foo16() {
    let [a] = (() => a)();
}
function foo17() {
    const promise = (() => __awaiter(this, void 0, void 0, function* () {
        promise;
        foo;
        yield null;
        promise;
        foo;
    }))();
    const foo = 1;
}
// #30907
function wrapI1() {
    const iter = (function* foo() {
        iter;
        yield 1;
    })();
}
function wrapI2() {
    const iter = (function foo() {
        return __asyncGenerator(this, arguments, function* foo_1() {
            iter;
            yield yield __await(1);
        });
    })();
}
function foo18() {
    let a = (() => Enum.Yes)();
    let Enum;
    (function (Enum) {
        Enum[Enum["No"] = 0] = "No";
        Enum[Enum["Yes"] = 1] = "Yes";
    })(Enum || (Enum = {}));
}
