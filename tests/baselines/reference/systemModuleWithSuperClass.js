//// [tests/cases/compiler/systemModuleWithSuperClass.ts] ////

//// [foo.ts]

export class Foo {
    a: string;
}

//// [bar.ts]
import {Foo} from './foo';
export class Bar extends Foo {
    b: string;
}

//// [foo.js]
System.register([], function(exports_1) {
    "use strict";
    var Foo;
    return {
        setters:[],
        execute: function() {
            Foo = (function () {
                function Foo() {
                }
                return Foo;
            })();
            exports_1("Foo", Foo);
        }
    }
});
//// [bar.js]
System.register(['./foo'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var foo_1;
    var Bar;
    return {
        setters:[
            function (foo_1_1) {
                foo_1 = foo_1_1;
            }],
        execute: function() {
            Bar = (function (_super) {
                __extends(Bar, _super);
                function Bar() {
                    _super.apply(this, arguments);
                }
                return Bar;
            })(foo_1.Foo);
            exports_1("Bar", Bar);
        }
    }
});
