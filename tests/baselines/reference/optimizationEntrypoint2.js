//// [tests/cases/compiler/optimizationEntrypoint2.ts] ////

//// [index.ts]

import * as t from "./foo";

export = t;

//// [foo.ts]
export * from "./bar";

export class Foo<T> extends Array<T> {
	self: this;
}

//// [bar.ts]

import {Foo} from "./foo";

export class Bar extends Foo<Foo<number>> {
	primary: Foo<number>;
}

//// [bundled.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("tests/cases/compiler/bar", ["require", "exports", "tests/cases/compiler/foo"], function (require, exports, foo_1) {
    var Bar = (function (_super) {
        __extends(Bar, _super);
        function Bar() {
            _super.apply(this, arguments);
        }
        return Bar;
    })(foo_1.Foo);
    exports.Bar = Bar;
});
define("tests/cases/compiler/foo", ["require", "exports", "tests/cases/compiler/bar"], function (require, exports, bar_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(bar_1);
    var Foo = (function (_super) {
        __extends(Foo, _super);
        function Foo() {
            _super.apply(this, arguments);
        }
        return Foo;
    })(Array);
    exports.Foo = Foo;
});
define("tests/cases/compiler/index", ["require", "exports", "tests/cases/compiler/foo"], function (require, exports, t) {
    return t;
});


//// [bundled.d.ts]
export declare class Bar extends Foo<Foo<number>> {
    primary: Foo<number>;
}
export declare class Foo<T> extends Array<T> {
    self: this;
}
