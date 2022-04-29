// @noimplicitany: true

var x: (a: any) => void = function <T>(x: T) {
    return null;
};

var x2: (a: any) => void = function f<T>(x: T) {
    return null;
};