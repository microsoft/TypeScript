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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var A = (function () {
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
    __names(A.prototype, ["doIt"]);
    return A;
}());
