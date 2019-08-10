//// [truthinessCallExpressionCoercion.ts]
function func() { return Math.random() > 0.5; }

if (func) { // error
}

function onlyErrorsWhenNonNullable(required: () => boolean, optional?: () => boolean) {
    if (required) { // error
    }

    if (required()) { // ok
    }

    if (optional) { // ok
    }
}

function checksPropertyAndElementAccess() {
    const x = {
        foo: {
            bar() { }
        }
    }

    if (x.foo.bar) { // error
    }
    
    if (x.foo['bar']) { // error
    }
}

function maybeBoolean(param: boolean | (() => boolean)) {
    if (param) { // ok
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
function func() { return Math.random() > 0.5; }
if (func) { // error
}
function onlyErrorsWhenNonNullable(required, optional) {
    if (required) { // error
    }
    if (required()) { // ok
    }
    if (optional) { // ok
    }
}
function checksPropertyAndElementAccess() {
    var x = {
        foo: {
            bar: function () { }
        }
    };
    if (x.foo.bar) { // error
    }
    if (x.foo['bar']) { // error
    }
}
function maybeBoolean(param) {
    if (param) { // ok
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
