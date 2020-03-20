//// [fatarrowfunctionsOptionalArgs.ts]
// valid

// no params
() => 1;

// one param, no type
(arg) => 2;

// one param, no type
arg => 2;

// one param, no type with default value
(arg = 1) => 3;

// one param, no type, optional
(arg?) => 4;

// typed param
(arg: number) => 5;

// typed param with default value
(arg: number = 0) => 6;

// optional param
(arg?: number) => 7;

// var arg param
(...arg: number[]) => 8;

// multiple arguments
(arg1, arg2) => 12;
(arg1 = 1, arg2 =3) => 13;
(arg1?, arg2?) => 14;
(arg1: number, arg2: number) => 15;
(arg1: number = 0, arg2: number = 1) => 16;
(arg1?: number, arg2?: number) => 17;
(arg1, ...arg2: number[]) => 18;
(arg1, arg2?: number) => 19;

// in paren
(() => 21);
((arg) => 22);
((arg = 1) => 23);
((arg?) => 24);
((arg: number) => 25);
((arg: number = 0) => 26);
((arg?: number) => 27);
((...arg: number[]) => 28);

// in multiple paren
(((((arg) => { return 32; }))));

// in ternary exression
false ? () => 41 : null;
false ? (arg) => 42 : null;
false ? (arg = 1) => 43 : null;
false ? (arg?) => 44 : null;
false ? (arg: number) => 45 : null;
false ? (arg?: number) => 46 : null;
false ? (arg?: number = 0) => 47 : null;
false ? (...arg: number[]) => 48 : null;

// in ternary exression within paren
false ? (() => 51) : null;
false ? ((arg) => 52) : null;
false ? ((arg = 1) => 53) : null;
false ? ((arg?) => 54) : null;
false ? ((arg: number) => 55) : null;
false ? ((arg?: number) => 56) : null;
false ? ((arg?: number = 0) => 57) : null;
false ? ((...arg: number[]) => 58) : null;

// ternary exression's else clause
false ? null : () => 61;
false ? null : (arg) => 62;
false ? null : (arg = 1) => 63;
false ? null : (arg?) => 64;
false ? null : (arg: number) => 65;
false ? null : (arg?: number) => 66;
false ? null : (arg?: number = 0) => 67;
false ? null : (...arg: number[]) => 68;


// nested ternary expressions
((a?) => { return a; }) ? (b? ) => { return b; } : (c? ) => { return c; };

//multiple levels
(a?) => { return a; } ? (b)=>(c)=>81 : (c)=>(d)=>82;


// In Expressions
((arg) => 90) instanceof Function;
((arg = 1) => 91) instanceof Function;
((arg? ) => 92) instanceof Function;
((arg: number) => 93) instanceof Function;
((arg: number = 1) => 94) instanceof Function;
((arg?: number) => 95) instanceof Function;
((...arg: number[]) => 96) instanceof Function;

'' + ((arg) => 100);
((arg) => 0) + '' + ((arg) => 101);
((arg = 1) => 0) + '' + ((arg = 2) => 102);
((arg?) => 0) + '' + ((arg?) => 103);
((arg:number) => 0) + '' + ((arg:number) => 104);
((arg:number = 1) => 0) + '' + ((arg:number = 2) => 105);
((arg?:number = 1) => 0) + '' + ((arg?:number = 2) => 106);
((...arg:number[]) => 0) + '' + ((...arg:number[]) => 107);
((arg1, arg2?) => 0) + '' + ((arg1,arg2?) => 108);
((arg1, ...arg2:number[]) => 0) + '' + ((arg1, ...arg2:number[]) => 108);


// Function Parameters
function foo(...arg: any[]) { }

foo(
    (a) => 110, 
    ((a) => 111), 
    (a) => {
        return 112;
    },
    (a? ) => 113, 
    (a, b? ) => 114, 
    (a: number) => 115, 
    (a: number = 0) => 116, 
    (a = 0) => 117, 
    (a?: number = 0) => 118, 
    (...a: number[]) => 119, 
    (a, b? = 0, ...c: number[]) => 120,
    (a) => (b) => (c) => 121,
    false? (a) => 0 : (b) => 122
);

//// [fatarrowfunctionsOptionalArgs.js]
// valid
// no params
(function () { return 1; });
// one param, no type
(function (arg) { return 2; });
// one param, no type
(function (arg) { return 2; });
// one param, no type with default value
(function (arg) {
    if (arg === void 0) { arg = 1; }
    return 3;
});
// one param, no type, optional
(function (arg) { return 4; });
// typed param
(function (arg) { return 5; });
// typed param with default value
(function (arg) {
    if (arg === void 0) { arg = 0; }
    return 6;
});
// optional param
(function (arg) { return 7; });
// var arg param
(function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return 8;
});
// multiple arguments
(function (arg1, arg2) { return 12; });
(function (arg1, arg2) {
    if (arg1 === void 0) { arg1 = 1; }
    if (arg2 === void 0) { arg2 = 3; }
    return 13;
});
(function (arg1, arg2) { return 14; });
(function (arg1, arg2) { return 15; });
(function (arg1, arg2) {
    if (arg1 === void 0) { arg1 = 0; }
    if (arg2 === void 0) { arg2 = 1; }
    return 16;
});
(function (arg1, arg2) { return 17; });
(function (arg1) {
    var arg2 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg2[_i - 1] = arguments[_i];
    }
    return 18;
});
(function (arg1, arg2) { return 19; });
// in paren
(function () { return 21; });
(function (arg) { return 22; });
(function (arg) {
    if (arg === void 0) { arg = 1; }
    return 23;
});
(function (arg) { return 24; });
(function (arg) { return 25; });
(function (arg) {
    if (arg === void 0) { arg = 0; }
    return 26;
});
(function (arg) { return 27; });
(function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return 28;
});
// in multiple paren
((((function (arg) { return 32; }))));
// in ternary exression
false ? function () { return 41; } : null;
false ? function (arg) { return 42; } : null;
false ? function (arg) {
    if (arg === void 0) { arg = 1; }
    return 43;
} : null;
false ? function (arg) { return 44; } : null;
false ? function (arg) { return 45; } : null;
false ? function (arg) { return 46; } : null;
false ? function (arg) {
    if (arg === void 0) { arg = 0; }
    return 47;
} : null;
false ? function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return 48;
} : null;
// in ternary exression within paren
false ? (function () { return 51; }) : null;
false ? (function (arg) { return 52; }) : null;
false ? (function (arg) {
    if (arg === void 0) { arg = 1; }
    return 53;
}) : null;
false ? (function (arg) { return 54; }) : null;
false ? (function (arg) { return 55; }) : null;
false ? (function (arg) { return 56; }) : null;
false ? (function (arg) {
    if (arg === void 0) { arg = 0; }
    return 57;
}) : null;
false ? (function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return 58;
}) : null;
// ternary exression's else clause
false ? null : function () { return 61; };
false ? null : function (arg) { return 62; };
false ? null : function (arg) {
    if (arg === void 0) { arg = 1; }
    return 63;
};
false ? null : function (arg) { return 64; };
false ? null : function (arg) { return 65; };
false ? null : function (arg) { return 66; };
false ? null : function (arg) {
    if (arg === void 0) { arg = 0; }
    return 67;
};
false ? null : function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return 68;
};
// nested ternary expressions
(function (a) { return a; }) ? function (b) { return b; } : function (c) { return c; };
//multiple levels
(function (a) { return a; });
(function (b) { return function (c) { return 81; }; });
(function (c) { return function (d) { return 82; }; });
// In Expressions
(function (arg) { return 90; }) instanceof Function;
(function (arg) {
    if (arg === void 0) { arg = 1; }
    return 91;
}) instanceof Function;
(function (arg) { return 92; }) instanceof Function;
(function (arg) { return 93; }) instanceof Function;
(function (arg) {
    if (arg === void 0) { arg = 1; }
    return 94;
}) instanceof Function;
(function (arg) { return 95; }) instanceof Function;
(function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return 96;
}) instanceof Function;
'' + (function (arg) { return 100; });
(function (arg) { return 0; }) + '' + (function (arg) { return 101; });
(function (arg) {
    if (arg === void 0) { arg = 1; }
    return 0;
}) + '' + (function (arg) {
    if (arg === void 0) { arg = 2; }
    return 102;
});
(function (arg) { return 0; }) + '' + (function (arg) { return 103; });
(function (arg) { return 0; }) + '' + (function (arg) { return 104; });
(function (arg) {
    if (arg === void 0) { arg = 1; }
    return 0;
}) + '' + (function (arg) {
    if (arg === void 0) { arg = 2; }
    return 105;
});
(function (arg) {
    if (arg === void 0) { arg = 1; }
    return 0;
}) + '' + (function (arg) {
    if (arg === void 0) { arg = 2; }
    return 106;
});
(function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return 0;
}) + '' + (function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return 107;
});
(function (arg1, arg2) { return 0; }) + '' + (function (arg1, arg2) { return 108; });
(function (arg1) {
    var arg2 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg2[_i - 1] = arguments[_i];
    }
    return 0;
}) + '' + (function (arg1) {
    var arg2 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg2[_i - 1] = arguments[_i];
    }
    return 108;
});
// Function Parameters
function foo() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
}
foo(function (a) { return 110; }, (function (a) { return 111; }), function (a) {
    return 112;
}, function (a) { return 113; }, function (a, b) { return 114; }, function (a) { return 115; }, function (a) {
    if (a === void 0) { a = 0; }
    return 116;
}, function (a) {
    if (a === void 0) { a = 0; }
    return 117;
}, function (a) {
    if (a === void 0) { a = 0; }
    return 118;
}, function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    return 119;
}, function (a, b) {
    if (b === void 0) { b = 0; }
    var c = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        c[_i - 2] = arguments[_i];
    }
    return 120;
}, function (a) { return function (b) { return function (c) { return 121; }; }; }, false ? function (a) { return 0; } : function (b) { return 122; });
