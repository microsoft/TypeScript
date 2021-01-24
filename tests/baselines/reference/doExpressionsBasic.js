//// [doExpressionsBasic.ts]
//#region If
const a = do {
    if (Math.random() > 0.5) true;
    else false;
}
const b = do {
    const tmp = Math.random();
    if (tmp > 0.3) 3;
    else if (tmp > 0.6) 6;
    else 10;
}
//#endregion

//#region try
const c = do {
    try { 1; } catch { 2; }
}
const d = do {
    try { 1; } finally { 2 }
}
const e = do {
    try { 1; } catch { 2; } finally {3}
}
//#endregion

//#region Switch
const f = do {
    switch (Math.random()) {
        case 0: "lucky";
        default: "Normal";
    }
}
//#endregion

//#region Await
async function g() {
    const val = do {
        await 1;
    }
}
//#endregion

//#region Yield
function* h() {
    const val = do {
        const val: number = yield 1;
        val * val;
    }
}
//#endregion

//#region Await and Yield
async function* i() {
    const val = do {
        const val: number = yield await 1
        val * val;
    }
    const val2 = do {
        await 1
    }
}
//#endregion

//#region Nested
const j = do {
    if (6 > 5) 5;
    else if (6 > 2) 3;
    else {
        try {
            4;
        } catch {
            5
        }
    }
}
//#endregion

//#region Not across boundary
const k = do {
    function x() {
        1 * 1; // no transform here
    }
    class T {
        field = x
    }
    1 * 2;
}
//#endregion


//// [doExpressionsBasic.js]
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
        while (_) try {
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var _a, _b, _c, _d, _e, _f, _g, _h;
//#region If
var a = ((function () {
    if (_a = void 0, Math.random() > 0.5)
        _a = true;
    else
        _a = false;
})(), _a);
var b = ((function () {
    var tmp = Math.random();
    if (_b = void 0, tmp > 0.3)
        _b = 3;
    else if (tmp > 0.6)
        _b = 6;
    else
        _b = 10;
})(), _b);
//#endregion
//#region try
var c = ((function () {
    try {
        _c = void 0;
        _c = 1;
    }
    catch (_a) {
        _c = 2;
    }
})(), _c);
var d = ((function () {
    try {
        _d = void 0;
        _d = 1;
    }
    finally {
        2;
    }
})(), _d);
var e = ((function () {
    try {
        _e = void 0;
        _e = 1;
    }
    catch (_a) {
        _e = 2;
    }
    finally {
        3;
    }
})(), _e);
//#endregion
//#region Switch
var f = ((function () {
    switch ((_f = void 0, Math.random())) {
        case 0: _f = "lucky";
        default: _f = "Normal";
    }
})(), _f);
//#endregion
//#region Await
function g() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var val;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, 1];
                                case 1:
                                    _a = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })()];
                case 1:
                    val = (_b.sent(), _a);
                    return [2 /*return*/];
            }
        });
    });
}
//#endregion
//#region Yield
function h() {
    var val;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [5 /*yield**/, __values(function () {
                    var val_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, 1];
                            case 1:
                                val_1 = _a.sent();
                                _a = val_1 * val_1;
                                return [2 /*return*/];
                        }
                    });
                }.call(this))];
            case 1:
                val = (_b.sent(), _a);
                return [2 /*return*/];
        }
    });
}
//#endregion
//#region Await and Yield
function i() {
    var _a, _b;
    return __asyncGenerator(this, arguments, function i_1() {
        var val, val2;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(function () {
                        return __asyncGenerator(this, arguments, function () {
                            var val_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, __await(1)];
                                    case 1: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                                    case 2: return [4 /*yield*/, _a.sent()];
                                    case 3:
                                        val_2 = _a.sent();
                                        _a = val_2 * val_2;
                                        return [2 /*return*/];
                                }
                            });
                        });
                    }.call(this))))];
                case 1: return [4 /*yield*/, __await.apply(void 0, [_c.sent()])];
                case 2:
                    val = (_c.sent(), _a);
                    return [4 /*yield*/, __await((function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, 1];
                                    case 1:
                                        _b = _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })())];
                case 3:
                    val2 = (_c.sent(), _b);
                    return [2 /*return*/];
            }
        });
    });
}
//#endregion
//#region Nested
var j = ((function () {
    if (_g = void 0, 6 > 5)
        _g = 5;
    else if (6 > 2)
        _g = 3;
    else {
        try {
            _g = void 0;
            _g = 4;
        }
        catch (_a) {
            _g = 5;
        }
    }
})(), _g);
//#endregion
//#region Not across boundary
var k = ((function () {
    function x() {
        1 * 1; // no transform here
    }
    var T = /** @class */ (function () {
        function T() {
            this.field = x;
        }
        return T;
    }());
    _h = 1 * 2;
})(), _h);
//#endregion
