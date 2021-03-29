// @target: es2019
// @module: esnext
// @moduleResolution: node
// @noTypesAndSymbols: true
// @noEmit: true
// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @metadataDecorator: Reflect.metadata
// @filename: global.d.ts
declare namespace Reflect {
    function metadata(target: Function): true;
    function metadata(target: object, key: string, desc?: PropertyDescriptor): true;
    function metadata(target: object, key: string, parameterIndex: number): true;
}
declare const dec: any;
// @filename: main.ts
@dec
class C {
    @dec x!: number;

    constructor(x: number) {}

    @dec
    method(@dec x: number): string { return ""; }

    @dec
    get accessor(): string { return ""; }
}