currentDirectory:: / useCaseSensitiveFileNames: false
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

//// [/lib/lib.esnext.full.d.ts]
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

//// [/src/project/ky.d.ts]
type KyInstance = {
    extend(options: Record<string,unknown>): KyInstance;
}
declare const ky: KyInstance;
export default ky;


//// [/src/project/src/index.ts]
import ky from 'ky';
export const api = ky.extend({});


//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "amd",
    "declaration": true,
    "incremental": true,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "outFile": "./outFile.js"
  },
  "include": [
    "src"
  ]
}



Output::
/lib/tsc -b /src/project --explainFiles --listEmittedFiles --v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because output file 'src/project/outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/src/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/src/project/ky" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /src/project/outFile.tsbuildinfo
lib/lib.d.ts
  Default library for target 'es5'
src/project/ky.d.ts
  Imported via 'ky' from file 'src/project/src/index.ts'
src/project/src/index.ts
  Matched by include pattern 'src' in 'src/project/tsconfig.json'

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/outFile.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./ky.d.ts","./src/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"10101889135-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;\n","impliedFormat":1},{"version":"-383421929-import ky from 'ky';\nexport const api = ky.extend({});\n","impliedFormat":1}],"root":[3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js","skipDefaultLibCheck":true,"skipLibCheck":true},"pendingEmit":false},"version":"FakeTSVersion"}

//// [/src/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./ky.d.ts",
      "./src/index.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./ky.d.ts": {
        "original": {
          "version": "10101889135-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;\n",
          "impliedFormat": 1
        },
        "version": "10101889135-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;\n",
        "impliedFormat": "commonjs"
      },
      "./src/index.ts": {
        "original": {
          "version": "-383421929-import ky from 'ky';\nexport const api = ky.extend({});\n",
          "impliedFormat": 1
        },
        "version": "-383421929-import ky from 'ky';\nexport const api = ky.extend({});\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        3,
        "./src/index.ts"
      ]
    ],
    "options": {
      "declaration": true,
      "module": 2,
      "outFile": "./outFile.js",
      "skipDefaultLibCheck": true,
      "skipLibCheck": true
    },
    "pendingEmit": [
      "Js | Dts",
      false
    ]
  },
  "version": "FakeTSVersion",
  "size": 1012
}



Change:: no-change-run
Input::


Output::
/lib/tsc -b /src/project --explainFiles --listEmittedFiles --v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/project/outFile.tsbuildinfo' indicates that some of the changes were not emitted

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/src/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/src/project/ky" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

lib/lib.d.ts
  Default library for target 'es5'
src/project/ky.d.ts
  Imported via 'ky' from file 'src/project/src/index.ts'
src/project/src/index.ts
  Matched by include pattern 'src' in 'src/project/tsconfig.json'

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


