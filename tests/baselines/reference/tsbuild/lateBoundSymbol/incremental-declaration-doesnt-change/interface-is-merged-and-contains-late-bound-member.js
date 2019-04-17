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
      "/lib/lib.d.ts": {
        "version": "-15964756381",
        "signature": "-15964756381"
      },
      "/src/src/globals.d.ts": {
        "version": "-1994196675",
        "signature": "-1994196675"
      },
      "/src/src/hkt.ts": {
        "version": "675797797",
        "signature": "2373810515"
      },
      "/src/src/main.ts": {
        "version": "-27494779858",
        "signature": "-7779857705"
      }
    },
    "options": {
      "rootDir": "/src/src",
      "incremental": true,
      "configFilePath": "/src/tsconfig.json"
    },
    "referencedMap": {
      "/src/src/main.ts": [
        "/src/src/hkt.ts"
      ]
    },
    "exportedModulesMap": {
      "/src/src/main.ts": [
        "/src/src/hkt.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "/lib/lib.d.ts",
      "/src/src/globals.d.ts",
      "/src/src/hkt.ts",
      "/src/src/main.ts"
    ]
  },
  "version": "FakeTSVersion"
}

