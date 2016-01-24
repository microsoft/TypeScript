//// [classAbstractMixedWithModifiers.ts]
abstract class A {
    abstract foo_a();
    
    public abstract foo_b();
    protected abstract foo_c();
    private abstract foo_d();
    
    abstract public foo_bb();
    abstract protected foo_cc();
    abstract private foo_dd();
    
    abstract static foo_d();
    
    static abstract foo_e();
}

//// [classAbstractMixedWithModifiers.js]
var A = (function () {
    function A() {
    }
    return A;
}());
