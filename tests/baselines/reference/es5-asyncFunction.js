//// [es5-asyncFunction.ts]
declare var x;

async function empty() {
}

async function singleAwait() {
    await x;
}

//// [es5-asyncFunction.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (body) {
    var _ = { label: 0, sent: function() { if (sent[0] === 1 /*throw*/) throw sent[1]; return sent[1]; }, trys: [], stack: [] }, sent;
    function step(op) {
        if (_.flag) throw new TypeError("Generator is already executing.");
        while (true) {
            if (_.done) switch (op[0]) {
                case 0 /*next*/: return { value: void 0, done: true };
                case 1 /*throw*/: case 6 /*catch*/: throw op[1];
                case 2 /*return*/: return { value: op[1], done: true };
            }
            try {
                switch (_.flag = true, op[0]) {
                    case 0 /*next*/: case 1 /*throw*/: sent = op; break;
                    case 4 /*yield*/: return _.label++, { value: op[1], done: false };
                    case 7 /*endfinally*/: op = _.stack.pop(), _.trys.pop(); continue;
                    default:
                        var r = _.trys.length > 0 && _.trys[_.trys.length - 1];
                        if (!r && (op[0] === 1 /*throw*/ || op[0] === 6 /*catch*/ || op[0] === 2 /*return*/)) {
                            _.done = true;
                            continue;
                        }
                        if (op[0] === 3 /*break*/ && (!r || (op[1] > r[0] && op[1] < r[3]))) {
                            _.label = op[1];
                        }
                        else if (op[0] === 6 /*catch*/ && r && _.label < r[1]) {
                            _.label = r[1], sent = op;
                        }
                        else if (r && _.label < r[2]) {
                            _.label = r[2], _.stack.push(op);
                        }
                        else {
                            if (r[2]) _.stack.pop();
                            _.trys.pop();
                            continue;
                        }
                }
                op = body(_);
            }
            catch (e) { op = [6 /*catch*/, e]; }
            finally { _.flag = false, sent = void 0; }
        }
    }
    return {
        next: function (v) { return step([0 /*next*/, v]); },
        "throw": function (v) { return step([1 /*throw*/, v]); },
        "return": function (v) { return step([2 /*return*/, v]); }
    };
};
function empty() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(function (_a) {
            return [2 /*return*/];
        });
    });
}
function singleAwait() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
