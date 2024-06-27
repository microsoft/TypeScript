currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/home/src/projects/project/a.ts]
export const a = class { private p = 10; };

//// [/home/src/projects/project/b.ts]
export const b = 10;

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../outFile.js",
    "module": "amd",
    "incremental": true,
    "declaration": true
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
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m


Found 1 error in home/src/projects/project/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "declaration": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]]],"pendingEmit":17,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
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
    ]
  ],
  "pendingEmit": [
    "Js | DtsEmit",
    17
  ],
  "version": "FakeTSVersion",
  "size": 918
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m


Found 1 error in home/src/projects/project/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "declaration": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Fix error
Input::
//// [/home/src/projects/project/a.ts]
export const a = "hello";



Output::
/lib/tsc -p /home/src/projects/project --noEmit
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "declaration": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"pendingEmit":17,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-16641552193-export const a = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "pendingEmit": [
    "Js | DtsEmit",
    17
  ],
  "version": "FakeTSVersion",
  "size": 730
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "declaration": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Emit after fixing error
Input::


Output::
/lib/tsc -p /home/src/projects/project
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "declaration": true,
  "project": "/home/src/projects/project",
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


//// [/home/src/projects/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}


//// [/home/src/projects/outFile.js]
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


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-16641552193-export const a = \"hello\";","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-16641552193-export const a = \"hello\";",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion",
  "size": 713
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "declaration": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Introduce error
Input::
//// [/home/src/projects/project/a.ts]
export const a = class { private p = 10; };



Output::
/lib/tsc -p /home/src/projects/project --noEmit
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m


Found 1 error in home/src/projects/project/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "declaration": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

No shapes updated in the builder::


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]]],"pendingEmit":17,"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
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
    ]
  ],
  "pendingEmit": [
    "Js | DtsEmit",
    17
  ],
  "version": "FakeTSVersion",
  "size": 918
}



Change:: Emit when error
Input::


Output::
/lib/tsc -p /home/src/projects/project
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m


Found 1 error in home/src/projects/project/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "declaration": true,
  "project": "/home/src/projects/project",
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

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


//// [/home/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../../lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;"],"root":[2,3],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported class expression may not be private or protected.","category":1,"code":4094}]]],"version":"FakeTSVersion"}

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
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
    ]
  ],
  "version": "FakeTSVersion",
  "size": 901
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m


Found 1 error in home/src/projects/project/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "declaration": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


