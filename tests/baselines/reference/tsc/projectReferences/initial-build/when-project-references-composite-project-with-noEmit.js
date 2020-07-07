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

//// [/src/project/index.ts]
import { x } from "../utils";

//// [/src/project/tsconfig.json]
{"references":[{"path":"../utils"}]}

//// [/src/utils/index.ts]


//// [/src/utils/tsconfig.json]
{"compilerOptions":{"composite":true,"noEmit":true}}



Output::
/lib/tsc --p src/project
[96msrc/project/tsconfig.json[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS6310: [0mReferenced project '/src/utils' may not disable emit.

[7m1[0m {"references":[{"path":"../utils"}]}
[7m [0m [91m               ~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/index.js]
"use strict";
exports.__esModule = true;


