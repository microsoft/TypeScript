//// [decoratorOnClassProperty3.ts]
declare function dec(target: any, propertyKey: string): void;

class C {
    public @dec prop;
}

//// [decoratorOnClassProperty3.js]
var C = (function () {
    function C() {
    }
    return C;
})();
public;
prop;
