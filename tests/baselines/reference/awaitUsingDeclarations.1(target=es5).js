//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.1.ts] ////

//// [awaitUsingDeclarations.1.ts]
await using d1 = { async [Symbol.asyncDispose]() {} };

async function af() {
    await using d3 = { async [Symbol.asyncDispose]() {} };
    await null;
}

async function * ag() {
    await using d5 = { async [Symbol.asyncDispose]() {} };
    yield;
    await null;
}

const a = async () => {
    await using d6 = { async [Symbol.asyncDispose]() {} };
};

class C1 {
    a = async () => {
        await using d7 = { async [Symbol.asyncDispose]() {} };
    };

    async am() {
        await using d13 = { async [Symbol.asyncDispose]() {} };
        await null;
    }

    async * ag() {
        await using d15 = { async [Symbol.asyncDispose]() {} };
        yield;
        await null;
    }
}

{
    await using d19 = { async [Symbol.asyncDispose]() {} };
}

switch (Math.random()) {
    case 0:
        await using d20 = { async [Symbol.asyncDispose]() {} };
        break;

    case 1:
        await using d21 = { async [Symbol.asyncDispose]() {} };
        break;
}

if (true)
    switch (0) {
        case 0:
            await using d22 = { async [Symbol.asyncDispose]() {} };
            break;
    }

try {
    await using d23 = { async [Symbol.asyncDispose]() {} };
}
catch {
    await using d24 = { async [Symbol.asyncDispose]() {} };
}
finally {
    await using d25 = { async [Symbol.asyncDispose]() {} };
}

if (true) {
    await using d26 = { async [Symbol.asyncDispose]() {} };
}
else {
    await using d27 = { async [Symbol.asyncDispose]() {} };
}

while (true) {
    await using d28 = { async [Symbol.asyncDispose]() {} };
    break;
}

do {
    await using d29 = { async [Symbol.asyncDispose]() {} };
    break;
}
while (true);

for (;;) {
    await using d30 = { async [Symbol.asyncDispose]() {} };
    break;
}

for (const x in {}) {
    await using d31 = { async [Symbol.asyncDispose]() {} };
}

for (const x of []) {
    await using d32 = { async [Symbol.asyncDispose]() {} };
}

export {};

//// [awaitUsingDeclarations.1.js]
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
function af() {
    return __awaiter(this, void 0, void 0, function () {
        var env_15, d3, e_15, result_15;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    env_15 = { stack: [], error: void 0, hasError: false };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 7]);
                    d3 = __addDisposableResource(env_15, (_a = {}, _a[Symbol.asyncDispose] = function () {
                        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/];
                        }); });
                    }, _a), true);
                    return [4 /*yield*/, null];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 3:
                    e_15 = _b.sent();
                    env_15.error = e_15;
                    env_15.hasError = true;
                    return [3 /*break*/, 7];
                case 4:
                    result_15 = __disposeResources(env_15);
                    if (!result_15) return [3 /*break*/, 6];
                    return [4 /*yield*/, result_15];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function ag() {
    return __asyncGenerator(this, arguments, function ag_1() {
        var env_16, d5, e_16, result_16;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    env_16 = { stack: [], error: void 0, hasError: false };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, 6, 9]);
                    d5 = __addDisposableResource(env_16, (_a = {}, _a[Symbol.asyncDispose] = function () {
                        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/];
                        }); });
                    }, _a), true);
                    return [4 /*yield*/, __await(void 0)];
                case 2: return [4 /*yield*/, _b.sent()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, __await(null)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 5:
                    e_16 = _b.sent();
                    env_16.error = e_16;
                    env_16.hasError = true;
                    return [3 /*break*/, 9];
                case 6:
                    result_16 = __disposeResources(env_16);
                    if (!result_16) return [3 /*break*/, 8];
                    return [4 /*yield*/, __await(result_16)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
var d1, a, C1, env_1;
var env_2 = { stack: [], error: void 0, hasError: false };
try {
    d1 = __addDisposableResource(env_2, (_a = {}, _a[Symbol.asyncDispose] = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }, _a), true);
    a = function () { return __awaiter(void 0, void 0, void 0, function () {
        var env_17, d6, e_17, result_17;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    env_17 = { stack: [], error: void 0, hasError: false };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 2, 3, 6]);
                    d6 = __addDisposableResource(env_17, (_a = {}, _a[Symbol.asyncDispose] = function () {
                        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/];
                        }); });
                    }, _a), true);
                    return [3 /*break*/, 6];
                case 2:
                    e_17 = _b.sent();
                    env_17.error = e_17;
                    env_17.hasError = true;
                    return [3 /*break*/, 6];
                case 3:
                    result_17 = __disposeResources(env_17);
                    if (!result_17) return [3 /*break*/, 5];
                    return [4 /*yield*/, result_17];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    C1 = /** @class */ (function () {
        function C1() {
            var _this = this;
            this.a = function () { return __awaiter(_this, void 0, void 0, function () {
                var env_18, d7, e_18, result_18;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            env_18 = { stack: [], error: void 0, hasError: false };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 2, 3, 6]);
                            d7 = __addDisposableResource(env_18, (_a = {}, _a[Symbol.asyncDispose] = function () {
                                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/];
                                }); });
                            }, _a), true);
                            return [3 /*break*/, 6];
                        case 2:
                            e_18 = _b.sent();
                            env_18.error = e_18;
                            env_18.hasError = true;
                            return [3 /*break*/, 6];
                        case 3:
                            result_18 = __disposeResources(env_18);
                            if (!result_18) return [3 /*break*/, 5];
                            return [4 /*yield*/, result_18];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5: return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            }); };
        }
        C1.prototype.am = function () {
            return __awaiter(this, void 0, void 0, function () {
                var env_19, d13, e_19, result_19;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            env_19 = { stack: [], error: void 0, hasError: false };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 7]);
                            d13 = __addDisposableResource(env_19, (_a = {}, _a[Symbol.asyncDispose] = function () {
                                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/];
                                }); });
                            }, _a), true);
                            return [4 /*yield*/, null];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 7];
                        case 3:
                            e_19 = _b.sent();
                            env_19.error = e_19;
                            env_19.hasError = true;
                            return [3 /*break*/, 7];
                        case 4:
                            result_19 = __disposeResources(env_19);
                            if (!result_19) return [3 /*break*/, 6];
                            return [4 /*yield*/, result_19];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6: return [7 /*endfinally*/];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        C1.prototype.ag = function () {
            return __asyncGenerator(this, arguments, function ag_2() {
                var env_20, d15, e_20, result_20;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            env_20 = { stack: [], error: void 0, hasError: false };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 5, 6, 9]);
                            d15 = __addDisposableResource(env_20, (_a = {}, _a[Symbol.asyncDispose] = function () {
                                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/];
                                }); });
                            }, _a), true);
                            return [4 /*yield*/, __await(void 0)];
                        case 2: return [4 /*yield*/, _b.sent()];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, __await(null)];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 5:
                            e_20 = _b.sent();
                            env_20.error = e_20;
                            env_20.hasError = true;
                            return [3 /*break*/, 9];
                        case 6:
                            result_20 = __disposeResources(env_20);
                            if (!result_20) return [3 /*break*/, 8];
                            return [4 /*yield*/, __await(result_20)];
                        case 7:
                            _b.sent();
                            _b.label = 8;
                        case 8: return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        return C1;
    }());
    {
        var env_3 = { stack: [], error: void 0, hasError: false };
        try {
            var d19 = __addDisposableResource(env_3, (_b = {}, _b[Symbol.asyncDispose] = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            }, _b), true);
        }
        catch (e_1) {
            env_3.error = e_1;
            env_3.hasError = true;
        }
        finally {
            var result_1 = __disposeResources(env_3);
            if (result_1)
                await result_1;
        }
    }
    env_1 = { stack: [], error: void 0, hasError: false };
    try {
        switch (Math.random()) {
            case 0:
                var d20 = __addDisposableResource(env_1, (_c = {}, _c[Symbol.asyncDispose] = function () {
                    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/];
                    }); });
                }, _c), true);
                break;
            case 1:
                var d21 = __addDisposableResource(env_1, (_d = {}, _d[Symbol.asyncDispose] = function () {
                    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/];
                    }); });
                }, _d), true);
                break;
        }
    }
    catch (e_2) {
        env_1.error = e_2;
        env_1.hasError = true;
    }
    finally {
        var result_2 = __disposeResources(env_1);
        if (result_2)
            await result_2;
    }
    if (true) {
        var env_4 = { stack: [], error: void 0, hasError: false };
        try {
            switch (0) {
                case 0:
                    var d22 = __addDisposableResource(env_4, (_e = {}, _e[Symbol.asyncDispose] = function () {
                        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/];
                        }); });
                    }, _e), true);
                    break;
            }
        }
        catch (e_3) {
            env_4.error = e_3;
            env_4.hasError = true;
        }
        finally {
            var result_3 = __disposeResources(env_4);
            if (result_3)
                await result_3;
        }
    }
    try {
        var env_5 = { stack: [], error: void 0, hasError: false };
        try {
            var d23 = __addDisposableResource(env_5, (_f = {}, _f[Symbol.asyncDispose] = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            }, _f), true);
        }
        catch (e_4) {
            env_5.error = e_4;
            env_5.hasError = true;
        }
        finally {
            var result_4 = __disposeResources(env_5);
            if (result_4)
                await result_4;
        }
    }
    catch (_r) {
        var env_6 = { stack: [], error: void 0, hasError: false };
        try {
            var d24 = __addDisposableResource(env_6, (_g = {}, _g[Symbol.asyncDispose] = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            }, _g), true);
        }
        catch (e_5) {
            env_6.error = e_5;
            env_6.hasError = true;
        }
        finally {
            var result_5 = __disposeResources(env_6);
            if (result_5)
                await result_5;
        }
    }
    finally {
        var env_7 = { stack: [], error: void 0, hasError: false };
        try {
            var d25 = __addDisposableResource(env_7, (_h = {}, _h[Symbol.asyncDispose] = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            }, _h), true);
        }
        catch (e_6) {
            env_7.error = e_6;
            env_7.hasError = true;
        }
        finally {
            var result_6 = __disposeResources(env_7);
            if (result_6)
                await result_6;
        }
    }
    if (true) {
        var env_8 = { stack: [], error: void 0, hasError: false };
        try {
            var d26 = __addDisposableResource(env_8, (_j = {}, _j[Symbol.asyncDispose] = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            }, _j), true);
        }
        catch (e_7) {
            env_8.error = e_7;
            env_8.hasError = true;
        }
        finally {
            var result_7 = __disposeResources(env_8);
            if (result_7)
                await result_7;
        }
    }
    else {
        var env_9 = { stack: [], error: void 0, hasError: false };
        try {
            var d27 = __addDisposableResource(env_9, (_k = {}, _k[Symbol.asyncDispose] = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            }, _k), true);
        }
        catch (e_8) {
            env_9.error = e_8;
            env_9.hasError = true;
        }
        finally {
            var result_8 = __disposeResources(env_9);
            if (result_8)
                await result_8;
        }
    }
    while (true) {
        var env_10 = { stack: [], error: void 0, hasError: false };
        try {
            var d28 = __addDisposableResource(env_10, (_l = {}, _l[Symbol.asyncDispose] = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            }, _l), true);
            break;
        }
        catch (e_9) {
            env_10.error = e_9;
            env_10.hasError = true;
        }
        finally {
            var result_9 = __disposeResources(env_10);
            if (result_9)
                await result_9;
        }
    }
    do {
        var env_11 = { stack: [], error: void 0, hasError: false };
        try {
            var d29 = __addDisposableResource(env_11, (_m = {}, _m[Symbol.asyncDispose] = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            }, _m), true);
            break;
        }
        catch (e_10) {
            env_11.error = e_10;
            env_11.hasError = true;
        }
        finally {
            var result_10 = __disposeResources(env_11);
            if (result_10)
                await result_10;
        }
    } while (true);
    for (;;) {
        var env_12 = { stack: [], error: void 0, hasError: false };
        try {
            var d30 = __addDisposableResource(env_12, (_o = {}, _o[Symbol.asyncDispose] = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            }, _o), true);
            break;
        }
        catch (e_11) {
            env_12.error = e_11;
            env_12.hasError = true;
        }
        finally {
            var result_11 = __disposeResources(env_12);
            if (result_11)
                await result_11;
        }
    }
    for (var x in {}) {
        var env_13 = { stack: [], error: void 0, hasError: false };
        try {
            var d31 = __addDisposableResource(env_13, (_p = {}, _p[Symbol.asyncDispose] = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            }, _p), true);
        }
        catch (e_12) {
            env_13.error = e_12;
            env_13.hasError = true;
        }
        finally {
            var result_12 = __disposeResources(env_13);
            if (result_12)
                await result_12;
        }
    }
    for (var _i = 0, _s = []; _i < _s.length; _i++) {
        var x = _s[_i];
        var env_14 = { stack: [], error: void 0, hasError: false };
        try {
            var d32 = __addDisposableResource(env_14, (_q = {}, _q[Symbol.asyncDispose] = function () {
                return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); });
            }, _q), true);
        }
        catch (e_13) {
            env_14.error = e_13;
            env_14.hasError = true;
        }
        finally {
            var result_13 = __disposeResources(env_14);
            if (result_13)
                await result_13;
        }
    }
}
catch (e_14) {
    env_2.error = e_14;
    env_2.hasError = true;
}
finally {
    var result_14 = __disposeResources(env_2);
    if (result_14)
        await result_14;
}
export {};
