//// [unusedSingleParameterInMethodDeclaration.ts]
class Dummy {
    public greeter(person: string) {
        var unused = 20;
    }
}

//// [unusedSingleParameterInMethodDeclaration.js]
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
var Dummy = (function () {
    function Dummy() {
    }
    Dummy.prototype.greeter = function (person) {
        var unused = 20;
    };
    __names(Dummy.prototype, ["greeter"]);
    return Dummy;
}());
