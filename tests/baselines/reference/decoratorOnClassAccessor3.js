//// [decoratorOnClassAccessor3.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    public @dec get accessor() { return 1; }
}

//// [decoratorOnClassAccessor3.js]
var C = (function () {
    function C() {
    }
    return C;
})();
public;
get;
accessor();
{
    return 1;
}
