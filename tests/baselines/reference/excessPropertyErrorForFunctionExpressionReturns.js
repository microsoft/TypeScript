//// [excessPropertyErrorForFunctionExpressionReturns.ts]
export type SomeObj1 = { a: number, b: number };

declare function valueOrGetter<T>(x: T, f: () => T): T;

namespace arrows {
    declare function consumeObj1(f: () => SomeObj1): void;
    consumeObj1(() => ({
        a: 100,
        b: 200,
        c: 300,
    }));
    
    function obj1FactoryFactory(): () => SomeObj1 {
        return () => ({
            a: 100,
            b: 200,
            c: 300,
        });
    }

    valueOrGetter({ a: 100, b: 200 }, () => ({
        a: 100,
        b: 200,
        c: 300,
    }));

    valueOrGetter<SomeObj1>({ a: 100, b: 200, c: 300 }, () => ({
        a: 100,
        b: 200,
    }));

    valueOrGetter<SomeObj1>({ a: 100, b: 200 }, () => ({
        a: 100,
        b: 200,
        c: 300,
    }));

    valueOrGetter({ a: 100, b: 200, c: 300 }, () => ({
        a: 100,
        b: 200,
    }));
}

namespace funcExprs {
    declare function consumeObj1(f: () => SomeObj1): void;
    consumeObj1(function() {
        return {
            a: 100,
            b: 200,
            c: 300,
        };
    });
    
    function obj1FactoryFactory(): () => SomeObj1 {
        return function() {
            return {
                a: 100,
                b: 200,
                c: 300,
            }
        };
    }

    valueOrGetter({ a: 100, b: 200 }, function() {
        return {
            a: 100,
            b: 200,
            c: 300,
        };
    });

    valueOrGetter<SomeObj1>({ a: 100, b: 200, c: 300 }, function() {
        return {
            a: 100,
            b: 200,
            c: 300,
        };
    });

    valueOrGetter<SomeObj1>({ a: 100, b: 200 }, function() {
        return {
            a: 100,
            b: 200,
            c: 300,
        };
    });

    valueOrGetter({ a: 100, b: 200, c: 300 }, function() {
        return {
            a: 100,
            b: 200,
            c: 300,
        };
    });
}

//// [excessPropertyErrorForFunctionExpressionReturns.js]
"use strict";
exports.__esModule = true;
var arrows;
(function (arrows) {
    consumeObj1(function () { return ({
        a: 100,
        b: 200,
        c: 300
    }); });
    function obj1FactoryFactory() {
        return function () { return ({
            a: 100,
            b: 200,
            c: 300
        }); };
    }
    valueOrGetter({ a: 100, b: 200 }, function () { return ({
        a: 100,
        b: 200,
        c: 300
    }); });
    valueOrGetter({ a: 100, b: 200, c: 300 }, function () { return ({
        a: 100,
        b: 200
    }); });
    valueOrGetter({ a: 100, b: 200 }, function () { return ({
        a: 100,
        b: 200,
        c: 300
    }); });
    valueOrGetter({ a: 100, b: 200, c: 300 }, function () { return ({
        a: 100,
        b: 200
    }); });
})(arrows || (arrows = {}));
var funcExprs;
(function (funcExprs) {
    consumeObj1(function () {
        return {
            a: 100,
            b: 200,
            c: 300
        };
    });
    function obj1FactoryFactory() {
        return function () {
            return {
                a: 100,
                b: 200,
                c: 300
            };
        };
    }
    valueOrGetter({ a: 100, b: 200 }, function () {
        return {
            a: 100,
            b: 200,
            c: 300
        };
    });
    valueOrGetter({ a: 100, b: 200, c: 300 }, function () {
        return {
            a: 100,
            b: 200,
            c: 300
        };
    });
    valueOrGetter({ a: 100, b: 200 }, function () {
        return {
            a: 100,
            b: 200,
            c: 300
        };
    });
    valueOrGetter({ a: 100, b: 200, c: 300 }, function () {
        return {
            a: 100,
            b: 200,
            c: 300
        };
    });
})(funcExprs || (funcExprs = {}));
