//// [asyncAwait_es5.ts]
type MyPromise<T> = Promise<T>;
declare var MyPromise: typeof Promise;
declare var p: Promise<number>;
declare var mp: MyPromise<number>;

async function f0() { }
async function f1(): Promise<void> { }
async function f3(): MyPromise<void> { }

let f4 = async function() { }
let f5 = async function(): Promise<void> { }
let f6 = async function(): MyPromise<void> { }

let f7 = async () => { };
let f8 = async (): Promise<void> => { };
let f9 = async (): MyPromise<void> => { };
let f10 = async () => p;
let f11 = async () => mp;
let f12 = async (): Promise<number> => mp;
let f13 = async (): MyPromise<number> => p;

let o = {
	async m1() { },
	async m2(): Promise<void> { },
	async m3(): MyPromise<void> { }
};

class C {
	async m1() { }
	async m2(): Promise<void> { }
	async m3(): MyPromise<void> { }
	static async m4() { }
	static async m5(): Promise<void> { }
	static async m6(): MyPromise<void> { }
}

module M {
	export async function f1() { }
}

async function f14() {
    block: {
        await 1;
        break block;
    }
}

//// [asyncAwait_es5.js]
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
function f0() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
function f1() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
function f3() {
    return __awaiter(this, void 0, MyPromise, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
var f4 = function () {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
};
var f5 = function () {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
};
var f6 = function () {
    return __awaiter(this, void 0, MyPromise, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
};
var f7 = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
var f8 = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
var f9 = function () { return __awaiter(_this, void 0, MyPromise, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
var f10 = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, p];
}); }); };
var f11 = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, mp];
}); }); };
var f12 = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, mp];
}); }); };
var f13 = function () { return __awaiter(_this, void 0, MyPromise, function () { return __generator(this, function (_a) {
    return [2 /*return*/, p];
}); }); };
var o = {
    m1: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    m2: function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    },
    m3: function () {
        return __awaiter(this, void 0, MyPromise, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }
};
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m1 = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    C.prototype.m2 = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    C.prototype.m3 = function () {
        return __awaiter(this, void 0, MyPromise, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    C.m4 = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    C.m5 = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    C.m6 = function () {
        return __awaiter(this, void 0, MyPromise, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return C;
}());
var M;
(function (M) {
    function f1() {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }
    M.f1 = f1;
})(M || (M = {}));
function f14() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, 1];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 2: return [2 /*return*/];
            }
        });
    });
}
