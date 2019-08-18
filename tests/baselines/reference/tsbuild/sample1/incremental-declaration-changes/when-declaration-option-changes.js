//// [/src/core/anotherModule.d.ts]
export declare const World = "hello";


//// [/src/core/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;


//// [/src/core/tsconfig.json]
{
    "compilerOptions": {
        "incremental": true, "declaration": true,
        "skipDefaultLibCheck": true
    }
}

//// [/src/core/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397",
        "signature": "3858781397"
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
      "declaration": true,
      "skipDefaultLibCheck": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

