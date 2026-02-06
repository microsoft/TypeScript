//// [tests/cases/compiler/reachabilityChecksNoCrash1.ts] ////

//// [reachabilityChecksNoCrash1.ts]
export async function arrayFromAsync<T>(asyncIterable!: AsyncIterable<T>): Promise<T[]> {
    const out = [];
    for await (const v of asyncIterable) {
        out.push(await v);
    }
    return out;
}


//// [reachabilityChecksNoCrash1.js]
 > ;
Promise < T[] > {
    const: out = [],
    for: await (), const: v, of, asyncIterable,
    out, : .push(await v)
};
return out;
;
export {};
