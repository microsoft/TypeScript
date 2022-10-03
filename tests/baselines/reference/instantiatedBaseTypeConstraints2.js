//// [instantiatedBaseTypeConstraints2.ts]
interface A<T extends A<T, S>, S extends A<T, S>> { }
interface B<U> extends A<B<U>, B<U>> { }

//// [instantiatedBaseTypeConstraints2.js]
