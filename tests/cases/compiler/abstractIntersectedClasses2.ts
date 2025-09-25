// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62014

type Constructor = new (...args: any[]) => {};

function MixinA<T extends Constructor>(base: T) {
  abstract class Mixin extends base {
    abstract testMethod(): string;
  }

  return Mixin;
}

function MixinB<T extends Constructor>(base: T) {
  abstract class Mixin extends base {
    abstract testMethod(): string;
  }

  return Mixin;
}

class Base {}

// error
class ImplementationB extends MixinB(MixinA(Base)) {}

// error
class ImplementationA extends MixinA(Base) {}
