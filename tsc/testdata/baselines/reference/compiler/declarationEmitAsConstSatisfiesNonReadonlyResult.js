//// [tests/cases/compiler/declarationEmitAsConstSatisfiesNonReadonlyResult.ts] ////

//// [declarationEmitAsConstSatisfiesNonReadonlyResult.ts]
export const obj = {
    array: [
        { n: 1 },
        { n: 2 }
    ]
} as const satisfies {array?: Readonly<{n: unknown}>[]}

declare function foo<const T extends {array?: Readonly<{n: unknown}>[]}>(arg: T): T;

export const call = foo({
    array: [
        { n: 1 },
        { n: 2 }
    ]
})

//// [declarationEmitAsConstSatisfiesNonReadonlyResult.js]
export const obj = {
    array: [
        { n: 1 },
        { n: 2 }
    ]
};
export const call = foo({
    array: [
        { n: 1 },
        { n: 2 }
    ]
});


//// [declarationEmitAsConstSatisfiesNonReadonlyResult.d.ts]
export declare const obj: {
    readonly array: [{
        readonly n: 1;
    }, {
        readonly n: 2;
    }];
};
export declare const call: {
    readonly array: [{
        readonly n: 1;
    }, {
        readonly n: 2;
    }];
};
