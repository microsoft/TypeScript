function f1(c1: Function, c2: () => object,  callable: typeof c1 | typeof c2) {
    const a = c1();
    const b = c2();
    const c = callable();
}

function f2(fetcherParams: object | (() => object)) {
    const data = typeof fetcherParams === 'function'
        ? fetcherParams()
        : fetcherParams
}
