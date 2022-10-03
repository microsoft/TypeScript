function foo1<T extends { (): string; }>(f: T) {
    return f(); // should return 'string', once returned 'any'
}
 
function foo2<T extends { new (): string; }>(f: T) {
    return new f(); // should be legal, once was an error
}