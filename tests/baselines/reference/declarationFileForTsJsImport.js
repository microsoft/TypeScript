//// [tests/cases/conformance/nonjsExtensions/declarationFileForTsJsImport.ts] ////

//// [package.json]
{"type": "module"}
//// [main.ts]
import def1 from "./file.js";
import def2 from "./file.jsx";
import def3 from "./file.ts";
import def4 from "./file.tsx";
import def5 from "./file.mjs";
import def6 from "./file.cjs";
import def7 from "./file.mts";
import def8 from "./file.cts";
import def9 from "./file.d.ts";
import def10 from "./file.d.cts";
import def11 from "./file.d.mts";
import def12 from "./file.d.json.ts";
//// [file.d.js.ts]
declare var bad: "bad1";
export default bad;
//// [file.d.jsx.ts]
declare var bad: "bad2";
export default bad;
//// [file.d.ts.ts]
declare var bad: "bad3";
export default bad;
//// [file.d.tsx.ts]
declare var bad: "bad4";
export default bad;
//// [file.d.mjs.ts]
declare var bad: "bad5";
export default bad;
//// [file.d.cjs.ts]
declare var bad: "bad6";
export default bad;
//// [file.d.mts.ts]
declare var bad: "bad7";
export default bad;
//// [file.d.cts.ts]
declare var bad: "bad8";
export default bad;
//// [file.d.d.ts.ts]
declare var bad: "bad9";
export default bad;
//// [file.d.d.mts.ts]
declare var bad: "bad10";
export default bad;
//// [file.d.d.cts.ts]
declare var bad: "bad11";
export default bad;
//// [file.d.d.json.ts]
declare var bad: "bad12";
export default bad;

//// [main.js]
export {};
