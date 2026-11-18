//// [tests/cases/compiler/contentMapperFilteredDynamicImport.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [data.toml]
const __VERSION = "1.0.0";
export const data = 1;

//// [main.ts]
declare const path: string;
export const dynamic = import(path);
export const template = import(`./${path}.toml`);
export const parenthesized = import(("./data.toml"));
export const literal = import("./data.toml");
export const literalTemplate = import(`./data.toml`);
declare function require(path: string): unknown;
export const tsRequire = require(path);

//// [require.js]
/** @type {string} */
const path = "./data.toml";
export const dynamic = import(path);
export const required = require(path);
export const template = require(`./${path}.toml`);
export const literal = require("./data.toml");
export const literalTemplate = require(`./data.toml`);

//// [globals.d.ts]
declare function require(path: string): unknown;


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
export const dynamic = import(__rewriteRelativeImportExtension(path));
export const template = import(__rewriteRelativeImportExtension(`./${path}.toml`));
export const parenthesized = import(__rewriteRelativeImportExtension(("./data.toml")));
export const literal = import("./data.js");
export const literalTemplate = import(`./data.js`);
export const tsRequire = require(path);
//// [require.js]
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
/** @type {string} */
const path = "./data.toml";
export const dynamic = import(__rewriteRelativeImportExtension(path));
export const required = require(__rewriteRelativeImportExtension(path));
export const template = require(__rewriteRelativeImportExtension(`./${path}.toml`));
export const literal = require("./data.js");
export const literalTemplate = require(`./data.js`);
