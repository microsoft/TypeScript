function foo<T, U extends T>(u: U) {
    var x3: U = u || u;
}