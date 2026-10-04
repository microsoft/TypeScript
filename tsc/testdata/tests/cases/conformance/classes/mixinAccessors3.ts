// @strict: true
// @target: esnext
// @declaration: true

function mixin<T extends { new (...args: any[]): {} }>(superclass: T) {
  return class extends superclass {
    get name() {
      return "";
    }
  };
}

class BaseClass {
  set name(v: string) {}
}

// error
class MyClass extends mixin(BaseClass) { 
  get name() {
    return "";
  }
}
