currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/src/a.ts]
export const a = class { private p = 10; };

//// [/src/b.ts]
export const b = 10;

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true,
    "module": "amd",
    "outFile": "../outFile.js"
  }
}

//// [/home/src/tslibs/ts/lib/lib.d.ts]
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


/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json --noCheck
Output::
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m



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



Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json --noCheck
Output::
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m



//// [/outFile.js] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix `a` error with noCheck

Input::
//// [/src/a.ts]
export const a = "hello";


/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json --noCheck
Output::


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


//// [/outFile.d.ts]
declare module "a" {
    export const a = "hello";
}
declare module "b" {
    export const b = 10;
}



Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json --noCheck
Output::


//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json
Output::


//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json
Output::


//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json --noCheck
Output::


//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.Success

Change:: Introduce error with noCheck

Input::
//// [/src/a.ts]
export const a = class { private p = 10; };


/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json --noCheck
Output::
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m



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



Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json --noCheck
Output::
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m



//// [/outFile.js] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json
Output::
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m



//// [/outFile.js] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix `a` error with noCheck

Input::
//// [/src/a.ts]
export const a = "hello";


/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json --noCheck
Output::


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


//// [/outFile.d.ts] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json
Output::


//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts

exitCode:: ExitStatus.Success

Change:: Add file with error

Input::
//// [/src/c.ts]
export const c: number = "hello";


/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json
Output::
[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/c.ts[90m:1[0m



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



Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Introduce error with noCheck

Input::
//// [/src/a.ts]
export const a = class { private p = 10; };


/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json --noCheck
Output::
[96msrc/a.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/a.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.


Found 1 error in src/a.ts[90m:1[0m



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



Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix `a` error with noCheck

Input::
//// [/src/a.ts]
export const a = "hello";


/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json --noCheck
Output::


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


//// [/outFile.d.ts] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json
Output::
[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/c.ts[90m:1[0m



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json --noCheck
Output::


//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json
Output::
[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/c.ts[90m:1[0m



//// [/outFile.js] file written with same contents
//// [/outFile.d.ts] file written with same contents

Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "module": 2,
  "outFile": "/outFile.js",
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
