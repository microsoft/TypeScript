//// [functionWithSameNameAsField.ts]
class TestProgressBar {
    public total: number;
    public total(total: number) {
        this.total = total;
        return this;
    }
}


//// [functionWithSameNameAsField.js]
var TestProgressBar = (function () {
    function TestProgressBar() {
    }
    TestProgressBar.prototype.total = function (total) {
        this.total = total;
        return this;
    };
    return TestProgressBar;
}());
