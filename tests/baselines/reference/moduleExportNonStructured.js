//// [tests/cases/compiler/moduleExportNonStructured.ts] ////

//// [package.json]
{
    "name": "test",
    "version": "1.0.0",
    "description": "",
    "type": "module",
    "module": "index.mjs"
}

//// [index.mts]
import * as exportAny from "./exportAny.cjs";
import * as exportUnknown from "./exportUnknown.cjs";
import * as exportSymbol from "./exportSymbol.cjs";


//// [exportAny.d.cts]
declare const __: any;
export = __;


//// [exportUnknown.d.cts]
declare const __: unknown;
export = __;


//// [exportSymbol.d.cts]
declare const __: symbol;
export = __;


//// [index.mjs]
export {};
