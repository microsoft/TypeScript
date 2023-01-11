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
{"compilerOptions":{"target":"es6","importsNotUsedAsValues":"error"}}


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m1[0m:[93m36[0m - [91merror[0m[90m TS5101: [0mFlag 'importsNotUsedAsValues' is deprecated and will stop functioning in TypeScript 5.5. Specify 'ignoreDeprecations: "5.0"' to silence this error.
  Use 'verbatimModuleSyntax' instead.

[7m1[0m {"compilerOptions":{"target":"es6","importsNotUsedAsValues":"error"}}
[7m [0m [91m                                   ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:20 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a.ts","/b.ts","/a/lib/lib.d.ts"]
Program options: {"target":2,"importsNotUsedAsValues":2,"watch":true,"configFilePath":"/tsconfig.json"}
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

PolledWatches::

FsWatches::
/tsconfig.json:
  {}
/a.ts:
  {}
/b.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/:
  {}

exitCode:: ExitStatus.undefined

//// [/b.js]
export class B {
}


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



Change:: Enable experimentalDecorators

Input::
//// [/tsconfig.json]
{"compilerOptions":{"target":"es6","importsNotUsedAsValues":"error","experimentalDecorators":true}}


Output::
>> Screen clear
[[90m12:00:23 AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m1[0m:[93m36[0m - [91merror[0m[90m TS5101: [0mFlag 'importsNotUsedAsValues' is deprecated and will stop functioning in TypeScript 5.5. Specify 'ignoreDeprecations: "5.0"' to silence this error.
  Use 'verbatimModuleSyntax' instead.

[7m1[0m {"compilerOptions":{"target":"es6","importsNotUsedAsValues":"error","experimentalDecorators":true}}
[7m [0m [91m                                   ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:24 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a.ts","/b.ts","/a/lib/lib.d.ts"]
Program options: {"target":2,"importsNotUsedAsValues":2,"experimentalDecorators":true,"watch":true,"configFilePath":"/tsconfig.json"}
Program structureReused: Completely
Program files::
/b.ts
/a.ts
/a/lib/lib.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

PolledWatches::

FsWatches::
/tsconfig.json:
  {}
/a.ts:
  {}
/b.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/:
  {}

exitCode:: ExitStatus.undefined


Change:: Enable emitDecoratorMetadata

Input::
//// [/tsconfig.json]
{"compilerOptions":{"target":"es6","importsNotUsedAsValues":"error","experimentalDecorators":true,"emitDecoratorMetadata":true}}


Output::
>> Screen clear
[[90m12:00:27 AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m1[0m:[93m36[0m - [91merror[0m[90m TS5101: [0mFlag 'importsNotUsedAsValues' is deprecated and will stop functioning in TypeScript 5.5. Specify 'ignoreDeprecations: "5.0"' to silence this error.
  Use 'verbatimModuleSyntax' instead.

[7m1[0m {"compilerOptions":{"target":"es6","importsNotUsedAsValues":"error","experimentalDecorators":true,"emitDecoratorMetadata":true}}
[7m [0m [91m                                   ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:34 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a.ts","/b.ts","/a/lib/lib.d.ts"]
Program options: {"target":2,"importsNotUsedAsValues":2,"experimentalDecorators":true,"emitDecoratorMetadata":true,"watch":true,"configFilePath":"/tsconfig.json"}
Program structureReused: Completely
Program files::
/b.ts
/a.ts
/a/lib/lib.d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

PolledWatches::

FsWatches::
/tsconfig.json:
  {}
/a.ts:
  {}
/b.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/:
  {}

exitCode:: ExitStatus.undefined

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


