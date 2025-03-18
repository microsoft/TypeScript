//// [tests/cases/compiler/noConstraintInReturnType1.ts] ////

//// [noConstraintInReturnType1.ts]
class List<T extends {}> {
    static empty<T extends {}>(): List<T> { return null; }
}


//// [noConstraintInReturnType1.js]
class List {
    static empty() { return null; }
}
