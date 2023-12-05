//// [tests/cases/compiler/moduleMerge.ts] ////

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
var A;
(function (A) {
    var B = /** @class */ (function () {
        function B() {
        }
        B.prototype.Hello = function () {
            return "from private B";
        };
        return B;
    }());
})(A || (A = {}));
(function (A) {
    var B = /** @class */ (function () {
        function B() {
        }
        B.prototype.Hello = function () {
            return "from export B";
        };
        return B;
    }());
    A.B = B;
})(A || (A = {}));
