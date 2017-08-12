//// [unusedMultipleParameters2InMethodDeclaration.ts]
class Dummy {
    public greeter(person: string, person2: string, person3: string) {
        var unused = 20;
        person2 = "dummy value";
    }
}

//// [unusedMultipleParameters2InMethodDeclaration.js]
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
    Dummy.prototype.greeter = function (person, person2, person3) {
        var unused = 20;
        person2 = "dummy value";
    };
    __names(Dummy.prototype, ["greeter"]);
    return Dummy;
}());
