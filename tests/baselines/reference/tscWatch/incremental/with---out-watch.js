currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames: false
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

//// [/users/username/projects/project/file1.ts]
const x = 10;

//// [/users/username/projects/project/file2.ts]
const y = 20;

//// [/users/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "outFile": "out.js"
  }
}


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/out.js]
var x = 10;
var y = 20;


//// [/users/username/projects/project/out.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./file1.ts","./file2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","impliedFormat":1},{"version":"5029505981-const x = 10;","impliedFormat":1},{"version":"2026007743-const y = 20;","impliedFormat":1}],"root":[2,3],"options":{"outFile":"./out.js"}},"version":"FakeTSVersion"}

//// [/users/username/projects/project/out.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./file1.ts",
      "./file2.ts"
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "impliedFormat": "commonjs"
      },
      "./file1.ts": {
        "original": {
          "version": "5029505981-const x = 10;",
          "impliedFormat": 1
        },
        "version": "5029505981-const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./file2.ts": {
        "original": {
          "version": "2026007743-const y = 20;",
          "impliedFormat": 1
        },
        "version": "2026007743-const y = 20;",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./file1.ts"
      ],
      [
        3,
        "./file2.ts"
      ]
    ],
    "options": {
      "outFile": "./out.js"
    }
  },
  "version": "FakeTSVersion",
  "size": 673
}


PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/project/file1.ts: *new*
  {}
/users/username/projects/project/file2.ts: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

Program root files: [
  "/users/username/projects/project/file1.ts",
  "/users/username/projects/project/file2.ts"
]
Program options: {
  "incremental": true,
  "outFile": "/users/username/projects/project/out.js",
  "watch": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
