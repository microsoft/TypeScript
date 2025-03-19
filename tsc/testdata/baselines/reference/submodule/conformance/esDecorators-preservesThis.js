//// [tests/cases/conformance/esDecorators/esDecorators-preservesThis.ts] ////

//// [esDecorators-preservesThis.ts]
// https://github.com/microsoft/TypeScript/issues/53752

declare class DecoratorProvider {
    decorate<T>(this: DecoratorProvider, v: T, ctx: DecoratorContext): T;
}

declare const instance: DecoratorProvider;

// preserve `this` for access
class C {
    @instance.decorate
    method1() { }

    @(instance["decorate"])
    method2() { }

    // even in parens
    @((instance.decorate))
    method3() { }
}

// preserve `this` for `super` access
class D extends DecoratorProvider {
    m() {
        class C {
            @(super.decorate)
            method1() { }

            @(super["decorate"])
            method2() { }

            @((super.decorate))
            method3() { }
        }
    }
}


//// [esDecorators-preservesThis.js]
// preserve `this` for access
class C {
    @instance.decorate
    method1() { }
    @(instance["decorate"])
    method2() { }
    // even in parens
    @((instance.decorate))
    method3() { }
}
// preserve `this` for `super` access
class D extends DecoratorProvider {
    m() {
        class C {
            @(super.decorate)
            method1() { }
            @(super["decorate"])
            method2() { }
            @((super.decorate))
            method3() { }
        }
    }
}
