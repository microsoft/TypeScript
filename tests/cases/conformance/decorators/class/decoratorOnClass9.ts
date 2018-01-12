// @target:es5
// @experimentaldecorators: true
declare var dec: any;

class A {}

// https://github.com/Microsoft/TypeScript/issues/16417
@dec
class B extends A {
    static x = 1;
    static y = B.x;
    m() {
        return B.x;
    }
}