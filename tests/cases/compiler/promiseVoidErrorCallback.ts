//@target: ES6
interface T1 {
    __t1: string;
}

interface T2 {
    __t2: string;
}

interface T3 {
    __t3: string;
}

function f1(): Promise<T1> {
    return Promise.resolve({ __t1: "foo_t1" });
}

function f2(x: T1): T2 {
    return { __t2: x.__t1 + ":foo_21" };
}

var x3 = f1()
    .then(f2, (e: Error) => {
    throw e;
})
    .then((x: T2) => {
    return { __t3: x.__t2 + "bar" };
});