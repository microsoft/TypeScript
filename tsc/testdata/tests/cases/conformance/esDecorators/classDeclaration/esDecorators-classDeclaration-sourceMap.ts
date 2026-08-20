// @target: esnext, es2022, es2015
// @module: esnext
// @sourceMap: true
// @declaration: true
// @declarationMap: true

declare var dec: any;

@dec
@dec
class C {
    @dec
    @dec
    method() {}

    @dec
    @dec
    get x() { return 1; }

    @dec
    @dec
    set x(value: number) { }

    @dec
    @dec
    y = 1;

    @dec
    @dec
    accessor z = 1;

    @dec
    @dec
    static #method() {}

    @dec
    @dec
    static get #x() { return 1; }

    @dec
    @dec
    static set #x(value: number) { }

    @dec
    @dec
    static #y = 1;

    @dec
    @dec
    static accessor #z = 1;
}
