currentDirectory:: / useCaseSensitiveFileNames: false
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

//// [/a.ts]
import {B} from './b'
@((_) => {})
export class A {
    constructor(p: B) {}
}

//// [/b.ts]
export class B {}

//// [/tsconfig.json]
{
  "compilerOptions": {
    "target": "es6",
    "importsNotUsedAsValues": "error"
  }
}


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'importsNotUsedAsValues' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '"ignoreDeprecations": "5.0"' to silence this error.
  Use 'verbatimModuleSyntax' instead.

[7m4[0m     "importsNotUsedAsValues": "error"
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:20 AM[0m] Found 1 error. Watching for file changes.



//// [/b.js]
export class B {
}


//// [/a.js]
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import './b';
let A = (() => {
    let _classDecorators = [((_) => { })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var A = _classThis = class {
        constructor(p) { }
    };
    __setFunctionName(_classThis, "A");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        A = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return A = _classThis;
})();
export { A };



FsWatches::
/a.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
/b.ts: *new*
  {}
/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}

Program root files: [
  "/a.ts",
  "/b.ts",
  "/a/lib/lib.d.ts"
]
Program options: {
  "target": 2,
  "importsNotUsedAsValues": 2,
  "watch": true,
  "configFilePath": "/tsconfig.json"
}
Program structureReused: Not
Program files::
/b.ts
/a.ts
/a/lib/lib.d.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/b.ts (used version)
/a.ts (used version)
/a/lib/lib.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Enable experimentalDecorators

Input::
//// [/tsconfig.json]
{
  "compilerOptions": {
    "target": "es6",
    "importsNotUsedAsValues": "error",
    "experimentalDecorators": true
  }
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:23 AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'importsNotUsedAsValues' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '"ignoreDeprecations": "5.0"' to silence this error.
  Use 'verbatimModuleSyntax' instead.

[7m4[0m     "importsNotUsedAsValues": "error",
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:30 AM[0m] Found 1 error. Watching for file changes.



//// [/b.js] file written with same contents
//// [/a.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './b';
let A = class A {
    constructor(p) { }
};
A = __decorate([
    ((_) => { })
], A);
export { A };




Program root files: [
  "/a.ts",
  "/b.ts",
  "/a/lib/lib.d.ts"
]
Program options: {
  "target": 2,
  "importsNotUsedAsValues": 2,
  "experimentalDecorators": true,
  "watch": true,
  "configFilePath": "/tsconfig.json"
}
Program structureReused: Completely
Program files::
/b.ts
/a.ts
/a/lib/lib.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Enable emitDecoratorMetadata

Input::
//// [/tsconfig.json]
{
  "compilerOptions": {
    "target": "es6",
    "importsNotUsedAsValues": "error",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:33 AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'importsNotUsedAsValues' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '"ignoreDeprecations": "5.0"' to silence this error.
  Use 'verbatimModuleSyntax' instead.

[7m4[0m     "importsNotUsedAsValues": "error",
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:40 AM[0m] Found 1 error. Watching for file changes.



//// [/b.js] file written with same contents
//// [/a.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { B } from './b';
let A = class A {
    constructor(p) { }
};
A = __decorate([
    ((_) => { }),
    __metadata("design:paramtypes", [B])
], A);
export { A };




Program root files: [
  "/a.ts",
  "/b.ts",
  "/a/lib/lib.d.ts"
]
Program options: {
  "target": 2,
  "importsNotUsedAsValues": 2,
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
  "watch": true,
  "configFilePath": "/tsconfig.json"
}
Program structureReused: Completely
Program files::
/b.ts
/a.ts
/a/lib/lib.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
