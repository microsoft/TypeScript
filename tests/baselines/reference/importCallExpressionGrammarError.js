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
var __resolved = new Promise(function (resolve) { resolve(); });
var a = ["./0"];
__resolved.then(function () { return require(...["PathModule"]); });
var p1 = __resolved.then(function () { return require(...a); });
const p2 = __resolved.then(function () { return require(); });
const p3 = __resolved.then(function () { return require(); });
const p4 = __resolved.then(function () { return require("pathToModule", "secondModule"); });
