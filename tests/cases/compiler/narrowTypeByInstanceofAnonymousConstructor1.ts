// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57317

function MakeClass<T>(someStuff: T) {
  return class {
    someStuff = someStuff;
  };
}

const MadeClassNumber = MakeClass(123);

declare const someInstance: unknown;
if (someInstance instanceof MadeClassNumber) {
  someInstance.someStuff;
}
