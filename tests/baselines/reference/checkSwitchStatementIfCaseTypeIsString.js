//// [checkSwitchStatementIfCaseTypeIsString.ts]
declare function use(a: any): void;

class A {
    doIt(x: Array<string>): void {
        x.forEach((v) => {
            switch(v) {
                case "test": use(this);
            }
        });
    }
}

//// [checkSwitchStatementIfCaseTypeIsString.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.doIt = function (x) {
        var _this = this;
        x.forEach(function (v) {
            switch (v) {
                case "test": use(_this);
            }
        });
    };
    return A;
}());
