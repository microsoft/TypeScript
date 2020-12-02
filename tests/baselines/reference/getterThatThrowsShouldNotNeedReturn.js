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
    var proto_1 = Greeter.prototype;
    Object.defineProperty(proto_1, "greet", {
        get: function () {
            throw ''; // should not raise an error
        },
        enumerable: false,
        configurable: true
    });
    proto_1.greeting = function () {
        throw ''; // should not raise an error
    };
    return Greeter;
}());
