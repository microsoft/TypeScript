//// [unnecessaryReferenceChecksWithPropertySignature.ts]
interface C {
  [C.a](): void;
  [C.b]: void;
}
class C {
  static readonly a = Symbol();
  static readonly b = Symbol();
}


//// [unnecessaryReferenceChecksWithPropertySignature.js]
class C {
}
C.a = Symbol();
C.b = Symbol();
