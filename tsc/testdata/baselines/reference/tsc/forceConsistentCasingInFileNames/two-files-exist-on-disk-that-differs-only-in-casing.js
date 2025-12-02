currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/D.ts] *new* 
export const x = 10;
//// [/home/src/workspaces/project/c.ts] *new* 
import {x} from "./D"
//// [/home/src/workspaces/project/d.ts] *new* 
export const y = 20;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "files": ["c.ts", "d.ts"]
}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mc.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1261: [0mAlready included file name '/home/src/workspaces/project/D.ts' differs from file name '/home/src/workspaces/project/d.ts' only in casing.
  The file is in the program because:
    Imported via "./D" from file '/home/src/workspaces/project/c.ts'
    Part of 'files' list in tsconfig.json

[7m1[0m import {x} from "./D"
[7m [0m [91m                ~~~~~[0m

  [96mtsconfig.json[0m:[93m2[0m:[93m23[0m - File is matched by 'files' list specified here.
    [7m2[0m     "files": ["c.ts", "d.ts"]
    [7m [0m [96m                      ~~~~~~[0m


Found 1 error in c.ts[90m:1[0m

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
//// [/home/src/workspaces/project/D.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;

//// [/home/src/workspaces/project/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/project/d.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 20;


