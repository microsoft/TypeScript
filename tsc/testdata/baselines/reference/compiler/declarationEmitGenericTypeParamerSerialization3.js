//// [tests/cases/compiler/declarationEmitGenericTypeParamerSerialization3.ts] ////

//// [declarationEmitGenericTypeParamerSerialization3.ts]
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


//// [declarationEmitGenericTypeParamerSerialization3.js]
function mixin(superclass) {
    return class extends superclass {
    };
}
export function wrapper(value) {
    class BaseClass {
        accessor name = value;
    }
    return class MyClass extends mixin(BaseClass) {
        accessor name = value;
    };
}
export const Cls = wrapper("test");


//// [declarationEmitGenericTypeParamerSerialization3.d.ts]
export declare function wrapper<T>(value: T): {
    new (): {
        get name(): T;
        set name(arg: T);
    };
};
export declare const Cls: {
    new (): {
        get name(): string;
        set name(arg: string);
    };
};
