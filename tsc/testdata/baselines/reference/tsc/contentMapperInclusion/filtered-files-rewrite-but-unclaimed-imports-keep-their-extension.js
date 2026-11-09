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
//// [/home/src/workspaces/project/index.ts] *new* 

				export { value } from "./blob.toml";
				export { other } from "./other.toml";
				export { packaged } from "./node_modules/pkg/blob.toml";
				export { ambient } from "./ambient.toml";
				export const load = (path: string) => import(path);
				
//// [/home/src/workspaces/project/node_modules/mapper/package.json] *new* 
{
				"name": "mapper", "version": "1.0.0",
				"typescript": { "contentMapper": { "exec": ["verbatim-mapper"], "extensions": [".toml"], "outputExtensions": {".toml": ".js"} } }
			}
//// [/home/src/workspaces/project/node_modules/pkg/blob.toml] *new* 
export const packaged = true;
//// [/home/src/workspaces/project/other.d.toml.ts] *new* 
export declare const other: "declaration";
//// [/home/src/workspaces/project/other.toml] *new* 
not TypeScript
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
				"compilerOptions": { "outDir": "./dist", "declaration": true, "rewriteRelativeImportExtensions": true, "module": "preserve", "allowArbitraryExtensions": true },
				"contentMappers": [{ "package": "mapper", "include": ["**/blob.toml"] }]
			}

tsc --runExternalCode --listFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mindex.ts[0m:[93m6[0m:[93m43[0m - [91merror[0m[90m TS18133: [0mNon-literal import paths cannot be rewritten when a content mapper uses both 'include' and an 'outputExtensions' mapping. Set 'disableDynamicImportExtensionRewriting' to disable rewriting of non-literal import paths.

[7m6[0m     export const load = (path: string) => import(path);
[7m [0m [91m                                          ~~~~~~~~~~~~[0m

/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
/home/src/workspaces/project/ambient.d.ts
/home/src/workspaces/project/blob.toml
/home/src/workspaces/project/other.d.toml.ts
/home/src/workspaces/project/node_modules/pkg/blob.toml
/home/src/workspaces/project/index.ts

Found 1 error in index.ts[90m:6[0m

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
//// [/home/src/workspaces/project/dist/blob.d.ts] *new* 
export declare const value = 1;

//// [/home/src/workspaces/project/dist/index.d.ts] *new* 
export { value } from "./blob.js";
export { other } from "./other.toml";
export { packaged } from "./node_modules/pkg/blob.js";
export { ambient } from "./ambient.toml";
export declare const load: (path: string) => Promise<any>;

//// [/home/src/workspaces/project/dist/index.js] *new* 
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx, extraExtensions, ignoreCase) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        if (extraExtensions) {
            for (var extension in extraExtensions) {
                var suffix = path.slice(-extension.length);
                if (suffix === extension || ignoreCase && suffix.toLowerCase() === extension.toLowerCase()) {
                    var output = extraExtensions[extension];
                    return output === extension ? path : path.slice(0, -extension.length) + output;
                }
            }
        }
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
export { value } from "./blob.js";
export { other } from "./other.toml";
export { packaged } from "./node_modules/pkg/blob.js";
export { ambient } from "./ambient.toml";
export const load = (path) => import(__rewriteRelativeImportExtension(path));


