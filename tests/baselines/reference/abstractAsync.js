//// [abstractAsync.ts]
abstract class ShouldFailClass {
  async abstract badMethod(): Promise<number>;
}

//// [abstractAsync.js]
var ShouldFailClass = /** @class */ (function () {
    function ShouldFailClass() {
    }
    return ShouldFailClass;
}());
