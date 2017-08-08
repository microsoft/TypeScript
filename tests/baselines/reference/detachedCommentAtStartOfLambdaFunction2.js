//// [detachedCommentAtStartOfLambdaFunction2.ts]
class TestFile {
    name: string;
    foo(message: string): () => string {
        return (...x: string[]) =>
            /// <summary>Test summary</summary>
            /// <param name="message" type="String" />
            /// <returns type="Function" />

            message + this.name;
    }
}

//// [detachedCommentAtStartOfLambdaFunction2.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var TestFile = (function () {
    function TestFile() {
    }
    TestFile.prototype.foo = function (message) {
        var _this = this;
        return function () {
            /// <summary>Test summary</summary>
            /// <param name="message" type="String" />
            /// <returns type="Function" />
            var x = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                x[_i] = arguments[_i];
            }
            return message + _this.name;
        };
    };
    __names(TestFile.prototype, ["foo"]);
    return TestFile;
}());
