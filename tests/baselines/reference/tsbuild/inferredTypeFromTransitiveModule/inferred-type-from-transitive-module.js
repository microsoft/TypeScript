currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/bar.ts]
interface RawAction {
    (...args: any[]): Promise<any> | void;
}
interface ActionFactory {
    <T extends RawAction>(target: T): T;
}
declare function foo<U extends any[] = any[]>(): ActionFactory;
export default foo()(function foobar(param: string): void {
});


//// [/home/src/workspaces/project/bundling.ts]
export class LazyModule<TModule> {
    constructor(private importCallback: () => Promise<TModule>) {}
}

export class LazyAction<
    TAction extends (...args: any[]) => any,
    TModule
>  {
    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {
    }
}


//// [/home/src/workspaces/project/global.d.ts]
interface PromiseConstructor {
    new <T>(): Promise<T>;
}
declare var Promise: PromiseConstructor;
interface Promise<T> {
}


//// [/home/src/workspaces/project/index.ts]
import { LazyAction, LazyModule } from './bundling';
const lazyModule = new LazyModule(() =>
    import('./lazyIndex')
);
export const lazyBar = new LazyAction(lazyModule, m => m.bar);


//// [/home/src/workspaces/project/lazyIndex.ts]
export { default as bar } from './bar';


//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "declaration": true,
    "outDir": "obj",
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


/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'obj/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/obj/bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo()(function foobar(param) {
});


//// [/home/src/workspaces/project/obj/bar.d.ts]
declare const _default: (param: string) => void;
export default _default;


//// [/home/src/workspaces/project/obj/bundling.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyAction = exports.LazyModule = void 0;
var LazyModule = /** @class */ (function () {
    function LazyModule(importCallback) {
        this.importCallback = importCallback;
    }
    return LazyModule;
}());
exports.LazyModule = LazyModule;
var LazyAction = /** @class */ (function () {
    function LazyAction(_lazyModule, _getter) {
    }
    return LazyAction;
}());
exports.LazyAction = LazyAction;


//// [/home/src/workspaces/project/obj/bundling.d.ts]
export declare class LazyModule<TModule> {
    private importCallback;
    constructor(importCallback: () => Promise<TModule>);
}
export declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {
    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);
}


//// [/home/src/workspaces/project/obj/lazyIndex.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
var bar_1 = require("./bar");
Object.defineProperty(exports, "bar", { enumerable: true, get: function () { return bar_1.default; } });


//// [/home/src/workspaces/project/obj/lazyIndex.d.ts]
export { default as bar } from './bar';


//// [/home/src/workspaces/project/obj/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyBar = void 0;
var bundling_1 = require("./bundling");
var lazyModule = new bundling_1.LazyModule(function () {
    return Promise.resolve().then(function () { return require('./lazyIndex'); });
});
exports.lazyBar = new bundling_1.LazyAction(lazyModule, function (m) { return m.bar; });


//// [/home/src/workspaces/project/obj/index.d.ts]
import { LazyAction } from './bundling';
export declare const lazyBar: LazyAction<(param: string) => void, typeof import("./lazyIndex")>;


//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../bar.ts","../bundling.ts","../global.d.ts","../lazyindex.ts","../index.ts"],"fileIdsList":[[3,5],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"9420269200-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});\n","signature":"1630430607-declare const _default: (param: string) => void;\nexport default _default;\n"},{"version":"-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n","signature":"-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"},{"version":"-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n","affectsGlobalScope":true},"-6956449754-export { default as bar } from './bar';\n",{"version":"6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n","signature":"-13696684486-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n"}],"root":[[2,6]],"options":{"declaration":true,"outDir":"./","target":1},"referencedMap":[[6,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../bar.ts",
    "../bundling.ts",
    "../global.d.ts",
    "../lazyindex.ts",
    "../index.ts"
  ],
  "fileIdsList": [
    [
      "../bundling.ts",
      "../lazyindex.ts"
    ],
    [
      "../bar.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../bar.ts": {
      "original": {
        "version": "9420269200-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});\n",
        "signature": "1630430607-declare const _default: (param: string) => void;\nexport default _default;\n"
      },
      "version": "9420269200-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});\n",
      "signature": "1630430607-declare const _default: (param: string) => void;\nexport default _default;\n"
    },
    "../bundling.ts": {
      "original": {
        "version": "-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n",
        "signature": "-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"
      },
      "version": "-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n",
      "signature": "-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"
    },
    "../global.d.ts": {
      "original": {
        "version": "-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n",
      "signature": "-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n",
      "affectsGlobalScope": true
    },
    "../lazyindex.ts": {
      "version": "-6956449754-export { default as bar } from './bar';\n",
      "signature": "-6956449754-export { default as bar } from './bar';\n"
    },
    "../index.ts": {
      "original": {
        "version": "6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n",
        "signature": "-13696684486-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n"
      },
      "version": "6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n",
      "signature": "-13696684486-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n"
    }
  },
  "root": [
    [
      [
        2,
        6
      ],
      [
        "../bar.ts",
        "../bundling.ts",
        "../global.d.ts",
        "../lazyindex.ts",
        "../index.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "outDir": "./",
    "target": 1
  },
  "referencedMap": {
    "../index.ts": [
      "../bundling.ts",
      "../lazyindex.ts"
    ],
    "../lazyindex.ts": [
      "../bar.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 2472
}


exitCode:: ExitStatus.Success

Change:: incremental-declaration-changes

Input::
//// [/home/src/workspaces/project/bar.ts]
interface RawAction {
    (...args: any[]): Promise<any> | void;
}
interface ActionFactory {
    <T extends RawAction>(target: T): T;
}
declare function foo<U extends any[] = any[]>(): ActionFactory;
export default foo()(function foobar(): void {
});



/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'obj/tsconfig.tsbuildinfo' is older than input 'bar.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/obj/bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo()(function foobar() {
});


//// [/home/src/workspaces/project/obj/bar.d.ts]
declare const _default: () => void;
export default _default;


//// [/home/src/workspaces/project/obj/lazyIndex.js] file written with same contents
//// [/home/src/workspaces/project/obj/lazyIndex.d.ts] file written with same contents
//// [/home/src/workspaces/project/obj/index.d.ts]
import { LazyAction } from './bundling';
export declare const lazyBar: LazyAction<() => void, typeof import("./lazyIndex")>;


//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../bar.ts","../bundling.ts","../global.d.ts","../lazyindex.ts","../index.ts"],"fileIdsList":[[3,5],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"10075719182-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(): void {\n});\n","signature":"-1866892563-declare const _default: () => void;\nexport default _default;\n"},{"version":"-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n","signature":"-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"},{"version":"-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n","affectsGlobalScope":true},"-6956449754-export { default as bar } from './bar';\n",{"version":"6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n","signature":"-4053129224-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<() => void, typeof import(\"./lazyIndex\")>;\n"}],"root":[[2,6]],"options":{"declaration":true,"outDir":"./","target":1},"referencedMap":[[6,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../bar.ts",
    "../bundling.ts",
    "../global.d.ts",
    "../lazyindex.ts",
    "../index.ts"
  ],
  "fileIdsList": [
    [
      "../bundling.ts",
      "../lazyindex.ts"
    ],
    [
      "../bar.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../bar.ts": {
      "original": {
        "version": "10075719182-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(): void {\n});\n",
        "signature": "-1866892563-declare const _default: () => void;\nexport default _default;\n"
      },
      "version": "10075719182-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(): void {\n});\n",
      "signature": "-1866892563-declare const _default: () => void;\nexport default _default;\n"
    },
    "../bundling.ts": {
      "original": {
        "version": "-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n",
        "signature": "-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"
      },
      "version": "-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n",
      "signature": "-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"
    },
    "../global.d.ts": {
      "original": {
        "version": "-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n",
      "signature": "-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n",
      "affectsGlobalScope": true
    },
    "../lazyindex.ts": {
      "version": "-6956449754-export { default as bar } from './bar';\n",
      "signature": "-6956449754-export { default as bar } from './bar';\n"
    },
    "../index.ts": {
      "original": {
        "version": "6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n",
        "signature": "-4053129224-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<() => void, typeof import(\"./lazyIndex\")>;\n"
      },
      "version": "6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n",
      "signature": "-4053129224-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<() => void, typeof import(\"./lazyIndex\")>;\n"
    }
  },
  "root": [
    [
      [
        2,
        6
      ],
      [
        "../bar.ts",
        "../bundling.ts",
        "../global.d.ts",
        "../lazyindex.ts",
        "../index.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "outDir": "./",
    "target": 1
  },
  "referencedMap": {
    "../index.ts": [
      "../bundling.ts",
      "../lazyindex.ts"
    ],
    "../lazyindex.ts": [
      "../bar.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 2434
}


exitCode:: ExitStatus.Success

Change:: incremental-declaration-changes

Input::
//// [/home/src/workspaces/project/bar.ts]
interface RawAction {
    (...args: any[]): Promise<any> | void;
}
interface ActionFactory {
    <T extends RawAction>(target: T): T;
}
declare function foo<U extends any[] = any[]>(): ActionFactory;
export default foo()(function foobar(param: string): void {
});



/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'obj/tsconfig.tsbuildinfo' is older than input 'bar.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/obj/bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo()(function foobar(param) {
});


//// [/home/src/workspaces/project/obj/bar.d.ts]
declare const _default: (param: string) => void;
export default _default;


//// [/home/src/workspaces/project/obj/lazyIndex.js] file written with same contents
//// [/home/src/workspaces/project/obj/lazyIndex.d.ts] file written with same contents
//// [/home/src/workspaces/project/obj/index.d.ts]
import { LazyAction } from './bundling';
export declare const lazyBar: LazyAction<(param: string) => void, typeof import("./lazyIndex")>;


//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../bar.ts","../bundling.ts","../global.d.ts","../lazyindex.ts","../index.ts"],"fileIdsList":[[3,5],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"9420269200-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});\n","signature":"1630430607-declare const _default: (param: string) => void;\nexport default _default;\n"},{"version":"-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n","signature":"-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"},{"version":"-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n","affectsGlobalScope":true},"-6956449754-export { default as bar } from './bar';\n",{"version":"6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n","signature":"-13696684486-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n"}],"root":[[2,6]],"options":{"declaration":true,"outDir":"./","target":1},"referencedMap":[[6,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../bar.ts",
    "../bundling.ts",
    "../global.d.ts",
    "../lazyindex.ts",
    "../index.ts"
  ],
  "fileIdsList": [
    [
      "../bundling.ts",
      "../lazyindex.ts"
    ],
    [
      "../bar.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../bar.ts": {
      "original": {
        "version": "9420269200-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});\n",
        "signature": "1630430607-declare const _default: (param: string) => void;\nexport default _default;\n"
      },
      "version": "9420269200-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});\n",
      "signature": "1630430607-declare const _default: (param: string) => void;\nexport default _default;\n"
    },
    "../bundling.ts": {
      "original": {
        "version": "-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n",
        "signature": "-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"
      },
      "version": "-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n",
      "signature": "-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"
    },
    "../global.d.ts": {
      "original": {
        "version": "-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n",
      "signature": "-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n",
      "affectsGlobalScope": true
    },
    "../lazyindex.ts": {
      "version": "-6956449754-export { default as bar } from './bar';\n",
      "signature": "-6956449754-export { default as bar } from './bar';\n"
    },
    "../index.ts": {
      "original": {
        "version": "6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n",
        "signature": "-13696684486-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n"
      },
      "version": "6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n",
      "signature": "-13696684486-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n"
    }
  },
  "root": [
    [
      [
        2,
        6
      ],
      [
        "../bar.ts",
        "../bundling.ts",
        "../global.d.ts",
        "../lazyindex.ts",
        "../index.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "outDir": "./",
    "target": 1
  },
  "referencedMap": {
    "../index.ts": [
      "../bundling.ts",
      "../lazyindex.ts"
    ],
    "../lazyindex.ts": [
      "../bar.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 2472
}


exitCode:: ExitStatus.Success
