//// [truthinessCallExpressionCoercion1.ts]
function onlyErrorsWhenTestingNonNullableFunctionType(required: () => boolean, optional?: () => boolean) {
    // error
    required ? console.log('required') : undefined;

    // ok
    optional ? console.log('optional') : undefined;

    // ok
    !!required ? console.log('not required') : undefined;

    // ok
    required() ? console.log('required call') : undefined;
}

function onlyErrorsWhenUnusedInBody() {
    function test() { return Math.random() > 0.5; }

    // error
    test ? console.log('test') : undefined;

    // ok
    test ? console.log(test) : undefined;

    // ok
    test ? test() : undefined;

    // ok
    test
        ? [() => null].forEach(() => { test(); })
        : undefined;

    // error
    test
        ? [() => null].forEach(test => { test() })
        : undefined;
}

function checksPropertyAccess() {
    const x = {
        foo: {
            bar() { return true; }
        }
    }

    // error
    x.foo.bar ? console.log('x.foo.bar') : undefined;

    // ok
    x.foo.bar ? x.foo.bar : undefined;
}

class Foo {
    maybeIsUser?: () => boolean;

    isUser() {
        return true;
    }

    test() {
        // error
        this.isUser ? console.log('this.isUser') : undefined;

        // ok
        this.maybeIsUser ? console.log('this.maybeIsUser') : undefined;

        // ok
        if (this.isUser) {
            this.isUser();
        }
    }
}


//// [truthinessCallExpressionCoercion1.js]
function onlyErrorsWhenTestingNonNullableFunctionType(required, optional) {
    // error
    required ? console.log('required') : undefined;
    // ok
    optional ? console.log('optional') : undefined;
    // ok
    !!required ? console.log('not required') : undefined;
    // ok
    required() ? console.log('required call') : undefined;
}
function onlyErrorsWhenUnusedInBody() {
    function test() { return Math.random() > 0.5; }
    // error
    test ? console.log('test') : undefined;
    // ok
    test ? console.log(test) : undefined;
    // ok
    test ? test() : undefined;
    // ok
    test
        ? [function () { return null; }].forEach(function () { test(); })
        : undefined;
    // error
    test
        ? [function () { return null; }].forEach(function (test) { test(); })
        : undefined;
}
function checksPropertyAccess() {
    var x = {
        foo: {
            bar: function () { return true; }
        }
    };
    // error
    x.foo.bar ? console.log('x.foo.bar') : undefined;
    // ok
    x.foo.bar ? x.foo.bar : undefined;
}
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.isUser = function () {
        return true;
    };
    Foo.prototype.test = function () {
        // error
        this.isUser ? console.log('this.isUser') : undefined;
        // ok
        this.maybeIsUser ? console.log('this.maybeIsUser') : undefined;
        // ok
        if (this.isUser) {
            this.isUser();
        }
    };
    return Foo;
}());
