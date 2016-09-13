//// [asyncFunctionNoReturnType.ts]
async () => {
    if (window)
        return;
}


//// [asyncFunctionNoReturnType.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (sent[0] === 1) throw sent[1]; return sent[1]; }, trys: [], stack: [] }, sent, y, f, v, r;
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (1) {
            if (_.done) switch (op[0]) {
                case 0: return { value: void 0, done: true };
                case 1: case 6: throw op[1];
                case 2: return { value: op[1], done: true };
            }
            try {
                if (f = 1, y) {
                    v = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"];
                    if (v && !(v = v.call(y, op[1])).done) return v;
                    if (y = void 0, v) op[0] = 0, op[1] = v.value; continue;
                }
                switch (op[0]) {
                    case 0: case 1: sent = op; break;
                    case 4: return _.label++, { value: op[1], done: false };
                    case 5: _.label++, y = op[1], op = [0]; continue;
                    case 7: op = _.stack.pop(), _.trys.pop(); continue;
                    default:
                        r = _.trys.length > 0 && _.trys[_.trys.length - 1];
                        if (!r && (op[0] === 6 || op[0] === 2)) { _.done = 1; continue; }
                        if (op[0] === 3 && (!r || (op[1] > r[0] && op[1] < r[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < r[1]) { _.label = r[1], sent = op; break; }
                        if (r && _.label < r[2]) { _.label = r[2], _.stack.push(op); break; }
                        if (r[2]) { _.stack.pop(); }
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) { op = [6, e], y = void 0; }
            finally { f = 0, sent = v = r = void 0; }
        }
    }
    return {
        next: function (v) { return step([0, v]); },
        "throw": function (v) { return step([1, v]); },
        "return": function (v) { return step([2, v]); }
    };
};
var _this = this;
(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (window)
            return [2 /*return*/];
        return [2 /*return*/];
    });
}); });
