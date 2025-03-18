//// [tests/cases/compiler/classExtendsInterface.ts] ////

//// [classExtendsInterface.ts]
interface Comparable {}
class A extends Comparable {}
class B implements Comparable {}

interface Comparable2<T> {}
class A2<T> extends Comparable2<T> {}
class B2<T> implements Comparable2<T> {}


//// [classExtendsInterface.js]
class A extends Comparable {
}
class B {
}
class A2 extends Comparable2 {
}
class B2 {
}
