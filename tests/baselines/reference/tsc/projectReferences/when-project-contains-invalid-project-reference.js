currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/main.ts]
export const x = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "amd",
    "outFile": "theApp.js"
  },
  "references": [
    {
      "path": "../Util/Dates"
    }
  ]
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


/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "theApp.js"
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m7[0m:[93m5[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/Util/Dates' not found.

[7m7[0m     {
[7m [0m [91m    ~[0m
[7m8[0m       "path": "../Util/Dates"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m9[0m     }
[7m [0m [91m~~~~~[0m


Found 3 errors in the same file, starting at: tsconfig.json[90m:3[0m



//// [/home/src/workspaces/project/theApp.js]
define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});



exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
