/// <reference path="fourslash.ts" />

// @Filename: /o.ts
////export namespace O {
////    export const InnerObjectExported = {
////       A: "a"
////    } as const
////    const InnerObjectNotExported = {
////       B: "b"
////    } as const
////    export type InnerObjectType = {
////       [InnerObjectExported.A]: number
////       [InnerObjectNotExported.B]: number
////    }
//// }
//// export const OuterObjectExported = {
////    C: "c"
//// } as const
//// const OuterObjectNotExported = {
////    D: "d"
//// } as const
//// export type OuterObjectType = O.InnerObjectType & {
////    [OuterObjectExported.C]: number
////    [OuterObjectNotExported.D]: number
//// }

// @Filename: /m.ts
////export namespace M {
////    export const InnerObjectExported = {
////        A: "a"
////    } as const
////    const InnerObjectNotExported = {
////        B: "b"
////    } as const
////    export type InnerObjectType = {
////        [InnerObjectExported.A]: number
////        [InnerObjectNotExported.B]: number
////    }
////}
////export const OuterObjectExported = {
////    C: "c"
////} as const
////const OuterObjectNotExported = {
////    D: "d"
////} as const
////export type OuterObjectType = M.InnerObjectType & {
////    [OuterObjectExported.C]: number
////    [OuterObjectNotExported.D]: number
////}
////export * as omega from './o'

// @Filename: /n.ts
////namespace N {
////    export const InnerObjectExported = {
////        A: "a"
////    } as const
////    const InnerObjectNotExported = {
////        B: "b"
////    } as const
////    export type InnerObjectType = {
////        [InnerObjectExported.A]: number
////        [InnerObjectNotExported.B]: number
////    }
////}
////const OuterObject = {
////    C: "c"
////} as const
////type OuterObjectType = N.InnerObjectType & {
////    [OuterObject.C]: number
////}
////import * as mu from './m'
////declare const x1: N.InnerObjectType;
////declare const x2: OuterObjectType;
////declare const x3: mu.M.InnerObjectType;
////declare const x4: mu.OuterObjectType;
////declare const x5: mu.omega.O.InnerObjectType;
////declare const x6: mu.omega.OuterObjectType;
////x1./*a*/;
////x2./*b*/;
////x3./*c*/;
////x4./*d*/;
////x5./*e*/;
////x6./*f*/;

verify.baselineCompletions({
    includeCompletionsWithInsertText: true,
});