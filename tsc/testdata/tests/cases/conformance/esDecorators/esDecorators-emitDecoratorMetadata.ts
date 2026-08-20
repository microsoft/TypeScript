// @target: esnext, es2022, es2015, es5
// @noEmitHelpers: true
// @emitDecoratorMetadata: true
// @noTypesAndSymbols: true

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