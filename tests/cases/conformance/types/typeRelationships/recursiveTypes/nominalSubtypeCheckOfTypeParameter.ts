interface BinaryTuple<T, S> {
    first: T
    second: S
}

interface Sequence<T> {
    hasNext(): boolean
    pop(): T
    zip<S>(seq: Sequence<S>): Sequence<BinaryTuple<T, S>>
}

// error, despite the fact that the code explicitly says List<T> extends Sequence<T>, the current rules for infinitely expanding type references 
// perform nominal subtyping checks that allow variance for type arguments, but not nominal subtyping for the generic type itself
interface List<T> extends Sequence<T> {
    getLength(): number
    zip<S>(seq: Sequence<S>): List<BinaryTuple<T, S>>
}
