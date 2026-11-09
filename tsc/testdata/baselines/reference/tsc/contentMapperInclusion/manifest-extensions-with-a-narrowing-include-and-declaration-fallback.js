currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/ambient.d.ts] *new* 
interface Promise<T> {}
declare var Promise: { new <T>(): Promise<T> };
declare module "*.toml" { export const ambient: string; }
//// [/home/src/workspaces/project/ambient.toml] *new* 
not TypeScript
//// [/home/src/workspaces/project/blob.toml] *new* 
export const value = 1;
//// [/home/src/workspaces/project/declarationOnly.d.toml.ts] *new* 
export declare const declarationOnly: "declaration";
//// [/home/src/workspaces/project/index.ts] *new* 

				export { value } from "./blob.toml";
				export { other } from "./other.toml";
				export { packaged } from "./node_modules/pkg/blob.toml";
				export { ambient } from "./ambient.toml";
				export { declarationOnly } from "./declarationOnly.toml";
				export const load = (path: string) => import(path);
				
//// [/home/src/workspaces/project/node_modules/mapper/package.json] *new* 
{
				"name": "mapper", "version": "1.0.0",
				"typescript": { "contentMapper": { "exec": ["verbatim-mapper"], "extensions": [".toml"] } }
			}
//// [/home/src/workspaces/project/node_modules/pkg/blob.toml] *new* 
export const packaged = true;
//// [/home/src/workspaces/project/other.d.toml.ts] *new* 
export declare const other: "declaration";
//// [/home/src/workspaces/project/other.toml] *new* 
not TypeScript
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
				"compilerOptions": { "outDir": "./dist", "declaration": true, "module": "preserve", "allowArbitraryExtensions": true },
				"contentMappers": [{ "package": "mapper", "include": ["**/blob.toml"] }]
			}

tsc --runExternalCode --listFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mindex.ts[0m:[93m3[0m:[93m14[0m - [91merror[0m[90m TS2305: [0mModule '"*.toml"' has no exported member 'other'.

[7m3[0m     export { other } from "./other.toml";
[7m [0m [91m             ~~~~~[0m

[96mindex.ts[0m:[93m3[0m:[93m27[0m - [91merror[0m[90m TS18140: [0mFile '/home/src/workspaces/project/other.toml' has a registered content mapper extension but does not match any content mapper's 'include'.

[7m3[0m     export { other } from "./other.toml";
[7m [0m [91m                          ~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m5[0m:[93m29[0m - [91merror[0m[90m TS18140: [0mFile '/home/src/workspaces/project/ambient.toml' has a registered content mapper extension but does not match any content mapper's 'include'.

[7m5[0m     export { ambient } from "./ambient.toml";
[7m [0m [91m                            ~~~~~~~~~~~~~~~~[0m

/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
/home/src/workspaces/project/ambient.d.ts
/home/src/workspaces/project/blob.toml
/home/src/workspaces/project/declarationOnly.d.toml.ts
/home/src/workspaces/project/node_modules/pkg/blob.toml
/home/src/workspaces/project/index.ts
/home/src/workspaces/project/other.d.toml.ts

Found 3 errors in the same file, starting at: index.ts[90m:3[0m

//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/dist/blob.d.toml.ts] *new* 
export declare const value = 1;

//// [/home/src/workspaces/project/dist/index.d.ts] *new* 
export { value } from "./blob.toml";
export { other } from "./other.toml";
export { packaged } from "./node_modules/pkg/blob.toml";
export { ambient } from "./ambient.toml";
export { declarationOnly } from "./declarationOnly.toml";
export declare const load: (path: string) => Promise<any>;

//// [/home/src/workspaces/project/dist/index.js] *new* 
export { value } from "./blob.toml";
export { other } from "./other.toml";
export { packaged } from "./node_modules/pkg/blob.toml";
export { ambient } from "./ambient.toml";
export { declarationOnly } from "./declarationOnly.toml";
export const load = (path) => import(path);


