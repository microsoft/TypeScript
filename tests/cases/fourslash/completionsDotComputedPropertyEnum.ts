/// <reference path="fourslash.ts" />

// @Filename: /o.ts
////export namespace O {
////    export enum InnerEnumExported {
////       A = "a"
////    }
////    enum InnerEnumNotExported {
////       B = "b"
////    }
////    export type InnerObjectType = {
////       [InnerEnumExported.A]: number
////       [InnerEnumNotExported.B]: number
////    }
//// }
//// export enum OuterEnumExported {
////    C = "c"
//// }
//// enum OuterEnumNotExported {
////    D = "d"
//// }
//// export type OuterObjectType = O.InnerObjectType & {
////    [OuterEnumExported.C]: number
////    [OuterEnumNotExported.D]: number
//// }

// @Filename: /m.ts
////export namespace M {
////    export enum InnerEnumExported {
////        A = "a"
////    }
////    enum InnerEnumNotExported {
////        B = "b"
////    }
////    export type InnerObjectType = {
////        [InnerEnumExported.A]: number
////        [InnerEnumNotExported.B]: number
////    }
////}
////export enum OuterEnumExported {
////    C = "c"
////}
////enum OuterEnumNotExported {
////    D = "d"
////}
////export type OuterObjectType = M.InnerObjectType & {
////    [OuterEnumExported.C]: number
////    [OuterEnumNotExported.D]: number
////}
////export * as omega from './o'

// @Filename: /n.ts
////namespace N {
////    export enum InnerEnumExported {
////        A = "a"
////    }
////    enum InnerEnumNotExported {
////        B = "b"
////    }
////    export type InnerObjectType = {
////        [InnerEnumExported.A]: number
////        [InnerEnumNotExported.B]: number
////    }
////}
////enum OuterEnum {
////    C = "c"
////}
////type OuterObjectType = N.InnerObjectType & {
////    [OuterEnum.C]: number
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
