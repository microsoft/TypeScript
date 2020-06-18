//// [tests/cases/conformance/externalModules/typeOnly/computedPropertyName.ts] ////

//// [framework-hooks.ts]
export const onInit = Symbol("onInit");

//// [component.ts]
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


//// [framework-hooks.js]
export const onInit = Symbol("onInit");
//// [component.js]
var _a;
const o = {
    [onInit]: 0 // Error
};
class C {
}
class D {
    constructor() {
        this[_a] = 0; // Error
    }
}
_a = onInit;
class E {
    [onInit]() { } // Error
}
class F {
}
class G {
}
export {};
