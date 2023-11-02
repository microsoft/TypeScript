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

//// [/src/project/index.ts]
import ky from 'ky';
export const api = ky.extend({});


//// [/src/project/node_modules/ky/distribution/index.d.ts]
type KyInstance = {
     extend(options: Record<string,unknown>): KyInstance;
 }
 declare const ky: KyInstance;
 export default ky;


//// [/src/project/node_modules/ky/package.json]
{
  "name": "ky",
  "type": "module",
  "main": "./distribution/index.js"
}

//// [/src/project/package.json]
{
  "type": "module"
}

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "incremental": true,
    "declaration": true,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true
  }
}



Output::
/lib/tsc -b /src/project --explainFiles --listEmittedFiles --v
[[90m12:00:16 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:17 AM[0m] Project 'src/project/tsconfig.json' is out of date because output file 'src/project/tsconfig.tsbuildinfo' does not exist

[[90m12:00:18 AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/src/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /src/project/tsconfig.tsbuildinfo
lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
src/project/node_modules/ky/distribution/index.d.ts
  Imported via 'ky' from file 'src/project/index.ts'
  File is ECMAScript module because 'src/project/node_modules/ky/package.json' has field "type" with value "module"
src/project/index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'src/project/package.json' has field "type" with value "module"

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.esnext.full.d.ts","./node_modules/ky/distribution/index.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"20726041391-type KyInstance = {\n     extend(options: Record<string,unknown>): KyInstance;\n }\n declare const ky: KyInstance;\n export default ky;\n","impliedFormat":99},{"version":"-383421929-import ky from 'ky';\nexport const api = ky.extend({});\n","impliedFormat":99}],"root":[3],"options":{"declaration":true,"module":199,"skipDefaultLibCheck":true,"skipLibCheck":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,3,2],"affectedFilesPendingEmit":[3]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.esnext.full.d.ts",
      "./node_modules/ky/distribution/index.d.ts",
      "./index.ts"
    ],
    "fileNamesList": [
      [
        "./node_modules/ky/distribution/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.esnext.full.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/ky/distribution/index.d.ts": {
        "original": {
          "version": "20726041391-type KyInstance = {\n     extend(options: Record<string,unknown>): KyInstance;\n }\n declare const ky: KyInstance;\n export default ky;\n",
          "impliedFormat": 99
        },
        "version": "20726041391-type KyInstance = {\n     extend(options: Record<string,unknown>): KyInstance;\n }\n declare const ky: KyInstance;\n export default ky;\n",
        "signature": "20726041391-type KyInstance = {\n     extend(options: Record<string,unknown>): KyInstance;\n }\n declare const ky: KyInstance;\n export default ky;\n",
        "impliedFormat": "esnext"
      },
      "./index.ts": {
        "original": {
          "version": "-383421929-import ky from 'ky';\nexport const api = ky.extend({});\n",
          "impliedFormat": 99
        },
        "version": "-383421929-import ky from 'ky';\nexport const api = ky.extend({});\n",
        "signature": "-383421929-import ky from 'ky';\nexport const api = ky.extend({});\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        3,
        "./index.ts"
      ]
    ],
    "options": {
      "declaration": true,
      "module": 199,
      "skipDefaultLibCheck": true,
      "skipLibCheck": true
    },
    "referencedMap": {
      "./index.ts": [
        "./node_modules/ky/distribution/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.ts": [
        "./node_modules/ky/distribution/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.esnext.full.d.ts",
      "./index.ts",
      "./node_modules/ky/distribution/index.d.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./index.ts",
        "Js | Dts"
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 1182
}



Change:: no-change-run
Input::


Output::
/lib/tsc -b /src/project --explainFiles --listEmittedFiles --v
[[90m12:00:22 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:23 AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/project/tsconfig.tsbuildinfo' indicates that some of the changes were not emitted

[[90m12:00:24 AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/src/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
src/project/node_modules/ky/distribution/index.d.ts
  Imported via 'ky' from file 'src/project/index.ts'
  File is ECMAScript module because 'src/project/node_modules/ky/package.json' has field "type" with value "module"
src/project/index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'src/project/package.json' has field "type" with value "module"

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


