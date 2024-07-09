//// [tests/cases/compiler/arrowFunctionErrorSpan.ts] ////

//// [arrowFunctionErrorSpan.ts]
function f(a: () => number) { }

// oneliner
f(() => { });

// multiline, body
f(() => {

});

// multiline 2, body
f(() => {

});

// multiline 3, arrow on a new line
f(()
    => { });

// multiline 4, arguments
f((a,
    b,
    c,
    d) => { });

// single line with a comment
f(/*
    */() => { });

// multi line with a comment
f(/*
    */() => { });

// multi line with a comment 2
f(/*
    */() => { 

    });

// multi line with a comment 3
f(  // comment 1
    // comment 2
    () =>
    // comment 3
    {
        // comment 4
    }
    // comment 5
); 

// body is not a block
f(_ => 1 +
    2);


//// [arrowFunctionErrorSpan.js]
function f(a) { }
// oneliner
f(function () { });
// multiline, body
f(function () {
});
// multiline 2, body
f(function () {
});
// multiline 3, arrow on a new line
f(function () { });
// multiline 4, arguments
f(function (a, b, c, d) { });
// single line with a comment
f(/*
    */ function () { });
// multi line with a comment
f(/*
    */ function () { });
// multi line with a comment 2
f(/*
    */ function () {
});
// multi line with a comment 3
f(// comment 1
// comment 2
function () {
    // comment 4
}
// comment 5
);
// body is not a block
f(function (_) { return 1 +
    2; });
