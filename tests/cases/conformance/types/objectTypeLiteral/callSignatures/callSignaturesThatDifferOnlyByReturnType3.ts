// Normally it is an error to have multiple overloads with identical signatures in a single type declaration.
// Here the multiple overloads come from multiple merged declarations.

interface I {
    (x: string): string;
}

interface I {
    (x: string): number;
}

interface I2<T> {
    (x: string): string;
}

interface I2<T> {
    (x: string): number;
}