// @strict: true
// @target: esnext
// @declaration: true

function mixin<T extends { new (...args: any[]): {} }>(superclass: T) {
  return class extends superclass {};
}

export function wrapper<T>(value: T) {
  class BaseClass {
    accessor name = value;
  }
  return class MyClass extends mixin(BaseClass) {
    accessor name = value;
  }
}

export const Cls = wrapper("test");
