//// [tests/cases/conformance/classes/mixinAccessors4.ts] ////

//// [mixinAccessors4.ts]
// https://github.com/microsoft/TypeScript/issues/44938

class A {
  constructor(...args: any[]) {}
  get myName(): string {
    return "A";
  }
}

function Mixin<T extends typeof A>(Super: T) {
  return class B extends Super {
    get myName(): string {
      return "B";
    }
  };
}

class C extends Mixin(A) {
  get myName(): string {
    return "C";
  }
}


//// [mixinAccessors4.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/44938
class A {
    constructor(...args) { }
    get myName() {
        return "A";
    }
}
function Mixin(Super) {
    return class B extends Super {
        get myName() {
            return "B";
        }
    };
}
class C extends Mixin(A) {
    get myName() {
        return "C";
    }
}


//// [mixinAccessors4.d.ts]
declare class A {
    constructor(...args: any[]);
    get myName(): string;
}
declare function Mixin<T extends typeof A>(Super: T): {
    new (...args: any[]): {
        get myName(): string;
    };
} & T;
declare const C_base: {
    new (...args: any[]): {
        get myName(): string;
    };
} & typeof A;
declare class C extends C_base {
    get myName(): string;
}
