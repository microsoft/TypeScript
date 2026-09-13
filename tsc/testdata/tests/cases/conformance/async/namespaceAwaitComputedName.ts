// @target: esnext
// @module: esnext

declare const x: string;

namespace N {
  class A { [await x]() {} }
  export class B { [await x]() {} }
}

export {};
