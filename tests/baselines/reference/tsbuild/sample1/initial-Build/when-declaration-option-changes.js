//// [/src/core/anotherModule.js]
"use strict";
exports.__esModule = true;
exports.World = "hello";


//// [/src/core/index.js]
"use strict";
exports.__esModule = true;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
exports.leftPad = leftPad;
function multiply(a, b) { return a * b; }
exports.multiply = multiply;


//// [/src/core/tsconfig.json]
{
    "compilerOptions": {
        "incremental": true,
        "skipDefaultLibCheck": true
    }
}

//// [/src/core/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "/lib/lib.d.ts": {
        "version": "/lib/lib.d.ts",
        "signature": "/lib/lib.d.ts"
      },
      "/lib/lib.es5.d.ts": {
        "version": "/lib/lib.es5.d.ts",
        "signature": "/lib/lib.es5.d.ts"
      },
      "/lib/lib.dom.d.ts": {
        "version": "/lib/lib.dom.d.ts",
        "signature": "/lib/lib.dom.d.ts"
      },
      "/lib/lib.webworker.importscripts.d.ts": {
        "version": "/lib/lib.webworker.importscripts.d.ts",
        "signature": "/lib/lib.webworker.importscripts.d.ts"
      },
      "/lib/lib.scripthost.d.ts": {
        "version": "/lib/lib.scripthost.d.ts",
        "signature": "/lib/lib.scripthost.d.ts"
      },
      "/src/core/anothermodule.ts": {
        "version": "-2676574883",
        "signature": "-8396256275"
      },
      "/src/core/index.ts": {
        "version": "-18749805970",
        "signature": "1874987148"
      },
      "/src/core/some_decl.d.ts": {
        "version": "-9253692965",
        "signature": "-9253692965"
      }
    },
    "options": {
      "incremental": true,
      "skipDefaultLibCheck": true,
      "configFilePath": "/src/core/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "/lib/lib.d.ts",
      "/lib/lib.dom.d.ts",
      "/lib/lib.es5.d.ts",
      "/lib/lib.scripthost.d.ts",
      "/lib/lib.webworker.importscripts.d.ts",
      "/src/core/anothermodule.ts",
      "/src/core/index.ts",
      "/src/core/some_decl.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

