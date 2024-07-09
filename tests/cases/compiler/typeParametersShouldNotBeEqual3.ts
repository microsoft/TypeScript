function ff<T extends Object, U extends Object>(x: T, y: U) {
    var z: Object;
    x = x;  // Ok
    x = y;  // Ok
    x = z;  // Ok
    z = x;  // Ok
}
