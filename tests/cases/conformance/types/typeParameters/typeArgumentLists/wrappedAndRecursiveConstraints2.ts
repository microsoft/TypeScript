class C<T extends C<T>> { // error
    constructor(x: T) { }
}

var c = new C(1);
var c = new C(new C('')); // error