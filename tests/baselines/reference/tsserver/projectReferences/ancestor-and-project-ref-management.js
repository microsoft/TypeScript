currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
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

//// [/user/username/projects/container/lib/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../built/local/lib.js",
    "composite": true,
    "declarationMap": true
  },
  "references": [],
  "files": [
    "index.ts"
  ]
}

//// [/user/username/projects/container/lib/index.ts]
namespace container {
    export const myConst = 30;
}


//// [/user/username/projects/container/exec/tsconfig.json]
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "outFile": "../built/local/exec.js"
  },
  "files": [
    "index.ts"
  ],
  "references": [
    {
      "path": "../lib",
      "prepend": true
    }
  ]
}

//// [/user/username/projects/container/exec/index.ts]
namespace container {
    export function getMyConst() {
        return myConst;
    }
}


//// [/user/username/projects/container/compositeExec/tsconfig.json]
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "outFile": "../built/local/compositeExec.js",
    "composite": true,
    "declarationMap": true
  },
  "files": [
    "index.ts"
  ],
  "references": [
    {
      "path": "../lib",
      "prepend": true
    }
  ]
}

//// [/user/username/projects/container/compositeExec/index.ts]
namespace container {
    export function getMyConst() {
        return myConst;
    }
}


//// [/user/username/projects/container/tsconfig.json]
{
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./exec"
    },
    {
      "path": "./compositeExec"
    }
  ]
}

//// [/user/username/projects/temp/temp.ts]
let x = 10

//// [/user/username/projects/container/built/local/lib.js]
var container;
(function (container) {
    container.myConst = 30;
})(container || (container = {}));


//// [/user/username/projects/container/built/local/lib.d.ts.map]
{"version":3,"file":"lib.d.ts","sourceRoot":"","sources":["../../lib/index.ts"],"names":[],"mappings":"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B"}

//// [/user/username/projects/container/built/local/lib.d.ts]
declare namespace container {
    const myConst = 30;
}
//# sourceMappingURL=lib.d.ts.map

//// [/user/username/projects/container/built/local/lib.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../../lib","sourceFiles":["../../lib/index.ts"],"js":{"sections":[{"pos":0,"end":102,"kind":"text"}],"hash":"-5780640416-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\n"},"dts":{"sections":[{"pos":0,"end":56,"kind":"text"}],"mapHash":"-12950023432-{\"version\":3,\"file\":\"lib.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B\"}","hash":"-3233313694-declare namespace container {\n    const myConst = 30;\n}\n//# sourceMappingURL=lib.d.ts.map"}},"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../lib/index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-14968179652-namespace container {\n    export const myConst = 30;\n}\n"],"root":[2],"options":{"composite":true,"declarationMap":true,"outFile":"./lib.js"},"outSignature":"4250822250-declare namespace container {\n    const myConst = 30;\n}\n","latestChangedDtsFile":"./lib.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/container/built/local/lib.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "../../lib",
    "sourceFiles": [
      "../../lib/index.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 102,
          "kind": "text"
        }
      ],
      "hash": "-5780640416-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 56,
          "kind": "text"
        }
      ],
      "hash": "-3233313694-declare namespace container {\n    const myConst = 30;\n}\n//# sourceMappingURL=lib.d.ts.map",
      "mapHash": "-12950023432-{\"version\":3,\"file\":\"lib.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../../lib/index.ts"
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "../../lib/index.ts": "-14968179652-namespace container {\n    export const myConst = 30;\n}\n"
    },
    "root": [
      [
        2,
        "../../lib/index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "outFile": "./lib.js"
    },
    "outSignature": "4250822250-declare namespace container {\n    const myConst = 30;\n}\n",
    "latestChangedDtsFile": "./lib.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1401
}

//// [/user/username/projects/container/built/local/lib.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/container/built/local/lib.js
----------------------------------------------------------------------
text: (0-102)
var container;
(function (container) {
    container.myConst = 30;
})(container || (container = {}));

======================================================================
======================================================================
File:: /user/username/projects/container/built/local/lib.d.ts
----------------------------------------------------------------------
text: (0-56)
declare namespace container {
    const myConst = 30;
}

======================================================================

//// [/user/username/projects/container/built/local/exec.js]
var container;
(function (container) {
    container.myConst = 30;
})(container || (container = {}));
var container;
(function (container) {
    function getMyConst() {
        return container.myConst;
    }
    container.getMyConst = getMyConst;
})(container || (container = {}));


//// [/user/username/projects/container/built/local/compositeExec.js]
var container;
(function (container) {
    container.myConst = 30;
})(container || (container = {}));
var container;
(function (container) {
    function getMyConst() {
        return container.myConst;
    }
    container.getMyConst = getMyConst;
})(container || (container = {}));


//// [/user/username/projects/container/built/local/compositeExec.d.ts.map]
{"version":3,"file":"compositeExec.d.ts","sourceRoot":"","sources":["../../lib/index.ts","../../compositeExec/index.ts"],"names":[],"mappings":"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B;ACFD,kBAAU,SAAS,CAAC;IAChB,SAAgB,UAAU,WAEzB;CACJ"}

//// [/user/username/projects/container/built/local/compositeExec.d.ts]
declare namespace container {
    const myConst = 30;
}
declare namespace container {
    function getMyConst(): number;
}
//# sourceMappingURL=compositeExec.d.ts.map

//// [/user/username/projects/container/built/local/compositeExec.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../../compositeExec","sourceFiles":["../../compositeExec/index.ts"],"js":{"sections":[{"pos":0,"end":102,"kind":"prepend","data":"./lib.js","texts":[{"pos":0,"end":102,"kind":"text"}]},{"pos":102,"end":283,"kind":"text"}],"hash":"-2184050024-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\nvar container;\n(function (container) {\n    function getMyConst() {\n        return container.myConst;\n    }\n    container.getMyConst = getMyConst;\n})(container || (container = {}));\n"},"dts":{"sections":[{"pos":0,"end":56,"kind":"prepend","data":"./lib.d.ts","texts":[{"pos":0,"end":56,"kind":"text"}]},{"pos":56,"end":123,"kind":"text"}],"mapHash":"25748245913-{\"version\":3,\"file\":\"compositeExec.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\",\"../../compositeExec/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B;ACFD,kBAAU,SAAS,CAAC;IAChB,SAAgB,UAAU,WAEzB;CACJ\"}","hash":"862035579-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n//# sourceMappingURL=compositeExec.d.ts.map"}},"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","./lib.d.ts","../../compositeexec/index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","4250822250-declare namespace container {\n    const myConst = 30;\n}\n","-4062145979-namespace container {\n    export function getMyConst() {\n        return myConst;\n    }\n}\n"],"root":[3],"options":{"composite":true,"declarationMap":true,"outFile":"./compositeExec.js"},"outSignature":"5987946274-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n","latestChangedDtsFile":"./compositeExec.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/container/built/local/compositeExec.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "../../compositeExec",
    "sourceFiles": [
      "../../compositeExec/index.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 102,
          "kind": "prepend",
          "data": "./lib.js",
          "texts": [
            {
              "pos": 0,
              "end": 102,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 102,
          "end": 283,
          "kind": "text"
        }
      ],
      "hash": "-2184050024-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\nvar container;\n(function (container) {\n    function getMyConst() {\n        return container.myConst;\n    }\n    container.getMyConst = getMyConst;\n})(container || (container = {}));\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 56,
          "kind": "prepend",
          "data": "./lib.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 56,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 56,
          "end": 123,
          "kind": "text"
        }
      ],
      "hash": "862035579-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n//# sourceMappingURL=compositeExec.d.ts.map",
      "mapHash": "25748245913-{\"version\":3,\"file\":\"compositeExec.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\",\"../../compositeExec/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B;ACFD,kBAAU,SAAS,CAAC;IAChB,SAAgB,UAAU,WAEzB;CACJ\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "./lib.d.ts",
      "../../compositeexec/index.ts"
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./lib.d.ts": "4250822250-declare namespace container {\n    const myConst = 30;\n}\n",
      "../../compositeexec/index.ts": "-4062145979-namespace container {\n    export function getMyConst() {\n        return myConst;\n    }\n}\n"
    },
    "root": [
      [
        3,
        "../../compositeexec/index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declarationMap": true,
      "outFile": "./compositeExec.js"
    },
    "outSignature": "5987946274-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n",
    "latestChangedDtsFile": "./compositeExec.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2201
}

//// [/user/username/projects/container/built/local/compositeExec.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/container/built/local/compositeExec.js
----------------------------------------------------------------------
prepend: (0-102):: ./lib.js texts:: 1
>>--------------------------------------------------------------------
text: (0-102)
var container;
(function (container) {
    container.myConst = 30;
})(container || (container = {}));

----------------------------------------------------------------------
text: (102-283)
var container;
(function (container) {
    function getMyConst() {
        return container.myConst;
    }
    container.getMyConst = getMyConst;
})(container || (container = {}));

======================================================================
======================================================================
File:: /user/username/projects/container/built/local/compositeExec.d.ts
----------------------------------------------------------------------
prepend: (0-56):: ./lib.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-56)
declare namespace container {
    const myConst = 30;
}

----------------------------------------------------------------------
text: (56-123)
declare namespace container {
    function getMyConst(): number;
}

======================================================================


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/container/compositeExec/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/container/compositeExec
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/container/compositeExec/index.ts :: Config file name: /user/username/projects/container/compositeExec/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/container/compositeExec/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/container/compositeExec/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/container/compositeExec/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/container/compositeExec/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/container/compositeExec/index.ts"
 ],
 "options": {
  "ignoreDeprecations": "5.0",
  "outFile": "/user/username/projects/container/built/local/compositeExec.js",
  "composite": true,
  "declarationMap": true,
  "configFilePath": "/user/username/projects/container/compositeExec/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/container/lib",
   "originalPath": "../lib",
   "prepend": true
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/container/lib/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/container/lib/index.ts"
 ],
 "options": {
  "outFile": "/user/username/projects/container/built/local/lib.js",
  "composite": true,
  "declarationMap": true,
  "configFilePath": "/user/username/projects/container/lib/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/container/lib/index.ts Text-1 "namespace container {\n    export const myConst = 30;\n}\n"
	/user/username/projects/container/compositeExec/index.ts SVC-1-0 "namespace container {\n    export function getMyConst() {\n        return myConst;\n    }\n}\n"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/container/compositeExec/tsconfig.json"
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
          "projectId": "4a49a35a0acdbaaa4a2991c79826326a1776aff5aebf3ee850c93bbc356c3c66",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 144,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "ignoreDeprecations": "",
            "outFile": "",
            "composite": true,
            "declarationMap": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
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
        "triggerFile": "/user/username/projects/container/compositeExec/index.ts",
        "configFile": "/user/username/projects/container/compositeExec/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/container/compositeExec
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/container/compositeExec/tsconfig.json :: Config file name: /user/username/projects/container/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/container/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/container
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/container/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/container/compositeExec/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/container/compositeExec/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/container/compositeExec/tsconfig.json: *new*
  {}
/user/username/projects/container/lib/index.ts: *new*
  {}
/user/username/projects/container/lib/tsconfig.json: *new*
  {}
/user/username/projects/container/tsconfig.json: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/temp/temp.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/temp
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/temp/temp.ts :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/temp/temp.ts SVC-1-0 "let x = 10"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	temp.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/container/compositeExec/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/temp/temp.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/container/compositeExec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/temp/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/temp/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/compositeExec/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/tsconfig.json:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/container/compositeExec/index.ts",
        "line": 3,
        "offset": 16
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/container/lib
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/container/lib/index.ts :: Config file name: /user/username/projects/container/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/container/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/container/lib/tsconfig.json",
        "reason": "Creating project for original file: /user/username/projects/container/lib/index.ts"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/container/lib/index.ts Text-1 "namespace container {\n    export const myConst = 30;\n}\n"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/container/lib/tsconfig.json"
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
          "projectId": "e61069111d2ca70d3f2bc812f1d97caa1747305429cffa2675dc65febb742492",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 55,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "outFile": "",
            "composite": true,
            "declarationMap": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
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
Info seq  [hh:mm:ss:mss] Loading configured project /user/username/projects/container/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/container/tsconfig.json",
        "reason": "Creating project possibly referencing default composite project /user/username/projects/container/compositeExec/tsconfig.json of open file /user/username/projects/container/compositeExec/index.ts"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/container/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/container/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/container/exec",
   "originalPath": "./exec"
  },
  {
   "path": "/user/username/projects/container/compositeExec",
   "originalPath": "./compositeExec"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/container/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/container/exec/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/container/exec/index.ts"
 ],
 "options": {
  "ignoreDeprecations": "5.0",
  "outFile": "/user/username/projects/container/built/local/exec.js",
  "configFilePath": "/user/username/projects/container/exec/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/container/lib",
   "originalPath": "../lib",
   "prepend": true
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/container/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/container/tsconfig.json"
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
          "projectId": "58f572698e66885ce8f7c23b412d0e2984f38b8fd6de217d9439e2c8338b9042",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 0,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
          "include": true,
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
        "triggerFile": "/user/username/projects/container/tsconfig.json",
        "configFile": "/user/username/projects/container/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 10,
              "offset": 5
            },
            "end": {
              "line": 13,
              "offset": 6
            },
            "text": "Option 'prepend' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '\"ignoreDeprecations\": \"5.0\"' to silence this error.",
            "code": 5101,
            "category": "error",
            "fileName": "/user/username/projects/container/exec/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/container/exec/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/container/exec/tsconfig.json",
        "reason": "Creating project referenced by : /user/username/projects/container/tsconfig.json as it references project /user/username/projects/container/lib/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/container/lib/index.ts Text-1 "namespace container {\n    export const myConst = 30;\n}\n"
	/user/username/projects/container/exec/index.ts Text-1 "namespace container {\n    export function getMyConst() {\n        return myConst;\n    }\n}\n"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/container/exec/tsconfig.json"
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
          "projectId": "69a595248fa9edb3dbfc452b8205588088247a88d3c86a82fe616d9ba3def6a1",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 144,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "ignoreDeprecations": "",
            "outFile": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
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
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/container/lib
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/container/lib/index.ts :: Config file name: /user/username/projects/container/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "myConst",
          "fullDisplayName": "container.myConst",
          "kind": "const",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 3,
              "offset": 16
            },
            "end": {
              "line": 3,
              "offset": 23
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/container/lib/index.ts",
            "locs": [
              {
                "start": {
                  "line": 2,
                  "offset": 18
                },
                "end": {
                  "line": 2,
                  "offset": 25
                },
                "contextStart": {
                  "line": 2,
                  "offset": 5
                },
                "contextEnd": {
                  "line": 2,
                  "offset": 31
                }
              }
            ]
          },
          {
            "file": "/user/username/projects/container/compositeExec/index.ts",
            "locs": [
              {
                "start": {
                  "line": 3,
                  "offset": 16
                },
                "end": {
                  "line": 3,
                  "offset": 23
                }
              }
            ]
          },
          {
            "file": "/user/username/projects/container/exec/index.ts",
            "locs": [
              {
                "start": {
                  "line": 3,
                  "offset": 16
                },
                "end": {
                  "line": 3,
                  "offset": 23
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
After request

PolledWatches::
/user/username/projects/container/compositeExec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/exec/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/container/lib/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/compositeExec/tsconfig.json:
  {}
/user/username/projects/container/exec/index.ts: *new*
  {}
/user/username/projects/container/exec/tsconfig.json: *new*
  {}
/user/username/projects/container/lib/index.ts:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/tsconfig.json:
  {}

Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/temp.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/container/compositeExec/tsconfig.json
Before request

PolledWatches::
/user/username/projects/container/compositeExec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/exec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/lib/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/temp/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/compositeExec/tsconfig.json:
  {}
/user/username/projects/container/exec/index.ts:
  {}
/user/username/projects/container/exec/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/tsconfig.json:
  {}
/user/username/projects/temp/temp.ts: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/temp/temp.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/temp.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/temp
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/temp/temp.ts :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/container/compositeExec/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/temp/temp.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/container/compositeExec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/exec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/lib/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/compositeExec/tsconfig.json:
  {}
/user/username/projects/container/exec/index.ts:
  {}
/user/username/projects/container/exec/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/temp/temp.ts:
  {}

Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/temp/temp.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/temp.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Before request

PolledWatches::
/user/username/projects/container/compositeExec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/exec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/lib/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/temp/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/compositeExec/index.ts: *new*
  {}
/user/username/projects/container/compositeExec/tsconfig.json:
  {}
/user/username/projects/container/exec/index.ts:
  {}
/user/username/projects/container/exec/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/tsconfig.json:
  {}
/user/username/projects/temp/temp.ts: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/temp/temp.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/temp.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/temp
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/temp/temp.ts :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/compositeExec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/compositeExec/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/exec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/lib/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/exec/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/compositeExec/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/lib/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/exec/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/temp/temp.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/tsconfig.json: *new*
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/container/compositeExec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/exec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/lib/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/container/compositeExec/index.ts:
  {}
/user/username/projects/container/compositeExec/tsconfig.json:
  {}
/user/username/projects/container/exec/index.ts:
  {}
/user/username/projects/container/exec/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/tsconfig.json:
  {}
/user/username/projects/temp/temp.ts:
  {}
