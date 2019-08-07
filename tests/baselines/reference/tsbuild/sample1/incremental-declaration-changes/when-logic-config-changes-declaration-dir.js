//// [/src/logic/decls/index.d.ts]
export declare function getSecondsInDay(): number;
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;


//// [/src/logic/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationDir": "decls",
        "sourceMap": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    },
    "references": [
        { "path": "../core" }
    ]
}


//// [/src/logic/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397",
        "signature": "3858781397"
      },
      "../core/index.ts": {
        "version": "-13851440507",
        "signature": "-13851440507"
      },
      "../core/anothermodule.ts": {
        "version": "7652028357",
        "signature": "7652028357"
      },
      "./index.ts": {
        "version": "-5786964698",
        "signature": "-6548680073"
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "declarationDir": "./decls",
      "sourceMap": true,
      "forceConsistentCasingInFileNames": true,
      "skipDefaultLibCheck": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./index.ts": [
        "../core/anothermodule.d.ts",
        "../core/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.ts": [
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.ts",
      "../core/index.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/tests/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397",
        "signature": "3858781397"
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
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "../logic/index.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/anothermodule.d.ts",
        "../core/index.d.ts",
        "../logic/decls/index.d.ts"
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

