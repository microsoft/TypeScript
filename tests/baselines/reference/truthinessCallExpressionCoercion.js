//// [truthinessCallExpressionCoercion.ts]
function func() { return Math.random() > 0.5; }

if (func) { // error
}

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

function onlyErrorsWhenReturnsBoolean(
    bool: () => boolean,
    nullableBool: () => boolean | undefined,
    nullableTrue: () => true | undefined,
    nullable: () => undefined | null,
    notABool: () => string,
    unionWithBool: () => boolean | string,
    nullableString: () => string | undefined
) {
    if (bool) { // error
    }

    if (nullableBool) { // error
    }

    if (nullableTrue) { // error
    }

    if (nullable) { // ok
    }

    if (notABool) { // ok
    }

    if (unionWithBool) { // ok
    }

    if (nullableString) { // ok
    }
}

function checksPropertyAndElementAccess() {
    const x = {
        foo: {
            bar() { return true; }
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
function onlyErrorsWhenReturnsBoolean(bool, nullableBool, nullableTrue, nullable, notABool, unionWithBool, nullableString) {
    if (bool) { // error
    }
    if (nullableBool) { // error
    }
    if (nullableTrue) { // error
    }
    if (nullable) { // ok
    }
    if (notABool) { // ok
    }
    if (unionWithBool) { // ok
    }
    if (nullableString) { // ok
    }
}
function checksPropertyAndElementAccess() {
    var x = {
        foo: {
            bar: function () { return true; }
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
