//// [tests/cases/compiler/withImportDecl.ts] ////

//// [withImportDecl_0.ts]
export class A { foo: string; }

//// [withImportDecl_1.ts]
///<reference path='withImportDecl_0.ts'/>
var simpleVar;

var anotherVar: any;
var varWithSimpleType: number;
var varWithArrayType: number[];

var varWithInitialValue = 30;

var withComplicatedValue = { x: 30, y: 70, desc: "position" };

declare var declaredVar;
declare var declareVar2

declare var declaredVar;
declare var deckareVarWithType: number;

var arrayVar: string[] = ['a', 'b'];


function simpleFunction() {
    return {
        x: "Hello",
        y: "word",
        n: 2
    };
}

module m1 {
    export function foo() {
        return "Hello";
    }
}

import m3 = require("withImportDecl_0");

var b = new m3.A();
b.foo;

//// [withImportDecl_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.A = void 0;
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    exports.A = A;
});
//// [withImportDecl_1.js]
define(["require", "exports", "withImportDecl_0"], function (require, exports, m3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<reference path='withImportDecl_0.ts'/>
    var simpleVar;
    var anotherVar;
    var varWithSimpleType;
    var varWithArrayType;
    var varWithInitialValue = 30;
    var withComplicatedValue = { x: 30, y: 70, desc: "position" };
    var arrayVar = ['a', 'b'];
    function simpleFunction() {
        return {
            x: "Hello",
            y: "word",
            n: 2
        };
    }
    var m1;
    (function (m1) {
        function foo() {
            return "Hello";
        }
        m1.foo = foo;
    })(m1 || (m1 = {}));
    var b = new m3.A();
    b.foo;
});


//// [withImportDecl_0.d.ts]
export declare class A {
    foo: string;
}
//// [withImportDecl_1.d.ts]
export {};
