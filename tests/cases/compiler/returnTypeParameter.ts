function f<T>(a: T): T { } // error, no return statement
function f2<T>(a: T): T { return T; } // bug was that this satisfied the return statement requirement