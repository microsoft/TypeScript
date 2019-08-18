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
