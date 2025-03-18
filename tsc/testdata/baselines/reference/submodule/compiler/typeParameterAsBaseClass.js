//// [tests/cases/compiler/typeParameterAsBaseClass.ts] ////

//// [typeParameterAsBaseClass.ts]
class C<T> extends T {}
class C2<T> implements T {}

//// [typeParameterAsBaseClass.js]
class C extends T {
}
class C2 {
}
