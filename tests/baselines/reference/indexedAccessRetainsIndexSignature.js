//// [indexedAccessRetainsIndexSignature.ts]
type Diff<T extends string, U extends string> =
    ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T]
type Omit<U, K extends keyof U> = Pick<U, Diff<keyof U, K>>


type O = Omit<{ a: number, b: string }, 'a'>


//// [indexedAccessRetainsIndexSignature.js]
