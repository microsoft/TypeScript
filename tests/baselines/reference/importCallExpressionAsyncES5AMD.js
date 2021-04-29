//// [test.ts]
export async function fn() {
    const req = await import('./test') // ONE
}

export class cl1 {
    public async m() {
        const req = await import('./test') // TWO
    }
}

export const obj = {
    m: async () => {
        const req = await import('./test') // THREE
    }
}

export class cl2 {
    public p = {
        m: async () => {
            const req = await import('./test') // FOUR
        }
    }
}

export const l = async () => {
    const req = await import('./test') // FIVE
}


//// [test.js]
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.l = exports.cl2 = exports.obj = exports.cl1 = exports.fn = void 0;
    function fn() {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve_1, reject_1) { require(['./test'], resolve_1, reject_1); })]; // ONE
                    case 1:
                        req = _a.sent() // ONE
                        ;
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.fn = fn;
    var cl1 = /** @class */ (function () {
        function cl1() {
        }
        cl1.prototype.m = function () {
            return __awaiter(this, void 0, void 0, function () {
                var req;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve_2, reject_2) { require(['./test'], resolve_2, reject_2); })]; // TWO
                        case 1:
                            req = _a.sent() // TWO
                            ;
                            return [2 /*return*/];
                    }
                });
            });
        };
        return cl1;
    }());
    exports.cl1 = cl1;
    exports.obj = {
        m: function () { return __awaiter(void 0, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve_3, reject_3) { require(['./test'], resolve_3, reject_3); })]; // THREE
                    case 1:
                        req = _a.sent() // THREE
                        ;
                        return [2 /*return*/];
                }
            });
        }); }
    };
    var cl2 = /** @class */ (function () {
        function cl2() {
            var _this = this;
            this.p = {
                m: function () { return __awaiter(_this, void 0, void 0, function () {
                    var req;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, new Promise(function (resolve_4, reject_4) { require(['./test'], resolve_4, reject_4); })]; // FOUR
                            case 1:
                                req = _a.sent() // FOUR
                                ;
                                return [2 /*return*/];
                        }
                    });
                }); }
            };
        }
        return cl2;
    }());
    exports.cl2 = cl2;
    var l = function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve_5, reject_5) { require(['./test'], resolve_5, reject_5); })]; // FIVE
                case 1:
                    req = _a.sent() // FIVE
                    ;
                    return [2 /*return*/];
            }
        });
    }); };
    exports.l = l;
});
