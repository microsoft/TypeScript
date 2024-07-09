//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-sourceMap.ts] ////

//// [esDecorators-classDeclaration-sourceMap.ts]
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


//// [esDecorators-classDeclaration-sourceMap.js]
@dec
@dec
class C {
    @dec
    @dec
    method() { }
    @dec
    @dec
    get x() { return 1; }
    @dec
    @dec
    set x(value) { }
    @dec
    @dec
    y = 1;
    @dec
    @dec
    accessor z = 1;
    @dec
    @dec
    static #method() { }
    @dec
    @dec
    static get #x() { return 1; }
    @dec
    @dec
    static set #x(value) { }
    @dec
    @dec
    static #y = 1;
    @dec
    @dec
    static accessor #z = 1;
}
//# sourceMappingURL=esDecorators-classDeclaration-sourceMap.js.map

//// [esDecorators-classDeclaration-sourceMap.d.ts]
declare var dec: any;
declare class C {
    #private;
    method(): void;
    get x(): number;
    set x(value: number);
    y: number;
    accessor z: number;
}
//# sourceMappingURL=esDecorators-classDeclaration-sourceMap.d.ts.map