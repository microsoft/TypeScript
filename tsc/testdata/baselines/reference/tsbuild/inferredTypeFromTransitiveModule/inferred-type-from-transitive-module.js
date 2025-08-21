currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/bar.ts] *new* 
interface RawAction {
    (...args: any[]): Promise<any> | void;
}
interface ActionFactory {
    <T extends RawAction>(target: T): T;
}
declare function foo<U extends any[] = any[]>(): ActionFactory;
export default foo()(function foobar(param: string): void {
});
//// [/home/src/workspaces/project/bundling.ts] *new* 
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
//// [/home/src/workspaces/project/global.d.ts] *new* 
interface PromiseConstructor {
    new <T>(): Promise<T>;
}
declare var Promise: PromiseConstructor;
interface Promise<T> {
}
//// [/home/src/workspaces/project/index.ts] *new* 
import { LazyAction, LazyModule } from './bundling';
const lazyModule = new LazyModule(() =>
    import('./lazyIndex')
);
export const lazyBar = new LazyAction(lazyModule, m => m.bar);
//// [/home/src/workspaces/project/lazyIndex.ts] *new* 
export { default as bar } from './bar';
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "target": "es5",
        "declaration": true,
        "outDir": "obj",
        "incremental": true,
        "isolatedModules": false,
    },
}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'obj/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/obj/bar.d.ts] *new* 
declare const _default: (param: string) => void;
export default _default;

//// [/home/src/workspaces/project/obj/bar.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo()(function foobar(param) {
});

//// [/home/src/workspaces/project/obj/bundling.d.ts] *new* 
export declare class LazyModule<TModule> {
    private importCallback;
    constructor(importCallback: () => Promise<TModule>);
}
export declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {
    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);
}

//// [/home/src/workspaces/project/obj/bundling.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyAction = exports.LazyModule = void 0;
class LazyModule {
    importCallback;
    constructor(importCallback) {
        this.importCallback = importCallback;
    }
}
exports.LazyModule = LazyModule;
class LazyAction {
    constructor(_lazyModule, _getter) {
    }
}
exports.LazyAction = LazyAction;

//// [/home/src/workspaces/project/obj/index.d.ts] *new* 
import { LazyAction } from './bundling';
export declare const lazyBar: LazyAction<(param: string) => void, typeof import("./lazyIndex")>;

//// [/home/src/workspaces/project/obj/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyBar = void 0;
const bundling_1 = require("./bundling");
const lazyModule = new bundling_1.LazyModule(() => Promise.resolve().then(() => require('./lazyIndex')));
exports.lazyBar = new bundling_1.LazyAction(lazyModule, m => m.bar);

//// [/home/src/workspaces/project/obj/lazyIndex.d.ts] *new* 
export { default as bar } from './bar';

//// [/home/src/workspaces/project/obj/lazyIndex.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
const bar_1 = require("./bar");
Object.defineProperty(exports, "bar", { enumerable: true, get: function () { return bar_1.default; } });

//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,6]],"fileNames":["lib.d.ts","../bar.ts","../bundling.ts","../global.d.ts","../lazyIndex.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"76a83326d4e197789f8362e994577f53-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});","signature":"16f73d7e0c200fed165b8fa7d55fefbf-declare const _default: (param: string) => void;\nexport default _default;\n","impliedNodeFormat":1},{"version":"16bf1b870d8b21533eda3b1f1b87cd77-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}","signature":"5e4757586f6f5d494b6763f1e808313a-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n","impliedNodeFormat":1},{"version":"9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7c5cf52aadc65791601164da964e3110-export { default as bar } from './bar';","signature":"3a848e147ba2aebbd888c3c7bbab715b-export { default as bar } from './bar';\n","impliedNodeFormat":1},{"version":"d552d2a19fa05b15aa33018233d09810-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);","signature":"421664a6306d66498ea4a2e3065214b1-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n","impliedNodeFormat":1}],"fileIdsList":[[3,5],[2]],"options":{"declaration":true,"outDir":"./","target":1},"referencedMap":[[6,1],[5,2]]}
//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../bar.ts",
        "../bundling.ts",
        "../global.d.ts",
        "../lazyIndex.ts",
        "../index.ts"
      ],
      "original": [
        2,
        6
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../bar.ts",
    "../bundling.ts",
    "../global.d.ts",
    "../lazyIndex.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../bar.ts",
      "version": "76a83326d4e197789f8362e994577f53-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});",
      "signature": "16f73d7e0c200fed165b8fa7d55fefbf-declare const _default: (param: string) => void;\nexport default _default;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "76a83326d4e197789f8362e994577f53-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});",
        "signature": "16f73d7e0c200fed165b8fa7d55fefbf-declare const _default: (param: string) => void;\nexport default _default;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../bundling.ts",
      "version": "16bf1b870d8b21533eda3b1f1b87cd77-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}",
      "signature": "5e4757586f6f5d494b6763f1e808313a-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "16bf1b870d8b21533eda3b1f1b87cd77-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}",
        "signature": "5e4757586f6f5d494b6763f1e808313a-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../global.d.ts",
      "version": "9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}",
      "signature": "9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../lazyIndex.ts",
      "version": "7c5cf52aadc65791601164da964e3110-export { default as bar } from './bar';",
      "signature": "3a848e147ba2aebbd888c3c7bbab715b-export { default as bar } from './bar';\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7c5cf52aadc65791601164da964e3110-export { default as bar } from './bar';",
        "signature": "3a848e147ba2aebbd888c3c7bbab715b-export { default as bar } from './bar';\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "d552d2a19fa05b15aa33018233d09810-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);",
      "signature": "421664a6306d66498ea4a2e3065214b1-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d552d2a19fa05b15aa33018233d09810-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);",
        "signature": "421664a6306d66498ea4a2e3065214b1-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../bundling.ts",
      "../lazyIndex.ts"
    ],
    [
      "../bar.ts"
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
      "../lazyIndex.ts"
    ],
    "../lazyIndex.ts": [
      "../bar.ts"
    ]
  },
  "size": 3109
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/bar.ts
*refresh*    /home/src/workspaces/project/bundling.ts
*refresh*    /home/src/workspaces/project/global.d.ts
*refresh*    /home/src/workspaces/project/lazyIndex.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/bar.ts
(stored at emit) /home/src/workspaces/project/bundling.ts
(stored at emit) /home/src/workspaces/project/lazyIndex.ts
(stored at emit) /home/src/workspaces/project/index.ts


Edit [0]:: incremental-declaration-changes
//// [/home/src/workspaces/project/bar.ts] *modified* 
interface RawAction {
    (...args: any[]): Promise<any> | void;
}
interface ActionFactory {
    <T extends RawAction>(target: T): T;
}
declare function foo<U extends any[] = any[]>(): ActionFactory;
export default foo()(function foobar(): void {
});

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'obj/tsconfig.tsbuildinfo' is older than input 'bar.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/obj/bar.d.ts] *modified* 
declare const _default: () => void;
export default _default;

//// [/home/src/workspaces/project/obj/bar.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo()(function foobar() {
});

//// [/home/src/workspaces/project/obj/index.d.ts] *modified* 
import { LazyAction } from './bundling';
export declare const lazyBar: LazyAction<() => void, typeof import("./lazyIndex")>;

//// [/home/src/workspaces/project/obj/lazyIndex.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/obj/lazyIndex.js] *rewrite with same content*
//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,6]],"fileNames":["lib.d.ts","../bar.ts","../bundling.ts","../global.d.ts","../lazyIndex.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0bd8823a281968531aa051fd0166b47a-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(): void {\n});","signature":"6cd64ed70c0d0d178b062e1470eb929d-declare const _default: () => void;\nexport default _default;\n","impliedNodeFormat":1},{"version":"16bf1b870d8b21533eda3b1f1b87cd77-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}","signature":"5e4757586f6f5d494b6763f1e808313a-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n","impliedNodeFormat":1},{"version":"9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7c5cf52aadc65791601164da964e3110-export { default as bar } from './bar';","signature":"3a848e147ba2aebbd888c3c7bbab715b-export { default as bar } from './bar';\n","impliedNodeFormat":1},{"version":"d552d2a19fa05b15aa33018233d09810-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);","signature":"58c7056d7920602a0f958afefa15677d-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<() => void, typeof import(\"./lazyIndex\")>;\n","impliedNodeFormat":1}],"fileIdsList":[[3,5],[2]],"options":{"declaration":true,"outDir":"./","target":1},"referencedMap":[[6,1],[5,2]]}
//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../bar.ts",
        "../bundling.ts",
        "../global.d.ts",
        "../lazyIndex.ts",
        "../index.ts"
      ],
      "original": [
        2,
        6
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../bar.ts",
    "../bundling.ts",
    "../global.d.ts",
    "../lazyIndex.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../bar.ts",
      "version": "0bd8823a281968531aa051fd0166b47a-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(): void {\n});",
      "signature": "6cd64ed70c0d0d178b062e1470eb929d-declare const _default: () => void;\nexport default _default;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0bd8823a281968531aa051fd0166b47a-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(): void {\n});",
        "signature": "6cd64ed70c0d0d178b062e1470eb929d-declare const _default: () => void;\nexport default _default;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../bundling.ts",
      "version": "16bf1b870d8b21533eda3b1f1b87cd77-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}",
      "signature": "5e4757586f6f5d494b6763f1e808313a-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "16bf1b870d8b21533eda3b1f1b87cd77-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}",
        "signature": "5e4757586f6f5d494b6763f1e808313a-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../global.d.ts",
      "version": "9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}",
      "signature": "9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../lazyIndex.ts",
      "version": "7c5cf52aadc65791601164da964e3110-export { default as bar } from './bar';",
      "signature": "3a848e147ba2aebbd888c3c7bbab715b-export { default as bar } from './bar';\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7c5cf52aadc65791601164da964e3110-export { default as bar } from './bar';",
        "signature": "3a848e147ba2aebbd888c3c7bbab715b-export { default as bar } from './bar';\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "d552d2a19fa05b15aa33018233d09810-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);",
      "signature": "58c7056d7920602a0f958afefa15677d-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<() => void, typeof import(\"./lazyIndex\")>;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d552d2a19fa05b15aa33018233d09810-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);",
        "signature": "58c7056d7920602a0f958afefa15677d-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<() => void, typeof import(\"./lazyIndex\")>;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../bundling.ts",
      "../lazyIndex.ts"
    ],
    [
      "../bar.ts"
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
      "../lazyIndex.ts"
    ],
    "../lazyIndex.ts": [
      "../bar.ts"
    ]
  },
  "size": 3070
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/bar.ts
*refresh*    /home/src/workspaces/project/lazyIndex.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/bar.ts
(computed .d.ts) /home/src/workspaces/project/lazyIndex.ts
(stored at emit) /home/src/workspaces/project/index.ts


Edit [1]:: incremental-declaration-changes
//// [/home/src/workspaces/project/bar.ts] *modified* 
interface RawAction {
    (...args: any[]): Promise<any> | void;
}
interface ActionFactory {
    <T extends RawAction>(target: T): T;
}
declare function foo<U extends any[] = any[]>(): ActionFactory;
export default foo()(function foobar(param: string): void {
});

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'obj/tsconfig.tsbuildinfo' is older than input 'bar.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/obj/bar.d.ts] *modified* 
declare const _default: (param: string) => void;
export default _default;

//// [/home/src/workspaces/project/obj/bar.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo()(function foobar(param) {
});

//// [/home/src/workspaces/project/obj/index.d.ts] *modified* 
import { LazyAction } from './bundling';
export declare const lazyBar: LazyAction<(param: string) => void, typeof import("./lazyIndex")>;

//// [/home/src/workspaces/project/obj/lazyIndex.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/obj/lazyIndex.js] *rewrite with same content*
//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,6]],"fileNames":["lib.d.ts","../bar.ts","../bundling.ts","../global.d.ts","../lazyIndex.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"76a83326d4e197789f8362e994577f53-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});","signature":"16f73d7e0c200fed165b8fa7d55fefbf-declare const _default: (param: string) => void;\nexport default _default;\n","impliedNodeFormat":1},{"version":"16bf1b870d8b21533eda3b1f1b87cd77-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}","signature":"5e4757586f6f5d494b6763f1e808313a-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n","impliedNodeFormat":1},{"version":"9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7c5cf52aadc65791601164da964e3110-export { default as bar } from './bar';","signature":"3a848e147ba2aebbd888c3c7bbab715b-export { default as bar } from './bar';\n","impliedNodeFormat":1},{"version":"d552d2a19fa05b15aa33018233d09810-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);","signature":"421664a6306d66498ea4a2e3065214b1-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n","impliedNodeFormat":1}],"fileIdsList":[[3,5],[2]],"options":{"declaration":true,"outDir":"./","target":1},"referencedMap":[[6,1],[5,2]]}
//// [/home/src/workspaces/project/obj/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../bar.ts",
        "../bundling.ts",
        "../global.d.ts",
        "../lazyIndex.ts",
        "../index.ts"
      ],
      "original": [
        2,
        6
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../bar.ts",
    "../bundling.ts",
    "../global.d.ts",
    "../lazyIndex.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../bar.ts",
      "version": "76a83326d4e197789f8362e994577f53-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});",
      "signature": "16f73d7e0c200fed165b8fa7d55fefbf-declare const _default: (param: string) => void;\nexport default _default;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "76a83326d4e197789f8362e994577f53-interface RawAction {\n    (...args: any[]): Promise<any> | void;\n}\ninterface ActionFactory {\n    <T extends RawAction>(target: T): T;\n}\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\nexport default foo()(function foobar(param: string): void {\n});",
        "signature": "16f73d7e0c200fed165b8fa7d55fefbf-declare const _default: (param: string) => void;\nexport default _default;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../bundling.ts",
      "version": "16bf1b870d8b21533eda3b1f1b87cd77-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}",
      "signature": "5e4757586f6f5d494b6763f1e808313a-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "16bf1b870d8b21533eda3b1f1b87cd77-export class LazyModule<TModule> {\n    constructor(private importCallback: () => Promise<TModule>) {}\n}\n\nexport class LazyAction<\n    TAction extends (...args: any[]) => any,\n    TModule\n>  {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\n    }\n}",
        "signature": "5e4757586f6f5d494b6763f1e808313a-export declare class LazyModule<TModule> {\n    private importCallback;\n    constructor(importCallback: () => Promise<TModule>);\n}\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../global.d.ts",
      "version": "9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}",
      "signature": "9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9c9274fd70d574f2b4b68a2891bd4c47-interface PromiseConstructor {\n    new <T>(): Promise<T>;\n}\ndeclare var Promise: PromiseConstructor;\ninterface Promise<T> {\n}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../lazyIndex.ts",
      "version": "7c5cf52aadc65791601164da964e3110-export { default as bar } from './bar';",
      "signature": "3a848e147ba2aebbd888c3c7bbab715b-export { default as bar } from './bar';\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7c5cf52aadc65791601164da964e3110-export { default as bar } from './bar';",
        "signature": "3a848e147ba2aebbd888c3c7bbab715b-export { default as bar } from './bar';\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "d552d2a19fa05b15aa33018233d09810-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);",
      "signature": "421664a6306d66498ea4a2e3065214b1-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d552d2a19fa05b15aa33018233d09810-import { LazyAction, LazyModule } from './bundling';\nconst lazyModule = new LazyModule(() =>\n    import('./lazyIndex')\n);\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);",
        "signature": "421664a6306d66498ea4a2e3065214b1-import { LazyAction } from './bundling';\nexport declare const lazyBar: LazyAction<(param: string) => void, typeof import(\"./lazyIndex\")>;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../bundling.ts",
      "../lazyIndex.ts"
    ],
    [
      "../bar.ts"
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
      "../lazyIndex.ts"
    ],
    "../lazyIndex.ts": [
      "../bar.ts"
    ]
  },
  "size": 3109
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/bar.ts
*refresh*    /home/src/workspaces/project/lazyIndex.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/bar.ts
(computed .d.ts) /home/src/workspaces/project/lazyIndex.ts
(stored at emit) /home/src/workspaces/project/index.ts
