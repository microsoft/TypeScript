//// [tests/cases/compiler/collisionArgumentsInterfaceMembers.ts] ////

//// [collisionArgumentsInterfaceMembers.ts]
// call
interface i1 {
    (i: number, ...arguments); // no error - no code gen
}
interface i12 {
    (arguments: number, ...rest); // no error - no code gen
}
interface i1NoError {
    (arguments: number);  // no error
}

// new
interface i2 {
    new (i: number, ...arguments); // no error - no code gen
}
interface i21 {
    new (arguments: number, ...rest); // no error - no code gen
}
interface i2NoError {
    new (arguments: number);  // no error
}

// method
interface i3 {
    foo(i: number, ...arguments); // no error - no code gen
    foo1(arguments: number, ...rest); // no error - no code gen
    fooNoError(arguments: number);  // no error
}

//// [collisionArgumentsInterfaceMembers.js]
