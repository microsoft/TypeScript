// @noEmit: true
// @strict: true

export type Context = {
    V1: { "a": string },
    V2: { "b": string },
}

export function path<V extends keyof Context, K extends keyof Context[V]>(v: V, k: K)  {
    return `${v}.${k}`
}
