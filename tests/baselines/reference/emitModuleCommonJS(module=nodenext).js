//// [tests/cases/conformance/externalModules/rewriteRelativeImportExtensions/emitModuleCommonJS.ts] ////

//// [a.js]
{
  require("" + "./foo.ts");
  import("" + "./foo.ts");
}

//// [b.ts]
{
  import("" + "./foo.ts");
}


//// [a.js]
"use strict";
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && path[0] === "." && (path[1] === "/" || path[1] === "." && path[2] === "/")) {
        if (path.substring(path.length - 4).toLowerCase() === ".tsx") {
            return path.substring(0, path.length - 4) + (preserveJsx ? ".jsx" : ".js");
        }
        var extMatch = path.match(/\.[cm]?ts$/i);
        if (extMatch) {
            var ext = extMatch[0].toLowerCase();
            var dot = path.lastIndexOf(".", path.length - (ext.length + 1));
            if (dot < 0 || !(path.substring(dot - 2, dot).toLowerCase() === ".d" || path.substring(dot, dot + 2).toLowerCase() === ".d")) {
                return path.substring(0, path.length - ext.length) + (ext === ".mts" ? ".mjs" : ext === ".cts" ? ".cjs" : ".js");
            }
        }
    }
    return path;
};
{
    require(__rewriteRelativeImportExtension("" + "./foo.ts"));
    import(__rewriteRelativeImportExtension("" + "./foo.ts"));
}
//// [b.js]
"use strict";
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && path[0] === "." && (path[1] === "/" || path[1] === "." && path[2] === "/")) {
        if (path.substring(path.length - 4).toLowerCase() === ".tsx") {
            return path.substring(0, path.length - 4) + (preserveJsx ? ".jsx" : ".js");
        }
        var extMatch = path.match(/\.[cm]?ts$/i);
        if (extMatch) {
            var ext = extMatch[0].toLowerCase();
            var dot = path.lastIndexOf(".", path.length - (ext.length + 1));
            if (dot < 0 || !(path.substring(dot - 2, dot).toLowerCase() === ".d" || path.substring(dot, dot + 2).toLowerCase() === ".d")) {
                return path.substring(0, path.length - ext.length) + (ext === ".mts" ? ".mjs" : ext === ".cts" ? ".cjs" : ".js");
            }
        }
    }
    return path;
};
Object.defineProperty(exports, "__esModule", { value: true });
{
    import(__rewriteRelativeImportExtension("" + "./foo.ts"));
}
