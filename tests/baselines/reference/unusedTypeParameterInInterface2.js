//// [unusedTypeParameterInInterface2.ts]
interface int<T, U, V> {
    f1(a: T): string;
    c: V;
}

//// [unusedTypeParameterInInterface2.js]
