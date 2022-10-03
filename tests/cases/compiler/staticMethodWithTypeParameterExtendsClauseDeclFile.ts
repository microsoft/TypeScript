// @module: commonjs
// @declaration: true
class privateClass {
}

export class publicClass {
}

export class publicClassWithWithPrivateTypeParameters {
    private static myPrivateStaticMethod1<T extends privateClass>() { // do not emit extends clause
    }
    private myPrivateMethod1<T extends privateClass>() { // do not emit extends clause
    }
    private static myPrivateStaticMethod2<T extends publicClass>() { // do not emit extends clause
    }
    private myPrivateMethod2<T extends publicClass>() { // do not emit extends clause
    }
    public static myPublicStaticMethod<T extends publicClass>() {
    }
    public myPublicMethod<T extends publicClass>() {
    }
}
