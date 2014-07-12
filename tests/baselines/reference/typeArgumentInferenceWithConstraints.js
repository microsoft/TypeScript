//// [typeArgumentInferenceWithConstraints.js]
// Generic call with no parameters
function noParams() {
}
noParams();
noParams();
noParams();

// Generic call with parameters but none use type parameter type
function noGenericParams(n) {
}
noGenericParams(''); // Valid
noGenericParams('');
noGenericParams(''); // Error

// Generic call with multiple type parameters and only one used in parameter type annotation
function someGenerics1(n, m) {
}
someGenerics1(3, 4); // Valid
someGenerics1(3, 4); // Error
someGenerics1(3, 4); // Error
someGenerics1(3, 4);

// Generic call with argument of function type whose parameter is of type parameter type
function someGenerics2a(n) {
}
someGenerics2a(function (n) {
    return n;
});
someGenerics2a(function (n) {
    return n;
});
someGenerics2a(function (n) {
    return n.substr(0);
});

function someGenerics2b(n) {
}
someGenerics2b(function (n, x) {
    return n;
});
someGenerics2b(function (n, t) {
    return n;
});
someGenerics2b(function (n, t) {
    return n.substr(t * t);
});

// Generic call with argument of function type whose parameter is not of type parameter type but body/return type uses type parameter
function someGenerics3(producer) {
}
someGenerics3(function () {
    return '';
}); // Error
someGenerics3(function () {
    return undefined;
});
someGenerics3(function () {
    return 3;
}); // Error

// 2 parameter generic call with argument 1 of type parameter type and argument 2 of function type whose parameter is of type parameter type
function someGenerics4(n, f) {
}
someGenerics4(4, function () {
    return null;
}); // Valid
someGenerics4('', function () {
    return 3;
});
someGenerics4('', function (x) {
    return '';
}); // Error
someGenerics4(null, null);

// 2 parameter generic call with argument 2 of type parameter type and argument 1 of function type whose parameter is of type parameter type
function someGenerics5(n, f) {
}
someGenerics5(4, function () {
    return null;
}); // Valid
someGenerics5('', function () {
    return 3;
});
someGenerics5('', function (x) {
    return '';
}); // Error
someGenerics5(null, null); // Error

// Generic call with multiple arguments of function types that each have parameters of the same generic type
function someGenerics6(a, b, c) {
}
someGenerics6(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
}); // Valid
someGenerics6(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
});
someGenerics6(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
}); // Error
someGenerics6(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
});

// Generic call with multiple arguments of function types that each have parameters of different generic type
function someGenerics7(a, b, c) {
}
someGenerics7(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
}); // Valid, types of n are <any, string, any> respectively
someGenerics7(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
});
someGenerics7(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
});

// Generic call with argument of generic function type
function someGenerics8(n) {
    return n;
}
var x = someGenerics8(someGenerics7);
x(null, null, null); // Error

// Generic call with multiple parameters of generic type passed arguments with no best common type
function someGenerics9(a, b, c) {
    return null;
}
var a9a = someGenerics9('', 0, []);
var a9a;
var a9b = someGenerics9({ a: 0 }, { b: '' }, null);
var a9b;


var a9e = someGenerics9(undefined, { x: 6, z: window }, { x: 6, y: '' });
var a9e;
var a9f = someGenerics9(undefined, { x: 6, z: window }, { x: 6, y: '' });
var a9f;

// Generic call with multiple parameters of generic type passed arguments with a single best common type
var a9d = someGenerics9({ x: 3 }, { x: 6 }, { x: 6 });
var a9d;

// Generic call with multiple parameters of generic type where one argument is of type 'any'
var anyVar;
var a = someGenerics9(7, anyVar, 4);
var a;

// Generic call with multiple parameters of generic type where one argument is [] and the other is not 'any'
var arr = someGenerics9([], null, undefined);
var arr;
