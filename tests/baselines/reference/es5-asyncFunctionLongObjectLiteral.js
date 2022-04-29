//// [es5-asyncFunctionLongObjectLiteral.ts]
// the generated code from both should be similar

const fooShort = async () => {
    return {
        a: await Promise.resolve(0),
        b: await Promise.resolve(1),
        c: await Promise.resolve(2),
        d: await Promise.resolve(3),
        e: await Promise.resolve(4),
    };
}

const fooLong = async () => {
    return {
        a: await Promise.resolve(0),
        b: await Promise.resolve(1),
        c: await Promise.resolve(2),
        d: await Promise.resolve(3),
        e: await Promise.resolve(4),
        f: await Promise.resolve(5),
        g: await Promise.resolve(6),
        h: await Promise.resolve(7),
        i: await Promise.resolve(8),
        j: await Promise.resolve(9),
    };
}


//// [es5-asyncFunctionLongObjectLiteral.js]
// the generated code from both should be similar
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
var _this = this;
var fooShort = function () { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, Promise.resolve(0)];
            case 1:
                _a.a = _b.sent();
                return [4 /*yield*/, Promise.resolve(1)];
            case 2:
                _a.b = _b.sent();
                return [4 /*yield*/, Promise.resolve(2)];
            case 3:
                _a.c = _b.sent();
                return [4 /*yield*/, Promise.resolve(3)];
            case 4:
                _a.d = _b.sent();
                return [4 /*yield*/, Promise.resolve(4)];
            case 5: return [2 /*return*/, (_a.e = _b.sent(),
                    _a)];
        }
    });
}); };
var fooLong = function () { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, Promise.resolve(0)];
            case 1:
                _a.a = _b.sent();
                return [4 /*yield*/, Promise.resolve(1)];
            case 2:
                _a.b = _b.sent();
                return [4 /*yield*/, Promise.resolve(2)];
            case 3:
                _a.c = _b.sent();
                return [4 /*yield*/, Promise.resolve(3)];
            case 4:
                _a.d = _b.sent();
                return [4 /*yield*/, Promise.resolve(4)];
            case 5:
                _a.e = _b.sent();
                return [4 /*yield*/, Promise.resolve(5)];
            case 6:
                _a.f = _b.sent();
                return [4 /*yield*/, Promise.resolve(6)];
            case 7:
                _a.g = _b.sent();
                return [4 /*yield*/, Promise.resolve(7)];
            case 8:
                _a.h = _b.sent();
                return [4 /*yield*/, Promise.resolve(8)];
            case 9:
                _a.i = _b.sent();
                return [4 /*yield*/, Promise.resolve(9)];
            case 10: return [2 /*return*/, (_a.j = _b.sent(),
                    _a)];
        }
    });
}); };
