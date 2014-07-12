var recurser = function foo() {
};

// Error: foo should not be visible here
foo();

// recurser should be
recurser();

(function bar() {
    // Error: foo should not be visible here either
    foo();
});

// Error: bar should not be visible
bar();