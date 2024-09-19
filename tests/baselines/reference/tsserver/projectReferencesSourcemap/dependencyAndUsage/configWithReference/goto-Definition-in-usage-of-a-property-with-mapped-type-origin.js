Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/dependency/api.ts]
type ValidateShape<T> = {
    [K in keyof T]: T[K];
};

function getApi<T>(arg: ValidateShape<T>) {
    function createCaller<T>(arg: T): () => {
        [K in keyof T]: () => T[K];
    } {
        return null as any;
    }
    return {
        createCaller: createCaller(arg),
    };
}

const obj = getApi({
    foo: 1,
    bar: "",
});

export const createCaller = obj.createCaller;


//// [/user/username/projects/myproject/dependency/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declarationMap": true,
    "declarationDir": "../decls"
  }
}

//// [/user/username/projects/myproject/main/main.ts]
import { createCaller } from "../decls/api";
const caller = createCaller();
caller.foo;


//// [/user/username/projects/myproject/main/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declarationMap": true
  },
  "references": [
    {
      "path": "../dependency"
    }
  ]
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

//// [/user/username/projects/myproject/dependency/api.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCaller = void 0;
function getApi(arg) {
    function createCaller(arg) {
        return null;
    }
    return {
        createCaller: createCaller(arg),
    };
}
var obj = getApi({
    foo: 1,
    bar: "",
});
exports.createCaller = obj.createCaller;


//// [/user/username/projects/myproject/decls/api.d.ts.map]
{"version":3,"file":"api.d.ts","sourceRoot":"","sources":["../dependency/api.ts"],"names":[],"mappings":"AAoBA,eAAO,MAAM,YAAY;IAJrB,GAAG;IACH,GAAG;CAGqC,CAAC"}

//// [/user/username/projects/myproject/decls/api.d.ts]
export declare const createCaller: () => {
    foo: () => number;
    bar: () => string;
};
//# sourceMappingURL=api.d.ts.map

//// [/user/username/projects/myproject/dependency/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./api.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16529739457-type ValidateShape<T> = {\n    [K in keyof T]: T[K];\n};\n\nfunction getApi<T>(arg: ValidateShape<T>) {\n    function createCaller<T>(arg: T): () => {\n        [K in keyof T]: () => T[K];\n    } {\n        return null as any;\n    }\n    return {\n        createCaller: createCaller(arg),\n    };\n}\n\nconst obj = getApi({\n    foo: 1,\n    bar: \"\",\n});\n\nexport const createCaller = obj.createCaller;\n","signature":"23035000737-export declare const createCaller: () => {\n    foo: () => number;\n    bar: () => string;\n};\n"}],"root":[2],"options":{"composite":true,"declarationDir":"../decls","declarationMap":true},"latestChangedDtsFile":"../decls/api.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/dependency/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./api.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./api.ts": {
      "original": {
        "version": "-16529739457-type ValidateShape<T> = {\n    [K in keyof T]: T[K];\n};\n\nfunction getApi<T>(arg: ValidateShape<T>) {\n    function createCaller<T>(arg: T): () => {\n        [K in keyof T]: () => T[K];\n    } {\n        return null as any;\n    }\n    return {\n        createCaller: createCaller(arg),\n    };\n}\n\nconst obj = getApi({\n    foo: 1,\n    bar: \"\",\n});\n\nexport const createCaller = obj.createCaller;\n",
        "signature": "23035000737-export declare const createCaller: () => {\n    foo: () => number;\n    bar: () => string;\n};\n"
      },
      "version": "-16529739457-type ValidateShape<T> = {\n    [K in keyof T]: T[K];\n};\n\nfunction getApi<T>(arg: ValidateShape<T>) {\n    function createCaller<T>(arg: T): () => {\n        [K in keyof T]: () => T[K];\n    } {\n        return null as any;\n    }\n    return {\n        createCaller: createCaller(arg),\n    };\n}\n\nconst obj = getApi({\n    foo: 1,\n    bar: \"\",\n});\n\nexport const createCaller = obj.createCaller;\n",
      "signature": "23035000737-export declare const createCaller: () => {\n    foo: () => number;\n    bar: () => string;\n};\n"
    }
  },
  "root": [
    [
      2,
      "./api.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declarationDir": "../decls",
    "declarationMap": true
  },
  "latestChangedDtsFile": "../decls/api.d.ts",
  "version": "FakeTSVersion",
  "size": 1286
}

//// [/user/username/projects/myproject/main/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../decls/api");
var caller = (0, api_1.createCaller)();
caller.foo;


//// [/user/username/projects/myproject/main/main.d.ts.map]
{"version":3,"file":"main.d.ts","sourceRoot":"","sources":["main.ts"],"names":[],"mappings":""}

//// [/user/username/projects/myproject/main/main.d.ts]
export {};
//# sourceMappingURL=main.d.ts.map

//// [/user/username/projects/myproject/main/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","../decls/api.d.ts","./main.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"23035000737-export declare const createCaller: () => {\n    foo: () => number;\n    bar: () => string;\n};\n",{"version":"-4091673735-import { createCaller } from \"../decls/api\";\nconst caller = createCaller();\ncaller.foo;\n","signature":"-3531856636-export {};\n"}],"root":[3],"options":{"composite":true,"declarationMap":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./main.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../decls/api.d.ts",
    "./main.ts"
  ],
  "fileIdsList": [
    [
      "../decls/api.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../decls/api.d.ts": {
      "version": "23035000737-export declare const createCaller: () => {\n    foo: () => number;\n    bar: () => string;\n};\n",
      "signature": "23035000737-export declare const createCaller: () => {\n    foo: () => number;\n    bar: () => string;\n};\n"
    },
    "./main.ts": {
      "original": {
        "version": "-4091673735-import { createCaller } from \"../decls/api\";\nconst caller = createCaller();\ncaller.foo;\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-4091673735-import { createCaller } from \"../decls/api\";\nconst caller = createCaller();\ncaller.foo;\n",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      3,
      "./main.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declarationMap": true
  },
  "referencedMap": {
    "./main.ts": [
      "../decls/api.d.ts"
    ]
  },
  "latestChangedDtsFile": "./main.d.ts",
  "version": "FakeTSVersion",
  "size": 1028
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/main/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/myproject/main/tsconfig.json, currentDirectory: /user/username/projects/myproject/main
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/main/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/main/main.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "configFilePath": "/user/username/projects/myproject/main/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/dependency",
   "originalPath": "../dependency"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/main/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/main/main.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/dependency/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/dependency/api.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "declarationDir": "/user/username/projects/myproject/decls",
  "configFilePath": "/user/username/projects/myproject/dependency/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/api.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/dependency/api.ts Text-1 "type ValidateShape<T> = {\n    [K in keyof T]: T[K];\n};\n\nfunction getApi<T>(arg: ValidateShape<T>) {\n    function createCaller<T>(arg: T): () => {\n        [K in keyof T]: () => T[K];\n    } {\n        return null as any;\n    }\n    return {\n        createCaller: createCaller(arg),\n    };\n}\n\nconst obj = getApi({\n    foo: 1,\n    bar: \"\",\n});\n\nexport const createCaller = obj.createCaller;\n"
	/user/username/projects/myproject/main/main.ts SVC-1-0 "import { createCaller } from \"../decls/api\";\nconst caller = createCaller();\ncaller.foo;\n"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../dependency/api.ts
	  Imported via "../decls/api" from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/main/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "725f5b69066c57a96b52ceff33e6f8ba051a781bb82cf6869a874428cad2bf97",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 473,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "declarationMap": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/user/username/projects/myproject/main/main.ts",
        "configFile": "/user/username/projects/myproject/main/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/main/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/myproject/main/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/dependency/api.ts: *new*
  {}
/user/username/projects/myproject/dependency/tsconfig.json: *new*
  {}
/user/username/projects/myproject/main/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/decls: *new*
  {}
/user/username/projects/myproject/dependency: *new*
  {}
/user/username/projects/myproject/main: *new*
  {}

Projects::
/user/username/projects/myproject/main/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/main/tsconfig.json
/user/username/projects/myproject/dependency/api.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/main/tsconfig.json
/user/username/projects/myproject/main/main.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/main/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/main/main.ts",
        "line": 3,
        "offset": 8
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/user/username/projects/myproject/dependency/api.ts",
            "start": {
              "line": 17,
              "offset": 5
            },
            "end": {
              "line": 17,
              "offset": 8
            },
            "contextStart": {
              "line": 17,
              "offset": 5
            },
            "contextEnd": {
              "line": 17,
              "offset": 11
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 3,
            "offset": 8
          },
          "end": {
            "line": 3,
            "offset": 11
          }
        }
      },
      "responseRequired": true
    }
After request
