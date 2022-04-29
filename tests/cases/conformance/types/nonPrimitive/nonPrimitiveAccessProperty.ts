var a: object;
a.toString();
a.nonExist(); // error

var { destructuring } = a; // error
var { ...rest } = a; // ok
