//// [tests/cases/compiler/isolatedDeclarationsAsConstNestedObjects.ts] ////

//// [isolatedDeclarationsAsConstNestedObjects.ts]
export const obj1 = { $and: [{ $expr: true }] } as const;


//// [isolatedDeclarationsAsConstNestedObjects.js]
export const obj1 = { $and: [{ $expr: true }] };


//// [isolatedDeclarationsAsConstNestedObjects.d.ts]
export declare const obj1: {
    readonly $and: readonly [{
        readonly $expr: true;
    }];
};
