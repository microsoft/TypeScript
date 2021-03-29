// @target: es2019
// @module: esnext
// @moduleResolution: node
// @noTypesAndSymbols: true
// @noEmit: true
// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @metadataDecorator: metadata
// @metadataDecoratorImportSource: foo
// @filename: global.d.ts
declare module "foo" {
    function metadata(): void;
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