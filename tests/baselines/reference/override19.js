//// [override19.ts]
type Foo = abstract new(...args: any) => any;
declare function CreateMixin<C extends Foo, T extends Foo>(Context: C, Base: T): T & {
   new (...args: any[]): { context: InstanceType<C> }
}
class Context {}

class A {
    doSomething() {}
}

class B extends CreateMixin(Context, A) {
   override foo() {} // Remove override
}

class C extends CreateMixin(Context, A) {
    override doSomethang() {} // Suggestion 'doSomething'
}


//// [override19.js]
class Context {
}
class A {
    doSomething() { }
}
class B extends CreateMixin(Context, A) {
    foo() { } // Remove override
}
class C extends CreateMixin(Context, A) {
    doSomethang() { } // Suggestion 'doSomething'
}
