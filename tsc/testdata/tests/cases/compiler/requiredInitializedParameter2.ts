// @target: es2015
// @strict: false
interface I1 {
    method();
}

class C1 implements I1 {
    method(a = 0, b) { }
}