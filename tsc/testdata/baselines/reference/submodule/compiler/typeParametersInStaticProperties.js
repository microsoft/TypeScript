//// [tests/cases/compiler/typeParametersInStaticProperties.ts] ////

//// [typeParametersInStaticProperties.ts]
class foo<T> {
    static P: T;
} 

//// [typeParametersInStaticProperties.js]
class foo {
    static P;
}
