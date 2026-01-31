//// [tests/cases/compiler/indexSignatureWithoutTypeAnnotation1.ts] ////

//// [indexSignatureWithoutTypeAnnotation1.ts]
class C {
  [a: number];
}

//// [indexSignatureWithoutTypeAnnotation1.js]
class C {
}
