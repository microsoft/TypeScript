//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInForAwaitOf.ts] ////

//// [awaitUsingDeclarationsInForAwaitOf.ts]
async function main() {
    for await (await using d1 of [{ async [Symbol.asyncDispose]() {} }, { [Symbol.dispose]() {} }, null, undefined]) {
    }
}

//// [awaitUsingDeclarationsInForAwaitOf.js]
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, d1_1, env_1, d1, e_1, result_1, e_2_1;
        var _d, _e;
        var _f, e_2, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _j.trys.push([0, 10, 11, 16]);
                    _a = true, _b = __asyncValues([(_d = {}, _d[Symbol.asyncDispose] = function () {
                            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/];
                            }); });
                        }, _d), (_e = {}, _e[Symbol.dispose] = function () { }, _e), null, undefined]);
                    _j.label = 1;
                case 1: return [4 /*yield*/, _b.next()];
                case 2:
                    if (!(_c = _j.sent(), _f = _c.done, !_f)) return [3 /*break*/, 9];
                    _h = _c.value;
                    _a = false;
                    d1_1 = _h;
                    env_1 = { stack: [], error: void 0, hasError: false };
                    _j.label = 3;
                case 3:
                    _j.trys.push([3, 4, 5, 8]);
                    d1 = __addDisposableResource(env_1, d1_1, true);
                    return [3 /*break*/, 8];
                case 4:
                    e_1 = _j.sent();
                    env_1.error = e_1;
                    env_1.hasError = true;
                    return [3 /*break*/, 8];
                case 5:
                    result_1 = __disposeResources(env_1);
                    if (!result_1) return [3 /*break*/, 7];
                    return [4 /*yield*/, result_1];
                case 6:
                    _j.sent();
                    _j.label = 7;
                case 7: return [7 /*endfinally*/];
                case 8:
                    _a = true;
                    return [3 /*break*/, 1];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_2_1 = _j.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _j.trys.push([11, , 14, 15]);
                    if (!(!_a && !_f && (_g = _b.return))) return [3 /*break*/, 13];
                    return [4 /*yield*/, _g.call(_b)];
                case 12:
                    _j.sent();
                    _j.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16: return [2 /*return*/];
            }
        });
    });
}
