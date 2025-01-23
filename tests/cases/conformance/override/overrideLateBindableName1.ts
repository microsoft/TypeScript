// @strict: true
// @lib: esnext
// @target: esnext
// @noImplicitOverride: true, false
// @declaration: true
// @emitDeclarationOnly: true

const prop = "foo"

class Base1 {
  [prop]() {}
}

class Derived1 extends Base1 {
  override [prop]() {}
}

class Base2 {
  [prop]() {}
}

class Derived2 extends Base2 {
  [prop]() {}
}

class Base3 {}

class Derived3 extends Base3 {
  override [prop]() {}
}
