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
"use strict";
class TestProgressBar {
    total;
    total(total) {
        this.total = total;
        return this;
    }
}
