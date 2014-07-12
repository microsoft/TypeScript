function fee<T>() {
    var t: T;
    t.blah; // Error
    t.toString; // ok
}

function fee2<T extends any>() {
    var t: T;
    t.blah; // Error
    t.toString; // ok
}