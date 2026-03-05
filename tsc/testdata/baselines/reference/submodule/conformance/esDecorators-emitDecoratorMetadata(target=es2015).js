//// [tests/cases/conformance/esDecorators/esDecorators-emitDecoratorMetadata.ts] ////

//// [esDecorators-emitDecoratorMetadata.ts]
declare let dec: any;

@dec
class C {
    constructor(x: number) {}

    @dec
    method(x: number) {}

    @dec
    set x(x: number) {}

    @dec
    y: number;

    @dec
    static method(x: number) {}

    @dec
    static set x(x: number) {}

    @dec
    static y: number;
}

(@dec class C {
    constructor(x: number) {}

    @dec
    method(x: number) {}

    @dec
    set x(x: number) {}

    @dec
    y: number;

    @dec
    static method(x: number) {}

    @dec
    static set x(x: number) {}

    @dec
    static y: number;
});

//// [esDecorators-emitDecoratorMetadata.js]
"use strict";
class C {
    constructor(x) { }
    method(x) { }
    set x(x) { }
    static method(x) { }
    static set x(x) { }
}
(class C {
    constructor(x) { }
    method(x) { }
    set x(x) { }
    static method(x) { }
    static set x(x) { }
});
