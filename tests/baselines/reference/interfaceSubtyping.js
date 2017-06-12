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
var Camera = (function () {
    function Camera(str) {
        this.str = str;
    }
    var proto_1 = Camera.prototype;
    proto_1.foo = function () { return "s"; };
    return Camera;
}());
