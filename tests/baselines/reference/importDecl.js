//// [importDecl_require.js]
var d = (function () {
    function d() {
    }
    return d;
})();
exports.d = d;
exports.x;
function foo() {
    return null;
}
exports.foo = foo;
//// [importDecl_require1.js]
var d = (function () {
    function d() {
    }
    return d;
})();
exports.d = d;
var x;
function foo() {
    return null;
}
exports.foo = foo;
//// [importDecl_require2.js]
var d = (function () {
    function d() {
    }
    return d;
})();
exports.d = d;
exports.x;
function foo() {
    return null;
}
exports.foo = foo;
//// [importDecl_require3.js]
var d = (function () {
    function d() {
    }
    return d;
})();
exports.d = d;
exports.x;
function foo() {
    return null;
}
exports.foo = foo;
//// [importDecl_require4.js]
function foo2() {
    return null;
}
exports.foo2 = foo2;
//// [importDecl_1.js]
///<reference path='importDecl_require.ts'/>
///<reference path='importDecl_require1.ts'/>
///<reference path='importDecl_require2.ts'/>
///<reference path='importDecl_require3.ts'/>
///<reference path='importDecl_require4.ts'/>
var m4 = require("importDecl_require");
exports.x4 = m4.x;
exports.d4 = m4.d;
exports.f4 = m4.foo();

(function (m1) {
    m1.x2 = m4.x;
    m1.d2 = m4.d;
    m1.f2 = m4.foo();

    var x3 = m4.x;
    var d3 = m4.d;
    var f3 = m4.foo();
})(exports.m1 || (exports.m1 = {}));
var m1 = exports.m1;

//Emit global only usage
var glo_m4 = require("importDecl_require1");
exports.useGlo_m4_x4 = glo_m4.x;
exports.useGlo_m4_d4 = glo_m4.d;
exports.useGlo_m4_f4 = glo_m4.foo();

//Emit even when used just in function type
var fncOnly_m4 = require("importDecl_require2");
exports.useFncOnly_m4_f4 = fncOnly_m4.foo();

// only used privately no need to emit
var private_m4 = require("importDecl_require3");
(function (usePrivate_m4_m1) {
    var x3 = private_m4.x;
    var d3 = private_m4.d;
    var f3 = private_m4.foo();
})(exports.usePrivate_m4_m1 || (exports.usePrivate_m4_m1 = {}));
var usePrivate_m4_m1 = exports.usePrivate_m4_m1;

// Do not emit unused import
var m5 = require("importDecl_require4");
exports.d = m5.foo2();

// Do not emit multiple used import statements
var multiImport_m4 = require("importDecl_require");
exports.useMultiImport_m4_x4 = multiImport_m4.x;
exports.useMultiImport_m4_d4 = multiImport_m4.d;
exports.useMultiImport_m4_f4 = multiImport_m4.foo();


////[importDecl_require.d.ts]
export declare class d {
    public foo: string;
}
export declare var x: d;
export declare function foo(): d;
////[importDecl_require1.d.ts]
export declare class d {
    public bar: string;
}
export declare function foo(): d;
////[importDecl_require2.d.ts]
export declare class d {
    public baz: string;
}
export declare var x: d;
export declare function foo(): d;
////[importDecl_require3.d.ts]
export declare class d {
    public bing: string;
}
export declare var x: d;
export declare function foo(): d;
////[importDecl_require4.d.ts]
import m4 = require("importDecl_require");
export declare function foo2(): m4.d;
////[importDecl_1.d.ts]
/// <reference path="importDecl_require.d.ts" />
/// <reference path="importDecl_require1.d.ts" />
/// <reference path="importDecl_require2.d.ts" />
/// <reference path="importDecl_require3.d.ts" />
/// <reference path="importDecl_require4.d.ts" />
import m4 = require("importDecl_require");
export declare var x4: m4.d;
export declare var d4: typeof m4.d;
export declare var f4: m4.d;
export declare module m1 {
    var x2: m4.d;
    var d2: typeof m4.d;
    var f2: m4.d;
}
import glo_m4 = require("importDecl_require1");
export declare var useGlo_m4_x4: any;
export declare var useGlo_m4_d4: typeof glo_m4.d;
export declare var useGlo_m4_f4: glo_m4.d;
import fncOnly_m4 = require("importDecl_require2");
export declare var useFncOnly_m4_f4: fncOnly_m4.d;
export declare module usePrivate_m4_m1 {
}
export declare var d: m4.d;
export declare var useMultiImport_m4_x4: m4.d;
export declare var useMultiImport_m4_d4: typeof m4.d;
export declare var useMultiImport_m4_f4: m4.d;
