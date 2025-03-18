//// [tests/cases/compiler/importHelpersNoModule.ts] ////

//// [external.ts]
export class A { }
export class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}

//// [script.ts]
class A { }
class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}


//// [external.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
class A {
}
exports.A = A;
class B extends A {
}
exports.B = B;
@dec
class C {
    method(x) {
    }
}
//// [script.js]
class A {
}
class B extends A {
}
@dec
class C {
    method(x) {
    }
}
