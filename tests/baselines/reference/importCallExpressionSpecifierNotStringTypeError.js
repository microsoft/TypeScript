//// [importCallExpressionSpecifierNotStringTypeError.ts]
declare function getSpecifier(): boolean;
declare var whatToLoad: boolean;

// Error specifier is not assignable to string
import(getSpecifier());
var p1 = import(getSpecifier());
const p2 = import(whatToLoad ? getSpecifier() : "defaulPath")
p1.then(zero => {
    return zero.foo();  // ok, zero is any
});

var p3 = import(["path1", "path2"]);
var p4 = import(()=>"PathToModule");

//// [importCallExpressionSpecifierNotStringTypeError.js]
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
// Error specifier is not assignable to string
Promise.resolve().then(() => __importStar(require(getSpecifier())));
var p1 = Promise.resolve().then(() => __importStar(require(getSpecifier())));
const p2 = Promise.resolve().then(() => __importStar(require(whatToLoad ? getSpecifier() : "defaulPath")));
p1.then(zero => {
    return zero.foo(); // ok, zero is any
});
var p3 = Promise.resolve().then(() => __importStar(require(["path1", "path2"])));
var p4 = Promise.resolve().then(() => __importStar(require(() => "PathToModule")));
