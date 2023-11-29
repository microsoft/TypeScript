//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.1.ts] ////

//// [usingDeclarations.1.ts]
using d1 = { [Symbol.dispose]() {} };

function f() {
    using d2 = { [Symbol.dispose]() {} };
}

async function af() {
    using d3 = { [Symbol.dispose]() {} };
    await null;
}

function * g() {
    using d4 = { [Symbol.dispose]() {} };
    yield;
}

async function * ag() {
    using d5 = { [Symbol.dispose]() {} };
    yield;
    await null;
}

const a = () => {
    using d6 = { [Symbol.dispose]() {} };
}

class C1 {
    a = () => {
        using d7 = { [Symbol.dispose]() {} };
    }

    constructor() {
        using d8 = { [Symbol.dispose]() {} };
    }

    static {
        using d9 = { [Symbol.dispose]() {} };
    }

    m() {
        using d10 = { [Symbol.dispose]() {} };
    }

    get x() {
        using d11 = { [Symbol.dispose]() {} };
        return 0;
    }

    set x(v) {
        using d12 = { [Symbol.dispose]() {} };
    }

    async am() {
        using d13 = { [Symbol.dispose]() {} };
        await null;
    }

    * g() {
        using d14 = { [Symbol.dispose]() {} };
        yield;
    }

    async * ag() {
        using d15 = { [Symbol.dispose]() {} };
        yield;
        await null;
    }
}

class C2 extends C1 {
    constructor() {
        using d16 = { [Symbol.dispose]() {} };
        super();
    }
}

class C3 extends C1 {
    y = 1;
    constructor() {
        using d17 = { [Symbol.dispose]() {} };
        super();
    }
}

namespace N {
    using d18 = { [Symbol.dispose]() {} };
}

{
    using d19 = { [Symbol.dispose]() {} };
}

switch (Math.random()) {
    case 0:
        using d20 = { [Symbol.dispose]() {} };
        break;

    case 1:
        using d21 = { [Symbol.dispose]() {} };
        break;
}

if (true)
    switch (0) {
        case 0:
            using d22 = { [Symbol.dispose]() {} };
            break;
    }

try {
    using d23 = { [Symbol.dispose]() {} };
}
catch {
    using d24 = { [Symbol.dispose]() {} };
}
finally {
    using d25 = { [Symbol.dispose]() {} };
}

if (true) {
    using d26 = { [Symbol.dispose]() {} };
}
else {
    using d27 = { [Symbol.dispose]() {} };
}

while (true) {
    using d28 = { [Symbol.dispose]() {} };
    break;
}

do {
    using d29 = { [Symbol.dispose]() {} };
    break;
}
while (true);

for (;;) {
    using d30 = { [Symbol.dispose]() {} };
    break;
}

for (const x in {}) {
    using d31 = { [Symbol.dispose]() {} };
}

for (const x of []) {
    using d32 = { [Symbol.dispose]() {} };
}

export {};

//// [usingDeclarations.1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        function next() {
            while (env.stack.length) {
                var rec = env.stack.pop();
                try {
                    var result = rec.dispose && rec.dispose.call(rec.value);
                    if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                }
                catch (e) {
                    fail(e);
                }
            }
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
var _r;
function f() {
    var _a;
    var env_15 = { stack: [], error: void 0, hasError: false };
    try {
        var d2 = __addDisposableResource(env_15, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
    }
    catch (e_15) {
        env_15.error = e_15;
        env_15.hasError = true;
    }
    finally {
        __disposeResources(env_15);
    }
}
function af() {
    return __awaiter(this, void 0, void 0, function () {
        var env_16, d3, e_16;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    env_16 = { stack: [], error: void 0, hasError: false };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    d3 = __addDisposableResource(env_16, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                    return [4 /*yield*/, null];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_16 = _b.sent();
                    env_16.error = e_16;
                    env_16.hasError = true;
                    return [3 /*break*/, 5];
                case 4:
                    __disposeResources(env_16);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function g() {
    var env_17, d4, e_17;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                env_17 = { stack: [], error: void 0, hasError: false };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, 4, 5]);
                d4 = __addDisposableResource(env_17, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                return [4 /*yield*/];
            case 2:
                _b.sent();
                return [3 /*break*/, 5];
            case 3:
                e_17 = _b.sent();
                env_17.error = e_17;
                env_17.hasError = true;
                return [3 /*break*/, 5];
            case 4:
                __disposeResources(env_17);
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}
function ag() {
    return __asyncGenerator(this, arguments, function ag_1() {
        var env_18, d5, e_18;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    env_18 = { stack: [], error: void 0, hasError: false };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, 6, 7]);
                    d5 = __addDisposableResource(env_18, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                    return [4 /*yield*/, __await(void 0)];
                case 2: return [4 /*yield*/, _b.sent()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, __await(null)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    e_18 = _b.sent();
                    env_18.error = e_18;
                    env_18.hasError = true;
                    return [3 /*break*/, 7];
                case 6:
                    __disposeResources(env_18);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
var d1, a, C1, C2, C3, N, env_1;
var env_2 = { stack: [], error: void 0, hasError: false };
try {
    d1 = __addDisposableResource(env_2, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
    a = function () {
        var _a;
        var env_19 = { stack: [], error: void 0, hasError: false };
        try {
            var d6 = __addDisposableResource(env_19, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
        }
        catch (e_19) {
            env_19.error = e_19;
            env_19.hasError = true;
        }
        finally {
            __disposeResources(env_19);
        }
    };
    C1 = (_r = /** @class */ (function () {
            function C1() {
                var _a;
                this.a = function () {
                    var _a;
                    var env_21 = { stack: [], error: void 0, hasError: false };
                    try {
                        var d7 = __addDisposableResource(env_21, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                    }
                    catch (e_21) {
                        env_21.error = e_21;
                        env_21.hasError = true;
                    }
                    finally {
                        __disposeResources(env_21);
                    }
                };
                var env_20 = { stack: [], error: void 0, hasError: false };
                try {
                    var d8 = __addDisposableResource(env_20, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                }
                catch (e_20) {
                    env_20.error = e_20;
                    env_20.hasError = true;
                }
                finally {
                    __disposeResources(env_20);
                }
            }
            C1.prototype.m = function () {
                var _a;
                var env_22 = { stack: [], error: void 0, hasError: false };
                try {
                    var d10 = __addDisposableResource(env_22, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                }
                catch (e_22) {
                    env_22.error = e_22;
                    env_22.hasError = true;
                }
                finally {
                    __disposeResources(env_22);
                }
            };
            Object.defineProperty(C1.prototype, "x", {
                get: function () {
                    var _a;
                    var env_23 = { stack: [], error: void 0, hasError: false };
                    try {
                        var d11 = __addDisposableResource(env_23, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                        return 0;
                    }
                    catch (e_23) {
                        env_23.error = e_23;
                        env_23.hasError = true;
                    }
                    finally {
                        __disposeResources(env_23);
                    }
                },
                set: function (v) {
                    var _a;
                    var env_24 = { stack: [], error: void 0, hasError: false };
                    try {
                        var d12 = __addDisposableResource(env_24, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                    }
                    catch (e_24) {
                        env_24.error = e_24;
                        env_24.hasError = true;
                    }
                    finally {
                        __disposeResources(env_24);
                    }
                },
                enumerable: false,
                configurable: true
            });
            C1.prototype.am = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var env_25, d13, e_25;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                env_25 = { stack: [], error: void 0, hasError: false };
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, 4, 5]);
                                d13 = __addDisposableResource(env_25, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                                return [4 /*yield*/, null];
                            case 2:
                                _b.sent();
                                return [3 /*break*/, 5];
                            case 3:
                                e_25 = _b.sent();
                                env_25.error = e_25;
                                env_25.hasError = true;
                                return [3 /*break*/, 5];
                            case 4:
                                __disposeResources(env_25);
                                return [7 /*endfinally*/];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            C1.prototype.g = function () {
                var env_26, d14, e_26;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            env_26 = { stack: [], error: void 0, hasError: false };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            d14 = __addDisposableResource(env_26, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                            return [4 /*yield*/];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            e_26 = _b.sent();
                            env_26.error = e_26;
                            env_26.hasError = true;
                            return [3 /*break*/, 5];
                        case 4:
                            __disposeResources(env_26);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            };
            C1.prototype.ag = function () {
                return __asyncGenerator(this, arguments, function ag_2() {
                    var env_27, d15, e_27;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                env_27 = { stack: [], error: void 0, hasError: false };
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 5, 6, 7]);
                                d15 = __addDisposableResource(env_27, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                                return [4 /*yield*/, __await(void 0)];
                            case 2: return [4 /*yield*/, _b.sent()];
                            case 3:
                                _b.sent();
                                return [4 /*yield*/, __await(null)];
                            case 4:
                                _b.sent();
                                return [3 /*break*/, 7];
                            case 5:
                                e_27 = _b.sent();
                                env_27.error = e_27;
                                env_27.hasError = true;
                                return [3 /*break*/, 7];
                            case 6:
                                __disposeResources(env_27);
                                return [7 /*endfinally*/];
                            case 7: return [2 /*return*/];
                        }
                    });
                });
            };
            return C1;
        }()),
        (function () {
            var _a;
            var env_28 = { stack: [], error: void 0, hasError: false };
            try {
                var d9 = __addDisposableResource(env_28, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
            }
            catch (e_28) {
                env_28.error = e_28;
                env_28.hasError = true;
            }
            finally {
                __disposeResources(env_28);
            }
        })(),
        _r);
    C2 = /** @class */ (function (_super) {
        __extends(C2, _super);
        function C2() {
            var _a;
            var _this = this;
            var env_29 = { stack: [], error: void 0, hasError: false };
            try {
                var d16 = __addDisposableResource(env_29, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                _this = _super.call(this) || this;
            }
            catch (e_29) {
                env_29.error = e_29;
                env_29.hasError = true;
            }
            finally {
                __disposeResources(env_29);
            }
            return _this;
        }
        return C2;
    }(C1));
    C3 = /** @class */ (function (_super) {
        __extends(C3, _super);
        function C3() {
            var _a;
            var _this = this;
            var env_30 = { stack: [], error: void 0, hasError: false };
            try {
                var d17 = __addDisposableResource(env_30, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
                _this = _super.call(this) || this;
                _this.y = 1;
            }
            catch (e_30) {
                env_30.error = e_30;
                env_30.hasError = true;
            }
            finally {
                __disposeResources(env_30);
            }
            return _this;
        }
        return C3;
    }(C1));
    (function (N) {
        var _a;
        var env_31 = { stack: [], error: void 0, hasError: false };
        try {
            var d18 = __addDisposableResource(env_31, (_a = {}, _a[Symbol.dispose] = function () { }, _a), false);
        }
        catch (e_31) {
            env_31.error = e_31;
            env_31.hasError = true;
        }
        finally {
            __disposeResources(env_31);
        }
    })(N || (N = {}));
    {
        var env_3 = { stack: [], error: void 0, hasError: false };
        try {
            var d19 = __addDisposableResource(env_3, (_b = {}, _b[Symbol.dispose] = function () { }, _b), false);
        }
        catch (e_1) {
            env_3.error = e_1;
            env_3.hasError = true;
        }
        finally {
            __disposeResources(env_3);
        }
    }
    env_1 = { stack: [], error: void 0, hasError: false };
    try {
        switch (Math.random()) {
            case 0:
                var d20 = __addDisposableResource(env_1, (_c = {}, _c[Symbol.dispose] = function () { }, _c), false);
                break;
            case 1:
                var d21 = __addDisposableResource(env_1, (_d = {}, _d[Symbol.dispose] = function () { }, _d), false);
                break;
        }
    }
    catch (e_2) {
        env_1.error = e_2;
        env_1.hasError = true;
    }
    finally {
        __disposeResources(env_1);
    }
    if (true) {
        var env_4 = { stack: [], error: void 0, hasError: false };
        try {
            switch (0) {
                case 0:
                    var d22 = __addDisposableResource(env_4, (_e = {}, _e[Symbol.dispose] = function () { }, _e), false);
                    break;
            }
        }
        catch (e_3) {
            env_4.error = e_3;
            env_4.hasError = true;
        }
        finally {
            __disposeResources(env_4);
        }
    }
    try {
        var env_5 = { stack: [], error: void 0, hasError: false };
        try {
            var d23 = __addDisposableResource(env_5, (_f = {}, _f[Symbol.dispose] = function () { }, _f), false);
        }
        catch (e_4) {
            env_5.error = e_4;
            env_5.hasError = true;
        }
        finally {
            __disposeResources(env_5);
        }
    }
    catch (_s) {
        var env_6 = { stack: [], error: void 0, hasError: false };
        try {
            var d24 = __addDisposableResource(env_6, (_g = {}, _g[Symbol.dispose] = function () { }, _g), false);
        }
        catch (e_5) {
            env_6.error = e_5;
            env_6.hasError = true;
        }
        finally {
            __disposeResources(env_6);
        }
    }
    finally {
        var env_7 = { stack: [], error: void 0, hasError: false };
        try {
            var d25 = __addDisposableResource(env_7, (_h = {}, _h[Symbol.dispose] = function () { }, _h), false);
        }
        catch (e_6) {
            env_7.error = e_6;
            env_7.hasError = true;
        }
        finally {
            __disposeResources(env_7);
        }
    }
    if (true) {
        var env_8 = { stack: [], error: void 0, hasError: false };
        try {
            var d26 = __addDisposableResource(env_8, (_j = {}, _j[Symbol.dispose] = function () { }, _j), false);
        }
        catch (e_7) {
            env_8.error = e_7;
            env_8.hasError = true;
        }
        finally {
            __disposeResources(env_8);
        }
    }
    else {
        var env_9 = { stack: [], error: void 0, hasError: false };
        try {
            var d27 = __addDisposableResource(env_9, (_k = {}, _k[Symbol.dispose] = function () { }, _k), false);
        }
        catch (e_8) {
            env_9.error = e_8;
            env_9.hasError = true;
        }
        finally {
            __disposeResources(env_9);
        }
    }
    while (true) {
        var env_10 = { stack: [], error: void 0, hasError: false };
        try {
            var d28 = __addDisposableResource(env_10, (_l = {}, _l[Symbol.dispose] = function () { }, _l), false);
            break;
        }
        catch (e_9) {
            env_10.error = e_9;
            env_10.hasError = true;
        }
        finally {
            __disposeResources(env_10);
        }
    }
    do {
        var env_11 = { stack: [], error: void 0, hasError: false };
        try {
            var d29 = __addDisposableResource(env_11, (_m = {}, _m[Symbol.dispose] = function () { }, _m), false);
            break;
        }
        catch (e_10) {
            env_11.error = e_10;
            env_11.hasError = true;
        }
        finally {
            __disposeResources(env_11);
        }
    } while (true);
    for (;;) {
        var env_12 = { stack: [], error: void 0, hasError: false };
        try {
            var d30 = __addDisposableResource(env_12, (_o = {}, _o[Symbol.dispose] = function () { }, _o), false);
            break;
        }
        catch (e_11) {
            env_12.error = e_11;
            env_12.hasError = true;
        }
        finally {
            __disposeResources(env_12);
        }
    }
    for (var x in {}) {
        var env_13 = { stack: [], error: void 0, hasError: false };
        try {
            var d31 = __addDisposableResource(env_13, (_p = {}, _p[Symbol.dispose] = function () { }, _p), false);
        }
        catch (e_12) {
            env_13.error = e_12;
            env_13.hasError = true;
        }
        finally {
            __disposeResources(env_13);
        }
    }
    for (var _i = 0, _t = []; _i < _t.length; _i++) {
        var x = _t[_i];
        var env_14 = { stack: [], error: void 0, hasError: false };
        try {
            var d32 = __addDisposableResource(env_14, (_q = {}, _q[Symbol.dispose] = function () { }, _q), false);
        }
        catch (e_13) {
            env_14.error = e_13;
            env_14.hasError = true;
        }
        finally {
            __disposeResources(env_14);
        }
    }
}
catch (e_14) {
    env_2.error = e_14;
    env_2.hasError = true;
}
finally {
    __disposeResources(env_2);
}
export {};
