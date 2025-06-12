//// [tests/cases/compiler/typeParametersInStaticAccessors.ts] ////

//// [typeParametersInStaticAccessors.ts]
class foo<T> {
    static get Foo(): () => T { return null; }
    static set Bar(v: { v: T }) { }
} 

//// [typeParametersInStaticAccessors.js]
class foo {
    static get Foo() { return null; }
    static set Bar(v) { }
}
