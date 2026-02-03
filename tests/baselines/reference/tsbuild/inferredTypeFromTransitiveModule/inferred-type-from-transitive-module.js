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
    "target": "es2015",
    "declaration": true,
    "outDir": "obj",
    "incremental": true
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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

[96mindex.ts[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS1323: [0mDynamic imports are only supported when the '--module' flag is set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', 'node18', 'node20', or 'nodenext'.

[7m3[0m     import('./lazyIndex')
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.



//// [/home/src/tslibs/TS/Lib/lib.es6.d.ts] *Lib*

//// [/home/src/workspaces/project/obj/bar.js]
export default foo()(function foobar(param) {
});


//// [/home/src/workspaces/project/obj/bar.d.ts]
declare const _default: (param: string) => void;
export default _default;


//// [/home/src/workspaces/project/obj/bundling.js]
export class LazyModule {
    constructor(importCallback) {
        this.importCallback = importCallback;
    }
}
export class LazyAction {
    constructor(_lazyModule, _getter) {
    }
}


//// [/home/src/workspaces/project/obj/bundling.d.ts]
export declare class LazyModule<TModule> {
    private importCallback;
    constructor(importCallback: () => Promise<TModule>);
}
export declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {
    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);
}


//// [/home/src/workspaces/project/obj/lazyIndex.js]
export { default as bar } from './bar';


//// [/home/src/workspaces/project/obj/lazyIndex.d.ts]
export { default as bar } from './bar';


//// [/home/src/workspaces/project/obj/index.js]
import { LazyAction, LazyModule } from './bundling';
const lazyModule = new LazyModule(() => import('./lazyIndex'));
export const lazyBar = new LazyAction(lazyModule, m => m.bar);


//// [/home/src/workspaces/project/obj/index.d.ts]
import { LazyAction } from './bundling';
export declare const lazyBar: LazyAction<(param: string) => void, typeof import("./lazyIndex")>;


//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es6.d.ts","../bar.ts","../bundling.ts","../global.d.ts","../lazyindex.ts","../index.ts"],"fileIdsList":[[3,5],[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"9420269200-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});\n","signature":"1630430607-declare const _default: (param: string) => void;\nexport default _default;\n"},{"version":"-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n","signature":"-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"},{"version":"-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n","affectsGlobalScope":true},"-6956449754-export { default as bar } from './bar';\n",{"version":"6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n","signature":"-13696684486-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n"}],"root":[[2,6]],"options":{"declaration":true,"outDir":"./","target":2},"referencedMap":[[6,1],[5,2]],"semanticDiagnosticsPerFile":[[6,[{"start":97,"length":21,"messageText":"Dynamic imports are only supported when the '--module' flag is set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', 'node18', 'node20', or 'nodenext'.","category":1,"code":1323}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es6.d.ts",
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
    "../../../tslibs/ts/lib/lib.es6.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "target": 2
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
  "semanticDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "start": 97,
          "length": 21,
          "messageText": "Dynamic imports are only supported when the '--module' flag is set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', 'node18', 'node20', or 'nodenext'.",
          "category": 1,
          "code": 1323
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2720
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

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

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'obj/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mindex.ts[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS1323: [0mDynamic imports are only supported when the '--module' flag is set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', 'node18', 'node20', or 'nodenext'.

[7m3[0m     import('./lazyIndex')
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/project/obj/bar.js]
export default foo()(function foobar() {
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
{"fileNames":["../../../tslibs/ts/lib/lib.es6.d.ts","../bar.ts","../bundling.ts","../global.d.ts","../lazyindex.ts","../index.ts"],"fileIdsList":[[3,5],[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"10075719182-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(): void {\n});\n","signature":"-1866892563-declare const _default: () => void;\nexport default _default;\n"},{"version":"-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n","signature":"-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"},{"version":"-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n","affectsGlobalScope":true},"-6956449754-export { default as bar } from './bar';\n",{"version":"6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n","signature":"-4053129224-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<() => void, typeof import(\"./lazyIndex\")>;\n"}],"root":[[2,6]],"options":{"declaration":true,"outDir":"./","target":2},"referencedMap":[[6,1],[5,2]],"semanticDiagnosticsPerFile":[[6,[{"start":97,"length":21,"messageText":"Dynamic imports are only supported when the '--module' flag is set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', 'node18', 'node20', or 'nodenext'.","category":1,"code":1323}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es6.d.ts",
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
    "../../../tslibs/ts/lib/lib.es6.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "target": 2
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
  "semanticDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "start": 97,
          "length": 21,
          "messageText": "Dynamic imports are only supported when the '--module' flag is set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', 'node18', 'node20', or 'nodenext'.",
          "category": 1,
          "code": 1323
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2682
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

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

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'obj/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mindex.ts[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS1323: [0mDynamic imports are only supported when the '--module' flag is set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', 'node18', 'node20', or 'nodenext'.

[7m3[0m     import('./lazyIndex')
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/project/obj/bar.js]
export default foo()(function foobar(param) {
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
{"fileNames":["../../../tslibs/ts/lib/lib.es6.d.ts","../bar.ts","../bundling.ts","../global.d.ts","../lazyindex.ts","../index.ts"],"fileIdsList":[[3,5],[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"9420269200-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});\n","signature":"1630430607-declare const _default: (param: string) => void;\nexport default _default;\n"},{"version":"-5105594088-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}\n","signature":"-23343356903-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n"},{"version":"-20910599262-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}\n","affectsGlobalScope":true},"-6956449754-export { default as bar } from './bar';\n",{"version":"6186344161-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);\n","signature":"-13696684486-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n"}],"root":[[2,6]],"options":{"declaration":true,"outDir":"./","target":2},"referencedMap":[[6,1],[5,2]],"semanticDiagnosticsPerFile":[[6,[{"start":97,"length":21,"messageText":"Dynamic imports are only supported when the '--module' flag is set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', 'node18', 'node20', or 'nodenext'.","category":1,"code":1323}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es6.d.ts",
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
    "../../../tslibs/ts/lib/lib.es6.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "target": 2
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
  "semanticDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "start": 97,
          "length": 21,
          "messageText": "Dynamic imports are only supported when the '--module' flag is set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', 'node18', 'node20', or 'nodenext'.",
          "category": 1,
          "code": 1323
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2720
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
