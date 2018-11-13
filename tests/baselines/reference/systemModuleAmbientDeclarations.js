//// [tests/cases/compiler/systemModuleAmbientDeclarations.ts] ////

//// [file1.ts]
declare class Promise { }
declare function Foo(): void;
declare class C {}
declare enum E {X = 1};

export var promise = Promise;
export var foo = Foo;
export var c = C;
export var e = E;

//// [file2.ts]
export declare function foo();

//// [file3.ts]
export declare class C {}

//// [file4.ts]
export declare var v: number;

//// [file5.ts]
export declare enum E {X = 1}

//// [file6.ts]
export declare module M { var v: number; }


//// [file1.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var promise, foo, c, e;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ;
            exports_1("promise", promise = Promise);
            exports_1("foo", foo = Foo);
            exports_1("c", c = C);
            exports_1("e", e = E);
        }
    };
});
//// [file2.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [file3.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [file4.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [file5.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [file6.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
