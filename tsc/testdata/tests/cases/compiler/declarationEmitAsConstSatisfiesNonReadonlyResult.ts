// @declaration: true
export const obj = {
    array: [
        { n: 1 },
        { n: 2 }
    ]
} as const satisfies {array?: Readonly<{n: unknown}>[]}

declare function foo<const T extends {array?: Readonly<{n: unknown}>[]}>(arg: T): T;

export const call = foo({
    array: [
        { n: 1 },
        { n: 2 }
    ]
})