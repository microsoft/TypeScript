//// [tests/cases/compiler/es6ExportEqualsInterop.ts] ////

//// [modules.d.ts]
declare module "interface" {
    interface Foo {
        x: number;
        y: number;
    }
    export = Foo;
}

declare module "variable" {
    var Foo: {
        a: number;
        b: number;
    }
    export = Foo;
}

declare module "interface-variable" {
    interface Foo {
        x: number;
        y: number;
    }
    var Foo: {
        a: number;
        b: number;
    }
    export = Foo;
}

declare module "module" {
    module Foo {
        export var a: number;
        export var b: number;
    }
    export = Foo;
}

declare module "interface-module" {
    interface Foo {
        x: number;
        y: number;
    }
    module Foo {
        export var a: number;
        export var b: number;
    }
    export = Foo;
}

declare module "variable-module" {
    module Foo {
        interface Bar {
            x: number;
            y: number;
        }
    }
    var Foo: {
        a: number;
        b: number;
    }
    export = Foo;
}

declare module "function" {
    function foo();
    export = foo;
}

declare module "function-module" {
    function foo();
    module foo {
        export var a: number;
        export var b: number;
    }
    export = foo;
}

declare module "class" {
    class Foo {
        x: number;
        y: number;
    }
    export = Foo;
}

declare module "class-module" {
    class Foo {
        x: number;
        y: number;
    }
    module Foo {
        export var a: number;
        export var b: number;
    }
    export = Foo;
}

//// [main.ts]
/// <reference path="modules.d.ts"/>

// import-equals
import z1 = require("interface");
import z2 = require("variable");
import z3 = require("interface-variable");
import z4 = require("module");
import z5 = require("interface-module");
import z6 = require("variable-module");
import z7 = require("function");
import z8 = require("function-module");
import z9 = require("class");
import z0 = require("class-module");

z1.a;
z2.a;
z3.a;
z4.a;
z5.a;
z6.a;
z7.a;
z8.a;
z9.a;
z0.a;

// default import
import x1 from "interface";
import x2 from "variable";
import x3 from "interface-variable";
import x4 from "module";
import x5 from "interface-module";
import x6 from "variable-module";
import x7 from "function";
import x8 from "function-module";
import x9 from "class";
import x0 from "class-module";

// namespace import
import * as y1 from "interface";
import * as y2 from "variable";
import * as y3 from "interface-variable";
import * as y4 from "module";
import * as y5 from "interface-module";
import * as y6 from "variable-module";
import * as y7 from "function";
import * as y8 from "function-module";
import * as y9 from "class";
import * as y0 from "class-module";

y1.a;
y2.a;
y3.a;
y4.a;
y5.a;
y6.a;
y7.a;
y8.a;
y9.a;
y0.a;

// named import
import { a as a1 } from "interface";
import { a as a2 } from "variable";
import { a as a3 } from "interface-variable";
import { a as a4 } from "module";
import { a as a5 } from "interface-module";
import { a as a6 } from "variable-module";
import { a as a7 } from "function";
import { a as a8 } from "function-module";
import { a as a9 } from "class";
import { a as a0 } from "class-module";

a1;
a2;
a3;
a4;
a5;
a6;
a7;
a8;
a9;
a0;

// named export
export { a as a1 } from "interface";
export { a as a2 } from "variable";
export { a as a3 } from "interface-variable";
export { a as a4 } from "module";
export { a as a5 } from "interface-module";
export { a as a6 } from "variable-module";
export { a as a7 } from "function";
export { a as a8 } from "function-module";
export { a as a9 } from "class";
export { a as a0 } from "class-module";

// export-star
export * from "interface";
export * from "variable";
export * from "interface-variable";
export * from "module";
export * from "interface-module";
export * from "variable-module";
export * from "function";
export * from "function-module";
export * from "class";
export * from "class-module";


//// [main.js]
"use strict";
/// <reference path="modules.d.ts"/>
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.a0 = exports.a9 = exports.a8 = exports.a7 = exports.a6 = exports.a5 = exports.a4 = exports.a3 = exports.a2 = exports.a1 = void 0;
var z2 = require("variable");
var z3 = require("interface-variable");
var z4 = require("module");
var z5 = require("interface-module");
var z6 = require("variable-module");
var z7 = require("function");
var z8 = require("function-module");
var z9 = require("class");
var z0 = require("class-module");
z1.a;
z2.a;
z3.a;
z4.a;
z5.a;
z6.a;
z7.a;
z8.a;
z9.a;
z0.a;
var y2 = require("variable");
var y3 = require("interface-variable");
var y4 = require("module");
var y5 = require("interface-module");
var y6 = require("variable-module");
var y7 = require("function");
var y8 = require("function-module");
var y9 = require("class");
var y0 = require("class-module");
y1.a;
y2.a;
y3.a;
y4.a;
y5.a;
y6.a;
y7.a;
y8.a;
y9.a;
y0.a;
// named import
var interface_1 = require("interface");
var variable_1 = require("variable");
var interface_variable_1 = require("interface-variable");
var module_1 = require("module");
var interface_module_1 = require("interface-module");
var variable_module_1 = require("variable-module");
var function_1 = require("function");
var function_module_1 = require("function-module");
var class_1 = require("class");
var class_module_1 = require("class-module");
interface_1.a;
variable_1.a;
interface_variable_1.a;
module_1.a;
interface_module_1.a;
variable_module_1.a;
function_1.a;
function_module_1.a;
class_1.a;
class_module_1.a;
// named export
var interface_2 = require("interface");
Object.defineProperty(exports, "a1", { enumerable: true, get: function () { return interface_2.a; } });
var variable_2 = require("variable");
Object.defineProperty(exports, "a2", { enumerable: true, get: function () { return variable_2.a; } });
var interface_variable_2 = require("interface-variable");
Object.defineProperty(exports, "a3", { enumerable: true, get: function () { return interface_variable_2.a; } });
var module_2 = require("module");
Object.defineProperty(exports, "a4", { enumerable: true, get: function () { return module_2.a; } });
var interface_module_2 = require("interface-module");
Object.defineProperty(exports, "a5", { enumerable: true, get: function () { return interface_module_2.a; } });
var variable_module_2 = require("variable-module");
Object.defineProperty(exports, "a6", { enumerable: true, get: function () { return variable_module_2.a; } });
var function_2 = require("function");
Object.defineProperty(exports, "a7", { enumerable: true, get: function () { return function_2.a; } });
var function_module_2 = require("function-module");
Object.defineProperty(exports, "a8", { enumerable: true, get: function () { return function_module_2.a; } });
var class_2 = require("class");
Object.defineProperty(exports, "a9", { enumerable: true, get: function () { return class_2.a; } });
var class_module_2 = require("class-module");
Object.defineProperty(exports, "a0", { enumerable: true, get: function () { return class_module_2.a; } });
// export-star
__exportStar(require("interface"), exports);
__exportStar(require("variable"), exports);
__exportStar(require("interface-variable"), exports);
__exportStar(require("module"), exports);
__exportStar(require("interface-module"), exports);
__exportStar(require("variable-module"), exports);
__exportStar(require("function"), exports);
__exportStar(require("function-module"), exports);
__exportStar(require("class"), exports);
__exportStar(require("class-module"), exports);
