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


//// [/src/logic/index.js]
"use strict";
exports.__esModule = true;
var c = require("../core/index");
function getSecondsInDay() {
    return c.multiply(10, 15);
}
exports.getSecondsInDay = getSecondsInDay;
var mod = require("../core/anotherModule");
exports.m = mod;


//// [/src/tests/index.js]
"use strict";
exports.__esModule = true;
var c = require("../core/index");
var logic = require("../logic/index");
c.leftPad("", 10);
logic.getSecondsInDay();
var mod = require("../core/anotherModule");
exports.m = mod;


//// [/src/tests/tsconfig.json]
{
    "compilerOptions": {
        "incremental": true,
        "module": "commonjs",
        "esModuleInterop": false
    }
}

//// [/src/tests/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "-15964756381",
        "signature": "-15964756381"
      },
      "../core/index.ts": {
        "version": "-18749805970",
        "signature": "1874987148"
      },
      "../core/anothermodule.ts": {
        "version": "-2676574883",
        "signature": "-8396256275"
      },
      "../logic/index.ts": {
        "version": "-5786964698",
        "signature": "-6548680073"
      },
      "./index.ts": {
        "version": "12336236525",
        "signature": "-9209611"
      }
    },
    "options": {
      "incremental": true,
      "module": 1,
      "esModuleInterop": false,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "../logic/index.ts": [
        "../core/anothermodule.ts",
        "../core/index.ts"
      ],
      "./index.ts": [
        "../core/anothermodule.ts",
        "../core/index.ts",
        "../logic/index.ts"
      ]
    },
    "exportedModulesMap": {
      "../logic/index.ts": [
        "../core/anothermodule.ts"
      ],
      "./index.ts": [
        "../core/anothermodule.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.ts",
      "../core/index.ts",
      "../logic/index.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

