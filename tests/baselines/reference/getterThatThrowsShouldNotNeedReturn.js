//// [getterThatThrowsShouldNotNeedReturn.ts]
class Greeter {
 public get greet(): string {
  throw ''; // should not raise an error
 }
 public greeting(): string {
  throw ''; // should not raise an error
 }
}


//// [getterThatThrowsShouldNotNeedReturn.js]
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
var Greeter = (function () {
    function Greeter() {
    }
    Object.defineProperty(Greeter.prototype, "greet", {
        get: function () {
            throw ''; // should not raise an error
        },
        enumerable: true,
        configurable: true
    });
    Greeter.prototype.greeting = function () {
        throw ''; // should not raise an error
    };
    __names(Greeter.prototype, ["greeting"]);
    return Greeter;
}());
