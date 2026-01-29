//// [tests/cases/conformance/nonjsExtensions/declarationFileForJsonImport.ts] ////

//// [main.ts]
import data from "./data.json";
let x: string = data;
//// [data.json]
{}
//// [data.d.json.ts]
declare var val: string;
export default val;

//// [main.js]
import data from "./data.json";
let x = data;
