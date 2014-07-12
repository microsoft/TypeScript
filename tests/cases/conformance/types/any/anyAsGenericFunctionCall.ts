// any is considered an untyped function call
// can be called except with type arguments which is an error

var x: any;
var a = x<number>();
var b = x<string>('hello');

class C { foo: string; }
var c = x<C>(x);
var d = x<any>(x);