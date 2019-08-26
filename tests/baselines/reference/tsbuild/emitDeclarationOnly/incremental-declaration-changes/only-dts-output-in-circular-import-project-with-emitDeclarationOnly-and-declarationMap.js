//// [/src/lib/a.d.ts]
import { B } from "./b";
export interface A {
    b: B;
    foo: any;
}
//# sourceMappingURL=a.d.ts.map

//// [/src/lib/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAExB,MAAM,WAAW,CAAC;IAChB,CAAC,EAAE,CAAC,CAAC;IAAC,GAAG,EAAE,GAAG,CAAC;CAChB"}

//// [/src/src/a.ts]
import { B } from "./b";

export interface A {
  b: B; foo: any;
}


//// [/src/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397",
        "signature": "3858781397"
      },
      "./src/c.ts": {
        "version": "429593025",
        "signature": "16358263348"
      },
      "./src/b.ts": {
        "version": "-2273488249",
        "signature": "-10341094830"
      },
      "./src/a.ts": {
        "version": "-14761736732",
        "signature": "26895474425"
      },
      "./src/index.ts": {
        "version": "1286756397",
        "signature": "3258829224"
      }
    },
    "options": {
      "incremental": true,
      "target": 1,
      "module": 1,
      "declaration": true,
      "declarationMap": true,
      "sourceMap": true,
      "outDir": "./lib",
      "composite": true,
      "strict": true,
      "esModuleInterop": true,
      "alwaysStrict": true,
      "rootDir": "./src",
      "emitDeclarationOnly": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./src/a.ts": [
        "./src/b.ts"
      ],
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ],
      "./src/index.ts": [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts"
      ]
    },
    "exportedModulesMap": {
      "./src/a.ts": [
        "./src/b.ts"
      ],
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ],
      "./src/index.ts": [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

