currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/a.ts]
export const a = class { private p = 10; };

//// [/home/src/projects/project/b.ts]
export const b = 10;

//// [/home/src/projects/project/c.ts]
export const c = class { private p = 10; };

//// [/home/src/projects/project/d.ts]
export const d = class { private p = 10; };

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true
  }
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


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"affectedFilesPendingEmit":[2,3,4,5],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-9502176711-export const a = class { private p = 10; };",
      "signature": "-9502176711-export const a = class { private p = 10; };"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;",
      "signature": "-13368947479-export const b = 10;"
    },
    "./c.ts": {
      "version": "-17233149573-export const c = class { private p = 10; };",
      "signature": "-17233149573-export const c = class { private p = 10; };"
    },
    "./d.ts": {
      "version": "2523684124-export const d = class { private p = 10; };",
      "signature": "2523684124-export const d = class { private p = 10; };"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js"
    ],
    [
      "./b.ts",
      "Js"
    ],
    [
      "./c.ts",
      "Js"
    ],
    [
      "./d.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 863
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/project/a.ts (used version)
/home/src/projects/project/b.ts (used version)
/home/src/projects/project/c.ts (used version)
/home/src/projects/project/d.ts (used version)

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::



Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: With declaration enabled noEmit - Should report errors

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit --declaration
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96mc.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const c = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable c.

[96md.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96md.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const d = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable d.


Found 3 errors in 3 files.

Errors  Files
     1  a.ts[90m:1[0m
     1  c.ts[90m:1[0m
     1  d.ts[90m:1[0m


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"affectedFilesPendingEmit":[[2,17],[3,17],[4,17],[5,17]],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-9502176711-export const a = class { private p = 10; };",
      "signature": "-9502176711-export const a = class { private p = 10; };"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;",
      "signature": "-13368947479-export const b = 10;"
    },
    "./c.ts": {
      "version": "-17233149573-export const c = class { private p = 10; };",
      "signature": "-17233149573-export const c = class { private p = 10; };"
    },
    "./d.ts": {
      "version": "2523684124-export const d = class { private p = 10; };",
      "signature": "2523684124-export const d = class { private p = 10; };"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "emitDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable a.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ],
    [
      "./c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable c.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ],
    [
      "./d.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable d.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      [
        "./a.ts",
        17
      ],
      "Js | DtsEmit"
    ],
    [
      [
        "./b.ts",
        17
      ],
      "Js | DtsEmit"
    ],
    [
      [
        "./c.ts",
        17
      ],
      "Js | DtsEmit"
    ],
    [
      [
        "./d.ts",
        17
      ],
      "Js | DtsEmit"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1778
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: With declaration and declarationMap noEmit - Should report errors

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit --declaration --declarationMap
Output::


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true},"affectedFilesPendingEmit":[[2,49],[3,49],[4,49],[5,49]],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-9502176711-export const a = class { private p = 10; };",
      "signature": "-9502176711-export const a = class { private p = 10; };"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;",
      "signature": "-13368947479-export const b = 10;"
    },
    "./c.ts": {
      "version": "-17233149573-export const c = class { private p = 10; };",
      "signature": "-17233149573-export const c = class { private p = 10; };"
    },
    "./d.ts": {
      "version": "2523684124-export const d = class { private p = 10; };",
      "signature": "2523684124-export const d = class { private p = 10; };"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true
  },
  "affectedFilesPendingEmit": [
    [
      [
        "./a.ts",
        49
      ],
      "Js | DtsEmit | DtsMap"
    ],
    [
      [
        "./b.ts",
        49
      ],
      "Js | DtsEmit | DtsMap"
    ],
    [
      [
        "./c.ts",
        49
      ],
      "Js | DtsEmit | DtsMap"
    ],
    [
      [
        "./d.ts",
        49
      ],
      "Js | DtsEmit | DtsMap"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 936
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::



Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: Dts Emit with error

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --declaration
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96mc.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const c = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable c.

[96md.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96md.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const d = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable d.


Found 3 errors in 3 files.

Errors  Files
     1  a.ts[90m:1[0m
     1  c.ts[90m:1[0m
     1  d.ts[90m:1[0m


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-9502176711-export const a = class { private p = 10; };",{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"},"-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-9502176711-export const a = class { private p = 10; };",
      "signature": "-9502176711-export const a = class { private p = 10; };"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "version": "-17233149573-export const c = class { private p = 10; };",
      "signature": "-17233149573-export const c = class { private p = 10; };"
    },
    "./d.ts": {
      "version": "2523684124-export const d = class { private p = 10; };",
      "signature": "2523684124-export const d = class { private p = 10; };"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "emitDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable a.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ],
    [
      "./c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable c.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ],
    [
      "./d.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable d.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1790
}

//// [/home/src/projects/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = /** @class */ (function () {
    function class_1() {
        this.p = 10;
    }
    return class_1;
}());


//// [/home/src/projects/project/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;


//// [/home/src/projects/project/b.d.ts]
export declare const b = 10;


//// [/home/src/projects/project/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = /** @class */ (function () {
    function class_1() {
        this.p = 10;
    }
    return class_1;
}());


//// [/home/src/projects/project/d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
exports.d = /** @class */ (function () {
    function class_1() {
        this.p = 10;
    }
    return class_1;
}());



Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "declaration": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix the error

Input::
//// [/home/src/projects/project/a.ts]
export const a = class { public p = 10; };


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9483521475-export const a = class { public p = 10; };","signature":"4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"},"-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"emitDiagnosticsPerFile":[[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"affectedFilesPendingEmit":[2],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "-9483521475-export const a = class { public p = 10; };",
        "signature": "4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"
      },
      "version": "-9483521475-export const a = class { public p = 10; };",
      "signature": "4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "version": "-17233149573-export const c = class { private p = 10; };",
      "signature": "-17233149573-export const c = class { private p = 10; };"
    },
    "./d.ts": {
      "version": "2523684124-export const d = class { private p = 10; };",
      "signature": "2523684124-export const d = class { private p = 10; };"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "emitDiagnosticsPerFile": [
    [
      "./c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable c.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ],
    [
      "./d.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable d.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1622
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/project/a.ts

Shape signatures in builder refreshed for::
/home/src/projects/project/a.ts (computed .d.ts)

exitCode:: ExitStatus.Success

Change:: With declaration enabled noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit --declaration
Output::
[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96mc.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const c = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable c.

[96md.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96md.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const d = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable d.


Found 2 errors in 2 files.

Errors  Files
     1  c.ts[90m:1[0m
     1  d.ts[90m:1[0m


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9483521475-export const a = class { public p = 10; };","signature":"4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"},"-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true},"emitDiagnosticsPerFile":[[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"affectedFilesPendingEmit":[[2,17],[3,16],[4,16],[5,16]],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "-9483521475-export const a = class { public p = 10; };",
        "signature": "4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"
      },
      "version": "-9483521475-export const a = class { public p = 10; };",
      "signature": "4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "version": "-17233149573-export const c = class { private p = 10; };",
      "signature": "-17233149573-export const c = class { private p = 10; };"
    },
    "./d.ts": {
      "version": "2523684124-export const d = class { private p = 10; };",
      "signature": "2523684124-export const d = class { private p = 10; };"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "emitDiagnosticsPerFile": [
    [
      "./c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable c.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ],
    [
      "./d.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable d.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      [
        "./a.ts",
        17
      ],
      "Js | DtsEmit"
    ],
    [
      [
        "./b.ts",
        16
      ],
      "DtsEmit"
    ],
    [
      [
        "./c.ts",
        16
      ],
      "DtsEmit"
    ],
    [
      [
        "./d.ts",
        16
      ],
      "DtsEmit"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1679
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: With declaration and declarationMap noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit --declaration --declarationMap
Output::


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9483521475-export const a = class { public p = 10; };","signature":"4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"},"-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true},"affectedFilesPendingEmit":[[2,49],[3,48],[4,48],[5,48]],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "-9483521475-export const a = class { public p = 10; };",
        "signature": "4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"
      },
      "version": "-9483521475-export const a = class { public p = 10; };",
      "signature": "4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "version": "-17233149573-export const c = class { private p = 10; };",
      "signature": "-17233149573-export const c = class { private p = 10; };"
    },
    "./d.ts": {
      "version": "2523684124-export const d = class { private p = 10; };",
      "signature": "2523684124-export const d = class { private p = 10; };"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true
  },
  "affectedFilesPendingEmit": [
    [
      [
        "./a.ts",
        49
      ],
      "Js | DtsEmit | DtsMap"
    ],
    [
      [
        "./b.ts",
        48
      ],
      "DtsEmit | DtsMap"
    ],
    [
      [
        "./c.ts",
        48
      ],
      "DtsEmit | DtsMap"
    ],
    [
      [
        "./d.ts",
        48
      ],
      "DtsEmit | DtsMap"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1116
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: Fix the another 

Input::
//// [/home/src/projects/project/c.ts]
export const c = class { public p = 10; };


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit --declaration --declarationMap
Output::


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9483521475-export const a = class { public p = 10; };","signature":"4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"-15184115393-export const c = class { public p = 10; };","signature":"-1507017290-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n"},"2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true},"affectedFilesPendingEmit":[[2,49],[3,48],[4,49],[5,48]],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "-9483521475-export const a = class { public p = 10; };",
        "signature": "4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"
      },
      "version": "-9483521475-export const a = class { public p = 10; };",
      "signature": "4346604020-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "original": {
        "version": "-15184115393-export const c = class { public p = 10; };",
        "signature": "-1507017290-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n"
      },
      "version": "-15184115393-export const c = class { public p = 10; };",
      "signature": "-1507017290-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n"
    },
    "./d.ts": {
      "version": "2523684124-export const d = class { private p = 10; };",
      "signature": "2523684124-export const d = class { private p = 10; };"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true
  },
  "affectedFilesPendingEmit": [
    [
      [
        "./a.ts",
        49
      ],
      "Js | DtsEmit | DtsMap"
    ],
    [
      [
        "./b.ts",
        48
      ],
      "DtsEmit | DtsMap"
    ],
    [
      [
        "./c.ts",
        49
      ],
      "Js | DtsEmit | DtsMap"
    ],
    [
      [
        "./d.ts",
        48
      ],
      "DtsEmit | DtsMap"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1228
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/project/c.ts

Shape signatures in builder refreshed for::
/home/src/projects/project/c.ts (computed .d.ts)

exitCode:: ExitStatus.Success
