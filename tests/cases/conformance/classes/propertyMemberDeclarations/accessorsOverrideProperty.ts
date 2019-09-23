// @target: esnext
// @useDefineForClassFields: true
class A {
    p = 'yep'
}
class B extends A {
    get p() { return 'oh no' } // error
}
class C {
   p = 101
}
class D extends C {
     _secret = 11
    get p() { return this._secret } // error
    set p(value) { this._secret = value } // error
}
