//// [importCallExpressionGrammarError.ts]
declare function getSpecifier(): string;
declare var whatToLoad: boolean;

var a = ["./0"];
import(...["PathModule"]);

var p1 = import(...a);
const p2 = import();
const p3 = import(,);
const p4 = import("pathToModule", "secondModule");

//// [importCallExpressionGrammarError.js]
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var a = ["./0"];
Promise.resolve().then(() => __importStar(require(...["PathModule"])));
var p1 = Promise.resolve().then(() => __importStar(require(...a)));
const p2 = Promise.resolve().then(() => __importStar(require()));
const p3 = Promise.resolve().then(() => __importStar(require()));
const p4 = Promise.resolve().then(() => __importStar(require("pathToModule")));
