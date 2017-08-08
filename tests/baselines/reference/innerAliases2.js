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
var _provider;
(function (_provider) {
    var UsefulClass = (function () {
        function UsefulClass() {
        }
        UsefulClass.prototype.foo = function () {
        };
        __names(UsefulClass.prototype, ["foo"]);
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
