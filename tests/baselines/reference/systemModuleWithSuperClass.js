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
            Foo = class Foo {
            };
            exports_1("Foo", Foo);
        }
    };
});
//// [bar.js]
System.register(["./foo"], function (exports_1, context_1) {
    "use strict";
    var foo_1, Bar;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (foo_1_1) {
                foo_1 = foo_1_1;
            }
        ],
        execute: function () {
            Bar = class Bar extends foo_1.Foo {
            };
            exports_1("Bar", Bar);
        }
    };
});
