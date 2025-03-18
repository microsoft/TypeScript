//// [tests/cases/compiler/inferParameterWithMethodCallInitializer.ts] ////

//// [inferParameterWithMethodCallInitializer.ts]
function getNumber(): number {
    return 1;
}
class Example {
    getNumber(): number {
        return 1;
    }
    doSomething(a = this.getNumber()): typeof a {
        return a;
    }
}
function weird(this: Example, a = this.getNumber()) {
    return a;
}
class Weird {
    doSomething(this: Example, a = this.getNumber()) {
        return a;
    }
}


//// [inferParameterWithMethodCallInitializer.js]
function getNumber() {
    return 1;
}
class Example {
    getNumber() {
        return 1;
    }
    doSomething(a = this.getNumber()) {
        return a;
    }
}
function weird(a = this.getNumber()) {
    return a;
}
class Weird {
    doSomething(a = this.getNumber()) {
        return a;
    }
}
