// @declaration: true
// @lib: es6

// Note that both of the following have an `any` in their return type from where we bottom out the type printout
// for having too many instances of the same symbol nesting.

// Slightly simplified repro from https://github.com/microsoft/TypeScript/issues/30732 so it's easier to read and debug
export type Key<U> = keyof U;
export type Value<K extends Key<U>, U> = U[K];
export const updateIfChanged = <T>(t: T) => {
    const reduce = <U>(u: U, update: (u: U) => T) => {
        const set = (newU: U) => Object.is(u, newU) ? t : update(newU);
        return Object.assign(
            <K extends Key<U>>(key: K) =>
                reduce<Value<K, U>>(u[key as keyof U] as Value<K, U>, (v: Value<K, U>) => {
                    return update(Object.assign(Array.isArray(u) ? [] : {}, u, { [key]: v }));
                }),
            { map: (updater: (u: U) => U) => set(updater(u)), set });
    };
    return reduce<T>(t, (t: T) => t);
};

// example from https://github.com/microsoft/TypeScript/issues/31605

export const testRecFun = <T extends Object>(parent: T) => {
    return {
        result: parent,
        deeper: <U extends Object>(child: U) =>
            testRecFun<T & U>({ ...parent, ...child })
    };
}


let p1 = testRecFun({ one: '1' })
void p1.result.one;
let p2 = p1.deeper({ two: '2' })
void p2.result.one;
void p2.result.two;
let p3 = p2.deeper({ three: '3' })
void p3.result.one;
void p3.result.two;
void p3.result.three;
