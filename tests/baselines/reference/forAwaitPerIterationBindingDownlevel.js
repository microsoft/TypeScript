//// [tests/cases/conformance/statements/for-await-ofStatements/forAwaitPerIterationBindingDownlevel.ts] ////

//// [forAwaitPerIterationBindingDownlevel.ts]
const sleep = (tm: number) => new Promise(resolve => setTimeout(resolve, tm));

async function* gen() {
    yield 1;
    await sleep(1000);
    yield 2;
}

const log = console.log;

(async () => {
    for await (const outer of gen()) {
        log(`I'm loop ${outer}`);
        (async () => {
            const inner = outer;
            await sleep(2000);
            if (inner === outer) {
                log(`I'm loop ${inner} and I know I'm loop ${outer}`);
            } else {
                log(`I'm loop ${inner}, but I think I'm loop ${outer}`);
            }
        })();
    }
})();

//// [forAwaitPerIterationBindingDownlevel.js]
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _this = this;
var sleep = function (tm) { return new Promise(function (resolve) { return setTimeout(resolve, tm); }); };
function gen() {
    return __asyncGenerator(this, arguments, function gen_1() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __await(1)];
                case 1: return [4 /*yield*/, _a.sent()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, __await(sleep(1000))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, __await(2)];
                case 4: return [4 /*yield*/, _a.sent()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var log = console.log;
(function () { return __awaiter(_this, void 0, void 0, function () {
    var _loop_1, _a, _b, _c, e_1_1;
    var _this = this;
    var _d, e_1, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 5, 6, 11]);
                _loop_1 = function () {
                    _f = _c.value;
                    _a = false;
                    var outer = _f;
                    log("I'm loop ".concat(outer));
                    (function () { return __awaiter(_this, void 0, void 0, function () {
                        var inner;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    inner = outer;
                                    return [4 /*yield*/, sleep(2000)];
                                case 1:
                                    _a.sent();
                                    if (inner === outer) {
                                        log("I'm loop ".concat(inner, " and I know I'm loop ").concat(outer));
                                    }
                                    else {
                                        log("I'm loop ".concat(inner, ", but I think I'm loop ").concat(outer));
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })();
                };
                _a = true, _b = __asyncValues(gen());
                _g.label = 1;
            case 1: return [4 /*yield*/, _b.next()];
            case 2:
                if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 4];
                _loop_1();
                _g.label = 3;
            case 3:
                _a = true;
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 11];
            case 5:
                e_1_1 = _g.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 11];
            case 6:
                _g.trys.push([6, , 9, 10]);
                if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 8];
                return [4 /*yield*/, _e.call(_b)];
            case 7:
                _g.sent();
                _g.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 10: return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); })();
