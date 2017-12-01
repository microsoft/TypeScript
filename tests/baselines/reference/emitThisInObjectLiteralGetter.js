//// [emitThisInObjectLiteralGetter.ts]
const example = {
    get foo() {
        return item => this.bar(item);
    }
};


//// [emitThisInObjectLiteralGetter.js]
var example = {
    get foo() {
        var _this = this;
        return function (item) { return _this.bar(item); };
    }
};
