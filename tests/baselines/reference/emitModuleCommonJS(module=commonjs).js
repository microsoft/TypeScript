//// [tests/cases/conformance/externalModules/rewriteRelativeImportExtensions/emitModuleCommonJS.ts] ////

//// [a.js]
{
  require("" + "./foo.ts");
  import("" + "./foo.ts");
  require("./foo.ts");
  import("./foo.ts");
}

//// [b.ts]
{
  import("" + "./foo.ts");
  import("./foo.ts");
}


//// [a.js]
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
{
    require(__rewriteRelativeImportExtension("" + "./foo.ts"));
    Promise.resolve(`${__rewriteRelativeImportExtension("" + "./foo.ts")}`).then(s => require(s));
    require("./foo.js");
    Promise.resolve().then(() => require("./foo.js"));
}
//// [b.js]
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
{
    Promise.resolve(`${__rewriteRelativeImportExtension("" + "./foo.ts")}`).then(s => require(s));
    Promise.resolve().then(() => require("./foo.js"));
}
