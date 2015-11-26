// doc 8
// A struct cannot be assigned to object type, and vice versa.

var o: {};

struct S {
	foo: string;
}
var os: S;

os = o; // error
os = <S>o; // error
o = os; // error
o = <Object>os; // error
