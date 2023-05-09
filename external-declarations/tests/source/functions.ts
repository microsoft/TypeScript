export function testDefaultNoType(a: string, b = ""): number {
    return 0;
}

function test(a: string): number {
    return 0;
}
export const testAlias: typeof test = test;

export function testOptional(a: string, b?: string): number {
    return 0;
}

export function testDefault(a: string, b: string = ""): number {
    return 0;
}


export function testRest(...a: string[]): number {
    return 0;
}

export function testTuple(...a: [string, string]): number {
    return 0;
}

export function testTupleRest(...a: 
    | [string, string]
    | [number, number]): number {
    return 0;
}