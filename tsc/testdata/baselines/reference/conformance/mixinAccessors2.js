//// [tests/cases/conformance/classes/mixinAccessors2.ts] ////

//// [mixinAccessors2.ts]
function mixin<T extends { new (...args: any[]): {} }>(superclass: T) {
  return class extends superclass {
    accessor name = "";
  };
}

class BaseClass {
  accessor name = "";
}

class MyClass extends mixin(BaseClass) {
  accessor name = "";
}


//// [mixinAccessors2.js]
"use strict";
function mixin(superclass) {
    return class extends superclass {
        accessor name = "";
    };
}
class BaseClass {
    accessor name = "";
}
class MyClass extends mixin(BaseClass) {
    accessor name = "";
}


//// [mixinAccessors2.d.ts]
declare function mixin<T extends {
    new (...args: any[]): {};
}>(superclass: T): {
    new (...args: any[]): {
        get name(): string;
        set name(arg: string);
    };
} & T;
declare class BaseClass {
    accessor name: string;
}
declare const MyClass_base: {
    new (...args: any[]): {
        get name(): string;
        set name(arg: string);
    };
} & typeof BaseClass;
declare class MyClass extends MyClass_base {
    accessor name: string;
}
