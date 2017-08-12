//// [missingReturnStatement.ts]
module Test {
    export class Bug {
        public foo():string {
        }
    }    
}


//// [missingReturnStatement.js]
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
var Test;
(function (Test) {
    var Bug = (function () {
        function Bug() {
        }
        Bug.prototype.foo = function () {
        };
        __names(Bug.prototype, ["foo"]);
        return Bug;
    }());
    Test.Bug = Bug;
})(Test || (Test = {}));
