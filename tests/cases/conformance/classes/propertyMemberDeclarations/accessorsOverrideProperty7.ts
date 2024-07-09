// @target: es5
// @useDefineForClassFields: true
abstract class A {
    abstract p = 'yep'
}
class B extends A {
    get p() { return 'oh no' } // error
}
