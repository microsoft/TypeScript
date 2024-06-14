// @target: esnext
// @useDefineForClassFields: false
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/58436
const dec = (x: number, y: number, z: number, t: number) => (_: any, ctx: DecoratorContext): any => { };
const Foo = class {
    @dec(1, 3, 3, 1) field: undefined
    @dec(2, 2, 0, 0) static field: undefined
    @dec(3, 1, 4, 1) accessor accessor: undefined
    @dec(4, 0, 1, 0) static accessor accessor: undefined
    //               ~~~~~~~~~~~~~~~ along with compiler options above caused the following crash:
    //
    // Error: Debug Failure.
    //  at getClassThis (src\compiler\transformers\classFields.ts:906:22)
    //  at transformAutoAccessor (src\compiler\transformers\classFields.ts:948:43
    //  ...
}
