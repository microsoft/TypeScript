//// [tests/cases/compiler/contentMapperOutputExtensionsOverlap.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [Widget.z]
const __VERSION = "1.0.0";
export const short = 1;

//// [Widget.y.z]
const __VERSION = "1.0.0";
export const long = 1;

//// [Widget.identity.y.z]
const __VERSION = "1.0.0";
export const identity = 1;

//// [Widget.unmapped.y.z]
const __VERSION = "1.0.0";
export const unmapped = 1;

//// [main.ts]
export { short } from "./Widget.z";
export { long } from "./Widget.y.z";
export { identity } from "./Widget.identity.y.z";
export { unmapped } from "./Widget.unmapped.y.z";
export function literal() { return import("./Widget.y.z"); }
export function dynamic(path: string) { return import(path); }
export const inferred = import("./Widget.y.z");


//// [main.js]
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
export { short } from "./Widget.js";
export { long } from "./Widget.mjs";
export { identity } from "./Widget.identity.y.z";
export { unmapped } from "./Widget.unmapped.y.z";
export function literal() { return import("./Widget.mjs"); }
export function dynamic(path) { return import(__rewriteRelativeImportExtension(path, false, { ".identity.y.z": ".identity.y.z", ".unmapped.y.z": ".unmapped.y.z", ".y.z": ".mjs", ".z": ".js" })); }
export const inferred = import("./Widget.mjs");


//// [Widget.d.ts]
export declare const short = 1;
//// [Widget.d.mts]
export declare const long = 1;
//// [Widget.d.identity.y.z.ts]
export declare const identity = 1;
//// [Widget.d.unmapped.y.z.ts]
export declare const unmapped = 1;
//// [main.d.ts]
export { short } from "./Widget.js";
export { long } from "./Widget.mjs";
export { identity } from "./Widget.identity.y.z";
export { unmapped } from "./Widget.unmapped.y.z";
export declare function literal(): Promise<typeof import("./Widget.mjs")>;
export declare function dynamic(path: string): Promise<any>;
export declare const inferred: Promise<typeof import("./Widget.mjs")>;
