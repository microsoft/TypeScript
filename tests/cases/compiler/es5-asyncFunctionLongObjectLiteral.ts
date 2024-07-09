// @lib: es5,es2015.promise
// @target: ES5

// the generated code from both should be similar

const fooShort = async () => {
    return {
        a: await Promise.resolve(0),
        b: await Promise.resolve(1),
        c: await Promise.resolve(2),
        d: await Promise.resolve(3),
        e: await Promise.resolve(4),
    };
}

const fooLong = async () => {
    return {
        a: await Promise.resolve(0),
        b: await Promise.resolve(1),
        c: await Promise.resolve(2),
        d: await Promise.resolve(3),
        e: await Promise.resolve(4),
        f: await Promise.resolve(5),
        g: await Promise.resolve(6),
        h: await Promise.resolve(7),
        i: await Promise.resolve(8),
        j: await Promise.resolve(9),
    };
}
