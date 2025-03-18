//// [tests/cases/compiler/thisConditionalOnMethodReturnOfGenericInstance.ts] ////

//// [thisConditionalOnMethodReturnOfGenericInstance.ts]
class A<T> {
    unmeasurableUsage!: {[K in keyof T]-?: T[K]};
}

class B<T> extends A<T> {
    method(): string | (this extends C ? undefined : null) {
        return "";
    }
}

class C<T = any> extends B<T> {
    marker!: string;
}

const x = new C<{}>();

const y = x.method(); // usage flags `method` in `B` as circular and marks `y` as the error-any type


//// [thisConditionalOnMethodReturnOfGenericInstance.js]
class A {
    unmeasurableUsage;
}
class B extends A {
    method() {
        return "";
    }
}
class C extends B {
    marker;
}
const x = new C();
const y = x.method();
