// @strict: true

class B {
    static readonly [s: string]: number;
    static readonly [s: number]: 42 | 233
}

interface I {
    static readonly [s: string]: number;
    static readonly [s: number]: 42 | 233
}

type TA = (typeof B)["foo"]
type TB = (typeof B)[42]

type TC = (typeof B)[string]
type TD = (typeof B)[number]

type TE = keyof typeof B;

type TF = Pick<typeof B, number>
type TFI = Pick<I, number>
type TG = Omit<typeof B, number>
type TGI = Omit<I, number>
