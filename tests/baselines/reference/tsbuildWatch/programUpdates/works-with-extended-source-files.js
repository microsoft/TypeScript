currentDirectory:: /a/b useCaseSensitiveFileNames: false
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

//// [/a/b/alpha.tsconfig.json]
{}

//// [/a/b/project1.tsconfig.json]
{
  "extends": "./alpha.tsconfig.json",
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "/a/b/commonFile1.ts",
    "/a/b/commonFile2.ts"
  ]
}

//// [/a/b/commonFile1.ts]
let x = 1

//// [/a/b/commonFile2.ts]
let y = 1

//// [/a/b/bravo.tsconfig.json]
{
  "extends": "./alpha.tsconfig.json"
}

//// [/a/b/project2.tsconfig.json]
{
  "extends": "./bravo.tsconfig.json",
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "/a/b/other.ts"
  ]
}

//// [/a/b/other.ts]
let z = 0;

//// [/a/b/other2.ts]
let k = 0;

//// [/a/b/extendsConfig1.tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/a/b/extendsConfig2.tsconfig.json]
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}

//// [/a/b/extendsConfig3.tsconfig.json]
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}

//// [/a/b/project3.tsconfig.json]
{
  "extends": [
    "./extendsConfig1.tsconfig.json",
    "./extendsConfig2.tsconfig.json",
    "./extendsConfig3.tsconfig.json"
  ],
  "compilerOptions": {
    "composite": false
  },
  "files": [
    "/a/b/other2.ts"
  ]
}


/a/lib/tsc.js -b -w -v project1.tsconfig.json project2.tsconfig.json project3.tsconfig.json
Output::
>> Screen clear
[[90m12:00:35 AM[0m] Starting compilation in watch mode...

[[90m12:00:36 AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * project3.tsconfig.json

[[90m12:00:37 AM[0m] Project 'project1.tsconfig.json' is out of date because output file 'project1.tsconfig.tsbuildinfo' does not exist

[[90m12:00:38 AM[0m] Building project '/a/b/project1.tsconfig.json'...

[[90m12:00:52 AM[0m] Project 'project2.tsconfig.json' is out of date because output file 'project2.tsconfig.tsbuildinfo' does not exist

[[90m12:00:53 AM[0m] Building project '/a/b/project2.tsconfig.json'...

[[90m12:01:03 AM[0m] Project 'project3.tsconfig.json' is out of date because output file 'other2.js' does not exist

[[90m12:01:04 AM[0m] Building project '/a/b/project3.tsconfig.json'...

[[90m12:01:08 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/commonFile1.js]
var x = 1;


//// [/a/b/commonFile1.d.ts]
declare let x: number;


//// [/a/b/commonFile2.js]
var y = 1;


//// [/a/b/commonFile2.d.ts]
declare let y: number;


//// [/a/b/project1.tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./commonfile1.ts","./commonfile2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"2167136208-let x = 1","signature":"2842409786-declare let x: number;\n","affectsGlobalScope":true},{"version":"2168322129-let y = 1","signature":"784887931-declare let y: number;\n","affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[2,3,1],"latestChangedDtsFile":"./commonFile2.d.ts"},"version":"FakeTSVersion"}

//// [/a/b/project1.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./commonfile1.ts",
      "./commonfile2.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./commonfile1.ts": {
        "original": {
          "version": "2167136208-let x = 1",
          "signature": "2842409786-declare let x: number;\n",
          "affectsGlobalScope": true
        },
        "version": "2167136208-let x = 1",
        "signature": "2842409786-declare let x: number;\n",
        "affectsGlobalScope": true
      },
      "./commonfile2.ts": {
        "original": {
          "version": "2168322129-let y = 1",
          "signature": "784887931-declare let y: number;\n",
          "affectsGlobalScope": true
        },
        "version": "2168322129-let y = 1",
        "signature": "784887931-declare let y: number;\n",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./commonfile1.ts"
      ],
      [
        3,
        "./commonfile2.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "./commonfile1.ts",
      "./commonfile2.ts",
      "../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./commonFile2.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 909
}

//// [/a/b/other.js]
var z = 0;


//// [/a/b/other.d.ts]
declare let z: number;


//// [/a/b/project2.tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./other.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"2874288940-let z = 0;","signature":"-1272633924-declare let z: number;\n","affectsGlobalScope":true}],"root":[2],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[2,1],"latestChangedDtsFile":"./other.d.ts"},"version":"FakeTSVersion"}

//// [/a/b/project2.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./other.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./other.ts": {
        "original": {
          "version": "2874288940-let z = 0;",
          "signature": "-1272633924-declare let z: number;\n",
          "affectsGlobalScope": true
        },
        "version": "2874288940-let z = 0;",
        "signature": "-1272633924-declare let z: number;\n",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./other.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "./other.ts",
      "../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./other.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 766
}

//// [/a/b/other2.js]
var k = 0;



FsWatches::
/a/b/alpha.tsconfig.json: *new*
  {}
/a/b/bravo.tsconfig.json: *new*
  {}
/a/b/commonFile1.ts: *new*
  {}
/a/b/commonFile2.ts: *new*
  {}
/a/b/extendsConfig1.tsconfig.json: *new*
  {}
/a/b/extendsConfig2.tsconfig.json: *new*
  {}
/a/b/extendsConfig3.tsconfig.json: *new*
  {}
/a/b/other.ts: *new*
  {}
/a/b/other2.ts: *new*
  {}
/a/b/project1.tsconfig.json: *new*
  {}
/a/b/project2.tsconfig.json: *new*
  {}
/a/b/project3.tsconfig.json: *new*
  {}

Program root files: [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/a/b/project1.tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/commonfile1.ts (computed .d.ts during emit)
/a/b/commonfile2.ts (computed .d.ts during emit)

Program root files: [
  "/a/b/other.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/a/b/project2.tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/other.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/other.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/other.ts (computed .d.ts during emit)

Program root files: [
  "/a/b/other2.ts"
]
Program options: {
  "composite": false,
  "strictNullChecks": false,
  "noImplicitAny": true,
  "watch": true,
  "configFilePath": "/a/b/project3.tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/other2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/other2.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/other2.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify alpha config

Input::
//// [/a/b/alpha.tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90m12:01:12 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:13 AM[0m] Project 'project1.tsconfig.json' is out of date because output 'project1.tsconfig.tsbuildinfo' is older than input 'alpha.tsconfig.json'

[[90m12:01:14 AM[0m] Building project '/a/b/project1.tsconfig.json'...



//// [/a/b/commonFile1.js]
"use strict";
var x = 1;


//// [/a/b/commonFile2.js]
"use strict";
var y = 1;


//// [/a/b/project1.tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./commonfile1.ts","./commonfile2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"2167136208-let x = 1","signature":"2842409786-declare let x: number;\n","affectsGlobalScope":true},{"version":"2168322129-let y = 1","signature":"784887931-declare let y: number;\n","affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true,"strict":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[2,3,1],"latestChangedDtsFile":"./commonFile2.d.ts"},"version":"FakeTSVersion"}

//// [/a/b/project1.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./commonfile1.ts",
      "./commonfile2.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./commonfile1.ts": {
        "original": {
          "version": "2167136208-let x = 1",
          "signature": "2842409786-declare let x: number;\n",
          "affectsGlobalScope": true
        },
        "version": "2167136208-let x = 1",
        "signature": "2842409786-declare let x: number;\n",
        "affectsGlobalScope": true
      },
      "./commonfile2.ts": {
        "original": {
          "version": "2168322129-let y = 1",
          "signature": "784887931-declare let y: number;\n",
          "affectsGlobalScope": true
        },
        "version": "2168322129-let y = 1",
        "signature": "784887931-declare let y: number;\n",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./commonfile1.ts"
      ],
      [
        3,
        "./commonfile2.ts"
      ]
    ],
    "options": {
      "composite": true,
      "strict": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "./commonfile1.ts",
      "./commonfile2.ts",
      "../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./commonFile2.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 923
}


Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*


Program root files: [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
]
Program options: {
  "strict": true,
  "composite": true,
  "watch": true,
  "configFilePath": "/a/b/project1.tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Build project 2

Input::

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
[[90m12:01:28 AM[0m] Project 'project2.tsconfig.json' is out of date because output 'project2.tsconfig.tsbuildinfo' is older than input 'alpha.tsconfig.json'

[[90m12:01:29 AM[0m] Building project '/a/b/project2.tsconfig.json'...

[[90m12:01:40 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/other.js]
"use strict";
var z = 0;


//// [/a/b/project2.tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./other.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"2874288940-let z = 0;","signature":"-1272633924-declare let z: number;\n","affectsGlobalScope":true}],"root":[2],"options":{"composite":true,"strict":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[2,1],"latestChangedDtsFile":"./other.d.ts"},"version":"FakeTSVersion"}

//// [/a/b/project2.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./other.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./other.ts": {
        "original": {
          "version": "2874288940-let z = 0;",
          "signature": "-1272633924-declare let z: number;\n",
          "affectsGlobalScope": true
        },
        "version": "2874288940-let z = 0;",
        "signature": "-1272633924-declare let z: number;\n",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./other.ts"
      ]
    ],
    "options": {
      "composite": true,
      "strict": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "./other.ts",
      "../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./other.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 780
}



Program root files: [
  "/a/b/other.ts"
]
Program options: {
  "strict": true,
  "composite": true,
  "watch": true,
  "configFilePath": "/a/b/project2.tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/other.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: change bravo config

Input::
//// [/a/b/bravo.tsconfig.json]
{
  "extends": "./alpha.tsconfig.json",
  "compilerOptions": {
    "strict": false
  }
}


Timeout callback:: count: 1
4: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:01:44 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:45 AM[0m] Project 'project2.tsconfig.json' is out of date because output 'project2.tsconfig.tsbuildinfo' is older than input 'bravo.tsconfig.json'

[[90m12:01:46 AM[0m] Building project '/a/b/project2.tsconfig.json'...

[[90m12:01:57 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/other.js]
var z = 0;


//// [/a/b/project2.tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./other.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"2874288940-let z = 0;","signature":"-1272633924-declare let z: number;\n","affectsGlobalScope":true}],"root":[2],"options":{"composite":true,"strict":false},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[2,1],"latestChangedDtsFile":"./other.d.ts"},"version":"FakeTSVersion"}

//// [/a/b/project2.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./other.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./other.ts": {
        "original": {
          "version": "2874288940-let z = 0;",
          "signature": "-1272633924-declare let z: number;\n",
          "affectsGlobalScope": true
        },
        "version": "2874288940-let z = 0;",
        "signature": "-1272633924-declare let z: number;\n",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./other.ts"
      ]
    ],
    "options": {
      "composite": true,
      "strict": false
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "./other.ts",
      "../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./other.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 781
}



Program root files: [
  "/a/b/other.ts"
]
Program options: {
  "strict": false,
  "composite": true,
  "watch": true,
  "configFilePath": "/a/b/project2.tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/other.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: project 2 extends alpha

Input::
//// [/a/b/project2.tsconfig.json]
{
  "extends": "./alpha.tsconfig.json"
}


Timeout callback:: count: 1
5: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
5: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:02:01 AM[0m] File change detected. Starting incremental compilation...

[[90m12:02:02 AM[0m] Project 'project2.tsconfig.json' is out of date because output 'other2.js' is older than input 'project2.tsconfig.json'

[[90m12:02:03 AM[0m] Building project '/a/b/project2.tsconfig.json'...

[[90m12:02:17 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/commonFile1.js] file written with same contents
//// [/a/b/commonFile2.js] file written with same contents
//// [/a/b/other.js]
"use strict";
var z = 0;


//// [/a/b/other2.js]
"use strict";
var k = 0;



FsWatches::
/a/b/alpha.tsconfig.json:
  {}
/a/b/commonFile1.ts:
  {}
/a/b/commonFile2.ts:
  {}
/a/b/extendsConfig1.tsconfig.json:
  {}
/a/b/extendsConfig2.tsconfig.json:
  {}
/a/b/extendsConfig3.tsconfig.json:
  {}
/a/b/other.ts:
  {}
/a/b/other2.ts:
  {}
/a/b/project1.tsconfig.json:
  {}
/a/b/project2.tsconfig.json:
  {}
/a/b/project3.tsconfig.json:
  {}

FsWatches *deleted*::
/a/b/bravo.tsconfig.json:
  {}

FsWatchesRecursive::
/a/b: *new*
  {}


Program root files: [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts",
  "/a/b/other.ts",
  "/a/b/other2.ts"
]
Program options: {
  "strict": true,
  "watch": true,
  "configFilePath": "/a/b/project2.tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts
/a/b/other.ts
/a/b/other2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts
/a/b/other.ts
/a/b/other2.ts

Shape signatures in builder refreshed for::
/a/b/commonfile1.ts (computed .d.ts)
/a/b/commonfile2.ts (computed .d.ts)
/a/b/other.ts (computed .d.ts)
/a/b/other2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: update aplha config

Input::
//// [/a/b/alpha.tsconfig.json]
{}


Timeout callback:: count: 1
7: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
7: timerToBuildInvalidatedProject

After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90m12:02:22 AM[0m] File change detected. Starting incremental compilation...

[[90m12:02:23 AM[0m] Project 'project1.tsconfig.json' is out of date because output 'project1.tsconfig.tsbuildinfo' is older than input 'alpha.tsconfig.json'

[[90m12:02:24 AM[0m] Building project '/a/b/project1.tsconfig.json'...



//// [/a/b/commonFile1.js]
var x = 1;


//// [/a/b/commonFile2.js]
var y = 1;


//// [/a/b/project1.tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./commonfile1.ts","./commonfile2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"2167136208-let x = 1","signature":"2842409786-declare let x: number;\n","affectsGlobalScope":true},{"version":"2168322129-let y = 1","signature":"784887931-declare let y: number;\n","affectsGlobalScope":true}],"root":[2,3],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[2,3,1],"latestChangedDtsFile":"./commonFile2.d.ts"},"version":"FakeTSVersion"}

//// [/a/b/project1.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./commonfile1.ts",
      "./commonfile2.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./commonfile1.ts": {
        "original": {
          "version": "2167136208-let x = 1",
          "signature": "2842409786-declare let x: number;\n",
          "affectsGlobalScope": true
        },
        "version": "2167136208-let x = 1",
        "signature": "2842409786-declare let x: number;\n",
        "affectsGlobalScope": true
      },
      "./commonfile2.ts": {
        "original": {
          "version": "2168322129-let y = 1",
          "signature": "784887931-declare let y: number;\n",
          "affectsGlobalScope": true
        },
        "version": "2168322129-let y = 1",
        "signature": "784887931-declare let y: number;\n",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./commonfile1.ts"
      ],
      [
        3,
        "./commonfile2.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "./commonfile1.ts",
      "./commonfile2.ts",
      "../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./commonFile2.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 909
}


Timeout callback:: count: 1
8: timerToBuildInvalidatedProject *new*


Program root files: [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/a/b/project1.tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Build project 2

Input::

Before running Timeout callback:: count: 1
8: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
[[90m12:02:38 AM[0m] Project 'project2.tsconfig.json' is out of date because output 'commonFile1.js' is older than input 'alpha.tsconfig.json'

[[90m12:02:39 AM[0m] Building project '/a/b/project2.tsconfig.json'...

[[90m12:02:53 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/commonFile1.js] file written with same contents
//// [/a/b/commonFile2.js] file written with same contents
//// [/a/b/other.js]
var z = 0;


//// [/a/b/other2.js]
var k = 0;




Program root files: [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts",
  "/a/b/other.ts",
  "/a/b/other2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/a/b/project2.tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts
/a/b/other.ts
/a/b/other2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts
/a/b/other.ts
/a/b/other2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Modify extendsConfigFile2

Input::
//// [/a/b/extendsConfig2.tsconfig.json]
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}


Timeout callback:: count: 1
9: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
9: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:02:57 AM[0m] File change detected. Starting incremental compilation...

[[90m12:02:58 AM[0m] Project 'project3.tsconfig.json' is out of date because output 'other2.js' is older than input 'extendsConfig2.tsconfig.json'

[[90m12:02:59 AM[0m] Building project '/a/b/project3.tsconfig.json'...

[[90m12:03:00 AM[0m] Updating unchanged output timestamps of project '/a/b/project3.tsconfig.json'...

[[90m12:03:02 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/other2.js] file changed its modified time


Program root files: [
  "/a/b/other2.ts"
]
Program options: {
  "composite": false,
  "strictNullChecks": true,
  "noImplicitAny": true,
  "watch": true,
  "configFilePath": "/a/b/project3.tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/other2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/other2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Modify project 3

Input::
//// [/a/b/project3.tsconfig.json]
{
  "extends": [
    "./extendsConfig1.tsconfig.json",
    "./extendsConfig2.tsconfig.json"
  ],
  "compilerOptions": {
    "composite": false
  },
  "files": [
    "/a/b/other2.ts"
  ]
}


Timeout callback:: count: 1
10: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
10: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:03:06 AM[0m] File change detected. Starting incremental compilation...

[[90m12:03:07 AM[0m] Project 'project3.tsconfig.json' is out of date because output 'other2.js' is older than input 'project3.tsconfig.json'

[[90m12:03:08 AM[0m] Building project '/a/b/project3.tsconfig.json'...

[[90m12:03:09 AM[0m] Updating unchanged output timestamps of project '/a/b/project3.tsconfig.json'...

[[90m12:03:11 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/other2.js] file changed its modified time

FsWatches::
/a/b/alpha.tsconfig.json:
  {}
/a/b/commonFile1.ts:
  {}
/a/b/commonFile2.ts:
  {}
/a/b/extendsConfig1.tsconfig.json:
  {}
/a/b/extendsConfig2.tsconfig.json:
  {}
/a/b/other.ts:
  {}
/a/b/other2.ts:
  {}
/a/b/project1.tsconfig.json:
  {}
/a/b/project2.tsconfig.json:
  {}
/a/b/project3.tsconfig.json:
  {}

FsWatches *deleted*::
/a/b/extendsConfig3.tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}


Program root files: [
  "/a/b/other2.ts"
]
Program options: {
  "composite": false,
  "strictNullChecks": true,
  "watch": true,
  "configFilePath": "/a/b/project3.tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/other2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/other2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Delete extendedConfigFile2 and report error

Input::
//// [/a/b/extendsConfig2.tsconfig.json] deleted

Timeout callback:: count: 1
11: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
11: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:03:13 AM[0m] File change detected. Starting incremental compilation...

[[90m12:03:14 AM[0m] Project 'project3.tsconfig.json' is up to date because newest input 'other2.ts' is older than output 'other2.js'

[91merror[0m[90m TS5083: [0mCannot read file '/a/b/extendsConfig2.tsconfig.json'.

[[90m12:03:15 AM[0m] Found 1 error. Watching for file changes.





exitCode:: ExitStatus.undefined
