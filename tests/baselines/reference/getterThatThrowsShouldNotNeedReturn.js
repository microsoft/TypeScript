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
var Greeter = /** @class */ (function () {
    function Greeter() {
    }
    var Greeter_prototype = Greeter.prototype;
    Object.defineProperty(Greeter_prototype, "greet", {
        get: function () {
            throw ''; // should not raise an error
        },
        enumerable: false,
        configurable: true
    });
    Greeter_prototype.greeting = function () {
        throw ''; // should not raise an error
    };
    return Greeter;
}());
