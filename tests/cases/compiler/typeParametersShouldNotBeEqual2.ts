function ff<T extends Date, U extends Date, V>(x: T, y: U, z: V) {
    var zz: Object;
    x = x;  // Ok
    x = y;  // Ok
    x = z;  // Error
    z = x;  // Error
    y = z;  // Error
    z = y;  // Error
    x = zz;  // Error
    zz = x;  // Ok
}
