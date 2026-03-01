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
export namespace t1 {
    let p: string;
    const getter: string;
}
export namespace t2 {
    let v: string;
    let setter: any;
}
export namespace t3 {
    let p_1: string;
    export { p_1 as p };
    export let value: string;
}
