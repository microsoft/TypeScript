//// [tests/cases/compiler/typedGenericPrototypeMember.ts] ////

//// [typedGenericPrototypeMember.ts]
class List<T> {
   add(item: T) { }
}

List.prototype.add("abc"); // Valid because T is instantiated to any


//// [typedGenericPrototypeMember.js]
class List {
    add(item) { }
}
List.prototype.add("abc"); // Valid because T is instantiated to any
