//// [detachedCommentAtStartOfFunctionBody2.ts]
class TestFile {
    foo(message: string): () => string {
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />
        /// <returns type="Function" />

        return () => message + this.name;
    }
}

//// [detachedCommentAtStartOfFunctionBody2.js]
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
var TestFile = (function () {
    function TestFile() {
    }
    TestFile.prototype.foo = function (message) {
        /// <summary>Test summary</summary>
        /// <param name="message" type="String" />
        /// <returns type="Function" />
        var _this = this;
        return function () { return message + _this.name; };
    };
    __names(TestFile.prototype, ["foo"]);
    return TestFile;
}());
