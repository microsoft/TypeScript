//// [tests/cases/compiler/declarationEmitKeywordPropertyNames.ts] ////

//// [declarationEmitKeywordPropertyNames.ts]
export const a = {
    foo: "foo",
    bar: "bar",
    buzz: "buzz",
    new: "new",
    delete: "delete",
    break: "break",
    continue: "continue",
};

export const b = {
    foo: "foo",
    bar: "bar",
    buzz: "buzz",
    new: "new",
    delete: "delete",
    break: "break",
    continue: "continue",
} as const;




//// [declarationEmitKeywordPropertyNames.d.ts]
export declare const a: {
    foo: string;
    bar: string;
    buzz: string;
    new: string;
    delete: string;
    break: string;
    continue: string;
};
export declare const b: {
    readonly foo: "foo";
    readonly bar: "bar";
    readonly buzz: "buzz";
    readonly new: "new";
    readonly delete: "delete";
    readonly break: "break";
    readonly continue: "continue";
};
