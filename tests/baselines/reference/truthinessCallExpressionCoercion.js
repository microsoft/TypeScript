//// [tests/cases/compiler/truthinessCallExpressionCoercion.ts] ////

//// [truthinessCallExpressionCoercion.ts]
function onlyErrorsWhenTestingNonNullableFunctionType(required: () => boolean, optional?: () => boolean) {
    if (required) { // error
    }

    if (optional) { // ok
    }

    if (!!required) { // ok
    }

    if (required()) { // ok
    }
}

function onlyErrorsWhenUnusedInBody() {
    function test() { return Math.random() > 0.5; }

    if (test) { // error
        console.log('test');
    }
    
    if (test) { // ok
        console.log(test);
    }

    if (test) { // ok
        test();
    }
    
    if (test) { // ok
        [() => null].forEach(() => {
            test();
        });
    }
    
    if (test) { // error
        [() => null].forEach(test => {
            test();
        });
    }
}

function checksPropertyAccess() {
    const x = {
        foo: {
            bar() { return true; }
        }
    }

    if (x.foo.bar) { // error
    }

    if (x.foo.bar) { // ok
        x.foo.bar;
    }
}

class Foo {
    maybeIsUser?: () => boolean;

    isUser() {
        return true;
    }

    test() {
        if (this.isUser) { // error
        }

        if (this.maybeIsUser) { // ok
        }
    }
}

// Test for GH-35557 where ids were not assigned for a symbol.
function A(stats: StatsBase<any>) {
    if (stats.isDirectory) { // err
        console.log(`[Directory] ${stats.ctime}`)
    }
}

function B(a: Nested, b: Nested) {
    if (a.stats.isDirectory) { // err
        b.stats.isDirectory(); 
    }
    if (a.stats.isDirectory) { // ok
        a.stats.isDirectory();
    }
} 

interface StatsBase<T> {
    isDirectory(): boolean;
    ctime: number;
}

interface Nested {
    stats: StatsBase<any>;
}

//// [truthinessCallExpressionCoercion.js]
function onlyErrorsWhenTestingNonNullableFunctionType(required, optional) {
    if (required) { // error
    }
    if (optional) { // ok
    }
    if (!!required) { // ok
    }
    if (required()) { // ok
    }
}
function onlyErrorsWhenUnusedInBody() {
    function test() { return Math.random() > 0.5; }
    if (test) { // error
        console.log('test');
    }
    if (test) { // ok
        console.log(test);
    }
    if (test) { // ok
        test();
    }
    if (test) { // ok
        [function () { return null; }].forEach(function () {
            test();
        });
    }
    if (test) { // error
        [function () { return null; }].forEach(function (test) {
            test();
        });
    }
}
function checksPropertyAccess() {
    var x = {
        foo: {
            bar: function () { return true; }
        }
    };
    if (x.foo.bar) { // error
    }
    if (x.foo.bar) { // ok
        x.foo.bar;
    }
}
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.isUser = function () {
        return true;
    };
    Foo.prototype.test = function () {
        if (this.isUser) { // error
        }
        if (this.maybeIsUser) { // ok
        }
    };
    return Foo;
}());
// Test for GH-35557 where ids were not assigned for a symbol.
function A(stats) {
    if (stats.isDirectory) { // err
        console.log("[Directory] ".concat(stats.ctime));
    }
}
function B(a, b) {
    if (a.stats.isDirectory) { // err
        b.stats.isDirectory();
    }
    if (a.stats.isDirectory) { // ok
        a.stats.isDirectory();
    }
}
