/// <reference path="fourslash.ts" />

//// type Z = 'z'
//// type A = {
////   a: 'a'
//// } | {
////       [index in Z]: string
////   }
//// type B = {
////   b: 'b'
//// } & {
////       [index in Z]: string
////   }
//// 
//// const c = {
////   c: 'c'
//// } as const satisfies {
////     [index in Z]: string
////   }
//// 
//// const d = {
////   d: 'd'
//// } as const satisfies {
////   [index: string]: string
//// }
//// 
//// const e = {
////   e: 'e'
//// } satisfies {
////     [index in Z]: string
////   }
//// 
//// const f = {
////   f: 'f'
//// } satisfies {
////   [index: string]: string
//// }

format.document();
verify.currentFileContentIs(
`type Z = 'z'
type A = {
    a: 'a'
} | {
    [index in Z]: string
}
type B = {
    b: 'b'
} & {
    [index in Z]: string
}

const c = {
    c: 'c'
} as const satisfies {
    [index in Z]: string
}

const d = {
    d: 'd'
} as const satisfies {
    [index: string]: string
}

const e = {
    e: 'e'
} satisfies {
    [index in Z]: string
}

const f = {
    f: 'f'
} satisfies {
    [index: string]: string
}`
)