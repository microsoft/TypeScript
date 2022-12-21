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
    "use strict";
    var Foo;
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
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var foo_1, Bar;
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
