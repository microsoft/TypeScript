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
    "references": [
        { "path": "../core" },
        { "path": "../logic" }
    ],
    "files": ["index.ts"],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true,
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
        "version": "-13851440507",
        "signature": "-13851440507"
      },
      "../core/anothermodule.ts": {
        "version": "7652028357",
        "signature": "7652028357"
      },
      "../logic/index.ts": {
        "version": "-6548680073",
        "signature": "-6548680073"
      },
      "./index.ts": {
        "version": "12336236525",
        "signature": "-9209611"
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
      "skipDefaultLibCheck": true,
      "esModuleInterop": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "../logic/index.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/anothermodule.d.ts",
        "../core/index.d.ts",
        "../logic/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../logic/index.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/anothermodule.d.ts"
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

