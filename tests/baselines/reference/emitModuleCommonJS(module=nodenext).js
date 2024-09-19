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
        if (path.substring(path.length - 4) === ".tsx") {
            return path.substring(0, path.length - 4) + (preserveJsx ? ".jsx" : ".js");
        }
        if (path.substring(path.length - 3) === ".ts") {
            var dot = path.lastIndexOf(".", path.length - 4);
            if (dot >= 0 && (path.substring(dot - 2, dot) === ".d" || path.substring(dot, dot + 2) === ".d")) {
                return path;
            }
        }
        return path.replace(/(?<!\.d)\.[cm]ts$/, function (ext) { return ext === ".mts" ? ".mjs" : ".cjs"; });
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
        if (path.substring(path.length - 4) === ".tsx") {
            return path.substring(0, path.length - 4) + (preserveJsx ? ".jsx" : ".js");
        }
        if (path.substring(path.length - 3) === ".ts") {
            var dot = path.lastIndexOf(".", path.length - 4);
            if (dot >= 0 && (path.substring(dot - 2, dot) === ".d" || path.substring(dot, dot + 2) === ".d")) {
                return path;
            }
        }
        return path.replace(/(?<!\.d)\.[cm]ts$/, function (ext) { return ext === ".mts" ? ".mjs" : ".cjs"; });
    }
    return path;
};
Object.defineProperty(exports, "__esModule", { value: true });
{
    import(__rewriteRelativeImportExtension("" + "./foo.ts"));
}
