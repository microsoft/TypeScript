// @target: es2015
// @strict: false
//@declaration: true
interface I1 {
    method();
}

class C1 implements I1 {
    method(a = 0, b?) { }
}