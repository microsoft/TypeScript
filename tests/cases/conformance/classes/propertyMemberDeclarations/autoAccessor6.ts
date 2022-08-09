// @target: esnext, es2022, es2015
// @useDefineForClassFields: *

class C1 {
    accessor a: any;
}

class C2 extends C1 {
    a = 1;
}

class C3 extends C1 {
    get a() { return super.a; }
}
