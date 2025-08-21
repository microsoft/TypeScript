currentDirectory::D:/Work/pkg1
useCaseSensitiveFileNames::false
Input::
//// [D:/Work/pkg1/package.json] *new* 
{
    "name": "ts-specifier-bug",
    "version": "1.0.0",
    "main": "index.js"
}
//// [D:/Work/pkg1/src/main.ts] *new* 
               import { PartialType } from './utils';

               class Common {}

               export class Sub extends PartialType(Common) {
                   id: string;
               }
//// [D:/Work/pkg1/src/utils/index.ts] *new* 
               import { MyType, MyReturnType } from './type-helpers';

               export function PartialType<T>(classRef: MyType<T>) {
                   abstract class PartialClassType {
                       constructor() {}
                   }

                   return PartialClassType as MyReturnType;
               }
//// [D:/Work/pkg1/src/utils/type-helpers.ts] *new* 
                export type MyReturnType = {	
                    new (...args: any[]): any;
                };

                export interface MyType<T = any> extends Function {
                    new (...args: any[]): T;
                }
//// [D:/Work/pkg1/tsconfig.json] *new* 
{
    "compilerOptions": {
        "declaration": true,
        "target": "es2017",
        "outDir": "./dist",
    },
    "include": ["src"],
}

tsgo -p D:\Work\pkg1 --explainFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96msrc/utils/index.ts[0m:[93m8[0m:[93m27[0m - [91merror[0m[90m TS2352: [0mConversion of type 'typeof PartialClassType' to type 'MyReturnType' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Cannot assign an abstract constructor type to a non-abstract constructor type.

[7m8[0m                    return PartialClassType as MyReturnType;
[7m [0m [91m                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

../../home/src/tslibs/TS/Lib/lib.es2017.full.d.ts
   Default library for target 'ES2017'
src/utils/type-helpers.ts
   Imported via './type-helpers' from file 'src/utils/index.ts'
   Matched by include pattern 'src' in 'tsconfig.json'
src/utils/index.ts
   Imported via './utils' from file 'src/main.ts'
   Matched by include pattern 'src' in 'tsconfig.json'
src/main.ts
   Matched by include pattern 'src' in 'tsconfig.json'

Found 1 error in src/utils/index.ts[90m:8[0m

//// [D:/Work/pkg1/dist/main.d.ts] *new* 
declare const Sub_base: import("./utils/type-helpers").MyReturnType;
export declare class Sub extends Sub_base {
    id: string;
}
export {};

//// [D:/Work/pkg1/dist/main.js] *new* 
import { PartialType } from './utils';
class Common {
}
export class Sub extends PartialType(Common) {
    id;
}

//// [D:/Work/pkg1/dist/utils/index.d.ts] *new* 
import { MyType, MyReturnType } from './type-helpers';
export declare function PartialType<T>(classRef: MyType<T>): MyReturnType;

//// [D:/Work/pkg1/dist/utils/index.js] *new* 
export function PartialType(classRef) {
    class PartialClassType {
        constructor() { }
    }
    return PartialClassType;
}

//// [D:/Work/pkg1/dist/utils/type-helpers.d.ts] *new* 
export type MyReturnType = {
    new (...args: any[]): any;
};
export interface MyType<T = any> extends Function {
    new (...args: any[]): T;
}

//// [D:/Work/pkg1/dist/utils/type-helpers.js] *new* 
export {};

//// [D:/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts] *Lib*
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

