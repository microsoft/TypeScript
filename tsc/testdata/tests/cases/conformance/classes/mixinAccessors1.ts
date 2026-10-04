// @strict: true
// @target: esnext
// @lib: dom,esnext
// @declaration: true

// https://github.com/microsoft/TypeScript/issues/58790

function mixin<T extends { new (...args: any[]): {} }>(superclass: T) {
  return class extends superclass {
    get validationTarget(): HTMLElement {
      return document.createElement("input");
    }
  };
}

class BaseClass {
  get validationTarget(): HTMLElement {
    return document.createElement("div");
  }
}

class MyClass extends mixin(BaseClass) {
  get validationTarget(): HTMLElement {
    return document.createElement("select");
  }
}