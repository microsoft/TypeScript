// @target: esnext
// @noImplicitOverride: true

const foo = Symbol();
class A { }

class B extends A {
    override [foo]() { }
}
