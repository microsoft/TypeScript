// @target: esnext
// @useDefineForClassFields: false

// @Filename: framework-hooks.ts
export const onInit = Symbol("onInit");

// @Filename: component.ts
import type { onInit } from "./framework-hooks";

interface Component {
  [onInit]?(): void;
}

type T = {
  [onInit]: any;
}

const o = {
  [onInit]: 0 // Error
};

class C {
  [onInit]: any; // Error (because class fields)
}

class D {
  [onInit] = 0; // Error
}

class E {
  [onInit]() {} // Error
}

abstract class F {
  abstract [onInit](): void;
}

class G {
  declare [onInit]: any;
}

declare class H {
  [onInit]: any;
}
