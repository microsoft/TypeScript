//// [tests/cases/compiler/methodChainError.ts] ////

//// [methodChainError.ts]
class Builder {
    notMethod: string
    method(param: string): Builder {
        return this;
    }
}

new Builder()
    .method("a")
    .method()
    .method("a");

    
new Builder()
    .method("a")
    .notMethod()
    .method("a");

//// [methodChainError.js]
class Builder {
    notMethod;
    method(param) {
        return this;
    }
}
new Builder()
    .method("a")
    .method()
    .method("a");
new Builder()
    .method("a")
    .notMethod()
    .method("a");
