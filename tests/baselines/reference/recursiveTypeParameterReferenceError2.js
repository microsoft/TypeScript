//// [recursiveTypeParameterReferenceError2.ts]
interface List<T> {
    data: T;
    next: List<T>;
    owner: List<List<T>>;  // Error, recursive reference with wrapped T
}

interface List2<T> {
    data: T;
    next: List2<T>;
    owner: List2<List2<string>>;  // Ok
}


//// [recursiveTypeParameterReferenceError2.js]
