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

function baz () {
    const a = {
        a: 1,
        b: "",
        c: false
    }
    for (var k in a) {
        const c = a[k]
    }
}
