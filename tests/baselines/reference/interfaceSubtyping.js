//// [interfaceSubtyping.ts]
interface iface {
    foo(): void;
}
class Camera implements iface{
    constructor (public str: string) {
    }
    foo() {  return "s";   }
}


//// [interfaceSubtyping.js]
var Camera = /** @class */ (function () {
    function Camera(str) {
        this.str = str;
    }
    Camera.prototype.foo = function () { return "s"; };
    return Camera;
}());
