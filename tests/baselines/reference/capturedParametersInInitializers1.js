//// [capturedParametersInInitializers1.ts]
// ok - usage is deferred
function foo1(y = class {c = x}, x = 1) {
    new y().c;
}

// ok - used in function
function foo2(y = function z(x: typeof z) {}, z = 1) {
}

// ok -used in type
let a;
function foo3(y = { x: <typeof z>a }, z = 1) {
}

// error - used before declaration
function foo4(y = {z}, z = 1) {
}

// error - used before declaration, IIFEs are inlined
function foo5(y = (() => z)(), z = 1) {
}

// ok - IIFE inside another function
function foo6(y = () => (() => z)(), z = 1) {
}

// ok - used inside immediately invoked generator function
function foo7(y = (function*() {yield z})(), z = 1) {
}

// ok - used inside immediately invoked async function
function foo8(y = (async () => z)(), z = 1) {
}

// error - used as computed name of method
function foo9(y = {[z]() { return z; }}, z = 1) {
}

//// [capturedParametersInInitializers1.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
// ok - usage is deferred
function foo1(y, x) {
    if (y === void 0) { y = /** @class */ (function () {
        function class_1() {
            this.c = x;
        }
        return class_1;
    }()); }
    if (x === void 0) { x = 1; }
    new y().c;
}
// ok - used in function
function foo2(y, z) {
    if (y === void 0) { y = function z(x) { }; }
    if (z === void 0) { z = 1; }
}
// ok -used in type
var a;
function foo3(y, z) {
    if (y === void 0) { y = { x: a }; }
    if (z === void 0) { z = 1; }
}
// error - used before declaration
function foo4(y, z) {
    if (y === void 0) { y = { z: z }; }
    if (z === void 0) { z = 1; }
}
// error - used before declaration, IIFEs are inlined
function foo5(y, z) {
    if (y === void 0) { y = (function () { return z; })(); }
    if (z === void 0) { z = 1; }
}
// ok - IIFE inside another function
function foo6(y, z) {
    if (y === void 0) { y = function () { return (function () { return z; })(); }; }
    if (z === void 0) { z = 1; }
}
// ok - used inside immediately invoked generator function
function foo7(y, z) {
    if (y === void 0) { y = (function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, z];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    }); })(); }
    if (z === void 0) { z = 1; }
}
// ok - used inside immediately invoked async function
function foo8(y, z) {
    var _this = this;
    if (y === void 0) { y = (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, z];
    }); }); })(); }
    if (z === void 0) { z = 1; }
}
// error - used as computed name of method
function foo9(y, z) {
    if (y === void 0) { y = (_a = {}, _a[z] = function () { return z; }, _a); }
    if (z === void 0) { z = 1; }
    var _a;
}
