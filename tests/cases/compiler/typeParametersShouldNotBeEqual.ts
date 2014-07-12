function ff<T, U>(x: T, y: U) {
    var z: Object;
    x = x;  // Ok
    x = y;  // Error
    x = z;  // Error
    z = x;  // Ok
}
