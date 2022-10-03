class List<T> {
   add(item: T) { }
}

List.prototype.add("abc"); // Valid because T is instantiated to any
