//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractManyKeywords.ts] ////

//// [classAbstractManyKeywords.ts]
export default abstract class A {}
export abstract class B {}
default abstract class C {}
import abstract class D {}

//// [classAbstractManyKeywords.js]
export default class A {
}
export class B {
}
class C {
}
class D {
}
