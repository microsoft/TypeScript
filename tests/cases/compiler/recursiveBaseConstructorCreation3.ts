// @noImplicitAny: true
declare class base<T> {
}
declare class abc<T> extends base<T> {
    foo: xyz;
}
declare class xyz extends abc {
}

var bar = new xyz();
var r: xyz = bar.foo;