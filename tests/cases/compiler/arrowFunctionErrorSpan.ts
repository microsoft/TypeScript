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
