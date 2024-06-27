currentDirectory:: / useCaseSensitiveFileNames: false
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
    "outFile": "../outFile.js",
    "module": "amd",
    "incremental": true
  }
}

//// [/lib/lib.d.ts]
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



Output::
/lib/tsc -p /home/src/projects/project --noEmit
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"},"pendingEmit":false,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "module": 2,
    "outFile": "./outFile.js"
  },
  "pendingEmit": [
    "Js",
    false
  ],
  "version": "FakeTSVersion",
  "size": 881
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: With declaration enabled noEmit - Should report errors
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit --declaration
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

[96mhome/src/projects/project/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

[96mhome/src/projects/project/d.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m


Found 3 errors in 3 files.

Errors  Files
     1  home/src/projects/project/a.ts[90m:1[0m
     1  home/src/projects/project/c.ts[90m:1[0m
     1  home/src/projects/project/d.ts[90m:1[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]]],"pendingEmit":17,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "emitDiagnosticsPerFile": [
    [
      "./project/a.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ],
    [
      "./project/c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ],
    [
      "./project/d.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ]
  ],
  "pendingEmit": [
    "Js | DtsEmit",
    17
  ],
  "version": "FakeTSVersion",
  "size": 1362
}



Change:: With declaration and declarationMap noEmit - Should report errors
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit --declaration --declarationMap
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

[96mhome/src/projects/project/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

[96mhome/src/projects/project/d.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m


Found 3 errors in 3 files.

Errors  Files
     1  home/src/projects/project/a.ts[90m:1[0m
     1  home/src/projects/project/c.ts[90m:1[0m
     1  home/src/projects/project/d.ts[90m:1[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]]],"pendingEmit":49,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "emitDiagnosticsPerFile": [
    [
      "./project/a.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ],
    [
      "./project/c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ],
    [
      "./project/d.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ]
  ],
  "pendingEmit": [
    "Js | DtsEmit | DtsMap",
    49
  ],
  "version": "FakeTSVersion",
  "size": 1384
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Dts Emit with error
Input::


Output::
/lib/tsc -p /home/src/projects/project --declaration
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

[96mhome/src/projects/project/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

[96mhome/src/projects/project/d.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m


Found 3 errors in 3 files.

Errors  Files
     1  home/src/projects/project/a.ts[90m:1[0m
     1  home/src/projects/project/c.ts[90m:1[0m
     1  home/src/projects/project/d.ts[90m:1[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "declaration": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


//// [/home/src/projects/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = /** @class */ (function () {
        function class_1() {
            this.p = 10;
        }
        return class_1;
    }());
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
});
define("c", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = void 0;
    exports.c = /** @class */ (function () {
        function class_2() {
            this.p = 10;
        }
        return class_2;
    }());
});
define("d", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.d = void 0;
    exports.d = /** @class */ (function () {
        function class_3() {
            this.p = 10;
        }
        return class_3;
    }());
});


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]]],"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "emitDiagnosticsPerFile": [
    [
      "./project/a.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ],
    [
      "./project/c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ],
    [
      "./project/d.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1345
}



Change:: Fix the error
Input::
//// [/home/src/projects/project/a.ts]
export const a = class { public p = 10; };



Output::
/lib/tsc -p /home/src/projects/project --noEmit
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"},"pendingEmit":false,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9483521475-export const a = class { public p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "module": 2,
    "outFile": "./outFile.js"
  },
  "pendingEmit": [
    "Js",
    false
  ],
  "version": "FakeTSVersion",
  "size": 880
}



Change:: With declaration enabled noEmit
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit --declaration
[96mhome/src/projects/project/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

[96mhome/src/projects/project/d.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m


Found 2 errors in 2 files.

Errors  Files
     1  home/src/projects/project/c.ts[90m:1[0m
     1  home/src/projects/project/d.ts[90m:1[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]]],"pendingEmit":17,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9483521475-export const a = class { public p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "emitDiagnosticsPerFile": [
    [
      "./project/c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ],
    [
      "./project/d.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ]
  ],
  "pendingEmit": [
    "Js | DtsEmit",
    17
  ],
  "version": "FakeTSVersion",
  "size": 1215
}



Change:: With declaration and declarationMap noEmit
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit --declaration --declarationMap
[96mhome/src/projects/project/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

[96mhome/src/projects/project/d.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m


Found 2 errors in 2 files.

Errors  Files
     1  home/src/projects/project/c.ts[90m:1[0m
     1  home/src/projects/project/d.ts[90m:1[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]]],"pendingEmit":49,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9483521475-export const a = class { public p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "emitDiagnosticsPerFile": [
    [
      "./project/c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ],
    [
      "./project/d.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ]
  ],
  "pendingEmit": [
    "Js | DtsEmit | DtsMap",
    49
  ],
  "version": "FakeTSVersion",
  "size": 1237
}



Change:: Fix the another 
Input::
//// [/home/src/projects/project/c.ts]
export const c = class { public p = 10; };



Output::
/lib/tsc -p /home/src/projects/project --noEmit --declaration --declarationMap
[96mhome/src/projects/project/d.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m


Found 1 error in home/src/projects/project/d.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-15184115393-export const c = class { public p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]]],"pendingEmit":49,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9483521475-export const a = class { public p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-15184115393-export const c = class { public p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "emitDiagnosticsPerFile": [
    [
      "./project/d.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported class expression may not be private or protected.",
          "category": 1,
          "code": 4094
        }
      ]
    ]
  ],
  "pendingEmit": [
    "Js | DtsEmit | DtsMap",
    49
  ],
  "version": "FakeTSVersion",
  "size": 1090
}

