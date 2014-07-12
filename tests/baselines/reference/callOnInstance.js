//// [callOnInstance.js]
var s1 = D();

var s2 = (new D(1))();

(new C(1))(); // Error for calling an instance
