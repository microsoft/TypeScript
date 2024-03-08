/// <reference path='fourslash.ts' />

////type Base = { ax: number; ay: string };
////type BaseKeys = keyof Base;
////type MappedIndirect = { [K in BaseKeys]: boolean };
////class MappedImpl implements MappedIndirect { }

// https://github.com/microsoft/TypeScript/issues/49811
verify.codeFix({
    description: "Implement interface 'MappedIndirect'",
    newFileContent:
        `type Base = { ax: number; ay: string };
type BaseKeys = keyof Base;
type MappedIndirect = { [K in BaseKeys]: boolean };
class MappedImpl implements MappedIndirect {
    ax: boolean;
    ay: boolean;
}`,
});
