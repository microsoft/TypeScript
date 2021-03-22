// @target: esnext, es6, es5
// @useDefineForClassFields: false
// @experimentalDecorators: true

declare const foo: any;

@foo
class C {
    static a = 1;
    static b = this.a + 1;
}

@foo
class D extends C {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
}
