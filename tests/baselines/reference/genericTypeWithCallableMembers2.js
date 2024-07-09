//// [tests/cases/compiler/genericTypeWithCallableMembers2.ts] ////

//// [genericTypeWithCallableMembers2.ts]
function foo1<T extends { (): string; }>(f: T) {
    return f(); // should return 'string', once returned 'any'
}
 
function foo2<T extends { new (): string; }>(f: T) {
    return new f(); // should be legal, once was an error
}

//// [genericTypeWithCallableMembers2.js]
function foo1(f) {
    return f(); // should return 'string', once returned 'any'
}
function foo2(f) {
    return new f(); // should be legal, once was an error
}
