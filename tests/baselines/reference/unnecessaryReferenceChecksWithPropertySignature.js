//// [unnecessaryReferenceChecksWithPropertySignature.ts]
interface C {
  [C.a](): void;
  [C.b]: void;
}
class C {
  [C.c] = 1;
  static readonly a = Symbol();
  static readonly b = Symbol();
  static readonly c = Symbol();
}

class D {
  [D.a] = 0;
  static a = "a";
}

//// [unnecessaryReferenceChecksWithPropertySignature.js]
var _a, _b;
class C {
    constructor() {
        this[_a] = 1;
    }
}
_a = C.c;
C.a = Symbol();
C.b = Symbol();
C.c = Symbol();
class D {
    constructor() {
        this[_b] = 0;
    }
}
_b = D.a;
D.a = "a";
