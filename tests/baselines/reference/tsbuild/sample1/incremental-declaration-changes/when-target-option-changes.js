//// [/src/core/anotherModule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = "hello";


//// [/src/core/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
exports.leftPad = leftPad;
function multiply(a, b) { return a * b; }
exports.multiply = multiply;


//// [/src/core/tsconfig.json]
{
    "compilerOptions": {
        "incremental": true,
"listFiles": true,
"listEmittedFiles": true,
        "target": "es5",
    }
}

//// [/src/core/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "8926001564",
        "signature": "8926001564"
      },
      "../../lib/lib.esnext.d.ts": {
        "version": "-15964756381",
        "signature": "-15964756381"
      },
      "./anothermodule.ts": {
        "version": "-2676574883",
        "signature": "-8396256275"
      },
      "./index.ts": {
        "version": "-18749805970",
        "signature": "1874987148"
      },
      "./some_decl.d.ts": {
        "version": "-9253692965",
        "signature": "-9253692965"
      }
    },
    "options": {
      "incremental": true,
      "listFiles": true,
      "listEmittedFiles": true,
      "target": 1,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../../lib/lib.esnext.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

