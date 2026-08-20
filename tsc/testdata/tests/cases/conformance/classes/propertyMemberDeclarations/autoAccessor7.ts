// @target: esnext, es2022, es2015
// @useDefineForClassFields: *

abstract class C1 {
    abstract accessor a: any;
}

class C2 extends C1 {
    accessor a = 1;
}

class C3 extends C1 {
    get a() { return 1; }
}
