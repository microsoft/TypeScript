//// [tests/cases/compiler/yieldInForInInDownlevelGenerator.ts] ////

//// [yieldInForInInDownlevelGenerator.ts]
// https://github.com/microsoft/TypeScript/issues/49808
function* gen() {
  var obj: any = { foo: 1, bar: 2 };
  for (var key in obj) {
      yield key;
      delete obj.bar;
  }
}

//// [yieldInForInInDownlevelGenerator.js]
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
// https://github.com/microsoft/TypeScript/issues/49808
function gen() {
    var obj, _a, _b, _c, _i, key;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                obj = { foo: 1, bar: 2 };
                _a = obj;
                _b = [];
                for (_c in _a)
                    _b.push(_c);
                _i = 0;
                _d.label = 1;
            case 1:
                if (!(_i < _b.length)) return [3 /*break*/, 4];
                _c = _b[_i];
                if (!(_c in _a)) return [3 /*break*/, 3];
                key = _c;
                return [4 /*yield*/, key];
            case 2:
                _d.sent();
                delete obj.bar;
                _d.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
