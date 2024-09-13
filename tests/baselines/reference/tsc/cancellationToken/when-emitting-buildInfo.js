currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/a.ts]
import {B} from './b';
declare var console: any;
let b = new B();
console.log(b.c.d);

//// [/user/username/projects/myproject/b.ts]
import {C} from './c';
export class B {
    c = new C();
}

//// [/user/username/projects/myproject/c.ts]
export var C = class CReal {
    d = 1;
};

//// [/user/username/projects/myproject/d.ts]
export class D { }

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "declaration": true
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


//// [/user/username/projects/myproject/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
exports.C = /** @class */ (function () {
    function CReal() {
        this.d = 1;
    }
    return CReal;
}());


//// [/user/username/projects/myproject/c.d.ts]
export declare var C: {
    new (): {
        d: number;
    };
};


//// [/user/username/projects/myproject/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
var c_1 = require("./c");
var B = /** @class */ (function () {
    function B() {
        this.c = new c_1.C();
    }
    return B;
}());
exports.B = B;


//// [/user/username/projects/myproject/b.d.ts]
export declare class B {
    c: {
        d: number;
    };
}


//// [/user/username/projects/myproject/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var b = new b_1.B();
console.log(b.c.d);


//// [/user/username/projects/myproject/a.d.ts]
export {};


//// [/user/username/projects/myproject/d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
exports.D = D;


//// [/user/username/projects/myproject/d.d.ts]
export declare class D {
}


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./c.ts","./b.ts","./a.ts","./d.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"6071811233-export var C = class CReal {\n    d = 1;\n};","signature":"-2874569268-export declare var C: {\n    new (): {\n        d: number;\n    };\n};\n"},{"version":"-6441446591-import {C} from './c';\nexport class B {\n    c = new C();\n}","signature":"-12916012021-export declare class B {\n    c: {\n        d: number;\n    };\n}\n"},{"version":"4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);","signature":"-3531856636-export {};\n"},{"version":"-7804761415-export class D { }","signature":"-8611429667-export declare class D {\n}\n"}],"root":[[2,5]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2]],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./c.ts",
    "./b.ts",
    "./a.ts",
    "./d.ts"
  ],
  "fileIdsList": [
    [
      "./b.ts"
    ],
    [
      "./c.ts"
    ]
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./c.ts": {
      "original": {
        "version": "6071811233-export var C = class CReal {\n    d = 1;\n};",
        "signature": "-2874569268-export declare var C: {\n    new (): {\n        d: number;\n    };\n};\n"
      },
      "version": "6071811233-export var C = class CReal {\n    d = 1;\n};",
      "signature": "-2874569268-export declare var C: {\n    new (): {\n        d: number;\n    };\n};\n"
    },
    "./b.ts": {
      "original": {
        "version": "-6441446591-import {C} from './c';\nexport class B {\n    c = new C();\n}",
        "signature": "-12916012021-export declare class B {\n    c: {\n        d: number;\n    };\n}\n"
      },
      "version": "-6441446591-import {C} from './c';\nexport class B {\n    c = new C();\n}",
      "signature": "-12916012021-export declare class B {\n    c: {\n        d: number;\n    };\n}\n"
    },
    "./a.ts": {
      "original": {
        "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
        "signature": "-3531856636-export {};\n"
      },
      "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
      "signature": "-3531856636-export {};\n"
    },
    "./d.ts": {
      "original": {
        "version": "-7804761415-export class D { }",
        "signature": "-8611429667-export declare class D {\n}\n"
      },
      "version": "-7804761415-export class D { }",
      "signature": "-8611429667-export declare class D {\n}\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./c.ts",
        "./b.ts",
        "./a.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./a.ts": [
      "./b.ts"
    ],
    "./b.ts": [
      "./c.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1322
}


Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts",
  "/user/username/projects/myproject/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/c.ts (computed .d.ts during emit)
/user/username/projects/myproject/b.ts (computed .d.ts during emit)
/user/username/projects/myproject/a.ts (computed .d.ts during emit)
/user/username/projects/myproject/d.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Add change that affects d.ts

Input::
//// [/user/username/projects/myproject/c.ts]
export var C = class CReal {
    d = 1;
};export function foo() {}


Output::
Cancelled!!
Operation ws cancelled:: true


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./c.ts","./b.ts","./a.ts","./d.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8116587914-export var C = class CReal {\n    d = 1;\n};export function foo() {}","signature":"-2874569268-export declare var C: {\n    new (): {\n        d: number;\n    };\n};\n"},{"version":"-6441446591-import {C} from './c';\nexport class B {\n    c = new C();\n}","signature":"-12916012021-export declare class B {\n    c: {\n        d: number;\n    };\n}\n"},{"version":"4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);","signature":"-3531856636-export {};\n"},{"version":"-7804761415-export class D { }","signature":"-8611429667-export declare class D {\n}\n"}],"root":[[2,5]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2]],"changeFileSet":[2],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./c.ts",
    "./b.ts",
    "./a.ts",
    "./d.ts"
  ],
  "fileIdsList": [
    [
      "./b.ts"
    ],
    [
      "./c.ts"
    ]
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./c.ts": {
      "original": {
        "version": "-8116587914-export var C = class CReal {\n    d = 1;\n};export function foo() {}",
        "signature": "-2874569268-export declare var C: {\n    new (): {\n        d: number;\n    };\n};\n"
      },
      "version": "-8116587914-export var C = class CReal {\n    d = 1;\n};export function foo() {}",
      "signature": "-2874569268-export declare var C: {\n    new (): {\n        d: number;\n    };\n};\n"
    },
    "./b.ts": {
      "original": {
        "version": "-6441446591-import {C} from './c';\nexport class B {\n    c = new C();\n}",
        "signature": "-12916012021-export declare class B {\n    c: {\n        d: number;\n    };\n}\n"
      },
      "version": "-6441446591-import {C} from './c';\nexport class B {\n    c = new C();\n}",
      "signature": "-12916012021-export declare class B {\n    c: {\n        d: number;\n    };\n}\n"
    },
    "./a.ts": {
      "original": {
        "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
        "signature": "-3531856636-export {};\n"
      },
      "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
      "signature": "-3531856636-export {};\n"
    },
    "./d.ts": {
      "original": {
        "version": "-7804761415-export class D { }",
        "signature": "-8611429667-export declare class D {\n}\n"
      },
      "version": "-7804761415-export class D { }",
      "signature": "-8611429667-export declare class D {\n}\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./c.ts",
        "./b.ts",
        "./a.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./a.ts": [
      "./b.ts"
    ],
    "./b.ts": [
      "./c.ts"
    ]
  },
  "changeFileSet": [
    "./c.ts"
  ],
  "version": "FakeTSVersion",
  "size": 1367
}


Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts",
  "/user/username/projects/myproject/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/c.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Normal build

Input::

//// [/user/username/projects/myproject/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
exports.foo = foo;
exports.C = /** @class */ (function () {
    function CReal() {
        this.d = 1;
    }
    return CReal;
}());
function foo() { }


//// [/user/username/projects/myproject/c.d.ts]
export declare var C: {
    new (): {
        d: number;
    };
};
export declare function foo(): void;


//// [/user/username/projects/myproject/b.js] file written with same contents
//// [/user/username/projects/myproject/b.d.ts] file written with same contents
//// [/user/username/projects/myproject/a.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./c.ts","./b.ts","./a.ts","./d.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8116587914-export var C = class CReal {\n    d = 1;\n};export function foo() {}","signature":"-544179862-export declare var C: {\n    new (): {\n        d: number;\n    };\n};\nexport declare function foo(): void;\n"},{"version":"-6441446591-import {C} from './c';\nexport class B {\n    c = new C();\n}","signature":"-12916012021-export declare class B {\n    c: {\n        d: number;\n    };\n}\n"},{"version":"4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);","signature":"-3531856636-export {};\n"},{"version":"-7804761415-export class D { }","signature":"-8611429667-export declare class D {\n}\n"}],"root":[[2,5]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2]],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./c.ts",
    "./b.ts",
    "./a.ts",
    "./d.ts"
  ],
  "fileIdsList": [
    [
      "./b.ts"
    ],
    [
      "./c.ts"
    ]
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./c.ts": {
      "original": {
        "version": "-8116587914-export var C = class CReal {\n    d = 1;\n};export function foo() {}",
        "signature": "-544179862-export declare var C: {\n    new (): {\n        d: number;\n    };\n};\nexport declare function foo(): void;\n"
      },
      "version": "-8116587914-export var C = class CReal {\n    d = 1;\n};export function foo() {}",
      "signature": "-544179862-export declare var C: {\n    new (): {\n        d: number;\n    };\n};\nexport declare function foo(): void;\n"
    },
    "./b.ts": {
      "original": {
        "version": "-6441446591-import {C} from './c';\nexport class B {\n    c = new C();\n}",
        "signature": "-12916012021-export declare class B {\n    c: {\n        d: number;\n    };\n}\n"
      },
      "version": "-6441446591-import {C} from './c';\nexport class B {\n    c = new C();\n}",
      "signature": "-12916012021-export declare class B {\n    c: {\n        d: number;\n    };\n}\n"
    },
    "./a.ts": {
      "original": {
        "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
        "signature": "-3531856636-export {};\n"
      },
      "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
      "signature": "-3531856636-export {};\n"
    },
    "./d.ts": {
      "original": {
        "version": "-7804761415-export class D { }",
        "signature": "-8611429667-export declare class D {\n}\n"
      },
      "version": "-7804761415-export class D { }",
      "signature": "-8611429667-export declare class D {\n}\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./c.ts",
        "./b.ts",
        "./a.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./a.ts": [
      "./b.ts"
    ],
    "./b.ts": [
      "./c.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1384
}


Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts",
  "/user/username/projects/myproject/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/c.ts (computed .d.ts)
/user/username/projects/myproject/b.ts (computed .d.ts)
/user/username/projects/myproject/a.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Clean build

Input::

//// [/user/username/projects/myproject/c.js] file written with same contents
//// [/user/username/projects/myproject/c.d.ts] file written with same contents
//// [/user/username/projects/myproject/b.js] file written with same contents
//// [/user/username/projects/myproject/b.d.ts] file written with same contents
//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/a.d.ts] file written with same contents
//// [/user/username/projects/myproject/d.js] file written with same contents
//// [/user/username/projects/myproject/d.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts",
  "/user/username/projects/myproject/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/c.ts (computed .d.ts during emit)
/user/username/projects/myproject/b.ts (computed .d.ts during emit)
/user/username/projects/myproject/a.ts (computed .d.ts during emit)
/user/username/projects/myproject/d.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined
