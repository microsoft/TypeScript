//// [nonConflictingRecursiveBaseTypeMembers.ts]
interface A<T> {
    x: C<T>
}

interface B<T> {
    x: C<T>
}

interface C<T> extends A<T>, B<T> { } // Should not be an error

//// [nonConflictingRecursiveBaseTypeMembers.js]
