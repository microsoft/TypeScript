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
var __esMetadata = (this && this.__esMetadata) || function (k, v) {
    return function (_, c) {
        c.metadata[k] = v;
    }
};
@dec
@__esMetadata("design:typeinfo", {
    paramTypes: () => [Number]
})
class C {
    constructor(x) { }
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Function,
        paramTypes: () => [Number],
        returnType: () => void 0
    })
    method(x) { }
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Number,
        paramTypes: () => [Number]
    })
    set x(x) { }
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Number
    })
    y;
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Function,
        paramTypes: () => [Number],
        returnType: () => void 0
    })
    static method(x) { }
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Number,
        paramTypes: () => [Number]
    })
    static set x(x) { }
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Number
    })
    static y;
}
(
@dec
@__esMetadata("design:typeinfo", {
    paramTypes: () => [Number]
})
class C {
    constructor(x) { }
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Function,
        paramTypes: () => [Number],
        returnType: () => void 0
    })
    method(x) { }
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Number,
        paramTypes: () => [Number]
    })
    set x(x) { }
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Number
    })
    y;
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Function,
        paramTypes: () => [Number],
        returnType: () => void 0
    })
    static method(x) { }
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Number,
        paramTypes: () => [Number]
    })
    static set x(x) { }
    @dec
    @__esMetadata("design:typeinfo", {
        type: () => Number
    })
    static y;
});
