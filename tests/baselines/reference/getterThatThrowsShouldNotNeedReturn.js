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
var Greeter = (function () {
    function Greeter() {
    }
    Object.defineProperty(Greeter.prototype, "greet", {
        get: function () {
            throw '';
        },
        enumerable: true,
        configurable: true
    });
    Greeter.prototype.greeting = function () {
        throw '';
    };
    return Greeter;
})();
