/// <reference path='fourslash.ts' />

////type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
////
////export type DeepPartial<T> = T extends Builtin ? T :
////    T extends Array<infer U> ? Array<DeepPartial<U>> :
////        T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> :
////            T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> } : Partial<T>;
////
////export interface Nested {
////    field: string;
////}
////
////interface Foo {
////    request(): DeepPartial<{ nested1: Nested; test2: Nested }>;
////}
////[|export class C implements Foo {}|]

verify.codeFix({
    description: "Implement interface 'Foo'",
    newRangeContent:
`export class C implements Foo {
    request(): { nested1?: { field?: string; }; test2?: { field?: string; }; } {
        throw new Error("Method not implemented.");
    }
}`,
});
