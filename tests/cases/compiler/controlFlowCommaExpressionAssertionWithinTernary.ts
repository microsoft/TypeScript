// @strict: true
declare function assert(value: any): asserts value;

function foo2(param: number | null | undefined): number | null {
    const val = param !== undefined;
    return val ? (assert(param !== undefined), param) : null;
    // ^^^^^ Still typed as number | null | undefined
}