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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
function foo0() {
    var a = x;
    var x;
}
function foo1() {
    var a = function () { return x; };
    var x;
}
function foo2() {
    var a = function () { return x; };
    var x;
}
function foo3() {
    var X = /** @class */ (function () {
        function X() {
        }
        X.prototype.m = function () { return x; };
        return X;
    }());
    var x;
}
function foo4() {
    var y = /** @class */ (function () {
        function y() {
        }
        y.prototype.m = function () { return x; };
        return y;
    }());
    var x;
}
function foo5() {
    var x = function () { return y; };
    var y = function () { return x; };
}
function foo6() {
    function f() {
        return x;
    }
    var x;
}
function foo7() {
    var A = /** @class */ (function () {
        function A() {
            this.a = x;
        }
        return A;
    }());
    var x;
}
function foo8() {
    var y = /** @class */ (function () {
        function class_1() {
            this.a = x;
        }
        return class_1;
    }());
    var x;
}
function foo9() {
    var _a;
    var y = (_a = /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }()),
        __setFunctionName(_a, "y"),
        _a.a = x,
        _a);
    var x;
}
function foo10() {
    var A = /** @class */ (function () {
        function A() {
        }
        A.a = x;
        return A;
    }());
    var x;
}
function foo11() {
    function f() {
        var _a;
        var y = (_a = /** @class */ (function () {
                function class_3() {
                }
                return class_3;
            }()),
            __setFunctionName(_a, "y"),
            _a.a = x,
            _a);
    }
    var x;
}
function foo12() {
    function f() {
        var y = /** @class */ (function () {
            function class_4() {
                this.a = x;
            }
            return class_4;
        }());
    }
    var x;
}
function foo13() {
    var a = {
        get a() { return x; }
    };
    var x;
}
function foo14() {
    var a = {
        a: x
    };
    var x;
}
function foo15() {
    // https://github.com/microsoft/TypeScript/issues/42678
    var _a = (function () {
        (function () { return console.log(a); })(); // should error
        console.log(a); // should error
        var b = function () { return a; }; // should be ok
        return [
            0,
            0,
        ];
    })(), a = _a[0], b = _a[1];
}
function foo16() {
    var a = (function () { return a; })()[0];
}
function foo17() {
    var _this = this;
    var promise = (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise;
                    foo;
                    return [4 /*yield*/, null];
                case 1:
                    _a.sent();
                    promise;
                    foo;
                    return [2 /*return*/];
            }
        });
    }); })();
    var foo = 1;
}
// #30907
function wrapI1() {
    var iter = (function foo() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    iter;
                    return [4 /*yield*/, 1];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    })();
}
function wrapI2() {
    var iter = (function foo() {
        return __asyncGenerator(this, arguments, function foo_1() {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iter;
                        return [4 /*yield*/, __await(1)];
                    case 1: return [4 /*yield*/, _a.sent()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    })();
}
