//// [fatarrowfunctionsOptionalArgsErrors4.ts]
    false ? (arg?: number = 0) => 47 : null;
    false ? ((arg?: number = 0) => 57) : null;
    false ? null : (arg?: number = 0) => 67;
    ((arg?:number = 1) => 0) + '' + ((arg?:number = 2) => 106);

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

//// [fatarrowfunctionsOptionalArgsErrors4.js]
false ? function (arg) {
    if (arg === void 0) { arg = 0; }
    return 47;
} : null;
false ? (function (arg) {
    if (arg === void 0) { arg = 0; }
    return 57;
}) : null;
false ? null : function (arg) {
    if (arg === void 0) { arg = 0; }
    return 67;
};
(function (arg) {
    if (arg === void 0) { arg = 1; }
    return 0;
}) + '' + (function (arg) {
    if (arg === void 0) { arg = 2; }
    return 106;
});
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
