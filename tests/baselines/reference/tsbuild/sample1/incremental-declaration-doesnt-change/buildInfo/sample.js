//// [/src/core/.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "/lib/lib.d.ts": {
        "version": "38840781448",
        "signature": "38840781448"
      },
      "/lib/lib.es5.d.ts": {
        "version": "-157947125741",
        "signature": "-157947125741"
      },
      "/lib/lib.dom.d.ts": {
        "version": "-1086375748659",
        "signature": "-1086375748659"
      },
      "/lib/lib.webworker.importscripts.d.ts": {
        "version": "16827914512",
        "signature": "16827914512"
      },
      "/lib/lib.scripthost.d.ts": {
        "version": "-7856822451",
        "signature": "-7856822451"
      },
      "/src/core/anothermodule.ts": {
        "version": "-2676574883",
        "signature": "25219880154"
      },
      "/src/core/index.ts": {
        "version": "-16698397488",
        "signature": "11051732871"
      },
      "/src/core/some_decl.d.ts": {
        "version": "-9253692965",
        "signature": "-9253692965"
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "skipDefaultLibCheck": true,
      "configFilePath": "/src/core/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "/lib/lib.d.ts",
      "/lib/lib.es5.d.ts",
      "/lib/lib.dom.d.ts",
      "/lib/lib.webworker.importscripts.d.ts",
      "/lib/lib.scripthost.d.ts",
      "/src/core/anothermodule.ts",
      "/src/core/some_decl.d.ts",
      "/src/core/index.ts"
    ]
  }
}

//// [/src/core/index.js]
"use strict";
exports.__esModule = true;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
exports.leftPad = leftPad;
function multiply(a, b) { return a * b; }
exports.multiply = multiply;
var someClass = /** @class */ (function () {
    function someClass() {
    }
    return someClass;
}());


//// [/src/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }

class someClass { }

