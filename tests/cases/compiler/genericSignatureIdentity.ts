// This test is here to remind us of our current limits of type identity checking.
// Ideally all of the below declarations would be considered different (and thus errors)
// but they aren't because we erase type parameters to type any and don't check that
// constraints are identical.

var x: {
    <T extends Date>(x: T): T;
};

var x: {
    <T extends number>(x: T): T;
};

var x: {
    <T>(x: T): T;
};

var x: {
    <T>(x: any): any;
};
