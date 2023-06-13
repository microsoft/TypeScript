//// [tests/cases/compiler/functionWithSameNameAsField.ts] ////

//// [functionWithSameNameAsField.ts]
class TestProgressBar {
    public total: number;
    public total(total: number) {
        this.total = total;
        return this;
    }
}


//// [functionWithSameNameAsField.js]
var TestProgressBar = /** @class */ (function () {
    function TestProgressBar() {
    }
    TestProgressBar.prototype.total = function (total) {
        this.total = total;
        return this;
    };
    return TestProgressBar;
}());
