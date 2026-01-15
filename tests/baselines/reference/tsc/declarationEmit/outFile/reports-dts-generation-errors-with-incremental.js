currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "amd",
    "composite": true,
    "incremental": true,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "outFile": "./outFile.js"
  },
  "include": [
    "src"
  ]
}

//// [/home/src/workspaces/project/src/index.ts]
import ky from 'ky';
export const api = ky.extend({});


//// [/home/src/workspaces/project/ky.d.ts]
type KyInstance = {
    extend(options: Record<string,unknown>): KyInstance;
}
declare const ky: KyInstance;
export default ky;


//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
[96msrc/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/ky" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m

[96mtsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m8[0m     "outFile": "./outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m

TSFILE: /home/src/workspaces/project/outFile.js
TSFILE: /home/src/workspaces/project/outFile.tsbuildinfo
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
ky.d.ts
  Imported via 'ky' from file 'src/index.ts'
src/index.ts
  Matched by include pattern 'src' in 'tsconfig.json'

Found 3 errors in 2 files.

Errors  Files
     1  src/index.ts[90m:2[0m
     2  tsconfig.json[90m:3[0m


//// [/home/src/workspaces/project/outFile.js]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("src/index", ["require", "exports", "ky"], function (require, exports, ky_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.api = void 0;
    ky_1 = __importDefault(ky_1);
    exports.api = ky_1.default.extend({});
});


//// [/home/src/workspaces/project/outFile.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./ky.d.ts","./src/index.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","10101889135-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;\n","-383421929-import ky from 'ky';\nexport const api = ky.extend({});\n"],"root":[3],"options":{"composite":true,"module":2,"outFile":"./outFile.js","skipDefaultLibCheck":true,"skipLibCheck":true},"semanticDiagnosticsPerFile":[1,2,3],"emitDiagnosticsPerFile":[[3,[{"start":34,"length":3,"messageText":"Exported variable 'api' has or is using name 'KyInstance' from external module \"/home/src/workspaces/project/ky\" but cannot be named.","category":1,"code":4023}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./ky.d.ts",
    "./src/index.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./ky.d.ts": "10101889135-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;\n",
    "./src/index.ts": "-383421929-import ky from 'ky';\nexport const api = ky.extend({});\n"
  },
  "root": [
    [
      3,
      "./src/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js",
    "skipDefaultLibCheck": true,
    "skipLibCheck": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./ky.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/index.ts",
      "not cached or not changed"
    ]
  ],
  "emitDiagnosticsPerFile": [
    [
      "./src/index.ts",
      [
        {
          "start": 34,
          "length": 3,
          "messageText": "Exported variable 'api' has or is using name 'KyInstance' from external module \"/home/src/workspaces/project/ky\" but cannot be named.",
          "category": 1,
          "code": 4023
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1129
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --explainFiles --listEmittedFiles
Output::
[96msrc/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/ky" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m

[96mtsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m8[0m     "outFile": "./outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
ky.d.ts
  Imported via 'ky' from file 'src/index.ts'
src/index.ts
  Matched by include pattern 'src' in 'tsconfig.json'

Found 3 errors in 2 files.

Errors  Files
     1  src/index.ts[90m:2[0m
     2  tsconfig.json[90m:3[0m



exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b --explainFiles --listEmittedFiles -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96msrc/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/ky" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m

[96mtsconfig.json[0m:[93m8[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m8[0m     "outFile": "./outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
ky.d.ts
  Imported via 'ky' from file 'src/index.ts'
src/index.ts
  Matched by include pattern 'src' in 'tsconfig.json'

Found 3 errors.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
