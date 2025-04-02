//// [tests/cases/conformance/dynamicImport/importCallExpressionGrammarError.ts] ////

//// [importCallExpressionGrammarError.ts]
declare function getSpecifier(): string;
declare var whatToLoad: boolean;

var a = ["./0"];
import(...["PathModule"]);

var p1 = import(...a);
const p2 = import();
const p4 = import("pathToModule", "secondModule");

//// [importCallExpressionGrammarError.js]
var a = ["./0"];
Promise.resolve(`${...["PathModule"]}`).then(s => require(s));
var p1 = Promise.resolve(`${...a}`).then(s => require(s));
const p2 = Promise.resolve().then(() => require());
const p4 = Promise.resolve().then(() => require("pathToModule"));
