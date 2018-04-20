//// [controlFlowIIFE.ts]
declare function getStringOrNumber(): string | number;

function f1() {
    let x = getStringOrNumber();
    if (typeof x === "string") {
        let n = function() {
            return x.length;
        }();
    }
}

function f2() {
    let x = getStringOrNumber();
    if (typeof x === "string") {
        let n = (function() {
            return x.length;
        })();
    }
}

function f3() {
    let x = getStringOrNumber();
    let y: number;
    if (typeof x === "string") {
        let n = (z => x.length + y + z)(y = 1);
    }
}

// Repros from #8381

let maybeNumber: number | undefined;
(function () {
    maybeNumber = 1;
})();
maybeNumber++;
if (maybeNumber !== undefined) {
    maybeNumber++;
}

let test: string | undefined;
if (!test) {
    throw new Error('Test is not defined');
}
(() => {
    test.slice(1); // No error
})();

// Repro from #23565

function f4() {
    let v: number;
    (function() {
        v = 1;
    })();
    v;
}

function f5() {
    let v: number;
    (function*() {
        yield 1;
        v = 1;
    })();
    v; // still undefined
}

function f6() {
    let v: number;
    (async function() {
        v = await 1;
    })();
    v; // still undefined
}

//// [controlFlowIIFE.js]
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
function f1() {
    var x = getStringOrNumber();
    if (typeof x === "string") {
        var n = function () {
            return x.length;
        }();
    }
}
function f2() {
    var x = getStringOrNumber();
    if (typeof x === "string") {
        var n = (function () {
            return x.length;
        })();
    }
}
function f3() {
    var x = getStringOrNumber();
    var y;
    if (typeof x === "string") {
        var n = (function (z) { return x.length + y + z; })(y = 1);
    }
}
// Repros from #8381
var maybeNumber;
(function () {
    maybeNumber = 1;
})();
maybeNumber++;
if (maybeNumber !== undefined) {
    maybeNumber++;
}
var test;
if (!test) {
    throw new Error('Test is not defined');
}
(function () {
    test.slice(1); // No error
})();
// Repro from #23565
function f4() {
    var v;
    (function () {
        v = 1;
    })();
    v;
}
function f5() {
    var v;
    (function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, 1];
                case 1:
                    _a.sent();
                    v = 1;
                    return [2 /*return*/];
            }
        });
    })();
    v; // still undefined
}
function f6() {
    var v;
    (function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, 1];
                    case 1:
                        v = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    })();
    v; // still undefined
}
