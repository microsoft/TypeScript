currentDirectory:: / useCaseSensitiveFileNames: false
Input::
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

//// [/src/a.ts]
export const a = class { private p = 10; };

//// [/src/b.ts]
export const b = 10;

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true,
    "incremental": true,
    "module": "amd",
    "outFile": "../outFile.js"
  }
}



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/outFile.js]
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


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts","./src/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3],"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]]],"checkPending":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./src/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./src/a.ts"
    ],
    [
      3,
      "./src/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ]
  ],
  "emitDiagnosticsPerFile": [
    [
      "./src/a.ts",
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
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 1076
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/tsconfig.json --noCheck
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::




Change:: Fix `a` error with noCheck
Input::
//// [/src/a.ts]
export const a = "hello";



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}


//// [/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = "hello";
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
});


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts","./src/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3],"checkPending":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16641552193-export const a = \"hello\";",
    "./src/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./src/a.ts"
    ],
    [
      3,
      "./src/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 755
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::




Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No shapes updated in the builder::


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts","./src/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16641552193-export const a = \"hello\";",
    "./src/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./src/a.ts"
    ],
    [
      3,
      "./src/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion",
  "size": 698
}



Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Introduce error with noCheck
Input::
//// [/src/a.ts]
export const a = class { private p = 10; };



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/outFile.js]
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


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts","./src/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3],"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]]],"checkPending":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./src/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./src/a.ts"
    ],
    [
      3,
      "./src/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ]
  ],
  "emitDiagnosticsPerFile": [
    [
      "./src/a.ts",
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
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 1076
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/tsconfig.json --noCheck
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::




Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No shapes updated in the builder::


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts","./src/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]]],"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./src/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./src/a.ts"
    ],
    [
      3,
      "./src/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "emitDiagnosticsPerFile": [
    [
      "./src/a.ts",
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
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1019
}



Change:: Fix `a` error with noCheck
Input::
//// [/src/a.ts]
export const a = "hello";



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/outFile.d.ts] file written with same contents
//// [/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = "hello";
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
});


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts","./src/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3],"checkPending":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16641552193-export const a = \"hello\";",
    "./src/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./src/a.ts"
    ],
    [
      3,
      "./src/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 755
}



Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts
/src/b.ts

No shapes updated in the builder::


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts","./src/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16641552193-export const a = \"hello\";",
    "./src/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./src/a.ts"
    ],
    [
      3,
      "./src/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion",
  "size": 698
}



Change:: Add file with error
Input::
//// [/src/c.ts]
export const c: number = "hello";



Output::
/lib/tsc -p /src/tsconfig.json
[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/c.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

No shapes updated in the builder::


//// [/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}
declare module "c" {
    export const c: number;
}


//// [/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = "hello";
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
    exports.c = "hello";
});


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;","-9150421116-export const c: number = \"hello\";"],"root":[[2,4]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[4,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16641552193-export const a = \"hello\";",
    "./src/b.ts": "-13368947479-export const b = 10;",
    "./src/c.ts": "-9150421116-export const c: number = \"hello\";"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 915
}



Change:: Introduce error with noCheck
Input::
//// [/src/a.ts]
export const a = class { private p = 10; };



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/outFile.js]
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
    exports.c = "hello";
});


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-9150421116-export const c: number = \"hello\";"],"root":[[2,4]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4],"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]]],"checkPending":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./src/b.ts": "-13368947479-export const b = 10;",
    "./src/c.ts": "-9150421116-export const c: number = \"hello\";"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ],
    [
      "./src/c.ts",
      "not cached or not changed"
    ]
  ],
  "emitDiagnosticsPerFile": [
    [
      "./src/a.ts",
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
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 1143
}



Change:: Fix `a` error with noCheck
Input::
//// [/src/a.ts]
export const a = "hello";



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/outFile.d.ts] file written with same contents
//// [/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = "hello";
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
    exports.c = "hello";
});


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;","-9150421116-export const c: number = \"hello\";"],"root":[[2,4]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4],"checkPending":true,"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16641552193-export const a = \"hello\";",
    "./src/b.ts": "-13368947479-export const b = 10;",
    "./src/c.ts": "-9150421116-export const c: number = \"hello\";"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/a.ts",
      "not cached or not changed"
    ],
    [
      "./src/b.ts",
      "not cached or not changed"
    ],
    [
      "./src/c.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 822
}



Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/c.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

No shapes updated in the builder::


//// [/outFile.tsbuildinfo]
{"fileNames":["./lib/lib.d.ts","./src/a.ts","./src/b.ts","./src/c.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;","-9150421116-export const c: number = \"hello\";"],"root":[[2,4]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[4,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"version":"FakeTSVersion"}

//// [/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./lib/lib.d.ts",
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts"
  ],
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16641552193-export const a = \"hello\";",
    "./src/b.ts": "-13368947479-export const b = 10;",
    "./src/c.ts": "-9150421116-export const c: number = \"hello\";"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 915
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/c.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


