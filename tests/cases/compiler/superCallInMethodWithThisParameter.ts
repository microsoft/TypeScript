// @strict: true
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/55155

class Animal<T> {
  eat<T>(this: Animal<T>) {
    throw new Error("This doesnt matter");
  }
}

class Dog<T> extends Animal<T> {
  eat<U>(this: Dog<U>) {
    super.eat();
  }
}
