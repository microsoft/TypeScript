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
var Builder = /** @class */ (function () {
    function Builder() {
    }
    Builder.prototype.method = function (param) {
        return this;
    };
    return Builder;
}());
new Builder()
    .method("a")
    .method()
    .method("a");
new Builder()
    .method("a")
    .notMethod()
    .method("a");
