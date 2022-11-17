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
(_a => Promise.resolve().then(() => require(_a)))(...["PathModule"]);
var p1 = (_b => Promise.resolve().then(() => require(_b)))(...a);
const p2 = Promise.resolve().then(() => require());
const p4 = Promise.resolve().then(() => require("pathToModule"));
