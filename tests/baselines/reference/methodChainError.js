//// [methodChainError.ts]
class Builder {
    method(param: string): Builder {
        return this;
    }
}

new Builder()
    .method("a")
    .method();

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
    .method();
