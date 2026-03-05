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
"use strict";
class C {
    method() { }
    get x() { return 1; }
    set x(value) { }
    y = 1;
    #z_accessor_storage = 1;
    get z() { return this.#z_accessor_storage; }
    set z(value) { this.#z_accessor_storage = value; }
    static #method() { }
    static get #x() { return 1; }
    static set #x(value) { }
    static #y = 1;
    static #z_1_accessor_storage = 1;
    static get #z() { return C.#z_1_accessor_storage; }
    static set #z(value) { C.#z_1_accessor_storage = value; }
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