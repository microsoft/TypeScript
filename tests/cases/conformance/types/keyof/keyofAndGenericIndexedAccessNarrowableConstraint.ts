// @noEmit: true
// @strict: true

export type Context = {
    V1: { a: string },
    V2: { b: string },
}

export function path<V extends keyof Context, K extends keyof Context[V]>(v: V, k: K)  {
    return `${v}.${k}` // ok
}

export function path2<K extends keyof Context[keyof Context]>(k: K)  {
    return `.${k}` // ok
}

export function path3<O extends Context, V extends keyof O, K extends keyof O[V]>(v: V, k: K)  {
    return `${v}.${k}` // error
}

export function path4<O extends Context[keyof Context], K extends keyof O>(k: K)  {
    return `.${k}` // error
}
