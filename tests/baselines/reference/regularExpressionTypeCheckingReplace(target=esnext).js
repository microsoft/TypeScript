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
