//// [functionWithSameNameAsField.js]
var TestProgressBar = (function () {
    function TestProgressBar() {
    }
    TestProgressBar.prototype.total = function (total) {
        this.total = total;
        return this;
    };
    return TestProgressBar;
})();
