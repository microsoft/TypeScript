//// [tests/cases/compiler/truthinessCallExpressionCoercion1.ts] ////

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

    var chrome = {
        platformKeys: {
            subtleCrypto() {
                return {
                    sign() {},
                    exportKey() { return true }
                }
            }
        }
    }
    // ok
    if (chrome.platformKeys.subtleCrypto().exportKey) {
        chrome.platformKeys.subtleCrypto().exportKey
    }
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
    required ? console.log('required') : undefined;
    optional ? console.log('optional') : undefined;
    !!required ? console.log('not required') : undefined;
    required() ? console.log('required call') : undefined;
}
function onlyErrorsWhenUnusedInBody() {
    function test() { return Math.random() > 0.5; }
    test ? console.log('test') : undefined;
    test ? console.log(test) : undefined;
    test ? test() : undefined;
    test
        ? [() => null].forEach(() => { test(); })
        : undefined;
    test
        ? [() => null].forEach(test => { test(); })
        : undefined;
}
function checksPropertyAccess() {
    const x = {
        foo: {
            bar() { return true; }
        }
    };
    x.foo.bar ? console.log('x.foo.bar') : undefined;
    x.foo.bar ? x.foo.bar : undefined;
    var chrome = {
        platformKeys: {
            subtleCrypto() {
                return {
                    sign() { },
                    exportKey() { return true; }
                };
            }
        }
    };
    if (chrome.platformKeys.subtleCrypto().exportKey) {
        chrome.platformKeys.subtleCrypto().exportKey;
    }
}
class Foo {
    maybeIsUser;
    isUser() {
        return true;
    }
    test() {
        this.isUser ? console.log('this.isUser') : undefined;
        this.maybeIsUser ? console.log('this.maybeIsUser') : undefined;
        if (this.isUser) {
            this.isUser();
        }
    }
}
