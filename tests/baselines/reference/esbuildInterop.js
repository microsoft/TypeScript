//// [tests/cases/conformance/module/esbuildInterop.ts] ////

//// [package.json]
{
    "name": "dep",
    "version": "1.0.0",
    "main": "index.js"
}

//// [index.d.ts]
declare const _default: string;
export default _default;

//// [package.json]
{
  "type": "module"
}

//// [index.ts]
import dep from "dep";
dep.toLowerCase(); // Error
dep.default.toLowerCase(); // Ok


//// [index.js]
import dep from "dep";
dep.toLowerCase(); // Error
dep.default.toLowerCase(); // Ok
