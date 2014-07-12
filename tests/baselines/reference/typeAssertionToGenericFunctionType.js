//// [typeAssertionToGenericFunctionType.js]
var x = {
    a: (function (x) {
        return 1;
    }),
    b: function (x) {
        x;
    }
};
x.a(1); // bug was that this caused 'Could not find symbol T' on return type T in the type assertion on x.a's definition
x.b(); // error
