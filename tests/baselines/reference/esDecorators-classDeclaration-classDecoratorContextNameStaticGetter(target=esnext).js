//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-classDecoratorContextNameStaticGetter.ts] ////

//// [esDecorators-classDeclaration-classDecoratorContextNameStaticGetter.ts]
// https://github.com/microsoft/TypeScript/issues/62870
// ClassDecoratorContext.name should use the actual class name, not the static name getter

const decorate = (_: unknown, ctx: ClassDecoratorContext) => {
    console.log('decorate(%o)', ctx.name);
};

// Named class with static name getter - ctx.name should be "A", not the getter value
@decorate
class A {
    static get name() {
        return 2434;
    }
}

// Named class with static name property - ctx.name should be "B", not the property value
@decorate
class B {
    static name = "not B";
}

// Named class without overriding name - ctx.name should be "C"
@decorate
class C {
}


//// [esDecorators-classDeclaration-classDecoratorContextNameStaticGetter.js]
// https://github.com/microsoft/TypeScript/issues/62870
// ClassDecoratorContext.name should use the actual class name, not the static name getter
const decorate = (_, ctx) => {
    console.log('decorate(%o)', ctx.name);
};
// Named class with static name getter - ctx.name should be "A", not the getter value
@decorate
class A {
    static get name() {
        return 2434;
    }
}
// Named class with static name property - ctx.name should be "B", not the property value
@decorate
class B {
    static name = "not B";
}
// Named class without overriding name - ctx.name should be "C"
@decorate
class C {
}
