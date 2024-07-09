var obj = function f<T>(a: T) { // should not error
    var x: T;
    return a;
};
 
var obj2 = function f<T>(a: T): T { // should not error
    var x: T;
    return a;
};

