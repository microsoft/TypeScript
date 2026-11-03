//// [tests/cases/compiler/disableDynamicImportExtensionRewriting.ts] ////

//// [globals.d.ts]
declare function require(specifier: string): any;

//// [imports.ts]
import { path } from "./target.ts";
export { path } from "./target.ts";

import("./target.ts");
import(`./target.ts`);
import(path);
import(`./${path}`);
import(import("./target.ts") as any);
require(path);

//// [requires.js]
export {};
require("./target.ts");
require(`./target.ts`);
require("./" + "target.ts");
require(require("./target.ts").path);
import("./target.ts");
import(require("./target.ts").path);

//// [target.ts]
export const path = "./target.ts";


//// [target.js]
export const path = "./target.ts";
//// [imports.js]
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
import { path } from "./target.js";
export { path } from "./target.js";
import("./target.js");
import(`./target.ts`);
import(__rewriteRelativeImportExtension(path));
import(__rewriteRelativeImportExtension(`./${path}`));
import(__rewriteRelativeImportExtension(import("./target.ts")));
require(path);
//// [requires.js]
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
export {};
require("./target.js");
require(`./target.ts`);
require(__rewriteRelativeImportExtension("./" + "target.ts"));
require(__rewriteRelativeImportExtension(require("./target.ts").path));
import("./target.js");
import(__rewriteRelativeImportExtension(require("./target.ts").path));
