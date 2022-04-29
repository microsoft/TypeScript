// call
interface i1 {
    (_i: number, ...restParameters); // no error - no code gen
}
interface i1NoError {
    (_i: number);  // no error
}

// new
interface i2 {
    new (_i: number, ...restParameters); // no error - no code gen
}
interface i2NoError {
    new (_i: number);  // no error
}

// method
interface i3 {
    foo (_i: number, ...restParameters); // no error - no code gen
    fooNoError (_i: number);  // no error
}