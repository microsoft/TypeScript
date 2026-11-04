// https://github.com/microsoft/TypeScript/issues/63527

// Expressions of the form 'a ## b as T $$ c' are errors when $$ would bind before ## after
// erasing 'as T', changing the meaning of the expression.

export const x01 = 1 as number * 2;
export const x02 = 1 as any as number * 2;

export const x03 = 1 + 1 as number * 2;  // Error
export const x04 = 1 + 1 as any as number * 2;  // Error
export const x05 = 1 as number + 1 * 2;
export const x06 = 1 as any as number + 1 * 2;

export const x07 = 1 * 1 as number + 2;
export const x08 = 1 * 1 as any as number + 2;
export const x09 = 1 as number * 1 + 2;
export const x10 = 1 as any as number * 1 + 2;

export const x11 = (1 + 1 as number) * 2;
export const x12 = (1 + 1 as any as number) * 2;
export const x13 = (1 as number + 1) * 2;
export const x14 = (1 as any as number + 1) * 2;

export const x15 = 1 + 1 as number === 2;
export const x16 = 1 + 1 as any as number === 2;
export const x17 = 1 + 1 as number > 2;
export const x18 = 1 + 1 as any as number > 2;
export const x19 = 1 + 1 as number >= 2;
export const x20 = 1 + 1 as any as number >= 2;

export const x21 = 1 + 1 as number >> 2;
export const x22 = 1 + 1 as any as number >> 2;
export const x23 = 1 >> 1 as number + 2;  // Error
export const x24 = 1 >> 1 as any as number + 2;  // Error

// Equal-precedence left-associative operators preserve their grouping when assertions are erased.
export const x25 = 2 * 3 as number * 2;
export const x26 = 2 * 3 as any as number * 2;

// Equal-precedence right-associative operators do not.
export const x27 = 2 ** 3 as number ** 2;  // Error
export const x28 = 2 ** 3 as any as number ** 2;  // Error

export const y01 = 1 satisfies number * 2;
export const y02 = 1 satisfies any satisfies number * 2;

export const y03 = 1 + 1 satisfies number * 2;  // Error
export const y04 = 1 + 1 satisfies any satisfies number * 2;  // Error
export const y05 = 1 satisfies number + 1 * 2;
export const y06 = 1 satisfies any satisfies number + 1 * 2;

export const y07 = 1 * 1 satisfies number + 2;
export const y08 = 1 * 1 satisfies any satisfies number + 2;
export const y09 = 1 satisfies number * 1 + 2;
export const y10 = 1 satisfies any satisfies number * 1 + 2;

export const y11 = (1 + 1 satisfies number) * 2;
export const y12 = (1 + 1 satisfies any satisfies number) * 2;
export const y13 = (1 satisfies number + 1) * 2;
export const y14 = (1 satisfies any satisfies number + 1) * 2;

export const y15 = 1 + 1 satisfies number === 2;
export const y16 = 1 + 1 satisfies any satisfies number === 2;
export const y17 = 1 + 1 satisfies number > 2;
export const y18 = 1 + 1 satisfies any satisfies number > 2;
export const y19 = 1 + 1 satisfies number >= 2;
export const y20 = 1 + 1 satisfies any satisfies number >= 2;

export const y21 = 1 + 1 satisfies number >> 2;
export const y22 = 1 + 1 satisfies any satisfies number >> 2;
export const y23 = 1 >> 1 satisfies number + 2;  // Error
export const y24 = 1 >> 1 satisfies any satisfies number + 2;  // Error

// Equal-precedence left-associative operators preserve their grouping when assertions are erased.
export const y25 = 2 * 3 satisfies number * 2;
export const y26 = 2 * 3 satisfies any satisfies number * 2;

// Equal-precedence right-associative operators do not.
export const y27 = 2 ** 3 satisfies number ** 2;  // Error
export const y28 = 2 ** 3 satisfies any satisfies number ** 2;  // Error

// https://github.com/microsoft/TypeScript/issues/65170

// Erasing an assertion must not expose an invalid left operand of '**' either.
// A unary, await, or type assertion expression in that position is an error,
// just as it is without the assertion.

declare const num: number;
declare const promised: Promise<number>;
declare const obj: { y?: number };
declare let mutableNum: number;

export const z01 = -num as number ** 2;  // Error
export const z02 = -num satisfies number ** 2;  // Error
export const z03 = -num as any as number ** 2;  // Error
export const z04 = +num as number ** 2;  // Error
export const z05 = ~num as number ** 2;  // Error
export const z06 = !num as any ** 2;  // Error
export const z07 = typeof num as any ** 2;  // Error
export const z08 = void num as any ** 2;  // Error
export const z09 = delete obj.y as any ** 2;  // Error
export async function z10() { return await promised as number ** 2; }  // Error
export const z11 = <number>-num as any ** 2;  // Error
export const z12 = -(num) as number ** 2;  // Error
export const z13 = -num! as number ** 2;  // Error
export const z14 = -num as number satisfies number ** 2;  // Error

export const z15 = (-num) as number ** 2;
export async function z16() { return (await promised) as number ** 2; }
export const z17 = num as number ** 2;
export const z18 = -num as number * 2;
export const z19 = num! as number ** 2;
export const z20 = (-num)! as number ** 2;
export const z21 = (-num as number) as any ** 2;
export const z22 = ++mutableNum as number ** 2;
export const z23 = 2 ** -num as number;
