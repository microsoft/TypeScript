/// <reference path="fourslash.ts" />

// @allowJs: true
// @moduleResolution: node

// @Filename: /ns.ts
////file content not read

// @Filename: /node_modules/package/index.ts
////file content not read

// @Filename: /usage.ts
////type A = typeof import("p/*1*/");
////type B = import(".//*2*/");

// @Filename: /user.js
/////** @type {import("/*3*/")} */

verify.completions(
    {
        marker: ["1", "3"],
        exact: { name: "package", kind: "directory" },
        isNewIdentifierLocation: true,
    },
    {
        marker: "2",
        exact: [
            { name: "lib", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.array", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.arraybuffer", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.boolean", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.core", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.dataview", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.date", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.error", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.evalerror", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.float32array", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.float64array", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.function", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.int16array", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.int32array", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.int8array", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.intl", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.json", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.math", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.number", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.object", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.promise", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.rangeerror", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.referenceerror", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.regexp", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.string", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.symbol", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.syntaxerror", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.typeerror", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.uint16array", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.uint32array", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.uint8array", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.uint8clampedarray", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.es2009.urierror", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.utils.import", kind: "script", kindModifiers: ".d.ts" },
            { name: "lib.utils.modifiers", kind: "script", kindModifiers: ".d.ts" },
            { name: "ns", kind: "script", kindModifiers: ".ts" },
            { name: "user", kind: "script", kindModifiers: ".js" },
            { name: "node_modules", kind: "directory" },
        ],
        isNewIdentifierLocation: true
    },
);
