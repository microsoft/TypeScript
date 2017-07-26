function f<T extends number>() {
    var t: T;
    var v = {
        [t]: 0
    }
    return t + t;
}
