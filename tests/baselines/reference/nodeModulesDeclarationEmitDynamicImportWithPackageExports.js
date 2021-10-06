//// [tests/cases/conformance/node/nodeModulesDeclarationEmitDynamicImportWithPackageExports.ts] ////

//// [index.ts]
// esm format file
export {};
//// [index.mts]
// esm format file
export {};
//// [index.cts]
// cjs format file
export {};
//// [other.ts]
// esm format file
export const a = await import("package/cjs");
export const b = await import("package/mjs");
export const c = await import("package");
export const f = await import("inner");
//// [other2.ts]
// esm format file
export const d = await import("inner/cjs");
export const e = await import("inner/mjs");
//// [other.mts]
// esm format file
export const a = await import("package/cjs");
export const b = await import("package/mjs");
export const c = await import("package");
export const f = await import("inner");
//// [other2.mts]
// esm format file
export const d = await import("inner/cjs");
export const e = await import("inner/mjs");
//// [other.cts]
// cjs format file, no TLA
export const a = import("package/cjs");
export const b = import("package/mjs");
export const c = import("package");
export const f = import("inner");
//// [other2.cts]
// cjs format file, no TLA
export const d = import("inner/cjs");
export const e = import("inner/mjs");
//// [index.d.ts]
// cjs format file
export const cjsMain = true;
//// [index.d.mts]
// esm format file
export const esm = true;
//// [index.d.cts]
// cjs format file
export const cjsNonmain = true;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}

//// [index.js]
export {};
//// [index.mjs]
export {};
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [other.js]
// esm format file
export const a = await import("package/cjs");
export const b = await import("package/mjs");
export const c = await import("package");
export const f = await import("inner");
//// [other2.js]
// esm format file
export const d = await import("inner/cjs");
export const e = await import("inner/mjs");
//// [other.mjs]
// esm format file
export const a = await import("package/cjs");
export const b = await import("package/mjs");
export const c = await import("package");
export const f = await import("inner");
//// [other2.mjs]
// esm format file
export const d = await import("inner/cjs");
export const e = await import("inner/mjs");
//// [other.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = exports.c = exports.b = exports.a = void 0;
// cjs format file, no TLA
exports.a = import("package/cjs");
exports.b = import("package/mjs");
exports.c = import("package");
exports.f = import("inner");
//// [other2.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e = exports.d = void 0;
// cjs format file, no TLA
exports.d = import("inner/cjs");
exports.e = import("inner/mjs");


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
//// [other.d.ts]
export declare const a: {
    default: typeof import("package/cjs");
};
export declare const b: typeof import("package/mjs");
export declare const c: typeof import("package");
export declare const f: {
    default: typeof import("inner");
    cjsMain: true;
};
//// [other2.d.ts]
export declare const d: {
    default: typeof import("inner/cjs");
    cjsNonmain: true;
};
export declare const e: typeof import("inner/mjs");
//// [other.d.mts]
export declare const a: {
    default: typeof import("package/cjs");
};
export declare const b: typeof import("package/mjs");
export declare const c: typeof import("package");
export declare const f: {
    default: typeof import("inner");
    cjsMain: true;
};
//// [other2.d.mts]
export declare const d: {
    default: typeof import("inner/cjs");
    cjsNonmain: true;
};
export declare const e: typeof import("inner/mjs");
//// [other.d.cts]
export declare const a: Promise<{
    default: typeof import("package/cjs");
}>;
export declare const b: Promise<typeof import("package/mjs")>;
export declare const c: Promise<typeof import("package")>;
export declare const f: Promise<{
    default: typeof import("inner");
    cjsMain: true;
}>;
//// [other2.d.cts]
export declare const d: Promise<{
    default: typeof import("inner/cjs");
    cjsNonmain: true;
}>;
export declare const e: Promise<typeof import("inner/mjs")>;


//// [DtsFileErrors]


tests/cases/conformance/node/other.d.cts(4,47): error TS1471: Module 'package/mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.
tests/cases/conformance/node/other.d.cts(5,47): error TS1471: Module 'package' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.
tests/cases/conformance/node/other2.d.cts(5,47): error TS1471: Module 'inner/mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.


==== tests/cases/conformance/node/index.d.ts (0 errors) ====
    export {};
    
==== tests/cases/conformance/node/index.d.mts (0 errors) ====
    export {};
    
==== tests/cases/conformance/node/index.d.cts (0 errors) ====
    export {};
    
==== tests/cases/conformance/node/other.d.ts (0 errors) ====
    export declare const a: {
        default: typeof import("package/cjs");
    };
    export declare const b: typeof import("package/mjs");
    export declare const c: typeof import("package");
    export declare const f: {
        default: typeof import("inner");
        cjsMain: true;
    };
    
==== tests/cases/conformance/node/other2.d.ts (0 errors) ====
    export declare const d: {
        default: typeof import("inner/cjs");
        cjsNonmain: true;
    };
    export declare const e: typeof import("inner/mjs");
    
==== tests/cases/conformance/node/other.d.mts (0 errors) ====
    export declare const a: {
        default: typeof import("package/cjs");
    };
    export declare const b: typeof import("package/mjs");
    export declare const c: typeof import("package");
    export declare const f: {
        default: typeof import("inner");
        cjsMain: true;
    };
    
==== tests/cases/conformance/node/other2.d.mts (0 errors) ====
    export declare const d: {
        default: typeof import("inner/cjs");
        cjsNonmain: true;
    };
    export declare const e: typeof import("inner/mjs");
    
==== tests/cases/conformance/node/other.d.cts (2 errors) ====
    export declare const a: Promise<{
        default: typeof import("package/cjs");
    }>;
    export declare const b: Promise<typeof import("package/mjs")>;
                                                  ~~~~~~~~~~~~~
!!! error TS1471: Module 'package/mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.
    export declare const c: Promise<typeof import("package")>;
                                                  ~~~~~~~~~
!!! error TS1471: Module 'package' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.
    export declare const f: Promise<{
        default: typeof import("inner");
        cjsMain: true;
    }>;
    
==== tests/cases/conformance/node/other2.d.cts (1 errors) ====
    export declare const d: Promise<{
        default: typeof import("inner/cjs");
        cjsNonmain: true;
    }>;
    export declare const e: Promise<typeof import("inner/mjs")>;
                                                  ~~~~~~~~~~~
!!! error TS1471: Module 'inner/mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.
    
==== tests/cases/conformance/node/node_modules/inner/index.d.ts (0 errors) ====
    // cjs format file
    export const cjsMain = true;
==== tests/cases/conformance/node/node_modules/inner/index.d.mts (0 errors) ====
    // esm format file
    export const esm = true;
==== tests/cases/conformance/node/node_modules/inner/index.d.cts (0 errors) ====
    // cjs format file
    export const cjsNonmain = true;
==== tests/cases/conformance/node/package.json (0 errors) ====
    {
        "name": "package",
        "private": true,
        "type": "module",
        "exports": {
            "./cjs": "./index.cjs",
            "./mjs": "./index.mjs",
            ".": "./index.js"
        }
    }
==== tests/cases/conformance/node/node_modules/inner/package.json (0 errors) ====
    {
        "name": "inner",
        "private": true,
        "exports": {
            "./cjs": "./index.cjs",
            "./mjs": "./index.mjs",
            ".": "./index.js"
        }
    }