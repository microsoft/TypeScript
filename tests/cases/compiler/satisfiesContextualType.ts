// @strict: true

let obj: { f(s: string): void } & Record<string, unknown> = {
    f(s) { }, // "incorrect" implicit any on 's'
    g(s) { }
} satisfies { g(s: string): void } & Record<string, unknown>;
