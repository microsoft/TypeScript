// @target: es6

async function isAsync() {
    return 10;
}

class SomeClass {
    async foo() {
        return "ok";
    }
}

var x = new SomeClass();
function notAsync() {
    isAsync(); // OK
    x.foo(); // OK
}

async function alsoAsync() {
    isAsync(); // No
    x.foo(); // No
    void isAsync(); // OK
    void x.foo(); // OK

    var j = x.foo(); // OK
    j = x.foo(); // OK
    await isAsync(); // OK
    await x.foo(); // OK
}