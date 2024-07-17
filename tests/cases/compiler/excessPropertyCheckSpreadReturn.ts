// @strict: true
// @noemit: true

type FReturnType = {
    a?: any;
    b?: any;
}
const objWithAllowedKeys = { a: 2 }
const objWithForbiddenKeys = { c: 2 }
const objWithNoKeys = {}
const a = 2;
const c = 2;

function f1(): FReturnType {
    return { ...objWithAllowedKeys };
}

function f2(): FReturnType {
    return { ...objWithForbiddenKeys };
}

function f3(): FReturnType {
    return { ...objWithAllowedKeys, ...objWithForbiddenKeys };
}

function f4(): FReturnType {
    return { ...{ a: 2 }, ...{ c: 2 } };
}

function f5(): FReturnType {
    return { ...{ a: 2, c: 2 } };
}

function f6(): FReturnType {
    return { ...{ c: 2 }, ...{ b: 2 } };
}

function f7(): FReturnType {
    return { ...{ a: 2 }, ...objWithForbiddenKeys };
}

function f8(): FReturnType {
    return { ...{ c: 2 }, ...objWithAllowedKeys };
}

function f9(): FReturnType {
    return { ...{ c: 2 }, ...objWithForbiddenKeys };
}

function f10(): FReturnType {
    return { ...{ c: 2 }, ...objWithNoKeys };
}

function f11(): FReturnType {
    return { ...{...{ c: 2 }, ...objWithNoKeys } };
}

function f12(): FReturnType {
    return { a, ...{ c: 2 } };
}

function f13(): FReturnType {
    return { a, ...{ c } };
}

function f14(): FReturnType {
    return { ...{ c }, ...objWithAllowedKeys };
}
