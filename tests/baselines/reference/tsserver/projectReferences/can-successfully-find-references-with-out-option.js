currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:01:10.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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
        "declarationMap": true,
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
        "outFile": "../built/local/exec.js",
    },
    "files": [
        "index.ts"
    ],
    "references": [
        { "path": "../lib", "prepend": true }
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
        "declarationMap": true,
    },
    "files": [
        "index.ts"
    ],
    "references": [
        { "path": "../lib", "prepend": true }
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
        { "path": "./exec" },
        { "path": "./compositeExec" }
    ]
}

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
{"bundle":{"commonSourceDirectory":"../../lib","sourceFiles":["../../lib/index.ts"],"js":{"sections":[{"pos":0,"end":102,"kind":"text"}],"hash":"-5780640416-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\n"},"dts":{"sections":[{"pos":0,"end":56,"kind":"text"}],"mapHash":"-12950023432-{\"version\":3,\"file\":\"lib.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B\"}","hash":"-3233313694-declare namespace container {\n    const myConst = 30;\n}\n//# sourceMappingURL=lib.d.ts.map"}},"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../lib/index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-7311945748-namespace container {\r\n    export const myConst = 30;\r\n}"],"root":[2],"options":{"composite":true,"declarationMap":true,"outFile":"./lib.js"},"outSignature":"4250822250-declare namespace container {\n    const myConst = 30;\n}\n","latestChangedDtsFile":"./lib.d.ts"},"version":"FakeTSVersion"}

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
      "../../lib/index.ts": "-7311945748-namespace container {\r\n    export const myConst = 30;\r\n}"
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
  "size": 1402
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
{"bundle":{"commonSourceDirectory":"../../compositeExec","sourceFiles":["../../compositeExec/index.ts"],"js":{"sections":[{"pos":0,"end":102,"kind":"prepend","data":"./lib.js","texts":[{"pos":0,"end":102,"kind":"text"}]},{"pos":102,"end":283,"kind":"text"}],"hash":"-2184050024-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\nvar container;\n(function (container) {\n    function getMyConst() {\n        return container.myConst;\n    }\n    container.getMyConst = getMyConst;\n})(container || (container = {}));\n"},"dts":{"sections":[{"pos":0,"end":56,"kind":"prepend","data":"./lib.d.ts","texts":[{"pos":0,"end":56,"kind":"text"}]},{"pos":56,"end":123,"kind":"text"}],"mapHash":"25748245913-{\"version\":3,\"file\":\"compositeExec.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\",\"../../compositeExec/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B;ACFD,kBAAU,SAAS,CAAC;IAChB,SAAgB,UAAU,WAEzB;CACJ\"}","hash":"862035579-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n//# sourceMappingURL=compositeExec.d.ts.map"}},"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","./lib.d.ts","../../compositeexec/index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","4250822250-declare namespace container {\n    const myConst = 30;\n}\n","-6143734929-namespace container {\r\n    export function getMyConst() {\r\n        return myConst;\r\n    }\r\n}"],"root":[3],"options":{"composite":true,"declarationMap":true,"outFile":"./compositeExec.js"},"outSignature":"5987946274-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n","latestChangedDtsFile":"./compositeExec.d.ts"},"version":"FakeTSVersion"}

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
      "../../compositeexec/index.ts": "-6143734929-namespace container {\r\n    export function getMyConst() {\r\n        return myConst;\r\n    }\r\n}"
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
  "size": 2207
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


Info 1    [00:01:11.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/container/compositeExec/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:01:12.000] Search path: /user/username/projects/container/compositeExec
Info 3    [00:01:13.000] For info: /user/username/projects/container/compositeExec/index.ts :: Config file name: /user/username/projects/container/compositeExec/tsconfig.json
Info 4    [00:01:14.000] Creating configuration project /user/username/projects/container/compositeExec/tsconfig.json
Info 5    [00:01:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info 6    [00:01:16.000] Config: /user/username/projects/container/compositeExec/tsconfig.json : {
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
Info 7    [00:01:17.000] Starting updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json
Info 8    [00:01:18.000] Config: /user/username/projects/container/lib/tsconfig.json : {
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
Info 9    [00:01:19.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info 10   [00:01:20.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/index.ts 500 undefined WatchType: Closed Script info
Info 11   [00:01:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 13   [00:01:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 14   [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 15   [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 16   [00:01:26.000] Finishing updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:01:27.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 18   [00:01:28.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/container/lib/index.ts Text-1 "namespace container {\r\n    export const myConst = 30;\r\n}"
	/user/username/projects/container/compositeExec/index.ts SVC-1-0 "namespace container {\r\n    export function getMyConst() {\r\n        return myConst;\r\n    }\r\n}"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info 19   [00:01:29.000] -----------------------------------------------
Info 20   [00:01:30.000] Search path: /user/username/projects/container/compositeExec
Info 21   [00:01:31.000] For info: /user/username/projects/container/compositeExec/tsconfig.json :: Config file name: /user/username/projects/container/tsconfig.json
Info 22   [00:01:32.000] Creating configuration project /user/username/projects/container/tsconfig.json
Info 23   [00:01:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info 24   [00:01:34.000] Search path: /user/username/projects/container
Info 25   [00:01:35.000] For info: /user/username/projects/container/tsconfig.json :: No config files found.
Info 26   [00:01:36.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 26   [00:01:37.000] 	Files (3)

Info 26   [00:01:38.000] -----------------------------------------------
Info 26   [00:01:39.000] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info 26   [00:01:40.000] 	Files (0) InitialLoadPending

Info 26   [00:01:41.000] -----------------------------------------------
Info 26   [00:01:42.000] Open files: 
Info 26   [00:01:43.000] 	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
Info 26   [00:01:44.000] 		Projects: /user/username/projects/container/compositeExec/tsconfig.json
Info 26   [00:01:45.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/container/compositeexec/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/container/compositeexec/tsconfig.json: *new*
  {}
/user/username/projects/container/lib/tsconfig.json: *new*
  {}
/user/username/projects/container/lib/index.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/container/tsconfig.json: *new*
  {}

Before request

Info 27   [00:01:46.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/container/compositeExec/index.ts",
        "line": 3,
        "offset": 16
      },
      "seq": 2,
      "type": "request"
    }
Info 28   [00:01:47.000] Search path: /user/username/projects/container/lib
Info 29   [00:01:48.000] For info: /user/username/projects/container/lib/index.ts :: Config file name: /user/username/projects/container/lib/tsconfig.json
Info 30   [00:01:49.000] Creating configuration project /user/username/projects/container/lib/tsconfig.json
Info 31   [00:01:50.000] Starting updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json
Info 32   [00:01:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 33   [00:01:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 34   [00:01:53.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 35   [00:01:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 36   [00:01:55.000] Finishing updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 37   [00:01:56.000] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info 38   [00:01:57.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/container/lib/index.ts Text-1 "namespace container {\r\n    export const myConst = 30;\r\n}"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 39   [00:01:58.000] -----------------------------------------------
Info 40   [00:01:59.000] Loading configured project /user/username/projects/container/tsconfig.json
Info 41   [00:02:00.000] Config: /user/username/projects/container/tsconfig.json : {
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
Info 42   [00:02:01.000] Starting updateGraphWorker: Project: /user/username/projects/container/tsconfig.json
Info 43   [00:02:02.000] Config: /user/username/projects/container/exec/tsconfig.json : {
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
Info 44   [00:02:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info 45   [00:02:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info 46   [00:02:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info 47   [00:02:06.000] Finishing updateGraphWorker: Project: /user/username/projects/container/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 48   [00:02:07.000] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info 49   [00:02:08.000] 	Files (0)

Info 50   [00:02:09.000] -----------------------------------------------
Info 51   [00:02:10.000] Creating configuration project /user/username/projects/container/exec/tsconfig.json
Info 52   [00:02:11.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/index.ts 500 undefined WatchType: Closed Script info
Info 53   [00:02:12.000] Starting updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json
Info 54   [00:02:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 55   [00:02:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 56   [00:02:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 57   [00:02:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 58   [00:02:17.000] Finishing updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 59   [00:02:18.000] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info 60   [00:02:19.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/container/lib/index.ts Text-1 "namespace container {\r\n    export const myConst = 30;\r\n}"
	/user/username/projects/container/exec/index.ts Text-1 "namespace container {\r\n    export function getMyConst() {\r\n        return myConst;\r\n    }\r\n}"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info 61   [00:02:20.000] -----------------------------------------------
Info 62   [00:02:21.000] Search path: /user/username/projects/container/lib
Info 63   [00:02:22.000] For info: /user/username/projects/container/lib/index.ts :: Config file name: /user/username/projects/container/lib/tsconfig.json
Info 64   [00:02:23.000] response:
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
/user/username/projects/container/compositeexec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/lib/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/container/exec/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/container/compositeexec/tsconfig.json:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/tsconfig.json:
  {}
/user/username/projects/container/exec/tsconfig.json: *new*
  {}
/user/username/projects/container/exec/index.ts: *new*
  {}
