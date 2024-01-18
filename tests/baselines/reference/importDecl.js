//// [tests/cases/compiler/importDecl.ts] ////

//// [importDecl_require.ts]
export class d {
    foo: string;
}
export var x: d;
export function foo(): d { return null; }

//// [importDecl_require1.ts]
export class d {
    bar: string;
}
var x: d;
export function foo(): d { return null; }

//// [importDecl_require2.ts]
export class d {
    baz: string;
}
export var x: d;
export function foo(): d { return null; }

//// [importDecl_require3.ts]
export class d {
    bing: string;
}
export var x: d;
export function foo(): d { return null; }

//// [importDecl_require4.ts]
import m4 = require("./importDecl_require");
export function foo2(): m4.d { return null; }

//// [importDecl_1.ts]
///<reference path='importDecl_require.ts'/>
///<reference path='importDecl_require1.ts'/>
///<reference path='importDecl_require2.ts'/>
///<reference path='importDecl_require3.ts'/>
///<reference path='importDecl_require4.ts'/>
import m4 = require("./importDecl_require"); // Emit used
export var x4 = m4.x;
export var d4 = m4.d;
export var f4 = m4.foo();

export module m1 {
    export var x2 = m4.x;
    export var d2 = m4.d;
    export var f2 = m4.foo();

    var x3 = m4.x;
    var d3 = m4.d;
    var f3 = m4.foo();
}

//Emit global only usage
import glo_m4 = require("./importDecl_require1");
export var useGlo_m4_d4 = glo_m4.d;
export var useGlo_m4_f4 = glo_m4.foo();

//Emit even when used just in function type
import fncOnly_m4 = require("./importDecl_require2");
export var useFncOnly_m4_f4 = fncOnly_m4.foo();

// only used privately no need to emit
import private_m4 = require("./importDecl_require3");
export module usePrivate_m4_m1 {
    var x3 = private_m4.x;
    var d3 = private_m4.d;
    var f3 = private_m4.foo();
}

// Do not emit unused import
import m5 = require("./importDecl_require4");
export var d = m5.foo2();

// Do not emit multiple used import statements
import multiImport_m4 = require("./importDecl_require"); // Emit used
export var useMultiImport_m4_x4 = multiImport_m4.x;
export var useMultiImport_m4_d4 = multiImport_m4.d;
export var useMultiImport_m4_f4 = multiImport_m4.foo();


//// [importDecl_require.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.x = exports.d = void 0;
var d = /** @class */ (function () {
    function d() {
    }
    return d;
}());
exports.d = d;
function foo() { return null; }
exports.foo = foo;
//// [importDecl_require1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.d = void 0;
var d = /** @class */ (function () {
    function d() {
    }
    return d;
}());
exports.d = d;
var x;
function foo() { return null; }
exports.foo = foo;
//// [importDecl_require2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.x = exports.d = void 0;
var d = /** @class */ (function () {
    function d() {
    }
    return d;
}());
exports.d = d;
function foo() { return null; }
exports.foo = foo;
//// [importDecl_require3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.x = exports.d = void 0;
var d = /** @class */ (function () {
    function d() {
    }
    return d;
}());
exports.d = d;
function foo() { return null; }
exports.foo = foo;
//// [importDecl_require4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo2 = void 0;
function foo2() { return null; }
exports.foo2 = foo2;
//// [importDecl_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMultiImport_m4_f4 = exports.useMultiImport_m4_d4 = exports.useMultiImport_m4_x4 = exports.d = exports.usePrivate_m4_m1 = exports.useFncOnly_m4_f4 = exports.useGlo_m4_f4 = exports.useGlo_m4_d4 = exports.m1 = exports.f4 = exports.d4 = exports.x4 = void 0;
///<reference path='importDecl_require.ts'/>
///<reference path='importDecl_require1.ts'/>
///<reference path='importDecl_require2.ts'/>
///<reference path='importDecl_require3.ts'/>
///<reference path='importDecl_require4.ts'/>
var m4 = require("./importDecl_require"); // Emit used
exports.x4 = m4.x;
exports.d4 = m4.d;
exports.f4 = m4.foo();
var m1;
(function (m1) {
    m1.x2 = m4.x;
    m1.d2 = m4.d;
    m1.f2 = m4.foo();
    var x3 = m4.x;
    var d3 = m4.d;
    var f3 = m4.foo();
})(m1 || (exports.m1 = m1 = {}));
//Emit global only usage
var glo_m4 = require("./importDecl_require1");
exports.useGlo_m4_d4 = glo_m4.d;
exports.useGlo_m4_f4 = glo_m4.foo();
//Emit even when used just in function type
var fncOnly_m4 = require("./importDecl_require2");
exports.useFncOnly_m4_f4 = fncOnly_m4.foo();
// only used privately no need to emit
var private_m4 = require("./importDecl_require3");
var usePrivate_m4_m1;
(function (usePrivate_m4_m1) {
    var x3 = private_m4.x;
    var d3 = private_m4.d;
    var f3 = private_m4.foo();
})(usePrivate_m4_m1 || (exports.usePrivate_m4_m1 = usePrivate_m4_m1 = {}));
// Do not emit unused import
var m5 = require("./importDecl_require4");
exports.d = m5.foo2();
// Do not emit multiple used import statements
var multiImport_m4 = require("./importDecl_require"); // Emit used
exports.useMultiImport_m4_x4 = multiImport_m4.x;
exports.useMultiImport_m4_d4 = multiImport_m4.d;
exports.useMultiImport_m4_f4 = multiImport_m4.foo();


//// [importDecl_require.d.ts]
export declare class d {
    foo: string;
}
export declare var x: d;
export declare function foo(): d;
//// [importDecl_require1.d.ts]
export declare class d {
    bar: string;
}
export declare function foo(): d;
//// [importDecl_require2.d.ts]
export declare class d {
    baz: string;
}
export declare var x: d;
export declare function foo(): d;
//// [importDecl_require3.d.ts]
export declare class d {
    bing: string;
}
export declare var x: d;
export declare function foo(): d;
//// [importDecl_require4.d.ts]
import m4 = require("./importDecl_require");
export declare function foo2(): m4.d;
//// [importDecl_1.d.ts]
/// <reference path="importDecl_require3.d.ts" />
/// <reference path="importDecl_require4.d.ts" />
import m4 = require("./importDecl_require");
export declare var x4: m4.d;
export declare var d4: typeof m4.d;
export declare var f4: m4.d;
export declare namespace m1 {
    var x2: m4.d;
    var d2: typeof m4.d;
    var f2: m4.d;
}
import glo_m4 = require("./importDecl_require1");
export declare var useGlo_m4_d4: typeof glo_m4.d;
export declare var useGlo_m4_f4: glo_m4.d;
import fncOnly_m4 = require("./importDecl_require2");
export declare var useFncOnly_m4_f4: fncOnly_m4.d;
export declare namespace usePrivate_m4_m1 {
}
export declare var d: m4.d;
export declare var useMultiImport_m4_x4: m4.d;
export declare var useMultiImport_m4_d4: typeof m4.d;
export declare var useMultiImport_m4_f4: m4.d;
