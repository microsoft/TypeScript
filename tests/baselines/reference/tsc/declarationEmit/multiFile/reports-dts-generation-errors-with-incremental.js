currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "composite": true,
    "incremental": true,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true
  }
}

//// [/home/src/workspaces/project/index.ts]
import ky from 'ky';
export const api = ky.extend({});


//// [/home/src/workspaces/project/package.json]
{
  "type": "module"
}

//// [/home/src/workspaces/project/node_modules/ky/distribution/index.d.ts]
type KyInstance = {
    extend(options: Record<string,unknown>): KyInstance;
}
declare const ky: KyInstance;
export default ky;


//// [/home/src/workspaces/project/node_modules/ky/package.json]
{
  "name": "ky",
  "type": "module",
  "main": "./distribution/index.js"
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --explainFiles --listEmittedFiles
Output::
[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /home/src/workspaces/project/index.js
TSFILE: /home/src/workspaces/project/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
node_modules/ky/distribution/index.d.ts
  Imported via 'ky' from file 'index.ts'
  File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 1 error in index.ts[90m:2[0m



//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*

//// [/home/src/workspaces/project/index.js]
import ky from 'ky';
export const api = ky.extend({});


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.esnext.full.d.ts","./node_modules/ky/distribution/index.d.ts","./index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"10101889135-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;\n","impliedFormat":99},{"version":"-383421929-import ky from 'ky';\nexport const api = ky.extend({});\n","impliedFormat":99}],"root":[3],"options":{"composite":true,"module":199,"skipDefaultLibCheck":true,"skipLibCheck":true},"referencedMap":[[3,1]],"emitDiagnosticsPerFile":[[3,[{"start":34,"length":3,"messageText":"Exported variable 'api' has or is using name 'KyInstance' from external module \"/home/src/workspaces/project/node_modules/ky/distribution/index\" but cannot be named.","category":1,"code":4023}]]],"emitSignatures":[3],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.esnext.full.d.ts",
    "./node_modules/ky/distribution/index.d.ts",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "./node_modules/ky/distribution/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.esnext.full.d.ts": {
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
        "version": "10101889135-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;\n",
        "impliedFormat": 99
      },
      "version": "10101889135-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;\n",
      "signature": "10101889135-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;\n",
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
    "composite": true,
    "module": 199,
    "skipDefaultLibCheck": true,
    "skipLibCheck": true
  },
  "referencedMap": {
    "./index.ts": [
      "./node_modules/ky/distribution/index.d.ts"
    ]
  },
  "emitDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "start": 34,
          "length": 3,
          "messageText": "Exported variable 'api' has or is using name 'KyInstance' from external module \"/home/src/workspaces/project/node_modules/ky/distribution/index\" but cannot be named.",
          "category": 1,
          "code": 4023
        }
      ]
    ]
  ],
  "emitSignatures": [
    "./index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 1364
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --explainFiles --listEmittedFiles
Output::
[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

../../tslibs/TS/Lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
node_modules/ky/distribution/index.d.ts
  Imported via 'ky' from file 'index.ts'
  File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 1 error in index.ts[90m:2[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b --explainFiles --listEmittedFiles -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

../../tslibs/TS/Lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
node_modules/ky/distribution/index.d.ts
  Imported via 'ky' from file 'index.ts'
  File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 1 error.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
