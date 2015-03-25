//// [decoratorOnClassMethod3.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    public @dec method() {}
}

//// [decoratorOnClassMethod3.js]
var C = (function () {
    function C() {
    }
    return C;
})();
public;
method();
{
}
