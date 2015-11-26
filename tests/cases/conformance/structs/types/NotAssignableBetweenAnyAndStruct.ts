// doc 8
// A struct cannot be assigned or cast to any type, and vice versa.

var a: any;

struct S {
	foo: string;
}
var as: S;

as = a; // error
as = <S>a; // error
a = as; // error
a = <any>as; // error
