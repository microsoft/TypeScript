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
System.register([], function (exports_1, context_1) {
    var Foo;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Foo = /** @class */ (function () {
                function Foo() {
                }
                return Foo;
            }());
            exports_1("Foo", Foo);
        }
    };
});
//// [bar.js]
System.register(["./foo"], function (exports_1, context_1) {
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var foo_1, Bar;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (foo_1_1) {
                foo_1 = foo_1_1;
            }
        ],
        execute: function () {
            Bar = /** @class */ (function (_super) {
                __extends(Bar, _super);
                function Bar() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Bar;
            }(foo_1.Foo));
            exports_1("Bar", Bar);
        }
    };
});
