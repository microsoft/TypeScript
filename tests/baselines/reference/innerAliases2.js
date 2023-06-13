//// [tests/cases/compiler/innerAliases2.ts] ////

//// [innerAliases2.ts]
module _provider {
                export class UsefulClass {
                                public foo() {
                                }
                }
}

module consumer {
                import provider = _provider;
                
                var g:provider.UsefulClass= null;
                
                function use():provider.UsefulClass { 
                                var p2:provider.UsefulClass= new provider.UsefulClass();
                                return p2; 
                }
}



//// [innerAliases2.js]
var _provider;
(function (_provider) {
    var UsefulClass = /** @class */ (function () {
        function UsefulClass() {
        }
        UsefulClass.prototype.foo = function () {
        };
        return UsefulClass;
    }());
    _provider.UsefulClass = UsefulClass;
})(_provider || (_provider = {}));
var consumer;
(function (consumer) {
    var provider = _provider;
    var g = null;
    function use() {
        var p2 = new provider.UsefulClass();
        return p2;
    }
})(consumer || (consumer = {}));
