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
@dec
class C {
    constructor(x) { }
    @dec
    method(x) { }
    @dec
    set x(x) { }
    @dec
    y;
    @dec
    static method(x) { }
    @dec
    static set x(x) { }
    @dec
    static y;
}
(
@dec
class C {
    constructor(x) { }
    @dec
    method(x) { }
    @dec
    set x(x) { }
    @dec
    y;
    @dec
    static method(x) { }
    @dec
    static set x(x) { }
    @dec
    static y;
});
