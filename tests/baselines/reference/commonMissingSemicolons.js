//// [commonMissingSemicolons.ts]
async function myAsyncFunction1() {}
asynd function myAsyncFunction2() {}
sasync function myAsyncFunction3() {}

// Arrow functions don't (yet?) parse as nicely as standalone functions.
// Eventually it would be good to get them the same "did you mean" for typos such as "asyncd".
const myAsyncArrow1 = async () => 3;
const myAsyncArrow2 = asyncd () => 3;

class MyClass1 {}
clasd MyClass2 {}
classs MyClass3 {}

const myConst1 = 1;
consd myConst2 = 1;
constd myConst3 = 1;

declare const myDeclareConst1: 1;
declared const myDeclareConst2: 1;
declare constd myDeclareConst3: 1;
declared constd myDeclareConst4: 1;
declareconst myDeclareConst5;

function myFunction1() { }
functiond myFunction2() { }
function function() { }
functionMyFunction;

interface myInterface1 { }
interfaced myInterface2 { }
interface interface { }
interface { }
interface void { }
interfaceMyInterface { }

let let = 1;
let let1 = 1;
letd let2 = 1;
letMyLet;

type type;
type type1 = {};
type type2 = type;
type type3 = {};
typed type4 = {}
typed type5 = type;
typeMyType;

var myVar1 = 1;
vard myVar2 = 1;
varMyVar;


//// [commonMissingSemicolons.js]
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
function myAsyncFunction1() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
asynd;
function myAsyncFunction2() { }
sasync;
function myAsyncFunction3() { }
// Arrow functions don't (yet?) parse as nicely as standalone functions.
// Eventually it would be good to get them the same "did you mean" for typos such as "asyncd".
var myAsyncArrow1 = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, 3];
}); }); };
var myAsyncArrow2 = asyncd();
3;
var MyClass1 = /** @class */ (function () {
    function MyClass1() {
    }
    return MyClass1;
}());
clasd;
MyClass2;
{ }
classs;
MyClass3;
{ }
var myConst1 = 1;
consd;
myConst2 = 1;
constd;
myConst3 = 1;
declared;
var myDeclareConst2;
declare;
constd;
myDeclareConst3: 1;
declared;
constd;
myDeclareConst4: 1;
declareconst;
myDeclareConst5;
function myFunction1() { }
functiond;
myFunction2();
{ }
function () { }
function () { }
functionMyFunction;
interfaced;
myInterface2;
{ }
interface;
{ }
interface;
void {};
interfaceMyInterface;
{ }
var let = 1;
var let1 = 1;
letd;
let2 = 1;
letMyLet;
typed;
type4 = {};
typed;
type5 = type;
typeMyType;
var myVar1 = 1;
vard;
myVar2 = 1;
varMyVar;
