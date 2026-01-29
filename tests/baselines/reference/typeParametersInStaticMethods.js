//// [tests/cases/compiler/typeParametersInStaticMethods.ts] ////

//// [typeParametersInStaticMethods.ts]
class foo<T> {
    static M(x: (x: T) => { x: { y: T } }) {
    }
} 

//// [typeParametersInStaticMethods.js]
class foo {
    static M(x) {
    }
}
