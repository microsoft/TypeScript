//// [tests/cases/compiler/discriminatedUnionWithIndexSignature.ts] ////

//// [discriminatedUnionWithIndexSignature.ts]
export interface UnionAltA {
    type?: 'text';
}

export interface UnionAltB {
    type?: 'image' | 'video' | 'document';
}

export type ValueUnion = UnionAltA | UnionAltB;

export type MapOrSingleton =
    | {
        [key: string]: ValueUnion;
    }
    | ValueUnion;

const withoutAsConst: MapOrSingleton = {
    1: {
        type: 'text' /*as const*/,
    },
};

const withAsConst: MapOrSingleton = {
    1: {
        type: 'text' as const,
    },
};

//// [discriminatedUnionWithIndexSignature.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var withoutAsConst = {
    1: {
        type: 'text' /*as const*/,
    },
};
var withAsConst = {
    1: {
        type: 'text',
    },
};
