export declare function testDefaultNoType(a: string, b?: string): number;
declare function test(a: string): number;
export declare const testAlias: typeof test;
export declare function testOptional(a: string, b?: string): number;
export declare function testDefault(a: string, b?: string): number;
export declare function testRest(...a: string[]): number;
export declare function testTuple(...a: [string, string]): number;
export declare function testTupleRest(...a: [string, string] | [number, number]): number;
export {};
