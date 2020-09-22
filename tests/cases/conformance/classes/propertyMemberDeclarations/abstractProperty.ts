// @target: es2015,esnext
// @useDefineForClassFields: true
abstract class A {
    protected abstract x: string;
    public foo() {
        console.log(this.x);
    }
}

class B extends A {
    protected x = 'B.x';
}

class C extends A {
    protected get x() { return 'C.x' };
}
