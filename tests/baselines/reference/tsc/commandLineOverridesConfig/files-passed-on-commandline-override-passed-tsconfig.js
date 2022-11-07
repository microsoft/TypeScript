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

//// [/src/project/src/file.ts]
export const y: string = undefined;

//// [/src/project/src/main.ts]
export const x = 10;

//// [/src/project/tsconfig.new.json]
{
    "compilerOptions": {
        "strict": true,
    },
    "include": [
        "src/**/*.ts"
    ]
}



Output::
/lib/tsc -p tsconfig.new.json src/main.ts
exitCode:: ExitStatus.Success


//// [/src/project/src/main.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


