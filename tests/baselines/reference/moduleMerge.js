//// [moduleMerge.ts]
// This should not compile both B classes are in the same module this should be a collission

module A
{
    class B
    {
        public Hello(): string
        {
            return "from private B";
        }
    }
}

module A
{
    export class B
    {
        public Hello(): string
        {
            return "from export B";
        }
    }
}

//// [moduleMerge.js]
// This should not compile both B classes are in the same module this should be a collission
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
var A;
(function (A) {
    var B = (function () {
        function B() {
        }
        B.prototype.Hello = function () {
            return "from private B";
        };
        __names(B.prototype, ["Hello"]);
        return B;
    }());
})(A || (A = {}));
(function (A) {
    var B = (function () {
        function B() {
        }
        B.prototype.Hello = function () {
            return "from export B";
        };
        __names(B.prototype, ["Hello"]);
        return B;
    }());
    A.B = B;
})(A || (A = {}));
