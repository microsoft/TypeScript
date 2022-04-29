declare class base<T> {
}
declare class abc<T> extends base<T> {
    foo: xyz;
}
declare class xyz extends abc {
}

var bar = new xyz(); // Error: Invalid 'new' expression.
var r: xyz = bar.foo;