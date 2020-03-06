// @strictNullChecks:true

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
