//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserMissingLambdaOpenBrace1.ts] ////

//// [parserMissingLambdaOpenBrace1.ts]
class C {
    where(filter: Iterator<T, boolean>): Query<T> {
        return fromDoWhile(test =>
            var index = 0;
            return this.doWhile((item, i) => filter(item, i) ? test(item, index++) : true);
        });
    }
}

//// [parserMissingLambdaOpenBrace1.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.where = function (filter) {
        var _this = this;
        return fromDoWhile(function (test) {
            var index = 0;
            return _this.doWhile(function (item, i) { return filter(item, i) ? test(item, index++) : true; });
        });
    };
    return C;
}());
