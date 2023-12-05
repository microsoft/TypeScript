currentDirectory:: /user/username/projects/sample1 useCaseSensitiveFileNames: false
Input::
//// [/a/lib/lib.d.ts]
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

//// [/user/username/projects/sample1/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }


//// [/user/username/projects/sample1/core/some_decl.d.ts]
declare const dts: any;

//// [/user/username/projects/sample1/core/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "anotherModule.ts",
    "index.ts",
    "some_decl.d.ts"
  ]
}

//// [/user/username/projects/sample1/logic/index.ts]
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;


//// [/user/username/projects/sample1/logic/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "sourceMap": true,
    "forceConsistentCasingInFileNames": true,
    "skipDefaultLibCheck": true
  },
  "references": [
    {
      "path": "../core"
    }
  ]
}

//// [/user/username/projects/sample1/tests/index.ts]
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;


//// [/user/username/projects/sample1/tests/tsconfig.json]
{
  "references": [
    {
      "path": "../core"
    },
    {
      "path": "../logic"
    }
  ],
  "files": [
    "index.ts"
  ],
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "forceConsistentCasingInFileNames": true,
    "skipDefaultLibCheck": true
  }
}



Output::
/a/lib/tsc --b tests --v --f
[[90m12:00:24 AM[0m] Projects in this build: 
    * core/tsconfig.json
    * logic/tsconfig.json
    * tests/tsconfig.json

[[90m12:00:25 AM[0m] Project 'core/tsconfig.json' is being forcibly rebuilt

[[90m12:00:26 AM[0m] Building project '/user/username/projects/sample1/core/tsconfig.json'...

[91merror[0m[90m TS6053: [0mFile '/user/username/projects/sample1/core/anotherModule.ts' not found.
  The file is in the program because:
    Part of 'files' list in tsconfig.json

  [96mcore/tsconfig.json[0m:[93m6[0m:[93m5[0m
    [7m6[0m     "anotherModule.ts",
    [7m [0m [96m    ~~~~~~~~~~~~~~~~~~[0m
    File is matched by 'files' list specified here.

[[90m12:00:30 AM[0m] Project 'logic/tsconfig.json' can't be built because its dependency 'core' has errors

[[90m12:00:31 AM[0m] Skipping build of project '/user/username/projects/sample1/logic/tsconfig.json' because its dependency '/user/username/projects/sample1/core' has errors

[[90m12:00:32 AM[0m] Project 'tests/tsconfig.json' can't be built because its dependency 'core' has errors

[[90m12:00:33 AM[0m] Skipping build of project '/user/username/projects/sample1/tests/tsconfig.json' because its dependency '/user/username/projects/sample1/core' has errors


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n","signature":false},{"version":"-7959511260-declare const dts: any;","signature":false,"affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"changeFileSet":[1,2,3]},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "signature": false,
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "original": {
          "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
          "signature": false
        },
        "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n"
      },
      "./some_decl.d.ts": {
        "original": {
          "version": "-7959511260-declare const dts: any;",
          "signature": false,
          "affectsGlobalScope": true
        },
        "version": "-7959511260-declare const dts: any;",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ],
      [
        3,
        "./some_decl.d.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "changeFileSet": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1060
}

