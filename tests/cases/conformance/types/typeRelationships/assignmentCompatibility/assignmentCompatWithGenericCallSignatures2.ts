// some complex cases of assignment compat of generic signatures. No contextual signature instantiation

interface A {
    <T>(x: T, ...y: T[][]): void
}

interface B {
    <S>(x: S, ...y: S[]): void
}

declare var a: A;
declare var b: B;

// Both errors
a = b;
b = a;
