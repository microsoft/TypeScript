Input::
//// [/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/src/src/hello.json]
{
  "hello": "world"
}

//// [/src/src/index.ts]
import hello from "./hello.json"

export default hello.hello

//// [/src/tsconfig_withFiles.json]


//// [/src/tsconfig_withInclude.json]
{
  "compilerOptions": {
    "composite": true,
    "moduleResolution": "node",
    "module": "commonjs",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "outDir": "dist",
    "skipDefaultLibCheck": true
  },
  "include": [
    "src/**/*"
  ]
}

//// [/src/tsconfig_withIncludeAndFiles.json]


//// [/src/tsconfig_withIncludeOfJson.json]




Output::
/lib/tsc --b /src/tsconfig_withInclude.json --v --explainFiles
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/tsconfig_withInclude.json

[[90m12:00:00 AM[0m] Project 'src/tsconfig_withInclude.json' is out of date because output file 'src/dist/src/index.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/tsconfig_withInclude.json'...

[96msrc/src/index.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS6307: [0mFile '/src/src/hello.json' is not listed within the file list of project '/src/tsconfig_withInclude.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import hello from "./hello.json"
[7m [0m [91m                  ~~~~~~~~~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/src/hello.json
  Imported via "./hello.json" from file 'src/src/index.ts'
src/src/index.ts
  Matched by include pattern 'src/**/*' in 'src/tsconfig_withInclude.json'

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/dist/tsconfig_withInclude.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../src/hello.json","../src/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"6651571919-{\n  \"hello\": \"world\"\n}","-27703454282-import hello from \"./hello.json\"\n\nexport default hello.hello"],"options":{"allowSyntheticDefaultImports":true,"composite":true,"esModuleInterop":true,"module":1,"outDir":"./","skipDefaultLibCheck":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3],"affectedFilesPendingEmit":[[2,1],[3,1]]},"version":"FakeTSVersion"}

//// [/src/dist/tsconfig_withInclude.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../src/hello.json",
      "../src/index.ts"
    ],
    "fileNamesList": [
      [
        "../src/hello.json"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../src/hello.json": {
        "version": "6651571919-{\n  \"hello\": \"world\"\n}",
        "signature": "6651571919-{\n  \"hello\": \"world\"\n}"
      },
      "../src/index.ts": {
        "version": "-27703454282-import hello from \"./hello.json\"\n\nexport default hello.hello",
        "signature": "-27703454282-import hello from \"./hello.json\"\n\nexport default hello.hello"
      }
    },
    "options": {
      "allowSyntheticDefaultImports": true,
      "composite": true,
      "esModuleInterop": true,
      "module": 1,
      "outDir": "./",
      "skipDefaultLibCheck": true
    },
    "referencedMap": {
      "../src/index.ts": [
        "../src/hello.json"
      ]
    },
    "exportedModulesMap": {
      "../src/index.ts": [
        "../src/hello.json"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../src/hello.json",
      "../src/index.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../src/hello.json",
        "Full"
      ],
      [
        "../src/index.ts",
        "Full"
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 1018
}

