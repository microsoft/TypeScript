//// [declarationSelfReferentialConstraint.ts] ////
export const object = {
    foo: <T extends Set<T> | []>(): void => { },
};
//// [declarationSelfReferentialConstraint.d.ts] ////
export declare const object: {
    foo: <T extends Set<T> | []>() => void;
};
