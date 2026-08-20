// @declaration: true
// @isolatedDeclarations: true 
// @declarationMap: false
// @strict: true
// @target: ESNext

export let o = {
    a: 1,
    b: ""
}

export let oBad = {
    a: Math.random(),
}
export const V = 1;
export let oBad2 = {
    a: {
        b: Math.random(),
    },
    c: {
        d: 1,
        e: V,
    }
}

export let oWithMethods = {
    method() { },
    okMethod(): void { },
    a: 1,
    bad() { },
    e: V,
}
export let oWithMethodsNested = {
    foo: {
        method() { },
        a: 1,
        okMethod(): void { },
        bad() { }
    }
}



export let oWithAccessor = {
    get singleGetterBad() { return 0 },
    set singleSetterBad(value) { },

    get getSetBad() { return 0 },
    set getSetBad(value) { },

    get getSetOk(): number { return 0 },
    set getSetOk(value) { },

    get getSetOk2() { return 0 },
    set getSetOk2(value: number) { },
    
    get getSetOk3(): number { return 0 },
    set getSetOk3(value: number) { },
}

function prop<T>(v: T): T { return v }

const s: unique symbol = Symbol();
const str: string = "";
enum E {
    V = 10,
}
export const oWithComputedProperties = {
    [1]: 1,
    [1 + 3]: 1,
    [prop(2)]: 2,
    [s]: 1,
    [E.V]: 1,
    [str]: 0,
}

const part = { a: 1 };

export const oWithSpread = {
    b: 1,
    ...part,
    c: 1,
    part,
}


export const oWithSpread2 = {
    b: 1,
    nested: {
        ...part,
    },
    c: 1,
}
