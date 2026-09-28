//// [tests/cases/compiler/staticFieldSelfReferenceInGenericClassExpression.ts] ////

//// [staticFieldSelfReferenceInGenericClassExpression.ts]
function id<T>(x: T): T {
    return x;
}

const Foo = id(class {
    static readonly foo = id(42);
});

const Ok = class {
    static readonly foo = id(42);
};


//// [staticFieldSelfReferenceInGenericClassExpression.js]
"use strict";
function id(x) {
    return x;
}
const Foo = id(class {
    static foo = id(42);
});
const Ok = class {
    static foo = id(42);
};
