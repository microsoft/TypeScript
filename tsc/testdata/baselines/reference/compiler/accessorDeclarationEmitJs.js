//// [tests/cases/compiler/accessorDeclarationEmitJs.ts] ////

//// [a.js]
export const t1 = {
    p: 'value',
    get getter() {
        return 'value';
    },
}

export const t2 = {
    v: 'value',
    set setter(v) {},
}

export const t3 = {
    p: 'value',
    get value() {
        return 'value';
    },
    set value(v) {},
}




//// [a.d.ts]
export declare const t1: {
    p: string;
    readonly getter: string;
};
export declare const t2: {
    v: string;
    setter: any;
};
export declare const t3: {
    p: string;
    value: string;
};
