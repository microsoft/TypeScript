/a/lib/tsc.js -b -w -verbose
//// [/user/username/projects/demo/core/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/core",
    "rootDir": "."
  }
}

//// [/user/username/projects/demo/core/utilities.ts]
import * as A from '../animals';

export function makeRandomName() {
    return "Bob!?! ";
}

export function lastElementOf<T>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return arr[arr.length - 1];
}



//// [/user/username/projects/demo/animals/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/animals",
    "rootDir": ".",
  },
  "references": [
    { "path": "../core" }
  ]
}


//// [/user/username/projects/demo/animals/animal.ts]
export type Size = "small" | "medium" | "large";
export default interface Animal {
    size: Size;
}


//// [/user/username/projects/demo/animals/dog.ts]
import Animal from '.';
import { makeRandomName } from '../core/utilities';

export interface Dog extends Animal {
    woof(): void;
    name: string;
}

export function createDog(): Dog {
    return ({
        size: "medium",
        woof: function(this: Dog) {
            console.log(`${this.name} says "Woof"!`);
        },
        name: makeRandomName()
    });
}



//// [/user/username/projects/demo/animals/index.ts]
import Animal from './animal';

export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };


//// [/user/username/projects/demo/zoo/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/zoo",
    "rootDir": "."
  },
  "references": [
    {
      "path": "../animals"
    }
  ]
}

//// [/user/username/projects/demo/zoo/zoo.ts]
import { Dog, createDog } from '../animals/index';

export function createZoo(): Array<Dog> {
    return [
        createDog()
    ];
}



//// [/user/username/projects/demo/tsconfig.json]
{
  "files": [],
  "references": [
    {
      "path": "./core"
    },
    {
      "path": "./animals"
    },
    {
      "path": "./zoo"
    }
  ]
}

//// [/user/username/projects/demo/tsconfig-base.json]
{
    "compilerOptions": {
        "declaration": true,
        "target": "es5",
        "module": "commonjs",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "composite": true
    }
}

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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


Output::
>> Screen clear
[[90m12:00:46 AM[0m] Starting compilation in watch mode...


[[90m12:00:47 AM[0m] Projects in this build: 
    * core/tsconfig.json
    * animals/tsconfig.json
    * zoo/tsconfig.json
    * tsconfig.json


[[90m12:00:48 AM[0m] Project 'core/tsconfig.json' is out of date because output file 'lib/core/utilities.js' does not exist


[[90m12:00:49 AM[0m] Building project '/user/username/projects/demo/core/tsconfig.json'...


[96manimals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/animal.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m


[96manimals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/animal.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m


[96manimals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/dog.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m


[96manimals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/dog.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m


[96mcore/utilities.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS6133: [0m'A' is declared but its value is never read.

[7m1[0m import * as A from '../animals';
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


[96mcore/utilities.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/index.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.

[7m1[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m


[96mcore/utilities.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/index.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m


[[90m12:00:50 AM[0m] Project 'animals/tsconfig.json' can't be built because its dependency 'core' has errors


[[90m12:00:51 AM[0m] Skipping build of project '/user/username/projects/demo/animals/tsconfig.json' because its dependency '/user/username/projects/demo/core' has errors


[[90m12:00:52 AM[0m] Project 'zoo/tsconfig.json' can't be built because its dependency 'animals' was not built


[[90m12:00:53 AM[0m] Skipping build of project '/user/username/projects/demo/zoo/tsconfig.json' because its dependency '/user/username/projects/demo/animals' was not built


[[90m12:00:54 AM[0m] Found 7 errors. Watching for file changes.



Program root files: ["/user/username/projects/demo/core/utilities.ts"]
Program options: {"declaration":true,"target":1,"module":1,"strict":true,"noUnusedLocals":true,"noUnusedParameters":true,"noImplicitReturns":true,"noFallthroughCasesInSwitch":true,"composite":true,"outDir":"/user/username/projects/demo/lib/core","rootDir":"/user/username/projects/demo/core","watch":true,"configFilePath":"/user/username/projects/demo/core/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/demo/animals/animal.ts
/user/username/projects/demo/animals/dog.ts
/user/username/projects/demo/animals/index.ts
/user/username/projects/demo/core/utilities.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/demo/animals/animal.ts
/user/username/projects/demo/animals/dog.ts
/user/username/projects/demo/animals/index.ts
/user/username/projects/demo/core/utilities.ts

WatchedFiles::
/user/username/projects/demo/core/tsconfig.json:
  {"fileName":"/user/username/projects/demo/core/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/core/utilities.ts:
  {"fileName":"/user/username/projects/demo/core/utilities.ts","pollingInterval":250}
/user/username/projects/demo/animals/tsconfig.json:
  {"fileName":"/user/username/projects/demo/animals/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/animals/animal.ts:
  {"fileName":"/user/username/projects/demo/animals/animal.ts","pollingInterval":250}
/user/username/projects/demo/animals/dog.ts:
  {"fileName":"/user/username/projects/demo/animals/dog.ts","pollingInterval":250}
/user/username/projects/demo/animals/index.ts:
  {"fileName":"/user/username/projects/demo/animals/index.ts","pollingInterval":250}
/user/username/projects/demo/zoo/tsconfig.json:
  {"fileName":"/user/username/projects/demo/zoo/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/zoo/zoo.ts:
  {"fileName":"/user/username/projects/demo/zoo/zoo.ts","pollingInterval":250}
/user/username/projects/demo/tsconfig.json:
  {"fileName":"/user/username/projects/demo/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/demo/core:
  {"directoryName":"/user/username/projects/demo/core","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/animals:
  {"directoryName":"/user/username/projects/demo/animals","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/zoo:
  {"directoryName":"/user/username/projects/demo/zoo","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Prepend a line

//// [/user/username/projects/demo/core/utilities.ts]

import * as A from '../animals';

export function makeRandomName() {
    return "Bob!?! ";
}

export function lastElementOf<T>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return arr[arr.length - 1];
}




Output::
>> Screen clear
[[90m12:00:58 AM[0m] File change detected. Starting incremental compilation...


[[90m12:00:59 AM[0m] Project 'core/tsconfig.json' is out of date because output file 'lib/core/utilities.js' does not exist


[[90m12:01:00 AM[0m] Building project '/user/username/projects/demo/core/tsconfig.json'...


[96manimals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/animal.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m


[96manimals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/animal.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m


[96manimals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/dog.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m


[96manimals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/dog.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m


[96mcore/utilities.ts[0m:[93m2[0m:[93m1[0m - [91merror[0m[90m TS6133: [0m'A' is declared but its value is never read.

[7m2[0m import * as A from '../animals';
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


[96mcore/utilities.ts[0m:[93m2[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/index.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.

[7m2[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m


[96mcore/utilities.ts[0m:[93m2[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/index.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m2[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m


[[90m12:01:01 AM[0m] Found 7 errors. Watching for file changes.



Program root files: ["/user/username/projects/demo/core/utilities.ts"]
Program options: {"declaration":true,"target":1,"module":1,"strict":true,"noUnusedLocals":true,"noUnusedParameters":true,"noImplicitReturns":true,"noFallthroughCasesInSwitch":true,"composite":true,"outDir":"/user/username/projects/demo/lib/core","rootDir":"/user/username/projects/demo/core","watch":true,"configFilePath":"/user/username/projects/demo/core/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/demo/animals/animal.ts
/user/username/projects/demo/animals/dog.ts
/user/username/projects/demo/animals/index.ts
/user/username/projects/demo/core/utilities.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/demo/core/utilities.ts

WatchedFiles::
/user/username/projects/demo/core/tsconfig.json:
  {"fileName":"/user/username/projects/demo/core/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/core/utilities.ts:
  {"fileName":"/user/username/projects/demo/core/utilities.ts","pollingInterval":250}
/user/username/projects/demo/animals/tsconfig.json:
  {"fileName":"/user/username/projects/demo/animals/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/animals/animal.ts:
  {"fileName":"/user/username/projects/demo/animals/animal.ts","pollingInterval":250}
/user/username/projects/demo/animals/dog.ts:
  {"fileName":"/user/username/projects/demo/animals/dog.ts","pollingInterval":250}
/user/username/projects/demo/animals/index.ts:
  {"fileName":"/user/username/projects/demo/animals/index.ts","pollingInterval":250}
/user/username/projects/demo/zoo/tsconfig.json:
  {"fileName":"/user/username/projects/demo/zoo/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/zoo/zoo.ts:
  {"fileName":"/user/username/projects/demo/zoo/zoo.ts","pollingInterval":250}
/user/username/projects/demo/tsconfig.json:
  {"fileName":"/user/username/projects/demo/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/demo/core:
  {"directoryName":"/user/username/projects/demo/core","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/animals:
  {"directoryName":"/user/username/projects/demo/animals","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/zoo:
  {"directoryName":"/user/username/projects/demo/zoo","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
