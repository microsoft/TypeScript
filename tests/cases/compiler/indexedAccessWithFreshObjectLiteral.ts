// @strict: true

function foo (id: string) {
    return {
        a: 1,
        b: "",
        c: true
    }[id]
}

function bar (id: 'a' | 'b') {
    return {
        a: 1,
        b: "",
        c: false
    }[id]
}

function baz(id: string) {
    return ({
        a: 123,
        b: ""
    } as Record<string, number | string>)[id]
}

function bazz(id: string) {
    return ({
        a: 123,
        b: ""
    } as { [k: string]: string | number})[id]
}
