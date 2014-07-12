//// [typeArgumentInferenceConstructSignatures.js]
var noParams;
new noParams();
new noParams();
new noParams();

var noGenericParams;
new noGenericParams('');
new noGenericParams('');
new noGenericParams('');

var someGenerics1;
new someGenerics1(3, 4);
new someGenerics1(3, 4); // Error
new someGenerics1(3, 4);

var someGenerics2a;
new someGenerics2a(function (n) {
    return n;
});
new someGenerics2a(function (n) {
    return n;
});
new someGenerics2a(function (n) {
    return n.substr(0);
});

var someGenerics2b;
new someGenerics2b(function (n, x) {
    return n;
});
new someGenerics2b(function (n, t) {
    return n;
});
new someGenerics2b(function (n, t) {
    return n.substr(t * t);
});

var someGenerics3;
new someGenerics3(function () {
    return '';
});
new someGenerics3(function () {
    return undefined;
});
new someGenerics3(function () {
    return 3;
});

var someGenerics4;
new someGenerics4(4, function () {
    return null;
});
new someGenerics4('', function () {
    return 3;
});
new someGenerics4('', function (x) {
    return '';
}); // Error
new someGenerics4(null, null);

var someGenerics5;
new someGenerics5(4, function () {
    return null;
});
new someGenerics5('', function () {
    return 3;
});
new someGenerics5('', function (x) {
    return '';
}); // Error
new someGenerics5(null, null);

var someGenerics6;
new someGenerics6(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
});
new someGenerics6(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
});
new someGenerics6(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
}); // Error
new someGenerics6(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
});

var someGenerics7;
new someGenerics7(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
});
new someGenerics7(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
});
new someGenerics7(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
});

var someGenerics8;
var x = new someGenerics8(someGenerics7);
new x(null, null, null);

var someGenerics9;
var a9a = new someGenerics9('', 0, []);
var a9a;
var a9b = new someGenerics9({ a: 0 }, { b: '' }, null);
var a9b;


var a9e = new someGenerics9(undefined, { x: 6, z: window }, { x: 6, y: '' });
var a9e;
var a9f = new someGenerics9(undefined, { x: 6, z: window }, { x: 6, y: '' });
var a9f;

// Generic call with multiple parameters of generic type passed arguments with a single best common type
var a9d = new someGenerics9({ x: 3 }, { x: 6 }, { x: 6 });
var a9d;

// Generic call with multiple parameters of generic type where one argument is of type 'any'
var anyVar;
var a = new someGenerics9(7, anyVar, 4);
var a;

// Generic call with multiple parameters of generic type where one argument is [] and the other is not 'any'
var arr = new someGenerics9([], null, undefined);
var arr;
