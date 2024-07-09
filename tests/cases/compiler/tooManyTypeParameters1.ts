function f<T>() { }
f<string, string>();

var x = <T>() => {};
x<number,number>();

class C<T> {}
var c = new C<Date,Date>();

interface I<T> {}
var i: I<number,number>;