//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClassStaticMethodAugmentation.ts] ////

//// [source.js]
export class Clazz {
    static method() { }
}

Clazz.method.prop = 5;

//// [source.js]
export class Clazz {
    static method() { }
}
Clazz.method.prop = 5;


//// [source.d.ts]
export class Clazz {
}
export namespace Clazz {
    function method(): void;
    namespace method {
        let prop: number;
    }
}
