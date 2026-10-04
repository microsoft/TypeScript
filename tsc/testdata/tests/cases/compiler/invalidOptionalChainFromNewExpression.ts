// @target: es2015
class A {
    b() {}
}

new A?.b()   // error
new A()?.b() // ok
