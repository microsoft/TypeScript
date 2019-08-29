//// [/lib/src/common/nominal.d.ts]
export declare type Nominal<T, Name extends string> = T & {
    [Symbol.species]: Name;
};


//// [/lib/src/common/nominal.js]
"use strict";
exports.__esModule = true;


//// [/lib/src/common/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib.d.ts": {
        "version": "-32082413277",
        "signature": "-32082413277"
      },
      "../../../src/common/nominal.ts": {
        "version": "-24498031910",
        "signature": "-9513375615"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "composite": true,
      "configFilePath": "../../../src/common/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../src/common/nominal.ts",
      "../../lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/lib/src/sub-project/index.d.ts]
import { Nominal } from '../common/nominal';
export declare type MyNominal = Nominal<string, 'MyNominal'>;


//// [/lib/src/sub-project/index.js]
"use strict";
exports.__esModule = true;


//// [/lib/src/sub-project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib.d.ts": {
        "version": "-32082413277",
        "signature": "-32082413277"
      },
      "../../../src/common/nominal.ts": {
        "version": "-9513375615",
        "signature": "-9513375615"
      },
      "../../../src/sub-project/index.ts": {
        "version": "-22894055505",
        "signature": "-21416888433"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "composite": true,
      "configFilePath": "../../../src/sub-project/tsconfig.json"
    },
    "referencedMap": {
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../src/common/nominal.ts",
      "../../../src/sub-project/index.ts",
      "../../lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/lib/src/sub-project-2/index.d.ts]
declare const variable: {
    key: import("../common/nominal").Nominal<string, "MyNominal">;
};
export declare function getVar(): keyof typeof variable;
export {};


//// [/lib/src/sub-project-2/index.js]
"use strict";
exports.__esModule = true;
var variable = {
    key: 'value'
};
function getVar() {
    return 'key';
}
exports.getVar = getVar;


//// [/lib/src/sub-project-2/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib.d.ts": {
        "version": "-32082413277",
        "signature": "-32082413277"
      },
      "../../../src/common/nominal.ts": {
        "version": "-9513375615",
        "signature": "-9513375615"
      },
      "../../../src/sub-project/index.ts": {
        "version": "-21416888433",
        "signature": "-21416888433"
      },
      "../../../src/sub-project-2/index.ts": {
        "version": "-13939373533",
        "signature": "-17233212183"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "composite": true,
      "configFilePath": "../../../src/sub-project-2/tsconfig.json"
    },
    "referencedMap": {
      "../../../src/sub-project-2/index.ts": [
        "../sub-project/index.d.ts"
      ],
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../../src/sub-project-2/index.ts": [
        "../common/nominal.d.ts"
      ],
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../src/common/nominal.ts",
      "../../../src/sub-project-2/index.ts",
      "../../../src/sub-project/index.ts",
      "../../lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

