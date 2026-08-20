// @target: esnext
// @useDefineForClassFields: true
class A {
    m() { }
}
class B extends A {
    m = () => 1
}
