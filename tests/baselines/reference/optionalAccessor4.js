//// [optionalAccessor4.ts]
class C {
    get x?() { return '' }
    set x?(value: string) {}
}

const foo: C = { };


//// [optionalAccessor4.js]
"use strict";
class C {
    get x() { return ''; }
    set x(value) { }
}
const foo = {};
