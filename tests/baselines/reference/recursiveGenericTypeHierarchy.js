//// [recursiveGenericTypeHierarchy.ts]
// used to ICE
interface A<T extends A<T, S>, S extends A<T, S>> { }
interface B<T extends B<T, S>, S extends B<T, S>> extends A<B<T, S>, B<T, S>> { }

//// [recursiveGenericTypeHierarchy.js]
