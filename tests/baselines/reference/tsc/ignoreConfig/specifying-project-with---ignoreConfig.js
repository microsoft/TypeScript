currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/a.ts]
export const a = 10;

//// [/home/src/workspaces/project/src/b.ts]
export const b = 10;

//// [/home/src/workspaces/project/c.ts]
export const c = 10;

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

//// [/home/src/workspaces/project/tsconfig.json]
{
  "include": [
    "src"
  ]
}


/home/src/tslibs/TS/Lib/tsc.js -p . --ignoreConfig
Output::


//// [/home/src/workspaces/project/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;


//// [/home/src/workspaces/project/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;



exitCode:: ExitStatus.Success
