//// [/src/src/main.js]
"use strict";
exports.__esModule = true;
var sym = Symbol();


//// [/src/src/main.ts]
import { HKT } from "./hkt";

const sym = Symbol();

declare module "./hkt" {
  interface HKT<T> {
    [sym]: { a: T }
  }
}

type A = HKT<number>[typeof sym];

//// [/src/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "-15964756381",
        "signature": "-15964756381"
      },
      "./src/globals.d.ts": {
        "version": "-1994196675",
        "signature": "-1994196675"
      },
      "./src/hkt.ts": {
        "version": "675797797",
        "signature": "2373810515"
      },
      "./src/main.ts": {
        "version": "-27494779858",
        "signature": "-7779857705"
      }
    },
    "options": {
      "rootDir": "./src",
      "incremental": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./src/main.ts": [
        "./src/hkt.ts"
      ]
    },
    "exportedModulesMap": {
      "./src/main.ts": [
        "./src/hkt.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./src/globals.d.ts",
      "./src/hkt.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion"
}

