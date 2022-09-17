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
@__metadata("design:paramtypes", [Number])
class C {
    constructor(x) { }
    @dec
    @__metadata("design:type", Function)
    @__metadata("design:paramtypes", [Number])
    @__metadata("design:returntype", void 0)
    method(x) { }
    @dec
    @__metadata("design:type", Number)
    @__metadata("design:paramtypes", [Number])
    set x(x) { }
    @dec
    @__metadata("design:type", Number)
    y;
    @dec
    @__metadata("design:type", Function)
    @__metadata("design:paramtypes", [Number])
    @__metadata("design:returntype", void 0)
    static method(x) { }
    @dec
    @__metadata("design:type", Number)
    @__metadata("design:paramtypes", [Number])
    static set x(x) { }
    @dec
    @__metadata("design:type", Number)
    static y;
}
(
@dec
@__metadata("design:paramtypes", [Number])
class C {
    constructor(x) { }
    @dec
    @__metadata("design:type", Function)
    @__metadata("design:paramtypes", [Number])
    @__metadata("design:returntype", void 0)
    method(x) { }
    @dec
    @__metadata("design:type", Number)
    @__metadata("design:paramtypes", [Number])
    set x(x) { }
    @dec
    @__metadata("design:type", Number)
    y;
    @dec
    @__metadata("design:type", Function)
    @__metadata("design:paramtypes", [Number])
    @__metadata("design:returntype", void 0)
    static method(x) { }
    @dec
    @__metadata("design:type", Number)
    @__metadata("design:paramtypes", [Number])
    static set x(x) { }
    @dec
    @__metadata("design:type", Number)
    static y;
});
