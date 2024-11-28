// @strict: true
// @lib: esnext
// @target: esnext
// @noImplicitOverride: true, false
// @declaration: true
// @emitDeclarationOnly: true

const sym: symbol = Symbol();

class Base1 {
  [sym]() {}
}

class Derived1 extends Base1 {
  override [sym]() {}
}

class Base2 {
  [sym]() {}
}

class Derived2 extends Base2 {
  [sym]() {}
}

class Base3 {}

class Derived3 extends Base3 {
  override [sym]() {}
}
