// @Filename: unreachable.ts
// @allowUnreachableCode: false
const unreachable = (x: unknown): number => {
    switch (typeof x) {
        case 'string': return 0
        case 'number': return 0
        case 'bigint': return 0
        case 'boolean': return 0
        case 'symbol': return 0
        case 'undefined': return 0
        case 'object': return 0
        case 'function': return 0
    }
    x;
}