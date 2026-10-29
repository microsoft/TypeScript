currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/ambient.d.ts] *new* 
declare module "*.toml" { export const ambient: string; }
//// [/home/src/workspaces/project/ambient.toml] *new* 
not TypeScript
//// [/home/src/workspaces/project/blob.toml] *new* 
export const value = 1;
//// [/home/src/workspaces/project/index.ts] *new* 

				export { value } from "./blob.toml";
				export { other } from "./other.toml";
				export { packaged } from "./node_modules/pkg/blob.toml";
				export { ambient } from "./ambient.toml";
				
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

tsgo --runExternalCode --listFiles
ExitStatus:: Success
Output::
/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
/home/src/workspaces/project/ambient.d.ts
/home/src/workspaces/project/blob.toml
/home/src/workspaces/project/other.d.toml.ts
/home/src/workspaces/project/node_modules/pkg/blob.toml
/home/src/workspaces/project/index.ts
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

//// [/home/src/workspaces/project/dist/index.js] *new* 
export { value } from "./blob.toml";
export { other } from "./other.toml";
export { packaged } from "./node_modules/pkg/blob.toml";
export { ambient } from "./ambient.toml";


