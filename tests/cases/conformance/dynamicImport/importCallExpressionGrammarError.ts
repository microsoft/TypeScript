// @module: commonjs
// @target: es6
// @noImplicitAny: false

declare function getSpecifier(): string;
declare var whatToLoad: boolean;

var a = ["./0"];
import(...["PathModule"]);

var p1 = import(...a);
const p2 = import();
const p4 = import("pathToModule", "secondModule");