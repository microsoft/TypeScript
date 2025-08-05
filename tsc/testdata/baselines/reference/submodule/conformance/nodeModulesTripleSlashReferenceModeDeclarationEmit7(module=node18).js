//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeDeclarationEmit7.ts] ////

//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": {
        "import": "./import.js",
        "require": "./require.js"
    }
}
//// [import.d.ts]
export {};
declare global {
    interface ImportInterface { _i: any; }
    function getInterI(): ImportInterface;
}
//// [require.d.ts]
export {};
declare global {
    interface RequireInterface { _r: any; }
    function getInterR(): RequireInterface;
}
//// [uses.ts]
/// <reference types="pkg" preserve="true" />
export default getInterI();
//// [package.json]
{
    "private": true,
    "type": "module"
}
//// [uses.ts]
/// <reference types="pkg" preserve="true" />
export default getInterR();
//// [package.json]
{
    "private": true,
    "type": "commonjs"
}
//// [package.json]
{
    "private": true,
    "type": "module"
}
//// [index.ts]
// only an esm file can `import` both kinds of files
import obj1 from "./sub1/uses.js"
import obj2 from "./sub2/uses.js"
export default [obj1, obj2.default] as const;

//// [uses.js]
/// <reference types="pkg" preserve="true" />
export default getInterI();
//// [uses.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="pkg" preserve="true" />
exports.default = getInterR();
//// [index.js]
// only an esm file can `import` both kinds of files
import obj1 from "./sub1/uses.js";
import obj2 from "./sub2/uses.js";
export default [obj1, obj2.default];


//// [uses.d.ts]
/// <reference types="pkg" preserve="true" />
declare const _default: ImportInterface;
export default _default;
//// [uses.d.ts]
/// <reference types="pkg" preserve="true" />
declare const _default: RequireInterface;
export default _default;
//// [index.d.ts]
declare const _default: readonly [ImportInterface, RequireInterface];
export default _default;


//// [DtsFileErrors]


out/index.d.ts(1,35): error TS2304: Cannot find name 'ImportInterface'.
out/index.d.ts(1,52): error TS2304: Cannot find name 'RequireInterface'.


==== out/index.d.ts (2 errors) ====
    declare const _default: readonly [ImportInterface, RequireInterface];
                                      ~~~~~~~~~~~~~~~
!!! error TS2304: Cannot find name 'ImportInterface'.
                                                       ~~~~~~~~~~~~~~~~
!!! error TS2304: Cannot find name 'RequireInterface'.
    export default _default;
    
==== /node_modules/pkg/package.json (0 errors) ====
    {
        "name": "pkg",
        "version": "0.0.1",
        "exports": {
            "import": "./import.js",
            "require": "./require.js"
        }
    }
==== /node_modules/pkg/import.d.ts (0 errors) ====
    export {};
    declare global {
        interface ImportInterface { _i: any; }
        function getInterI(): ImportInterface;
    }
==== /node_modules/pkg/require.d.ts (0 errors) ====
    export {};
    declare global {
        interface RequireInterface { _r: any; }
        function getInterR(): RequireInterface;
    }
==== out/sub1/uses.d.ts (0 errors) ====
    /// <reference types="pkg" preserve="true" />
    declare const _default: ImportInterface;
    export default _default;
    
==== /sub1/package.json (0 errors) ====
    {
        "private": true,
        "type": "module"
    }
==== out/sub2/uses.d.ts (0 errors) ====
    /// <reference types="pkg" preserve="true" />
    declare const _default: RequireInterface;
    export default _default;
    
==== /sub2/package.json (0 errors) ====
    {
        "private": true,
        "type": "commonjs"
    }
==== /package.json (0 errors) ====
    {
        "private": true,
        "type": "module"
    }