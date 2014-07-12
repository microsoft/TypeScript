//// [genericConstraint3.ts]
interface C<P> { x: P; }
interface A<T, U extends C<T>> { x: U; }
interface B extends A<{}, { x: {} }> { } // Should not produce an error

//// [genericConstraint3.js]
