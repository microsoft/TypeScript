// @strict: true
// @noEmit: true

// Inherited members keep the base type's order. Sorting them by declaration position
// makes an empty subtype invariant and drops the assignability error.
// https://github.com/microsoft/TypeScript/issues/65052

export const empty: C<string> = {};

declare const narrowB: B<{ a: string }>;
export const wideB: B<{ a: string; b?: number }> = narrowB;

declare const narrowC: C<{ a: string }>;
export const wideC: C<{ a: string; b?: number }> = narrowC;

declare const narrowD: D<{ a: string }>;
export const wideD: D<{ a: string; b?: number }> = narrowD;

export const both: Both = {};

interface A<T> {
    inherited: () => T;
}

interface B<T> extends A<T> {
    own: (x: T) => Required<T>;
}

interface C<T> extends B<T> {}

interface D<T> extends C<T> {}

interface Left {
    left: string;
}

interface Right {
    right: string;
}

interface Both extends Right, Left {}
