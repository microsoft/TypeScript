currentDirectory::/home/src/projects/myproject
useCaseSensitiveFileNames::true
Input::
//// [/home/src/projects/configs/first/tsconfig.json] *new* 
{
    "extends": "../second/tsconfig.json",
    "include": ["${configDir}/src"],
    "compilerOptions": {
        "typeRoots": ["root1", "${configDir}/root2", "root3"],
        "types": [],
    }
}
//// [/home/src/projects/configs/second/tsconfig.json] *new* 
{
    "files": ["${configDir}/main.ts"],
    "compilerOptions": {
        "declarationDir": "${configDir}/decls",
        "paths": {
            "@myscope/*": ["${configDir}/types/*"],
            "other/*": ["other/*"],
        },
        "baseUrl": "${configDir}",
    },
    "watchOptions": {
        "excludeFiles": ["${configDir}/main.ts"],
    },
}
//// [/home/src/projects/myproject/main.ts] *new* 
// some comment
export const y = 10;
import { x } from "@myscope/sometype";
//// [/home/src/projects/myproject/root2/other/sometype2/index.d.ts] *new* 
export const k = 10;
//// [/home/src/projects/myproject/src/secondary.ts] *new* 
// some comment
export const z = 10;
import { k } from "other/sometype2";
//// [/home/src/projects/myproject/tsconfig.json] *new* 
{
    "extends": "../configs/first/tsconfig.json",
    "compilerOptions": {
        "declaration": true,
        "outDir": "outDir",
        "traceResolution": true,
    },
}
//// [/home/src/projects/myproject/types/sometype.ts] *new* 
// some comment
export const x = 10;

tsgo --explainFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5090: [0mNon-relative paths are not allowed. Did you forget a leading './'?

[7m3[0m     "compilerOptions": {
[7m [0m [91m    ~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5102: [0mOption 'baseUrl' has been removed. Please remove it from your configuration.
  Use '"paths": {"*": "./*"}' instead.

[7m3[0m     "compilerOptions": {
[7m [0m [91m    ~~~~~~~~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: tsconfig.json[90m:3[0m

//// [/home/src/projects/myproject/decls/main.d.ts] *new* 
// some comment
export declare const y = 10;

//// [/home/src/projects/myproject/decls/src/secondary.d.ts] *new* 
// some comment
export declare const z = 10;

//// [/home/src/projects/myproject/decls/types/sometype.d.ts] *new* 
// some comment
export declare const x = 10;

//// [/home/src/projects/myproject/outDir/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
// some comment
exports.y = 10;

//// [/home/src/projects/myproject/outDir/src/secondary.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = void 0;
// some comment
exports.z = 10;

//// [/home/src/projects/myproject/outDir/types/sometype.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// some comment
exports.x = 10;

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

