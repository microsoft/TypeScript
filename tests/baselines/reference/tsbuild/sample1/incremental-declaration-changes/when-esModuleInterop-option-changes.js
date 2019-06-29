//// [/src/logic/index.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var c = __importStar(require("../core/index"));
function getSecondsInDay() {
    return c.multiply(10, 15);
}
exports.getSecondsInDay = getSecondsInDay;
var mod = __importStar(require("../core/anotherModule"));
exports.m = mod;


//// [/src/tests/index.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var c = __importStar(require("../core/index"));
var logic = __importStar(require("../logic/index"));
c.leftPad("", 10);
logic.getSecondsInDay();
var mod = __importStar(require("../core/anotherModule"));
exports.m = mod;


//// [/src/tests/tsconfig.json]
{
    "compilerOptions": {
        "incremental": true,
        "module": "commonjs",
        "esModuleInterop": true
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
      "esModuleInterop": true,
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

