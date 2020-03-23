/a/lib/tsc.js -i
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

//// [/users/username/projects/project/globals.d.ts]
declare namespace Config { const value: string;} 

//// [/users/username/projects/project/index.ts]
console.log(Config.value);

//// [/users/username/projects/project/tsconfig.json]
{"compilerOptions":{"incremental":true}}

//// [/users/username/projects/project/index.js]
console.log(Config.value);


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "./globals.d.ts": {
        "version": "-6314871648-declare namespace Config { const value: string;} ",
        "signature": "-6314871648-declare namespace Config { const value: string;} "
      },
      "./index.ts": {
        "version": "5371023861-console.log(Config.value);",
        "signature": "5381-"
      }
    },
    "options": {
      "incremental": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./globals.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion"
}


Output::


Program root files: ["/users/username/projects/project/globals.d.ts","/users/username/projects/project/index.ts"]
Program options: {"incremental":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/globals.d.ts
/users/username/projects/project/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/globals.d.ts
/users/username/projects/project/index.ts

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.Success

Change::

//// [/users/username/projects/project/globals.d.ts] deleted

Output::


Program root files: ["/users/username/projects/project/index.ts"]
Program options: {"incremental":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/index.ts

Semantic diagnostics in builder refreshed for::

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.Success
