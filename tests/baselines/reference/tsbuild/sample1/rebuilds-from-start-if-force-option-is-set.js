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

//// [/src/core/anotherModule.d.ts]
export declare const World = "hello";
//# sourceMappingURL=anotherModule.d.ts.map

//// [/src/core/anotherModule.d.ts.map]


//// [/src/core/anotherModule.js]


//// [/src/core/anotherModule.ts]
export const World = "hello";


//// [/src/core/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
//# sourceMappingURL=index.d.ts.map

//// [/src/core/index.d.ts.map]


//// [/src/core/index.js]


//// [/src/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }


//// [/src/core/some_decl.d.ts]
declare const dts: any;


//// [/src/core/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "skipDefaultLibCheck": true
    }
}

//// [/src/core/tsconfig.tsbuildinfo]


//// [/src/core/tsconfig.tsbuildinfo.readable.baseline.txt]


//// [/src/logic/index.d.ts]
export declare function getSecondsInDay(): number;
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;


//// [/src/logic/index.js]


//// [/src/logic/index.js.map]


//// [/src/logic/index.ts]
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;


//// [/src/logic/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "sourceMap": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    },
    "references": [
        { "path": "../core" }
    ]
}


//// [/src/logic/tsconfig.tsbuildinfo]


//// [/src/logic/tsconfig.tsbuildinfo.readable.baseline.txt]


//// [/src/tests/index.d.ts]
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;


//// [/src/tests/index.js]


//// [/src/tests/index.ts]
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;


//// [/src/tests/tsconfig.json]
{
    "references": [
        { "path": "../core" },
        { "path": "../logic" }
    ],
    "files": ["index.ts"],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    }
}

//// [/src/tests/tsconfig.tsbuildinfo]


//// [/src/tests/tsconfig.tsbuildinfo.readable.baseline.txt]


//// [/src/ui/index.ts]


//// [/src/ui/tsconfig.json]




Output::
/lib/tsc --b /src/tests --verbose --force
[[90m12:00:23 AM[0m] Projects in this build: 
    * src/core/tsconfig.json
    * src/logic/tsconfig.json
    * src/tests/tsconfig.json

[[90m12:00:24 AM[0m] Project 'src/core/tsconfig.json' is being forcibly rebuilt

[[90m12:00:25 AM[0m] Building project '/src/core/tsconfig.json'...

[[90m12:00:34 AM[0m] Project 'src/logic/tsconfig.json' is being forcibly rebuilt

[[90m12:00:35 AM[0m] Building project '/src/logic/tsconfig.json'...

[[90m12:00:41 AM[0m] Project 'src/tests/tsconfig.json' is being forcibly rebuilt

[[90m12:00:42 AM[0m] Building project '/src/tests/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/core/anotherModule.d.ts] file written with same contents
//// [/src/core/anotherModule.d.ts.map] file written with same contents
//// [/src/core/anotherModule.js] file written with same contents
//// [/src/core/index.d.ts] file written with same contents
//// [/src/core/index.d.ts.map] file written with same contents
//// [/src/core/index.js] file written with same contents
//// [/src/core/tsconfig.tsbuildinfo] file written with same contents
//// [/src/core/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/src/logic/index.d.ts] file written with same contents
//// [/src/logic/index.js] file written with same contents
//// [/src/logic/index.js.map] file written with same contents
//// [/src/logic/tsconfig.tsbuildinfo] file written with same contents
//// [/src/logic/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
//// [/src/tests/index.d.ts] file written with same contents
//// [/src/tests/index.js] file written with same contents
//// [/src/tests/tsconfig.tsbuildinfo] file written with same contents
//// [/src/tests/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents
