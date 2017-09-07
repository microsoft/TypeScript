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
var a = ["./0"];
Promise.resolve().then(function () { return require(...["PathModule"]); });
var p1 = Promise.resolve().then(function () { return require(...a); });
const p2 = Promise.resolve().then(function () { return require(); });
const p3 = Promise.resolve().then(function () { return require(); });
const p4 = Promise.resolve().then(function () { return require("pathToModule", "secondModule"); });
