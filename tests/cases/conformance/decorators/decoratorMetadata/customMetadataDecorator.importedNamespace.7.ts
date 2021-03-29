// @target: es2019
// @module: esnext
// @moduleResolution: node
// @noTypesAndSymbols: true
// @noEmit: true
// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @metadataDecorator: Reflect.metadata
// @metadataDecoratorImportSource: foo
// @filename: global.d.ts
declare module "foo" {
    namespace Reflect {
        function metadata(target: number): void;
        function metadata(target: number, key: string, desc?: PropertyDescriptor): void;
        function metadata(target: number, key: string, parameterIndex: number): void;
    }
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
export {};