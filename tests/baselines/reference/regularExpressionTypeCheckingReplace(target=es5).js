//// [tests/cases/compiler/regularExpressionTypeCheckingReplace.ts] ////

//// [regularExpressionTypeCheckingReplace.ts]
"foo_foo_bar".replace(/foo/g, (match, index, input, ...args) => {
    match; // "foo"
    index; // number
    input; // `${string}foo${string}`
    args; // []
    return match;
});

"foo42_foo24_bar".replace(/foo(\d+)/g, (match, id, index, input, ...args) => {
    match; // `foo${string}`
    id; // string
    index; // number
    input; // `${string}foo${string}`
    args; // []
    return match;
});

"foo42_foo24_bar".replace(/foo(?<id>\d+)/g, (match, id, index, input, capturingGroups, ...args) => {
    match; // `foo${string}`
    id; // string
    index; // number
    input; // `${string}foo${string}`
    // for target ≥ ES2018
    capturingGroups.id; // string
    capturingGroups.foo; // error
    args; // []
    return match;
});

"foo_foo_bar".replace(/foo(?<empty>){0}/g, (match, empty, index, input, capturingGroups, ...args) => {
    match; // "foo"
    empty; // "" | undefined
    index; // number
    input; // `${string}foo${string}`
    // for target ≥ ES2018
    capturingGroups.empty; // "" | undefined
    capturingGroups.foo; // error
    args; // []
    return match;
});


//// [regularExpressionTypeCheckingReplace.js]
"use strict";
"foo_foo_bar".replace(/foo/g, function (match, index, input) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    match; // "foo"
    index; // number
    input; // `${string}foo${string}`
    args; // []
    return match;
});
"foo42_foo24_bar".replace(/foo(\d+)/g, function (match, id, index, input) {
    var args = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        args[_i - 4] = arguments[_i];
    }
    match; // `foo${string}`
    id; // string
    index; // number
    input; // `${string}foo${string}`
    args; // []
    return match;
});
"foo42_foo24_bar".replace(/foo(?<id>\d+)/g, function (match, id, index, input, capturingGroups) {
    var args = [];
    for (var _i = 5; _i < arguments.length; _i++) {
        args[_i - 5] = arguments[_i];
    }
    match; // `foo${string}`
    id; // string
    index; // number
    input; // `${string}foo${string}`
    // for target ≥ ES2018
    capturingGroups.id; // string
    capturingGroups.foo; // error
    args; // []
    return match;
});
"foo_foo_bar".replace(/foo(?<empty>){0}/g, function (match, empty, index, input, capturingGroups) {
    var args = [];
    for (var _i = 5; _i < arguments.length; _i++) {
        args[_i - 5] = arguments[_i];
    }
    match; // "foo"
    empty; // "" | undefined
    index; // number
    input; // `${string}foo${string}`
    // for target ≥ ES2018
    capturingGroups.empty; // "" | undefined
    capturingGroups.foo; // error
    args; // []
    return match;
});
