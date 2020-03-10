//// [tests/cases/conformance/types/import/importTypeAmdBundleRewrite.ts] ////

//// [c.ts]
export interface Foo {
    x: 12;
}
//// [inner.ts]
const c: import("./b/c").Foo = {x: 12};
export {c};

//// [index.ts]
const d: typeof import("./a/inner")["c"] = {x: 12};
export {d};


//// [bundle.js]
define("a/b/c", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("a/inner", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.c = void 0;
    var c = { x: 12 };
    exports.c = c;
});
define("index", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.d = void 0;
    var d = { x: 12 };
    exports.d = d;
});


//// [bundle.d.ts]
declare module "a/b/c" {
    export interface Foo {
        x: 12;
    }
}
declare module "a/inner" {
    const c: import("a/b/c").Foo;
    export { c };
}
declare module "index" {
    const d: typeof import("a/inner")["c"];
    export { d };
}
