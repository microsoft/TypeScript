// Repro from #10901
/**
 * Administrivia: JavaScript primitive types and Date
 */
export type Primitive = number | string | boolean | Date;

/**
 * Administrivia: anything with a valueOf(): number method is comparable, so we allow it in numeric operations
 */
interface Numeric {
    valueOf(): number;
}

// Not very useful, but meets Numeric
class NumCoercible {
    public a: number;

    constructor(a: number) {
        this.a = a;
    }
    public valueOf() {
        return this.a;
    }
}

/**
 * Return the min and max simultaneously.
 */
export function extent<T extends Numeric>(array: Array<T | Primitive>): [T | Primitive, T | Primitive] | [undefined, undefined] {
    return [undefined, undefined];
}


let extentMixed: [Primitive | NumCoercible, Primitive | NumCoercible] | [undefined, undefined];
extentMixed = extent([new NumCoercible(10), 13, '12', true]);
