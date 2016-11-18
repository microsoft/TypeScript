//// [forAwait.7.es5.ts]
declare const ai: AsyncIterable<number>;
function* f() {
    for await (const x of ai) {
    }
}

//// [forAwait.7.es5.js]
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var __asyncStep = (this && this.__asyncStep) || function (r) { return !r.done && Promise.resolve(r.iterator.next()).then(function (_) { return !(r.done = (r.result = _).done); }); };
var __asyncValues = (this && this.__asyncIterator) || function (o) { return (m = o[Symbol.asyncIterator]) ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator](); var m; };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
function f() {
    var ai_1, x, _a, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 10]);
                ai_1 = { iterator: __asyncValues(ai, "__iterator__") };
                _b.label = 1;
            case 1: return [4 /*yield*/, ["await", __asyncStep(ai_1)]];
            case 2:
                if (!_b.sent())
                    return [3 /*break*/, 4];
                x = ai_1.result.value;
                _b.label = 3;
            case 3: return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 10];
            case 5:
                _a = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 10];
            case 6:
                _b.trys.push([6, , 8, 9]);
                return [4 /*yield*/, ["await", __close(ai_1)]];
            case 7:
                _b.sent();
                return [3 /*break*/, 9];
            case 8:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 9: return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}
