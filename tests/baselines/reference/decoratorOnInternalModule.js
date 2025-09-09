//// [tests/cases/conformance/decorators/invalid/decoratorOnInternalModule.ts] ////

//// [decoratorOnInternalModule.ts]
declare function dec<T>(target: T): T;

@dec
namespace M {
    
}

//// [decoratorOnInternalModule.js]
